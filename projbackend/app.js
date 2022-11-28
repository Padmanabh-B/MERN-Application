require('dotenv').config()

const mongoose = require('mongoose');
const express = require("express")
const app = express();



mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(()=>{
    console.log("DB CONNEDTED")
}).catch((error)=>{
    console.log(error);
    console.log("CONNECTION FAILED");
    process.exit(1);
})




const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})