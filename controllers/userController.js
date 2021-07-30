const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//const { registerValidation, loginValidation } = require("../middleware/validation");
const JWT_KEY = process.env.JWT_KEY;


// signup
exports.signUp = async (req, res, next) => {
  // const { error, value } = registerValidation(req.query);
  // if (error) return res.status(400).send(error.details[0].message);
  const emailExist = await User.findOne({ email: req.query.email }); //returns the first document that matches the query criteria or null
  if (emailExist) return res.status(400).send({ message: "Email already exist!" });

  try {
    const newUser = await createUserObj(req);
    const savedUser = await User.create(newUser);
    return res.status(200).send({ message: "User created successfully!", userId: savedUser._id });
  } catch (err) {
    return res.status(400).send({ error: "User created successfully!", error: err });
  }
};

// login
exports.logIn = async (req, res) => {
  // const { error } = loginValidation(req.query);
  // if (error) return res.status(400).send(error.details[0].message);

  const foundUser = await User.findOne({ email: req.query.email }); //returns the first document that matches the query criteria or null
  if (!foundUser) return res.status(400).send({ message: "invalid login credential" });
  console.log(foundUser)
  try {
    const isMatch = bcrypt.compareSync(req.query.password, foundUser.password);
    if (!isMatch) return res.status(400).send({ message: "invalid login credential" });
    // create and assign jwt
    // const token = jwt.sign({ _id: foundUser._id }, JWT_KEY);
    // console.log(token)
   // return res.status(200).header("auth-token", token).send({ "auth-token": token, userId: foundUser._id });
   return res.status(200).send({ userId: foundUser._id });
  } catch (error) {
    return res.status(400).send(error);
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    req.query.password = bcrypt.hashSync(req.query.password, 10); //encrypt the password before updating
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, { $set: req.query }, { new: true });

    if (!updatedUser) {
      return res.status(400).send({ message: "Could not update user" });
    }
    return res.status(200).send({ message: "User updated successfully", updatedUser });

  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to update user" });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId); // the `await` is very important here!

    if (!deletedUser) {
      return res.status(400).send({ message: "Could not delete user" });
    }
    return res.status(200).send({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to delete user" });
  }
};

exports.data = async (req, res) => {
  return res.json({
    posts: {
      title: "User Authentication",
      description: "random data you can access because you\'re authenticated",
    },
  });
};

exports.getUsers = (req, res, next) => {
  User.find({},(err, users) => {
      if (err) return res.status(400).send({ message: "Error while fetching users", err });
      return res.status(200).send({ message: "showing all users", users });
    });
};

const createUserObj = async (req) => {
  return {
    name: req.query.name,
    email: req.query.email,
    password: bcrypt.hashSync(req.query.password, 10),
    country: req.query.country,
    city: req.query.city,
    state: req.query.state,
    address: req.query.address,
    phone: req.query.phone,
    zip: req.query.zip,
  };
}