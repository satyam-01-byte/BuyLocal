import bcrypt from "bcryptjs";

const users = [
  {
    name: "admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("nimda", 10),
    isAdmin: true,
  },
  {
    name: "John",
    email: "john@gmail.com",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    name: "Jane",
    email: "jane@gmail.com",
    password: bcrypt.hashSync("abcde", 10),
  },
];

export default users;
