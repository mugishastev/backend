import { Router } from "express";
import orderRouter from "./orderRoutes";
import cartRouter from "./cartRoutes";
import userRouter from "./userPath";
import productRouter from "./productRoutes";
import statRouter from "./statsRoute";
import contactRouter from "./contactRouter";


const mainRouter = Router();

// mainRouter.use('/products', productsRouter);
mainRouter.use("/users",userRouter);
mainRouter.use("/orders", orderRouter);
mainRouter.use('/cart', cartRouter);
mainRouter.use('/products', productRouter);
mainRouter.use("/stats", statRouter); // Importing statsRoute
mainRouter.use("/send-email", contactRouter)

export default mainRouter;

