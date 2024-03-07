const express = require("express");
const app = express();
const mongoose=require("mongoose");
//view Path is created in order to use EJS 
const path=require("path");
const Chat=require("./models/chat.js")
const methodOverride=require("method-override")
const port = process.env.PORT||3000;
require('dotenv').config()


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
// for parsing data that we get in req.body using url encodeing
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))

//Mongoose Setup
  async function main(){
    await mongoose.connect('mongodb://localhost:27017/whatsApp');
  }
  main().then(()=>console.log("Connection Successfull"))
  .catch((err)=>console.log(err.errors))

// Creating document from modal class Chat 


  // let chat1=new Chat({
  //   from:"Dhuruv",
  //   to:"gaurav",
  //   msg:"Aaj Mausam bada Beiman hai bada",
  //   created_at:new Date()
  // })
  // chat1.save().then((res)=>console.log(res)).catch((err)=>{
  //   console.log(err);
  // })


// Index Route 

// now when we fetch data from the database the data is fetched in asynchronous manner
//now while fetchon hthe data we will use await keyword.
  app.get("/chats",async(req,res)=>{
      let chats=await Chat.find();
      console.log(chats);
      res.render("index.ejs",{chats})
  })

//New Route

  app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
  })

// Create Route

  app.post("/chats",(req,res)=>{
    let {from,msg,to}=req.body;
    let newchat=new Chat({
      from:from,
      msg:msg,
      to:to,
      created_at:new Date()
    })
    // console.log(newchat);
    // res.send("working")
    newchat.save().then((res)=>console.log("Chat was saved")).catch((err)=>{
      console.log(err)
    })
    res.redirect("/chats")
  })

// Edit Route

  app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let newchat=await Chat.findById(id);
    // console.log(newchat);
    res.render("edit.ejs",{newchat})
  })

// Update Route 

  app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {msg:newmsg}=req.body;
    let updatedchat=await Chat.findByIdAndUpdate(id,{msg:newmsg},{runValidators:true, new : true})
    res.redirect("/chats")
  })

  app.delete("/chats/:id",(req,res)=>{
    let {id}=req.params;
    Chat.findByIdAndDelete(id).then("element deleted").catch((err)=>console.log(err))
    res.redirect("/chats")
  })

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/posts`)
});
