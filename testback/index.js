const express = require("express")

const app = express();

const PORT = 8000;

app.get("/",(req,res)=>{
    return res.send("Hello There")
})

app.listen(PORT,()=>{
    console.log(`Server is Running on http://localhost:8000`);
})
   
