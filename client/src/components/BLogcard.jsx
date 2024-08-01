import React from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const Blogcard=(props)=>{
    let data=props.blogdata;
    const apiUrl='http://localhost:3000/'
   

    return (
<div className="bg-white shadow-md overflow-hidden rounded-xl ">
    <Link to={`/blog/${data.id}`}>
        <div className="flex flex-col w-full">
            <img  className="h-[200px]" src={apiUrl+data.image} alt=""/>
            {/* <div className="w-full h-[250px]" style={{background:`url(${apiUrl+data.image})`}}></div> */}
            <div className="flex justify-between items-center">
            <div className="p-2">
                <h2 className="mt-1 text-xl text-left max-w-[200px] overflow-hidden">{data.title}</h2>
                <p className="text-sm text-left opacity-70">{data.category}</p>
            </div>

           {/* <div className="bg-red-800 rounded-lg h-[20px] w-[20px] p-0.5 mx-2"><MdDelete /></div> */}
           </div>
        </div>
        </Link>
</div>
     
    );
}
export default Blogcard;
