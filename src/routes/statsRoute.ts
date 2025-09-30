// routes/statsRoute.ts
import { Router } from "express";
import { getStats } from "../controllers/statsController";

const statRouter = Router();
statRouter.get("/new-customers", getStats);

export default statRouter;
