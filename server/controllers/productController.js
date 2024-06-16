import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/product.model.js";

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  // console.log(req.query.pageNumber, "pageNumber");
  const page = Number(req.query.pageNumber) || 1;
  // console.log(page);
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i", //specifies case insensitivity for regex
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword }); //returns no of documents in db
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error("Resource not found");
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "Sample category",
    numReviews: 0,
    description: "sample description",
    countInStock: 1,
    numReviews: 0,
    rating: 0,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, category, description, image, brand, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  // console.log("CHecking bug", rating, comment);
  const product = await Product.findById(req.params.id);
  console.log(product);
  if (product) {
    // console.log(product.reviews, "reviews");
    const alreadyReviewed = product.reviews.find(
      (r) => r?.user?.toString() === req.user._id.toString()
    );
    // console.log(req.user._id, req.user.name);

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
      user: req.user._id,
    };

    // console.log(review, "review");
    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    // console.log(product.rating, "rating");
    // console.log(product.reviews, "rating");
    await product.save();
    // console.log("done saving");
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5);
  // console.log(products);
  res.json(products);
});

export {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
};
