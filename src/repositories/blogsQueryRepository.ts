import { ObjectId } from "mongodb";
import { client } from "../db/db";
import { BlogDBModel } from "../models/blogs/BlogDBModel";
import { BlogViewModel } from "../models/blogs/BlogViewModel";
import { BlogsViewModel } from "../models/blogs/BlogsViewModel";

const blogsCollection = client.db().collection<BlogDBModel>('blogs');

export const formatBlog = (blogDB: BlogDBModel ): BlogViewModel =>{
    const blog = { 
        id: blogDB._id.toString(), 
        name: blogDB.name,
        description: blogDB.description,
        websiteUrl: blogDB.websiteUrl,
        createdAt: blogDB.createdAt,
        isMembership: blogDB.isMembership
    };
    return blog;
};

export const formatGetResponseBlogs = (blogsDB: BlogDBModel[], pagesCount: number, page: number, pageSize: number, totalCount: number ): BlogsViewModel => {
    if(blogsDB.length===0){
        const blogs: BlogsViewModel = {
            pagesCount: 0,
            page: 0,
            pageSize: 0,
            totalCount: 0,
            items:[]
        };
        return blogs;
    } else {
        const items = blogsDB.map(blog => formatBlog(blog));
        const blogs: BlogsViewModel = {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items
        };
        return blogs
    }
};

export const blogsQueryRepository = {
    async findBlogs(searchNameTerm: string | null,sortBy: string, sortDirection:'asc'|'desc', pageNumber: number, pageSize: number): Promise<BlogsViewModel>{
        const skipRecords = (pageNumber-1)*pageSize;
        const sorting = sortDirection=='desc'? -1 :1 ;
        if(searchNameTerm){
            const countFilteredBlogs = await blogsCollection.countDocuments({name: {$regex: searchNameTerm, $options: 'i'}});
            const pagesCountFilteredBlogs = Math.ceil(countFilteredBlogs/pageSize);
            const model: BlogDBModel[] = await blogsCollection
                .find({name: {$regex: searchNameTerm, $options: 'i'}})
                .sort({ [sortBy]: sorting })
                .skip(skipRecords)
                .limit(pageSize)
                .toArray()
            const blogs: BlogsViewModel = formatGetResponseBlogs(model, pagesCountFilteredBlogs, pageNumber, pageSize, countFilteredBlogs); 
            return blogs;
        } else {
            const totalCount = await blogsCollection.countDocuments();
            const totalPagesCount = Math.ceil(totalCount/pageSize);           
            const model: BlogDBModel[] = await blogsCollection
            .find({ })
            .sort({ [sortBy]: sorting })
            .skip(skipRecords)
            .limit(pageSize)
            .toArray()
            const blogs: BlogsViewModel = formatGetResponseBlogs(model, totalPagesCount, pageNumber, pageSize, totalCount) 
            return blogs
        };
    },

    async findBlogById(id: string): Promise<BlogViewModel | null>{
        
        const foundBlogDB: BlogDBModel | null = await blogsCollection.findOne({_id: new ObjectId(id)})
        if(foundBlogDB){
            const blog: BlogViewModel = formatBlog(foundBlogDB)
            return blog;
        } else {
            return null
        }
    },

};