// routes/blogRouter.ts
import { Router } from "express";
import {
  createBlog,
  getBlogs,
  getRecentBlogs,
  getPopularBlogs,
  addComment,
  getComments,
} from "../controllers/blogController";

const blogRouter = Router();

// Blog routes
blogRouter.post("/", createBlog);
blogRouter.get("/", getBlogs);
blogRouter.get("/recent", getRecentBlogs);
blogRouter.get("/popular", getPopularBlogs);

// Comment routes
blogRouter.post("/comments", addComment);
blogRouter.get("/comments/:blogId", getComments);

export default blogRouter;
