"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = require("./src/routes/router");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = 3000;
const app = (0, express_1.default)();
app.set('views', './src/view/');
app.set('view engine', 'ejs');
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, express_fileupload_1.default)({
    createParentPath: true
}));
app.use(express_1.default.static('public'));
mongoose_1.default.connect('mongodb://localhost:27017/book_management')
    .then(() => {
    console.log('Connect success!');
})
    .catch(() => {
    console.log('Connect error!');
});
app.use('', router_1.router);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map