import React ,{useState}from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadFile ,createBlogs} from "../api/Api";

const CreateBlog =()=>{


   
    const blankBlog={
      "username":"",
      "title":"",
      "image":"",
      "post":"<p><br></p>",
      "category":"",


    }

    const [newblog,setNewBlog]=useState(blankBlog);
    const handleUpload=async (event)=>{
      let uploadedFile=await uploadFile(event.target.files[0])
      if (uploadedFile.path){
        setNewBlog({...newblog,image:uploadedFile.path})
      }
    }

    const handleSubmit = async () => {
      try {
          const createdBlog = await createBlogs(newblog);
          if (createdBlog) {
              setNewBlog(blankBlog);
              alert('Blog created successfully');
          } else {
              alert('Failed to create blog');
          }
      } catch (error) {
          console.error('Error submitting blog:', error);
          alert('An error occurred while creating the blog');
      }
  };

    const menu =[
        {text:'Nature',path:'/'},
        {text:'Travel',path:'/'},
        {text:'Technology',path:'/'},
        {text:'Politics',path:'/'},
    ]

    return (
<div className="flex w-full items-center justify-center">
  <div className="bg-slate-200 w-[60%] p-5 rounded-xl">
    <h1 className="text-2xl mb-5">Create Post</h1>
    <div className="flex flex-col">
    <label htmlFor="" className="ml-1 text-gray-500">Username</label>
        <input type="text" value={newblog.username} onChange={(e)=>setNewBlog({...newblog,username:e.target.value})} className="h-10 border border-gray-300 rounded my-2 p-2"/>
    
        <label htmlFor="" className="ml-1 text-gray-500">Title</label>
        <input type="text" value={newblog.title} onChange={(e)=>setNewBlog({...newblog,title:e.target.value})} className="h-10 border border-gray-300 rounded my-2 p-2"/>
        <label htmlFor="" className="ml-1 text-gray-500">Category</label>
        <select name="" id ="" value={newblog.category} onChange={(e)=>setNewBlog({...newblog,category:e.target.value})} className="h-10 border border-gray-300 rounded my-2 p-2">
        <option value="" default disabled >Select Category</option>
           {
            menu.map(x=>{
             return    <option value={x.text}>{x.text}</option>
            })
           }
           

        </select>
        <label htmlFor="" className="ml-1 text-gray-500">Upload Image</label>
    <input onChange={(e)=>handleUpload(e)} type='file' className="border-gray-300 rounded my-2 p-2"/>
    <label htmlFor="" className="ml-1 text-gray-500">Post</label>

    <ReactQuill  className =" bg-white rounded mb-2 mt-2 editingarea" theme="snow" value={newblog.post} onChange={(e)=>setNewBlog({...newblog,post:e})} />

    <hr/>
    <button onClick={()=>handleSubmit()} className="bg-slate-500 text-white h-8 w-[100px] mt-2 rounded-lg" > Submit</button>

       
    </div>


  </div>

</div>
    );
}

export default CreateBlog;