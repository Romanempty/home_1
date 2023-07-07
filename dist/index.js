"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const blogs_router_db_1 = require("./routers/blogs-router-db");
const posts_router_db_1 = require("./routers/posts-router-db");
const db_1 = require("./repositories/db");
const testing_router_db_1 = require("./routers/testing-router-db");
const app = (0, express_1.default)();
const parserMiddleware = body_parser_1.default.json();
app.use(parserMiddleware);
const port = process.env.PORT || 3000;
//app.use('/videos', videoRouter)
app.use('/testing', testing_router_db_1.testRouterDb);
app.use('/blogs', blogs_router_db_1.blogRouterDb);
app.use('/posts', posts_router_db_1.postRouterDb);
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
startApp();
