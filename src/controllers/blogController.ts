// controllers/blogController.ts
import { Request, Response } from "express";
import { Blog } from "../models/blogModal";
import { Comment } from "../models/commentModel";

// Create Blog
export const createBlog = async (req: Request, res: Response) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json({ success: true, message: "Blog created", blog });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating blog", error });
  }
};

// Get all blogs
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching blogs", error });
  }
};

// Get recent blogs
export const getRecentBlogs = async (req: Request, res: Response) => {
  try {
    const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json({ success: true, recentBlogs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching recent blogs", error });
  }
};

// Get popular blogs
export const getPopularBlogs = async (req: Request, res: Response) => {
  try {
    const popularBlogs = await Blog.find({ isPopular: true }).limit(5);
    res.status(200).json({ success: true, popularBlogs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching popular blogs", error });
  }
};

// Add comment
export const addComment = async (req: Request, res: Response) => {
  try {
    const { blogId, user, message } = req.body;
    const comment = new Comment({ blogId, user, message });
    await comment.save();
    res.status(201).json({ success: true, message: "Comment added", comment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding comment", error });
  }
};

// Get comments for a blog
export const getComments = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blogId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching comments", error });
  }
};
