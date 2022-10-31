require('dotenv').config();
const express= require('express')
const mongoose=require('mongoose')
const app=express();
const PORT=process.env.PORT||8080;
mongoose.connect(process.env.DBURL)
const db=mongoose.connection;
db.on('error',(err)=>{console.log(err)})
db.once('open',()=>{console.log("Connected to the database")})

app.use(express.urlencoded({extended:false}))

const {sign,verify}=require("./libs/jwt")

app.use(express.static("uploads/"))
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.render('login')
})
app.post("/login",sign)
app.use("/students",verify,require('./routes/route'))

app.listen(PORT,()=>{
    console.log('Server started at http://localhost:'+PORT);
})