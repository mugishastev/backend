import { Request, Response } from "express";
import { Product } from "../models/Product";
import cloudinary from "../utils/cloudhandles";

export const createProduct = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { prodName, prodDesc, prodPrice, prodQty } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });
    const imageUrl = result.secure_url;

    // Create product
    const newProduct = new Product({
      prodName,
      prodDesc,
      prodPrice,
      prodQty,
      image: imageUrl,
      createdBy: req.user._id, // track which admin created it
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: savedProduct });
  } catch (error) {
    console.error("Create Product error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "Products fetched successfully", products });
  } catch (error) {
    console.error("Get All Products error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};


// / Get Single Product
export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.status(200).json({ 
      message: "Product fetched successfully", 
      product 
    });
  } catch (error) {
    console.error("Get Product error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update Product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { prodName, prodDesc, prodPrice, prodQty } = req.body;

    // Find existing product
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    let imageUrl = existingProduct.image;

    // Upload new image if provided
    if (req.file) {
      try {
        // Delete old image from Cloudinary if it exists
        if (existingProduct.image) {
          const publicId = existingProduct.image.split('/').pop()?.split('.')[0];
          if (publicId) {
            await cloudinary.uploader.destroy(`products/${publicId}`);
          }
        }

        // Upload new image
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "products",
          resource_type: "auto"
        });
        imageUrl = result.secure_url;
        
        // Delete the temporary file
        // fs.unlinkSync(req.file.path);
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ message: "Image upload failed" });
      }
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        prodName: prodName || existingProduct.prodName,
        prodDesc: prodDesc !== undefined ? prodDesc : existingProduct.prodDesc,
        prodPrice: prodPrice ? parseFloat(prodPrice) : existingProduct.prodPrice,
        prodQty: prodQty ? parseInt(prodQty) : existingProduct.prodQty,
        image: imageUrl,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ 
      message: "Product updated successfully", 
      product: updatedProduct 
    });
  } catch (error) {
    console.error("Update Product error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find the product to get image URL
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete image from Cloudinary if it exists
    if (product.image) {
      try {
        const publicId = product.image.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`products/${publicId}`);
        }
      } catch (deleteError) {
        console.error("Cloudinary delete error:", deleteError);
        // Continue with product deletion even if image deletion fails
      }
    }

    // Delete product from database
    await Product.findByIdAndDelete(id);

    res.status(200).json({ 
      message: "Product deleted successfully" 
    });
  } catch (error) {
    console.error("Delete Product error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// Search Products
export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const products = await Product.find({
      $or: [
        { prodName: { $regex: query, $options: 'i' } },
        { prodDesc: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json({ 
      message: "Products searched successfully", 
      products 
    });
  } catch (error) {
    console.error("Search Products error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};