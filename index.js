import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoutes from "./src/books/book.route.js";
import cors from "cors";
import orderRoutes from "./src/orders/order.route.js";
import userRoutes from "./src/users/user.route.js";
import adminRoutes from "./src/stats/admin.stats.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://book-store-frontend-hgdn.vercel.app/",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

// Register the root route outside of main
async function main() {
    await mongoose.connect(process.env.DB_URL)
    app.use('/', (req, res) => {
        res.send('hello world')
       })
} 
main()
  .then(() => console.log("MongoDB connected succesfully!"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});