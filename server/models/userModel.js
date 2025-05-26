import db from "../config/db.js";

export async function addNewUser(newUser) {
  const { username, email, password } = newUser;
  const [result] = await db.execute('INSERT INTO USERS (USERNAME, EMAIL, PASSWORD) VALUES (?, ?, ?)', [username, email, password]);

  return result.affectedRows > 0;
}

export async function isExistUser(email) {
    const [rows] = await db.execute("SELECT 1 FROM USERS WHERE EMAIL = ?", [email]);    
    return rows.length > 0;
}

export async function isLoginMail(email) {
  const [rows] = await db.execute("SELECT * FROM USERS WHERE EMAIL = ?", [email]);
  return rows;
}

export async function isChangePassword(email, newPassword) {
    const [result] = await db.execute("UPDATE USERS SET PASSWORD = ? WHERE EMAIL = ?", [newPassword, email]);
    return result.affectedRows > 0;
}

export async function UpdateUser(id, username, email) {
    const [result] = await db.execute("UPDATE USERS SET USERNAME = ? SET EMAIL = ? WHERE ID = ?", [username, email, id]);
    return result.affectedRows > 0;
}
