import sha256 from "crypto-js/sha256";
import { Types } from "mongoose";
import { PostList } from "../../src/interfaces/post";
import Post, { IPost } from "../../src/models/post.model";
import User, { IUser } from "../../src/models/user.model";
import postService from "../../src/services/post.service";
import createMongo, { Mongo } from "../../src/utils/mongo";
import { createTestHashDbName } from "../utils/testUtils";

describe("Post Service Test", function () {
    let mongo: Mongo
    let user: IUser

    beforeEach(async () => {
        mongo = createMongo(process.env.DB_ADDRESS || "", createTestHashDbName());
        await mongo.connect();
        await mongo.useDb();
        await mongo.resetDatabase();
        await User.syncIndexes()
    })

    beforeEach(async () => {
        user = await User.create({
            name: "lsj",
            email: "root@naver.com",
            password: sha256("123451").toString(),
            role: "admin",
        })
    })

    afterEach(async () => {
        if(mongo.isConnect()){
            await mongo.db.connection.dropDatabase()
            return mongo.disconnect()
        }
    })

    it("Create Post And Find Post", async () => {
        const post1 = await postService.post({
            author: user._id,
            authorName: user.name,
            summary: "it is not title1",
            text: "test1",
            parent: null
        })
        expect(post1).toMatchObject({
            _id: expect.any(Types.ObjectId),
            author: user._id,
            authorName: user.name,
            summary: "it is not title1",
            text: "test1",
            createAt: expect.any(Date),
            updateAt: expect.any(Date),
            order: 1,
            relatedPosts: [],
            parent: null
        })

        const postVerify = await postService.getPost(post1._id.toString())
        expect(postVerify).toMatchObject({
            _id: expect.any(Types.ObjectId),
            author: {
                _id: user._id,
                name: user.name,
            },
            authorName: user.name,
            summary: "it is not title1",
            text: "test1",
            createAt: expect.any(Date),
            updateAt: expect.any(Date),
            order: 1,
            relatedPosts: [],
            parent: null
        })
    })

    it("Create Many Post", async () => {
        const arr = []
        for(let i = 0; i < 10; ++i){
            arr.push({
                author: user._id,
                authorName: user.name,
                summary: "it is not title1",
                text: "test",
                parent: null
            })
        }
        expect(arr).toHaveLength(10)
        const result = await postService.postMany(arr)
        expect(result).toHaveLength(10)
        // 순서를 유지 하지 않기 때문에 정렬을 해줘야 한다.
        result.sort((a, b) => a.order - b.order)
        for(let i = 0; i < 10; ++i){
            expect(result[i]).toMatchObject({
                _id: expect.any(Types.ObjectId),
                author: user._id,
                authorName: user.name,
                summary: "it is not title1",
                text: "test",
                createAt: expect.any(Date),
                updateAt: expect.any(Date),
                order: i+1,
                relatedPosts: [],
                parent: null
            })
        }
    })

    it("Create many posts above the maximum", async () => {
        const arr = []
        for(let i = 0; i < 1000; ++i){
            arr.push({
                author: user._id,
                authorName: user.name,
                summary: "it is not title1",
                text: "test",
                parent: null
            })
        }
        expect(arr).toHaveLength(1000)
        const result = await postService.postMany(arr)
        expect(result).toHaveLength(1000)
        // 순서를 유지 하지 않기 때문에 정렬을 해줘야 한다.
        result.sort((a, b) => a.order - b.order)
        for(let i = 0; i < 1000; ++i){
            expect(result[i]).toMatchObject({
                _id: expect.any(Types.ObjectId),
                author: user._id,
                authorName: user.name,
                summary: "it is not title1",
                text: "test",
                createAt: expect.any(Date),
                updateAt: expect.any(Date),
                order: i+1,
                relatedPosts: [],
                parent: null
            })
        }
    })

    it("list post", async () => {
        for(let i = 0; i < 100; ++i){
            await postService.post({
                author: user._id,
                authorName: user.name,
                summary: "it is not title1",
                text: "test"+i,
                parent: null
            })
        }

        let postList: PostList
        for(let p = 0; p < 10; ++p){
            postList = await postService.getList(10, p*10)
            expect(postList.list).toHaveLength(10)
            for(let i = 0; i < 10; ++i){
                expect(postList.list[i]).toMatchObject({
                    _id: expect.any(Types.ObjectId),
                    author: {
                        _id: user._id,
                        name: user.name,
                    },
                    authorName: user.name,
                    summary: "it is not title1",
                    text: "test"+(i+(10 * p)),
                    createAt: expect.any(Date),
                    updateAt: expect.any(Date),
                    order: i+(1 + 10 * p),
                    relatedPosts: [],
                    parent: null
                })
            }
        }
        expect(postList.total).toBe(100)
    })

    it("delete post", async () => {
        await expect(postService.getPostTotalCount()).resolves.toBe(0)
        const post: IPost = await postService.post({
            author: user._id,
            authorName: user.name,
            summary: "it is not title1",
            text: "test",
            parent: null
        })
        await expect(postService.getPostTotalCount()).resolves.toBe(1)
        let result = await postService.delPost(post._id.toString())
        expect(result.deletedCount).toBe(1)
        result = await postService.delPost(post._id.toString())
        expect(result.deletedCount).toBe(0)
        await expect(postService.getPostTotalCount()).resolves.toBe(0)
    })

    it("delete posts", async () => {
        await expect(postService.getPostTotalCount()).resolves.toBe(0)
        const arr = []
        for(let i = 0; i < 10; ++i){
            arr.push({
                author: user._id,
                authorName: user.name,
                summary: "it is not title1",
                text: "test",
                parent: null
            })
        }
        expect(arr).toHaveLength(10)
        const result = await postService.postMany(arr)
        expect(result).toHaveLength(10)
        await expect(postService.getPostTotalCount()).resolves.toBe(10)

        const result2 = await postService.delPosts(result.slice(6).map((v) => v._id.toString()))
        expect(result2.deletedCount).toBe(4)
        await expect(postService.getPostTotalCount()).resolves.toBe(6)
    })

    it("update post", async () => {
        const post: IPost = await postService.post({
            author: user._id,
            authorName: user.name,
            summary: "it is not title1",
            text: "test",
            parent: null
        })
        
        const result = await postService.putPost({
            _id: post._id,
            author: user._id,
            authorName: user.name,
            summary: "update summary",
            text: "update text",
        })
        expect(result.modifiedCount).toBe(1)
        const postVerify = await postService.getPost(post._id.toString())
        expect(postVerify).toMatchObject({
            _id: expect.any(Types.ObjectId),
            author: {
                _id: user._id,
                name: user.name,
            },
            authorName: user.name,
            summary: "update summary",
            text: "update text",
            createAt: expect.any(Date),
            updateAt: expect.any(Date),
            order: 1,
            relatedPosts: [],
            parent: null
        })
    })

    it("update posts", async () => {
        const arr = []
        for(let i = 0; i < 10; ++i){
            arr.push({
                author: user._id,
                authorName: user.name,
                summary: "it is not title1",
                text: "test",
                parent: null
            })
        }
        expect(arr).toHaveLength(10)
        const result = await postService.postMany(arr)
        expect(result).toHaveLength(10)
        await expect(postService.getPostTotalCount()).resolves.toBe(10)
        await postService.putPosts(result.slice(6).map((v) => {
            return {
                _id: v._id,
                author: user._id,
                authorName: user.name,
                summary: "update summary",
                text: "update text",
            }
        }))
        // expect(result2.modifiedCount).toBe(34)
        await expect(postService.getPostTotalCount()).resolves.toBe(10)
    })

    it("search list", async () => {
        const arr = []
        for(let i = 0; i < 5; ++i){
            arr.push({
                author: user._id,
                authorName: user.name,
                summary: "abcde",
                text: "fghijk",
                parent: null
            })
        }
        for(let i = 0; i < 5; ++i){
            arr.push({
                author: user._id,
                authorName: user.name,
                summary: "lmopqrs",
                text: "touvwxyz",
                parent: null
            })
        }
        expect(arr).toHaveLength(10)
        const result = await postService.postMany(arr)
        expect(result).toHaveLength(10)
        const search1: PostList  = await postService.searchList(10, 0, "lsj")
        console.log(search1)
        expect(search1.list).toHaveLength(10)
        expect(search1.total).toBe(10)
        const search2  = await postService.searchList(10, 0, "abcde")
        expect(search2.list).toHaveLength(5)
        expect(search2.total).toBe(5)
        const search3  = await postService.searchList(10, 0, "fghijk")
        expect(search3.list).toHaveLength(5)
        expect(search3.total).toBe(5)
        const search4  = await postService.searchList(10, 0, "2user2")
        expect(search4.list).toHaveLength(0)
        expect(search4.total).toBe(0)
        const search5  = await postService.searchList(10, 0, "lmopqrs")
        expect(search5.list).toHaveLength(5)
        expect(search5.total).toBe(5)
        const search6  = await postService.searchList(10, 0, "touvwxyz")
        expect(search6.list).toHaveLength(5)
        expect(search6.total).toBe(5)
    })
})