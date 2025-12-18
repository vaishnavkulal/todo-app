import mongoose from "mongoose";

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Succesfully connected to Database \n")
    }
    catch(err){
        console.log(err.message)
    }
}
export default connectDB;