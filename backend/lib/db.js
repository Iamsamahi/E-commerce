import mongoose from "mongoose";

export const connectDB = async() => {
    try {
      const hostname = await mongoose.connect(process.env.MONGOOSE_URI);
      console.log(`Connected to database successfully at "  ${hostname.connection.host}`);
    } 
    catch (error) {
        console.log("Error in connecting to database" , error.message);
        process.exit(1);
    }
}