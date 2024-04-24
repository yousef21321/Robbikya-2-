import { globalError } from "../middleware/gobalErrorMiddleware.js"
import userRouter from "./User/user.routes.js"
import biddeeRouter from "./bidders/bidders.routes.js"
import categoryRouter from "./category/category.routes.js"
import favoritepageRouter from "./favoritepage/favoritepage.routes.js"
import productRouter from "./product/product.routes.js"
import subcategoryRouter from "./subcategory/subcategory.routes.js"
import technicalRouter from "./technical/technical.routes.js"




export const bootstap = (app)=>{
    app.use('/api/v1/categories',categoryRouter)
    app.use('/api/v1/subcategories',subcategoryRouter)
    app.use('/api/v1/products',productRouter)
    app.use("/api/v1/users",userRouter);
    app.use("/api/v1/technical",technicalRouter);
    app.use("/api/v1/bidders",biddeeRouter);
    app.use("/api/v1/favoritepage",favoritepageRouter);




    
app.use(globalError)
}
