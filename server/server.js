import path from 'path';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/mongo.js";
import { errorHandle, notFound } from "./middleware/errorMiddleware.js";
import orderRoutes from "./routes/OrderRoutes.js";
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

const port = process.env.PORT || 8000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/upload', uploadRoutes);


const __dirname = path.resolve();
app.use('/uploads',express.static(path.join(__dirname, '/uploads')));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'));
  })
}else{
  app.get('/', (req, res) => {
    res.send('API is running ...')
  })
}

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.CLIENT_ID });
});

app.use(notFound);
app.use(errorHandle);
app.listen(port, () => console.log(`Server running on port ${port}`));
