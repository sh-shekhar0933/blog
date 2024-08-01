import React from "react";
import { getblogsbyid } from "../api/Api";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import parse from 'html-react-parser';
import dateFormat from 'dateformat';

const Blog =()=>{
  let {id}=useParams();
   const apiUrl='http://localhost:3000/'
  const [blog,setBlog]=useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
        try {
            const response = await getblogsbyid(id);
            console.log('Fetched blog:', response);
            if (response && response.data && response.data.length > 0) {
                setBlog(response.data[0]);
            } else {
                console.error('No blog data found:', response);
            }
        } catch (error) {
            console.error("Error fetching blog:", error);
        }
    };

    fetchBlog();
}, [id]);
    return (
 <div className="flex justify-center items-center ">
   {blog && <div className="flex flex-col w-[60%] overflow-hidden">
        <h1 className="mt-1 text-3xl font-extrabold">
         {blog.title}
        </h1>
        <div className="my-4 text-gray-500 text-lg">Posted By <img className="inline-block" width="20" height="20" src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/external-user-date-and-time-tanah-basah-glyph-tanah-basah.png" alt="external-user-date-and-time-tanah-basah-glyph-tanah-basah"/> {blog.username}</div>
        <div className="flex mt-4 mb-4">
            <small>{blog.createdon}</small>
        </div>
        <img className="rounded-lg" src={apiUrl+blog.image}/>
        <div>{parse(blog.post)}</div>
       
    </div>}
 </div>

    );
}

export default Blog;