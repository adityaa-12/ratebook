import mysql from "mysql2";

export default async function startDatabase() {    
  let StartConnection = mysql.createConnection({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASS}`,
    database: `${process.env.DB_NAME}`
  });

  StartConnection.connect(function(err) {
    if (err) {
        console.error("error connecting: " , err);
        return;
    };
    console.log("Connected to MySQL: ", StartConnection.threadId);
  });
};
