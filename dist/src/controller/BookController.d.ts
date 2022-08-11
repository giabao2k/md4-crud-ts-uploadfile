import { Request, Response } from "express";
declare class BookController {
    showListBook: (req: Request, res: Response) => Promise<void>;
    showCreateForm: (req: Request, res: Response) => void;
    createBook: (req: Request, res: Response) => Promise<void>;
    showUpdateForm: (req: Request, res: Response) => Promise<void>;
    updateBook: (req: Request, res: Response) => Promise<void>;
    deleteBook: (req: Request, res: Response) => Promise<void>;
    showConfirmDeleteForm: (req: Request, res: Response) => Promise<void>;
}
declare const _default: BookController;
export default _default;
