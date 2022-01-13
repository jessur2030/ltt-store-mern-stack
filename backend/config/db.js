import mongoose from "mongoose";

//database connection async function
const connectDB = async () => {
  try {
    //const connection
    //takes mongoDB URI,
    //then takes a second argument: a set of options {}
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`mongoDB Connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    //exit (1): exit with failure
    process.exit(1);
  }
};

//export function
export default connectDB;
