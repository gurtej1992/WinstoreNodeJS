const Product = require("../models/prodModel");


exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = {
      category: req.query.category,
      name: req.query.name,
      price: req.query.price,
      description: req.query.description,
      productImage: req.query.productImage,
      quantity: req.query.quantity,
    };
    //const newProduct = await createProductObj(req);
    const product = await Product.create(newProduct);
    return res.status(200).send({ message: "Product created successfully!", product });
  } catch (error) {
    if (error.code === 11000) return res.status(200).send({ message: "product already exist" });
    return res.status(400).send({ message: "unable to create product", error });
  }
};
// Delete Category
exports.deleteProduct = async (req, res) => {
  try {
    const deletedUser = await Product.findByIdAndDelete(req.params.id); // the `await` is very important here!

    if (!deletedUser) {
      return res.status(400).send({ message: "Could not delete Product" });
    }
    return res.status(200).send({ message: "Product deleted successfully", user: deletedUser });
  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to delete Product" });
  }
};
// exports.updateProduct = async (req, res, next) => {
//   const filter = { _id: req.query.id };
//   await Product.findByIdAndUpdate(filter, update);
// }
// Update user
exports.updateProduct = async (req, res) => {
  try {
    const updatedUser = await Product.findByIdAndUpdate(req.params.id, { $set: req.query }, { new: true });

    if (!updatedUser) {
      return res.status(400).send({ message: "Could not update user" });
    }
    return res.status(200).send({ message: "User updated successfully", updatedUser });

  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to update user" });
  }
};

exports.getProducts = (req, res, next) => {
  Product.find({},(err, products) => {
  // Product.find({}, {}, query)
  //   .select("-_id -__v -updatedAt")
  //   .populate("category", "-_id name")
  //   .exec((err, products) => {
      if (err) return res.status(400).send({ message: "showing order", err });
      return res.status(200).send({ message: "showing all orders in the cart", products });
    });
};

const createProductObj = async (req) => {
  return {
    category: req.query.categoryId,
    name: req.query.name,
    price: req.query.price,
    description: req.query.description,
    productImage: req.file.filename,
    quantity: req.query.quantity,
  };
}
