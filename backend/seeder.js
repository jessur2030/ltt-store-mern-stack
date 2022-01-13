import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

//call dotenv config
dotenv.config();

//call connectDB : db connection function
connectDB();

//import data to DB async function :
const importData = async () => {
  try {
    //clear all collections in from mongo db
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    //import users
    //stores the created users array into : createdUsers
    const createdUsers = await User.insertMany(users);

    //get the admin user _id from the createdUsers array
    const adminUser = createdUsers[0]._id;

    //for the products, create a variable called sampleProducts
    //map() thought products file and add the admin user to each product object
    const sampleProducts = products.map((product) => {
      //for each product: return ...product: everything that is in product already, and
      //in addition to that, we want to add to the user field the admin user from adminUser
      //set admin user to each product
      return { ...product, user: adminUser };
    });

    //import products to db
    await Product.insertMany(sampleProducts);

    //console.log() if data was successfully imported
    console.log(`Data successfully imported!`);
    //exit from the process
    process.exit();
  } catch (error) {
    //if something goes wrong : log the error
    console.error(error);
    //products.exit(1): exit with failure if there is an error
    products.exit(1);
  }
};

//destroy data from DB async function
const destroyData = async () => {
  try {
    //clear or delete all collections from our mongo db
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    //console.log() if data was successfully imported
    console.log(`Data destroyed successfully !`);
    //exit from the process
    process.exit();
  } catch (error) {
    //if something goes wrong : log the error
    console.error(error);
    //products.exit(1): exit with failure if there is an error
    products.exit(1);
  }
};

//to run any of this function, we want to create a condition to run
//each function independently

if (process.argv[2] === "-d") {
  //node backend/seeder -d
  destroyData();
} else {
  //node backend/seeder
  importData();
}
