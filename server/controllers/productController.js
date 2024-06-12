import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/product.model.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
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
    Image: "/images/sample.jpg",
    brand: "sample brand",
    category: "Sample category",
    numReviews: 0,
    description: "sample description",
    countInStock: 1,
    numReviews: 0,
    rating: 0,
  });
  const createdProduct = await product.save();
  console.log(createdProduct, "product");
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, category, description, image, brand, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    // product.Image = image;
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

export { createProduct, getProductById, getProducts, updateProduct };
