/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const Book = require("../models");
module.exports = function (app) {

  app.route('/api/books')
    .get(async (req, res) => {
      try {
        const books = await Book.find();
        if (!books) {
          return res.json([]);
        }
        const formatData = books.map((book) => {
          return {
            _id: book._id,
            title: book.title,
            comments: book.comments,
            commentcount: book.comments.length
          };
        });
        return res.json(formatData);
      } catch (error) {
        res.send("error fetching books");
      }
    })

    .post(async (req, res) => {
      const title = req.body.title;
      if (!title) {
        return res.send("missing required field title");
      }
      const newBook = new Book({ title, comments: [] });
      try {
        const book = await newBook.save();
        res.json({ _id: book._id, title: book.title });
      } catch (err) {
        res.send("error in saving book");
      }
    })

    .delete(async (req, res) => {
      try {
        const deleted = await Book.deleteMany();
        res.send("complete delete successful");
      } catch (error) {
        res.send("deleting error");
      }
    });



  app.route('/api/books/:id')
    .get(async (req, res) => {
      let bookid = req.params.id;
      try {
        const book = await Book.findById(bookid);
        if (!book) {
          return res.send("no book exists");
        }
        res.json({
          _id: book._id,
          title: book.title,
          comments: book.comments,
          commentcount: book.comments.length
        });
      } catch (error) {
        res.send("no book exists");
      }
    })

    .post(async (req, res) => {
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) {
        return res.send("missing required field comment");
      }
      try {
        let book = await Book.findById(bookid);
        if (!book) {
          return res.send("no book exists");
        }
        book.comments.push(comment);
        book = await book.save();
        res.json({
          _id: book.id,
          title: book.title,
          comments: book.comments,
          commentcount: book.comments.length
        });
      } catch (error) {
        res.send("no book exists");
      }
    })

    .delete(async (req, res) => {
      let bookid = req.params.id;
      try {
        const deleted = await Book.findByIdAndDelete(bookid);
        return res.send("delete successful");
      } catch (error) {
        res.send("deleting error");
      }
    });

};
