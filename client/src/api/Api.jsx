import axios from 'axios'
const apiUrl='http://localhost:3000';



  export const getblogs = async (cat) => {
    try {
      if (!cat){
        cat='all';
      }
        const response = await axios.get(apiUrl+'/blog/'+cat);
        return response.data;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return null;
    }
    
}

export const createBlogs = async (data) => {
  try {
      const response = await axios.post(apiUrl+'/blog', data);
      return response.data;
  } catch (error) {
      console.error('Error creating blog:', error);
      return error;
  }
};
export const getblogsbyid = async (id) => {
  try {
      const response = await axios.get(`${apiUrl}/blogbyid/${id}`);
      console.log('API response:', response.data);
      return response.data; // Ensure this returns an object with a `data` property
  } catch (error) {
      console.error('Error fetching blog by id:', error);
      return null;
  }
};

// export const deleteBlogById = async (id) => {
//   try {
//       const response = await axios.delete(`${apiUrl}/blogs/${id}`);
//       console.log('Delete response:', response.data);
//       return response.data;
//   } catch (error) {
//       console.error('Error deleting blog:', error);
//       return null;
//   }
// }
export const uploadFile=(file)=>{
  const formData=new FormData();
  formData.append('file',file);
  const config={
    headers:{
      'content-type':'multipart/form-data'
    }
  }
  return axios.post(apiUrl+'/blogimage',formData,config)
  .then(result=>{
  return result.data
  })
  .catch(error=>{
  return error
  });
}