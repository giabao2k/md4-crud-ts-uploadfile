import { Request, Response } from "express";
import { Book } from "../model/book";
import { UploadedFile } from 'express-fileupload';

class BookController{
    showListBook = async (req: Request, res:Response) => {
        let books = await Book.find();
        
        // console.log(books);
        
        res.render('book/list',{
            books: books  
        })
        // res.render trước , là link dẩn file sau , là 1 đối tượng
    }
    showCreateForm = (req: Request, res: Response)=>{
        res.render('book/create')
    }
    createBook = async (req : Request, res: Response) =>{    
        let files = req.files;
        // console.log(files);
        if(files){
            if(files.image){
                let book = req.body;
                
                let image = files.image as UploadedFile;
                console.log(image);
                
                image.mv('./public/upload/' + image.name);//.mv la di chuyen file anh vao thu muc upload trong public
                book.image ='upload/'+ image.name;//note lưu vào db kèm đường dẩn 
                let newBook = new Book(book);
                await newBook.save();
                res.redirect(301, '/book/list');
            }
        } else{
            res.render('error');
        }   
    }

    showUpdateForm = async (req: Request, res: Response) => {
        let id = req.params.id; // req người dùng bấm vào phải bắt đc id xem id đó có tồn tại hay không
        let book = await Book.findById(id); // lấy ra 1 đối tượng book theo id
        if(book){
            res.render('book/update',{
                book: book
            })
        } else{
            res.render('error');
        }
    }

    updateBook = async (req: Request,res: Response)=>{
        let id = req.params.id;
        let book = Book.findById(id);
        if(book){
            let files = req.files;
            console.log(files);
            
            if (files){
                let newBook = req.body;
                if(files.image){
                    let image = files.image as UploadedFile;
                    image.mv('./public/upload/'+ image.name);
                    newBook.image = 'upload/' + image.name; // lưu ảnh vào db kèm đường dẩn upload/
                }
                await Book.findOneAndUpdate({
                    _id:id
                }, newBook);
                res.redirect(301,'/book/list');//note redirect này là chuyển hướng đến trang != render là vẻ lại
            }
        }else{
            res.render('error');
        }
    }

    deleteBook = async (req:Request, res:Response)=>{
        let id = req.params.id;
        let book = await Book.findById(id);
        if(book){
            await Book.deleteOne({
                _id: id
            });
            // res.redirect(301,'/book/list'); hai cái nay khác gì nhau
            //res.status(204).json(); // note trả về trạng thái, 
            res.redirect('/book/list');
            console.log('delete succsess!');
            
        }else{
            res.render('error');
            // res.sendStatus(404).json({
            //     message:'NOT FOUND'
            // });
        }
    }// vì sao không cần kdl req va res
    // mai viết thêm chức năng confirm
    showConfirmDeleteForm = async (req:Request, res:Response) => {
        let id = req.params.id; // req người dùng bấm vào phải bắt đc id xem id đó có tồn tại hay không
        let book = await Book.findById(id); // lấy ra 1 đối tượng book theo id
        console.log(book)
        if(book){
            res.render('book/confirm',{
                book: book
            });
        }else{
            res.render('error');
        }
    }
}
export default new BookController();