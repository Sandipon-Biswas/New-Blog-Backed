const express =require('express');
const cors =require('cors');
 require('./config/db')
 // import router
 const userRouter =require('./routes/userRoutes');
 const blogRouter =require('./routes/blogRoutes');
const app =express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
// use router
app.use('/api/v1/user', userRouter )
app.use('/api/v1/blog', blogRouter )
app.get('/',(req,res)=>{
    res.send("hello world")
});
//sdfsdfsdf

app.use((req,res,next)=>{
    res.status(404).json({
        "message":"route not found"
    })
});

app.use((err,req,res,next)=>{
    res.status(500).json({
        "message":"something broke"
    })
});


module.exports=app;
