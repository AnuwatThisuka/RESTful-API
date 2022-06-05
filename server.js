let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mysql = require("mysql");
const res = require("express/lib/response");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// homepage route
app.get("/", (req, res) => {
   return res.send({ error: false, message: "Welcome to the homepage" });
});

//connection to mysql database
let dbCon = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "Nodejs_API",
});
dbCon.connect();

//retrieve all books
app.get("/books", (req, res) => {
   let sql = "SELECT * FROM books";
   dbCon.query(sql, (err, result, fieldes) => {
      if (err) throw err;
      let message = "";
      if (result == undefined || result.length == 0) {
         message = "No books found";
      } else {
         message = "Success";
      }
      return res.send({ error: false, data: result, message: message });
   });
});

//add a book
app.post("/books", (req, res) => {
   let book = req.body;
   let sql = "INSERT INTO books SET ?";
   dbCon.query(sql, book, (err, result, fieldes) => {
      if (err) throw err;
      let message = "";
      if (result == undefined || result.length == 0) {
         message = "No books found";
      } else {
         message = "Success";
      }
      return res.send({ error: false, data: result, message: "Book added" });
   });
});

//retrieve a book
app.get("/books/:id", (req, res) => {
   let sql = "SELECT * FROM books WHERE id = ?";
   dbCon.query(sql, req.params.id, (err, result, fieldes) => {
      if (err) throw err;
      let message = "";
      if (result == undefined || result.length == 0) {
         message = "No books found";
      } else {
         message = "Success";
      }
      return res.send({ error: false, data: result, message: message });
   });
});

//update a book
app.put("/books/:id", (req, res3) => {
   let book = req.body;
   let id = req.params.id;
   let sql = "UPDATE books SET ? WHERE id = ?";
   dbCon.query(sql, [book, id], (err, result, fieldes) => {
      if (err) throw err;
      let message = "";
      if (result == undefined || result.length == 0) {
         message = "No books found";
      } else {
         message = "Success";
      }
      return res.send({ error: false, data: result, message: "Book updated" });
   });
});

//delete a book
app.delete("/books/:id", (req, res) => {
   let sql = "DELETE FROM books WHERE id = ?";
   dbCon.query(sql, req.params.id, (err, result, fieldes) => {
      if (err) throw err;
      let message = "";
      if (result == undefined || result.length == 0) {
         message = "No books found";
      } else {
         message = "Success";
      }
      return res.send({ error: false, data: result, message: "Book deleted" });
   });
});

app.listen(3000, () => {
   console.log("Server is running on port 3000");
});

module.exports = app;
