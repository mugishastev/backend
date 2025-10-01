"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController_1 = require("../controllers/contactController");
const contactRouter = (0, express_1.Router)();
// Route to create a new contact message
contactRouter.post("/create-contact", contactController_1.createContact);
// You can add more routes later, e.g., get all messages, delete, etc.
exports.default = contactRouter;
//# sourceMappingURL=contactRouter.js.map