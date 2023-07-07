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
exports.postRepositoryDb = void 0;
const db_1 = require("./db");
const mongodb_1 = require("mongodb");
exports.postRepositoryDb = {
    findPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const postsDb = yield db_1.postsCollection.find({}).toArray();
            return postsDb.map((post) => ({
                id: post._id.toString(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt
            }));
        });
    },
    findPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongodb_1.ObjectId.isValid(id)) {
                return null;
            }
            const _id = new mongodb_1.ObjectId(id);
            const foundedPost = yield db_1.postsCollection.findOne({ _id: _id });
            if (!foundedPost) {
                return null;
            }
            return {
                id: foundedPost._id.toString(),
                title: foundedPost.title,
                shortDescription: foundedPost.shortDescription,
                content: foundedPost.content,
                blogId: foundedPost.blogId,
                blogName: foundedPost.blogName,
                createdAt: foundedPost.createdAt
            };
        });
    },
    createPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const postByBlogId = yield db_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(data.blogId) });
            if (!postByBlogId) {
                return undefined;
            }
            const newPostDb = {
                _id: new mongodb_1.ObjectId(),
                title: data.title,
                shortDescription: data.shortDescription,
                content: data.content,
                blogId: data.blogId,
                blogName: postByBlogId.name,
                createdAt: new Date().toISOString()
            };
            yield db_1.postsCollection.insertOne(newPostDb);
            return {
                id: newPostDb._id.toString(),
                title: newPostDb.title,
                shortDescription: newPostDb.shortDescription,
                content: newPostDb.content,
                blogId: newPostDb.blogId,
                blogName: newPostDb.blogName,
                createdAt: newPostDb.createdAt
            };
        });
    },
    updatePost(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    title: data.title,
                    shortDescription: data.shortDescription,
                    content: data.content,
                    blogId: data.blogId
                }
            });
            return result.matchedCount === 1;
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return result.deletedCount === 1;
        });
    },
    deletePosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollection.deleteMany({});
            return result.acknowledged === true;
        });
    }
};
