const { userModel, productModel } = require("../models");

function newProduct(
  name,
  description,
  quantity,
  date,
  price,
  category,
  imageURL,
  owner
) {
  return productModel
    .create({
      name,
      description,
      quantity,
      date,
      price,
      category,
      imageURL,
      owner,
    })
    .then((product) => {
      return Promise.all([
        userModel.updateOne(
          { _id: owner },
          { $push: { products: product._id } }
        ),
      ]);
    });
}

function getLatestsProducts(req, res, next) {
  const limit = Number(req.query.limit) || 6;

  productModel
    .find()
    .sort({ created_at: -1 })
    .limit(limit)
    .populate("buyers reviews owner")
    .then((products) => {
      res.status(200).json(products);
    })
    .catch(next);
}

function createProduct(req, res, next) {
  const { _id: owner } = req.user;
  const { name, description, quantity, date, price, category, imageURL } =
    req.body;

  newPost(name, description, quantity, date, price, category, imageURL, owner)
    .then(([_, updatedTheme]) => console.log("Created product."))
    .catch(next);
}

function editProduct(req, res, next) {
  const { productId } = req.params;
  const { name, description, quantity, date, price, category, imageURL } =
    req.body;
  const { _id: owner } = req.user;

  // if the userId is not the same as this one of the post, the post will not be updated
  productModel
    .findOneAndUpdate(
      { _id: productId, owner },
      { name, description, quantity, date, price, category, imageURL },
      { new: true }
    )
    .then((updatedProduct) => {
      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(401).json({ message: `Not allowed!` });
      }
    })
    .catch(next);
}

function deleteProduct(req, res, next) {
  const { productId } = req.params;
  const { _id: owner } = req.user;

  Promise.all([
    postModel.findOneAndDelete({ _id: productId, owner }),
    userModel.findOneAndUpdate(
      { _id: owner },
      { $pull: { products: productId } }
    ),
  ])
    .then(([deletedOne, _, __]) => {
      if (deletedOne) {
        res.status(200).json(deletedOne);
      } else {
        res.status(401).json({ message: `Not allowed!` });
      }
    })
    .catch(next);
}

module.exports = {
  getLatestsProducts,
  newProduct,
  createProduct,
  editProduct,
  deleteProduct,
};
