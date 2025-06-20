import Book from "./book.model.js";

 const postABook = async (req, res) =>{
    try {
      const newBook = await Book({...req.body})
      await newBook.save()
      res.status(200).send({message: "Book posted successfully", Book: newBook})
    } catch (error) {
      console.log("Error creating book", error);
      res.status(500).send({message: "Failed to create a book", error})
    }
    
 }

 const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1})
        res.status(200).send(books)
    } catch (error) {
        console.error("Error fetching books", error);
        res.status(500).send({message: "Failed to fetch books"})       
    }
 }
 
 const getOneBook = async (req, res) => {
    try {
        const {id} = req.params 
        const book = await Book.findById(id)
        if (!book) {
            res.status(404).send({message: "Book not found!" })
        }
        res.status(200).send(book)
    } catch (error) {
        console.error("Error fetching book", error);
        res.status(500).send({message: "Failed to fetch book"})       
    }
 }

 const updateBook = async (req, res) => {
     try {
        const {id} = req.params
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true})
        if(!updatedBook) {
            res.status(404).send({message: "Book is not found"})
        }
        res.status(200).send({
            message: "Book Updated succesfully",
            book: updatedBook
        })
     } catch (error) {
        console.error("Error updating book", error);
        res.status(500).send({message: "Failed to updatebook"})       
     }
 }

 const deleteABook = async (req, res) => {
    try {
        const {id} = req.params
        const deletedBook = await Book.findByIdAndDelete(id) 
        if(!deletedBook) {
            res.status(404).send({message: "Book is not found"})
        }
        res.status(200).send({
            message: "Book deleted succesfully",
            book: deletedBook
        })
    } catch (error) {
        console.error("Error deleting book", error);
        res.status(500).send({message: "Failed to delete book"}) 
    }
 }

 export { postABook, getAllBooks, getOneBook, updateBook, deleteABook };

