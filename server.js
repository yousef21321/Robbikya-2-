


import express from 'express'
import { bootstap } from './src/modules/index.routes.js'
import { dbConnection } from './databases/dbconnection.js'
import dotenv from "dotenv"
import { globalError } from './src/middleware/gobalErrorMiddleware.js'
//import { CreateonlineOrder } from './src/modules/order/order.controller.js'




const app = express()
const port = 3000
app.use(express.json())
dotenv.config()
app.use('/uploads',express.static('uploads'))
dbConnection()
//app.post('/webhooks', express.raw({type: 'application/json'}), CreateonlineOrder )


app.use(globalError)
bootstap(app)
app.use("*", (req, res, next) => {
    next(new appError(`not found endPoint : ${req.originalUrl}`, 404));
  });
  
  process.on("unhandledRejection", (err) => {
    console.log("error", err);
  });
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );