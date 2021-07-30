const Category = require("../models/cateModel");

exports.createCategory = async (req, res, next) => {
  console.log('inside')
  const dbCategory = await Category.findOne({ name: req.query.name });
  if (dbCategory) return res.status(400).send("category already exist");

  const newCategory = new Category({ name: req.query.name });

  newCategory.save((error, savedCategory) => {
    if (error) return res.status(400).send("an error occurred", error);
    return res.status(200).send({ message: "category was created", category: savedCategory });
  });
};

exports.getCategories = (req, res, next) => {
  Category.find({}, "name createdAt _id",(error, categories) => {
    if (error) return res.status(400).send("an error occurred", error);
    return res.status(200).send({ message: "showing category list", count: categories.length, categories, });
  });
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const deletedUser = await Category.findByIdAndDelete(req.params.catId); // the `await` is very important here!

    if (!deletedUser) {
      return res.status(400).send({ message: "Could not delete category" });
    }
    return res.status(200).send({ message: "Category deleted successfully", user: deletedUser });
  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to delete category" });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  try { //encrypt the password before updating
    const updatedUser = await Category.findByIdAndUpdate(req.params.id, { $set: req.query }, { new: true });

    if (!updatedUser) {
      return res.status(400).send({ message: "Could not update Category" });
    }
    return res.status(200).send({ message: "Category updated successfully", updatedUser });

  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to update Category" });
  }
};

