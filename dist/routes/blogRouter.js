"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/blogRouter.ts
const express_1 = require("express");
const blogController_1 = require("../controllers/blogController");
const blogRouter = (0, express_1.Router)();
// Blog routes
blogRouter.post("/", blogController_1.createBlog);
blogRouter.get("/", blogController_1.getBlogs);
blogRouter.get("/recent", blogController_1.getRecentBlogs);
blogRouter.get("/popular", blogController_1.getPopularBlogs);
// Comment routes
blogRouter.post("/comments", blogController_1.addComment);
blogRouter.get("/comments/:blogId", blogController_1.getComments);
exports.default = blogRouter;
//# sourceMappingURL=blogRouter.js.map