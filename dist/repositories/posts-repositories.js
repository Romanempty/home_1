"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = exports.posts = void 0;
const blogs_repositories_1 = require("./blogs-repositories");
exports.posts = [];
exports.postRepository = {
    findPosts() {
        return exports.posts;
    },
    findPost(id) {
        let post = exports.posts.find(p => p.id === id);
        return post;
    },
    createPost(title, shortDescription, content, blogId) {
        const postId = blogs_repositories_1.blogRepository.findBlog(blogId);
        const newPost = {
            id: (exports.posts.length + 1).toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: postId.id,
            blogName: postId.name
        };
        exports.posts.push(newPost);
        return newPost;
    },
    updatePost(id, title, shortDescription, content, blogId) {
        let foundPostById = exports.posts.find(p => p.id === id);
        if (foundPostById) {
            foundPostById.title = title;
            foundPostById.shortDescription = shortDescription;
            foundPostById.content = content;
            foundPostById.blogId = blogId;
            return true;
        }
        return false;
    },
    deletePost(id) {
        let foundPostId = exports.posts.find(p => p.id === id);
        if (foundPostId) {
            exports.posts = exports.posts.filter(p => p !== foundPostId);
            return true;
        }
        return false;
    },
    deletePosts() {
        exports.posts.splice(0, exports.posts.length);
    }
};
