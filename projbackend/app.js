require('dotenv').config()

const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const authRoutes = require("./routes/auth")




//DB connection
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

// Middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//My Ports
app.use("/api", authRoutes);





//PORT
const port = process.env.PORT || 8000;



//Starting a Server
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})