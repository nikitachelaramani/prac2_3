const express=require('express')
const router=express.Router()
const User=require('../models/students')
const ejs = require('ejs')
const fs=require('fs')
router.post('/add',(req,res)=>{
const user=new User({
name:req.body.name,
email:req.body.email,
phone:req.body.phone,
})
user.save((err)=>{
if(err){
res.json({message:err.message})
}else{
res.redirect('/')
}
})
})
router.get('/',(req,res)=>{
User.find().exec((err,users)=>{
if(err){
res.json({message:err.message})
}
else{
res.render('index',{
title:'Home Page',
users:users,
})
}
})
})
router.get('/add',(req,res)=>{
res.render('add_users',{title:'Add User'})
})
router.get('/edit/:id',(req,res)=>{
let id=req.params.id;
User.findById(id,(err,user)=>{
if(err){
res.redirect('/')
}else{
if(user==null){
res.redirect('/')
}else{
res.render("edit_users",{
title:"Edit users",
user:user,
})
}
}
})
})
router.post('/update/:id',(req,res)=>{
let id=req.params.id
User.findByIdAndUpdate(id,{
name:req.body.name,
email:req.body.email,
phone:req.body.phone,
},(err,result)=>{
if(err){
res.json({message:err.message})
}else{
res.redirect('/')
}
})
})
router.get('/delete/:id',(req,res)=>{
let id=req.params.id;
User.findByIdAndRemove(id,(err,result)=>{
if(err){
res.json({message:err.message})
}else{
res.redirect('/')
}
})
})
module.exports=router
