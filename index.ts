import express, { Router } from "express";
import mongoose from "mongoose";
import { router } from "./src/routes/router";
import fileUpload from 'express-fileupload';
import bodyParser from "body-parser";
const PORT = 3000;
const app = express();
app.set('views','./src/view/');
// setup view engine (do file index.ts nằm ở thư mục dist nên sau này , mọi truy cập phải từ file đấy)
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload({
    createParentPath: true
}));
app.use(express.static('public'));
mongoose.connect('mongodb://localhost:27017/book_management')
.then(() => {
    console.log('Connect success!');   
})
.catch(() =>{
    console.log('Connect error!');
})
app.use('', router)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
})