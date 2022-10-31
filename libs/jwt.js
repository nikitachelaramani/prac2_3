const jwt=require("jsonwebtoken")
const secret="secret-key"
const exptime=3000;
const sign=(req,res)=>{

if(req.body.username == "username1" && req.body.password == "mypassword1"){
const token=jwt.sign({username:
"user1",role:"admin"},secret,{algorithm:"HS256",expiresIn:exptime})
res.send(token)

}
else{
res.send('Invalid username or password');
}
}
const verify=(req,res,next)=>{
var token=req.headers.authorization;

if(!token)
return res.status(401).end("Not authorised")
try{
token=token.split(" ")[1]
var payload=jwt.verify(token,secret)
console.log(payload)
next()
}catch(e)
{
return res.status(401).end("Not authorised")
}
}
module.exports={sign,verify}