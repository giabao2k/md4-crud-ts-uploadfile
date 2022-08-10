import { Schema, model } from "mongoose";

interface IBook{
    id?:string;
    name?:string;
    author?:string;
    image?:string;
}

const bookSchema = new Schema<IBook>({
    id: String,
    name: String,
    author:String,
    image:String
});
// book là tên table mongodb tự tạo ra thêm s => books.
const Book = model<IBook>('book', bookSchema);
export {Book};
