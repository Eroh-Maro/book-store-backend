import express from "express"

import { postABook, getAllBooks, getOneBook, updateBook, deleteABook } from "./book.controller.js";
import verifyAdminToken from "../middleware/verifyAdminToken.js";

const router = express.Router();


router.post("/create-book", verifyAdminToken, postABook)

router.get("/", getAllBooks)

router.get("/:id", getOneBook)

router.put("/edit/:id", updateBook )

router.delete("/delete/:id", deleteABook )

export default router