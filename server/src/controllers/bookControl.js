import books from "../models/bookModel.js";

// Adding a new Book

export const bookCreate = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        message: "Data Required!",
      });
      return;
    }
    await books.create(req.body);
    return res.status(201).json({
      message: "Book Added Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Getting all Books

export const fetchBooks = async (req, res) => {
  try {
    const getBooks = await books.find();
    return res.status(200).json({
      message: "Success",
      data: getBooks,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Searching Books by Query

export const searchBook = async (req, res) => {
  try {
    const query = String(req.query.q);

    if (!query) {
      return res.status(400).json({
        message: "Search query required!",
      });
    }

    const findBook = await books.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        {
          author: { $regex: query, $options: "i" },
        },
      ],
    });

    if (findBook == 0) {
      return res.status(404).json({
        message: "Not Found!",
      });
    } else {
      return res.status(200).json({
        message: "Success",
        data: findBook,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Update a Book by ID

export const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedBook = req.body;

    const updateBook = await books.findOneAndUpdate(
      { id: bookId },
      updatedBook,
      { new: true }
    );

    if (!updateBook) {
      return res.status(404).json({
        message: "Not Found",
      });
    }
    
    return res.status(200).json({
      message: "Book Updated Successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
