
import React ,{useEffect, useState} from "react";
import Blogcard from "../components/BLogcard";
import { getblogs } from "../api/Api";
import { useSearchParams } from "react-router-dom";


const Home=()=>{
  let [searchParams,setsearchParams]=useSearchParams();
  let category=searchParams.get('category');
    const [blogs,setBlogs]=useState([]);

      useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const allBlogs = await getblogs();
                
                if (allBlogs) {
                    setBlogs(allBlogs.data);
                } else {
                    console.error('No blogs fetched');
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                
                const allBlogs = await getblogs(searchParams.get('category'));
                
                if (allBlogs) {
                    setBlogs(allBlogs.data);
                } else {
                    console.error('No blogs fetched');
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, [searchParams]);
    

    
    
    return (
        <div>
        <div className="w-max">
          <h1 className=" text-center mb-5 animate-typing overflow-hidden border-r-blue-500 whitespace-nowrap border-r-4 pr-5 text-3.5xl  font-bold"> Showing <span className="text-gray-400">{searchParams.get('category')?searchParams.get('category'): 'all' } </span>BLogs</h1>
         </div>
             <div className="grid sm:grid-col-2 md:grid-cols-3 gap-5">
             {
               blogs && blogs.map((x, index) => (
                    <Blogcard key={index} blogdata={x} />
                ))}
             </div>
        </div>
    );
}
export default Home;
