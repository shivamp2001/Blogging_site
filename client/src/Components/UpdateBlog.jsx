import React, { useState } from 'react'
import { Imagebase64 } from './ImageconvertBase64'
import axios from "axios"
import "../style/addblog.css"
import { useNavigate, useParams } from 'react-router-dom'

const UpdateBlog = () => {
    const blogId=useParams().blogid;
    // const userId=localStorage.getItem("userid")
    // console.log(blogId);
    const navigate=useNavigate()
    const[inputs,setInputs]=useState({
        title:"",
        image:"",
        description:""
       })

       const ImageconverTo64=async(e)=>{
        const data=await Imagebase64(e.target.files[0]);
        setInputs((preve)=>{
         return{
           ...preve,
           image:data
         }
        })
       }
  
       const UpdateBlogOnServer=async()=>{
        const res=await axios.put(`http://localhost:5000/updateblog/${blogId}`,{
         title:String(inputs.title),
         image:String(inputs.image),
         description:String(inputs.description),
        //  user:String(userId)
        }).catch((err)=>console.log(err))
        const Data=await res.data
        // console.log(Data);
        return Data
      }
       console.log(inputs);
       const handleChange=(e)=>{
        setInputs((preve)=>{
          return{
            ...preve,
             [e.target.name]:e.target.value
          }  
        });
      }

       const handleSubmit=(e)=>{
        e.preventDefault()
        UpdateBlogOnServer().then(()=>navigate("/myblogs"))
       }
  return (
    <div className='main-div'>
         <form onSubmit={handleSubmit}>
      <div className='addblog'>
        <h2 className='heading'>Update Blog</h2>
        <div className='fields'>

          <label label htmlFor="">Title</label>
          <input type="text" name='title' placeholder='Enter Title' value={inputs.title} onChange={handleChange}/>
          <label label htmlFor="">Image</label>
          <input type="file" name='image'accept="image/*"  className='file'onChange={ImageconverTo64} />

           <div className="image1">
            <img src={inputs.image} alt='' />
           </div>
           <label htmlFor="" className='description'>Description </label>
           <textarea name="description" id=""  cols="1"rows="4" value={inputs.description} onChange={handleChange}></textarea>

           <button type='submit' >Add Blog</button>
        </div>
      </div>
      </form>
    </div>
  )
}

export default UpdateBlog
