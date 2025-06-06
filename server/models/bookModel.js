import db from "../config/db.js";

export async function getAllBooks(page = 1, pageSize = 10) {
  let offset = (page - 1) * pageSize;

  page = parseInt(page);
  offset = parseInt(offset);

  const [rows] = await db.execute(`SELECT * FROM BOOKS LIMIT ${pageSize} OFFSET ${offset}`);

  return rows;
}

export async function getBookById(id) {
  const [rows] = await db.execute("SELECT * FROM BOOKS WHERE ID = ?", [id]);
  return rows[0];
}

export async function AddBook(book) {
  const { title, author, genre, published_date, description, cover_url } = book;

  const [result] = await db.execute(
    "INSERT INTO BOOKS (TITLE, AUTHOR, GENRE, PUBLISHED_DATE, DESCRIPTION, COVER_URL) VALUES (?,?,?,?,?,?)",
    [title, author, genre, published_date, description, cover_url]
  );
  

  return { id: result.insertId, ...book };
}

export async function getBooksCount() {
    const [rows] = await db.execute("SELECT COUNT(*) AS count FROM BOOKS");
    return rows[0].count;
}

export async function getBookWithName(search) {
  const [result] = await db.execute("SELECT * FROM BOOKS WHERE BOOKNAME LIKE ?", [`${search}`]);
  return result;
}