"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/statsRoute.ts
const express_1 = require("express");
const statsController_1 = require("../controllers/statsController");
const statRouter = (0, express_1.Router)();
statRouter.get("/new-customers", statsController_1.getStats);
exports.default = statRouter;
//# sourceMappingURL=statsRoute.js.map