import books from "../models/bookModel.js";

export const bookCreate = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({
        message: "Data Required!",
      });
      return;
    }
    await books.create(req.body);
    res.status(201).json({
      message: "Book Added Successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
