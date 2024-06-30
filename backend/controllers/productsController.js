import Product from "../models/product.js";
import User from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";

export const createProduct = async (req, res) => {
  try {
    const { itemName, grade, brand, location, price, dimension } = req.body;
    let { itemImg } = req.body;
    const userId = req.user._id.toString();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!itemName || !brand || !location || !price || !dimension || !grade) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    if (itemImg) {
      const result = await cloudinary.uploader.upload(itemImg);
      itemImg = result.secure_url;
    }

    const newProduct = new Product({
      owner: userId,
      itemName,
      itemImg,
      grade,
      brand,
      dimension,
      location,
      price,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log("Error in createProduct:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id.toString();
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.owner.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this product" });
    }
    if (product.itemImg) {
      const imgId = product.itemImg.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product Deleted!" });
  } catch (error) {
    console.log("Error in deleteProduct:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { itemName, grade, brand, location, price, dimension } = req.body;
    let { itemImg } = req.body;

    const { id } = req.params;
    const userId = req.user._id.toString();
    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.owner.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to edit this product" });
    }

    if (itemImg) {
      if (product.itemImg) {
        const imgId = product.itemImg.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(imgId);
      }
      const UploadRes = await cloudinary.upload(itemImg);
      itemImg = UploadRes.secure_url;
    }

    product.itemName = itemName || product.itemName;
    product.grade = grade || product.grade;
    product.brand = brand || product.brand;
    product.location = location || product.location;
    product.price = price || product.price;
    product.dimension = dimension || product.dimension;

    product = await product.save();

    return res.status(200).json(product);
  } catch (error) {
    console.log("Error in updateProduct", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).populate({
      path: "owner",
      select: "-password -role",
    });

    if (products.length === 0) {
      return res.status(404).json([]);
    }

    res.status(200).json(products);
  } catch (error) {
    console.log("Error in getProducts", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
