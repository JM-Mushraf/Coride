import app from "./app.js";
import connection from "./database/connection.js";
import cloudinary from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()
cloudinary.config({
    cloud_name:"dhm572c5k",
    api_key:"349833753615723",
    api_secret:"pwQAQzFzZurdZzjpXZQxtlhGw7c"
})
app.listen(3000,()=>{
    console.log("SERVER RUNNING");
})