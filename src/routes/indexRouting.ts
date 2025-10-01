import { Router } from "express";
import orderRouter from "./orderRoutes";
import cartRouter from "./cartRoutes";
import userRouter from "./userPath";
import productRouter from "./productRoutes";
import statRouter from "./statsRoute";
import contactRouter from "./contactRouter";
import blogRouter from "./blogRouter";
import categoryRouter from "./categoryRoutes";
import paymentRouter from "./paymentRoutes";


const mainRouter = Router();

// mainRouter.use('/products', productsRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/orders", orderRouter);
mainRouter.use("/cart", cartRouter);
mainRouter.use("/products", productRouter);
mainRouter.use("/categories", categoryRouter);
mainRouter.use("/payments", paymentRouter);
mainRouter.use("/stats", statRouter); // Importing statsRoute
mainRouter.use("/send-email", contactRouter);
mainRouter.use("/blogs", blogRouter);

export default mainRouter;
