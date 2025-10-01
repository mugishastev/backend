"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.addComment = exports.getPopularBlogs = exports.getRecentBlogs = exports.getBlogs = exports.createBlog = void 0;
const blogModal_1 = require("../models/blogModal");
const commentModel_1 = require("../models/commentModel");
// Create Blog
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = new blogModal_1.Blog(req.body);
        yield blog.save();
        res.status(201).json({ success: true, message: "Blog created", blog });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error creating blog", error });
    }
});
exports.createBlog = createBlog;
// Get all blogs
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blogModal_1.Blog.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, blogs });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error fetching blogs", error });
    }
});
exports.getBlogs = getBlogs;
// Get recent blogs
const getRecentBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recentBlogs = yield blogModal_1.Blog.find().sort({ createdAt: -1 }).limit(5);
        res.status(200).json({ success: true, recentBlogs });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error fetching recent blogs", error });
    }
});
exports.getRecentBlogs = getRecentBlogs;
// Get popular blogs
const getPopularBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const popularBlogs = yield blogModal_1.Blog.find({ isPopular: true }).limit(5);
        res.status(200).json({ success: true, popularBlogs });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error fetching popular blogs", error });
    }
});
exports.getPopularBlogs = getPopularBlogs;
// Add comment
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogId, user, message } = req.body;
        const comment = new commentModel_1.Comment({ blogId, user, message });
        yield comment.save();
        res.status(201).json({ success: true, message: "Comment added", comment });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error adding comment", error });
    }
});
exports.addComment = addComment;
// Get comments for a blog
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogId } = req.params;
        const comments = yield commentModel_1.Comment.find({ blogId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, comments });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error fetching comments", error });
    }
});
exports.getComments = getComments;
//# sourceMappingURL=blogController.js.map