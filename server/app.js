const express =require ('express');
const multer=require('multer');
const cors=require('cors');

const app=express();
app.use(cors());
app.use('/uploads',express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      
      cb(null, `${Date.now()},${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })

app.use(express.json())
const port =3000;
const client=require('./db/conn.js');
app.get('/',(req,res)=>{
    res.json({'message':'Hello World'});

}) 
app.get('/blog/:cat',async (req,res)=>{
   //'Select * from blogs'
    const result =await client.query(
      req.params.cat!='all' ? `select * from blogs where category= '${req.params.cat}'`:'select * from blogs ')
  
    res.json({'data':result.rows});

})
app.get('/blogbyid/:id',async (req,res)=>{
   
  const result =await client.query(`select * from blogs where id='${req.params.id}'`)

  res.json({'data':result.rows});

})
app.post('/blog',async (req,res)=>{
   
   const result =await client.query('insert into blogs (title,image,post,category,username) values($1,$2,$3,$4,$5)',[req.body.title,req.body.image,req.body.post,req.body.category,req.body.username]);
   res.json(result.rowCount);
})
// app.delete('/deleteblog:id',async(req,res)=>{
//  const result=await client.query(`DELETE FROM table_name WHERE id=${req.params.id}`);
//  res.json(result)
// })
app.post('/blogimage', upload.single('file'),  (req, res, next)=> {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.json(req.file);
  })



app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})