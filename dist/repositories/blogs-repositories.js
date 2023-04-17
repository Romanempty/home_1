"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRepository = exports.blogs = void 0;
exports.blogs = [];
exports.blogRepository = {
    findBlogs() {
        return exports.blogs;
    },
    findBlog(id) {
        let blog = exports.blogs.find(p => p.id === id);
        return blog;
    },
    createBlog(name, description, websiteUrl) {
        const newBlog = {
            id: (exports.blogs.length + 1).toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        };
        exports.blogs.push(newBlog);
        return newBlog;
    },
    updateBlog(id, name, description, website) {
        let foundBlogById = exports.blogs.find(p => p.id === id);
        if (foundBlogById) {
            foundBlogById.name = name;
            foundBlogById.description = description;
            foundBlogById.websiteUrl = website;
            return true;
        }
        return false;
    },
    deleteBlog(id) {
        let foundBlogId = exports.blogs.find(p => p.id === id);
        if (foundBlogId) {
            exports.blogs = exports.blogs.filter(p => p !== foundBlogId);
            return true;
        }
        return false;
    },
    deleteBlogs() {
        exports.blogs.splice(0, exports.blogs.length);
    }
};
