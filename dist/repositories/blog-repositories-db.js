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
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRepositoryDb = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("./db");
exports.blogRepositoryDb = {
    findBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const blogsDb = yield db_1.blogsCollection.find({}).toArray();
            return blogsDb.map((blog) => ({
                id: blog._id.toString(),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt,
                isMembership: blog.isMembership
            }));
        });
    },
    findBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongodb_1.ObjectId.isValid(id)) {
                return null;
            }
            console.log('id: ', id);
            const _id = new mongodb_1.ObjectId(id);
            const foundedBlog = yield db_1.blogsCollection.findOne({ _id: _id });
            console.log('foundBlog: ', foundedBlog);
            if (!foundedBlog) {
                return null;
            }
            return {
                id: foundedBlog._id.toString(),
                name: foundedBlog.name,
                description: foundedBlog.description,
                websiteUrl: foundedBlog.websiteUrl,
                createdAt: foundedBlog.createdAt,
                isMembership: foundedBlog.isMembership
            };
        });
    },
    createBlog(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlogDb = Object.assign(Object.assign({ _id: new mongodb_1.ObjectId() }, data), { createdAt: new Date().toISOString(), isMembership: false });
            yield db_1.blogsCollection.insertOne(newBlogDb);
            return {
                id: newBlogDb._id.toString(),
                name: newBlogDb.name,
                description: newBlogDb.description,
                websiteUrl: newBlogDb.websiteUrl,
                createdAt: newBlogDb.createdAt,
                isMembership: newBlogDb.isMembership
            };
        });
    },
    updateBlog(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongodb_1.ObjectId.isValid(id)) {
                return false;
            }
            const _id = new mongodb_1.ObjectId(id);
            const result = yield db_1.blogsCollection.updateOne({ _id: _id }, {
                $set: {
                    name: data.name,
                    description: data.description,
                    websiteUrl: data.websiteUrl
                }
            });
            return result.matchedCount === 1;
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongodb_1.ObjectId.isValid(id)) {
                return false;
            }
            const _id = new mongodb_1.ObjectId(id);
            const result = yield db_1.blogsCollection.deleteOne({ _id: _id });
            return result.deletedCount === 1;
        });
    },
    deleteBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogsCollection.deleteMany({});
            return result.acknowledged === true;
        });
    }
};
