import bcrypt from "bcryptjs";

//users array of user objects
const users = [
  {
    name: "Admin user",
    email: "admin@gmail.com",

    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },

  {
    name: "Jesus",
    email: "jesus@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Ana",
    email: "ana@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
