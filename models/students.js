const mongoose=require('mongoose')
const studSchema=new mongoose.Schema({
name:{
type:String,
required:true,
},
email:{
type:String,
required:true,
},
phone:{
type:String,
required:true,
},
})
module.exports=mongoose.model('Student',studSchema)
