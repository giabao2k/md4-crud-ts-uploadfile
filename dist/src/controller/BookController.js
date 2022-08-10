"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = require("../model/book");
class BookController {
    constructor() {
        this.showListBook = async (req, res) => {
            let books = await book_1.Book.find();
            res.render('book/list', {
                books: books
            });
        };
        this.showCreateForm = (req, res) => {
            res.render('book/create');
        };
        this.createBook = async (req, res) => {
            let files = req.files;
            if (files) {
                if (files.image) {
                    let book = req.body;
                    let image = files.image;
                    console.log(image);
                    image.mv('./public/upload/' + image.name);
                    book.image = 'upload/' + image.name;
                    let newBook = new book_1.Book(book);
                    await newBook.save();
                    res.redirect(301, '/book/list');
                }
            }
            else {
                res.render('error');
            }
        };
        this.showUpdateForm = async (req, res) => {
            let id = req.params.id;
            let book = await book_1.Book.findById(id);
            if (book) {
                res.render('book/update', {
                    book: book
                });
            }
            else {
                res.render('error');
            }
        };
        this.updateBook = async (req, res) => {
            let id = req.params.id;
            let book = book_1.Book.findById(id);
            if (book) {
                let files = req.files;
                console.log(files);
                if (files) {
                    let newBook = req.body;
                    if (files.image) {
                        let image = files.image;
                        image.mv('./public/upload/' + image.name);
                        newBook.image = 'upload/' + image.name;
                    }
                    await book_1.Book.findOneAndUpdate({
                        _id: id
                    }, newBook);
                    res.redirect(301, '/book/list');
                }
            }
            else {
                res.render('error');
            }
        };
        this.deleteBook = async (req, res) => {
            let id = req.params.id;
            let book = await book_1.Book.findById(id);
            if (book) {
                await book_1.Book.deleteOne({
                    _id: id
                });
                res.redirect('/book/list');
                console.log('delete succsess!');
            }
            else {
                res.render('error');
            }
        };
    }
}
exports.default = new BookController();
//# sourceMappingURL=BookController.js.map