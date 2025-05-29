import {
  AddBook,
  getAllBooks,
  getBookById,
  getBooksCount,
} from "../models/bookModel.js";

export async function fetchAllBooks(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const books = await getAllBooks(page, pageSize);
    const total = await getBooksCount();

    res.json({
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      totalCount: total,
      data: books,
    });
  } catch (error) {
    next(error);
  }
}

export async function FetchSingleBook(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const data = await getBookById(id);

    if (!data) {
      return res.json({
        message: "Book not found!",
      });
    }

    return res.json({
      message: "Book Found!",
      bookData: data,
    });
  } catch (error) {
    next(error);
  }
}

export async function AddNewBook(req, res, next) {
  try {
    const { title, author, description, published_date, cover_url, genre } =
      req.body;

    if (
      !title &&
      !author &&
      !description &&
      !published_date &&
      !cover_url &&
      !genre
    ) {
      return res.json({
        message: "Invalid Data | Please fill all the required fields!",
      });
    }

    let newBook = {
      title: title,
      author: author,
      genre: genre,
      published_date: published_date,
      description: description,
      cover_url: cover_url,
    };

    const setBook = await AddBook(newBook);

    if (!setBook) {
      return res.status(400).json({
        message: "Failed to add book to database!",
      });
    }

    return res.status(200).json({
      message: "New book has been added!",
    });
  } catch (error) {
    next(error);
  }
}


export async function getTotalCount(req, res, next) {
  try {
    const data = await getBooksCount();  
    if (!data) {
      return res.json({
        message: "Failed to get Data!",
      });
    }
    return res.json({
      totalCount: data,
      message: "Data Found!",
    });
  } catch (error) {
    next(error);
  }
}