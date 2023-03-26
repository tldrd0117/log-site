import sha256 from "crypto-js/sha256";
import { Types } from "mongoose";
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
            authorId: user._id,
            authorName: user.name,
            summary: "it is not title1",
            text: "test1",
            parent: null
        })
        expect(post1).toMatchObject({
            _id: expect.any(Types.ObjectId),
            authorId: user._id,
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
            authorId: user._id,
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
                authorId: user._id,
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
                authorId: user._id,
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
                authorId: user._id,
                authorName: user.name,
                summary: "it is not title1",
                text: "test"+i,
                parent: null
            })
        }

        let postList
        for(let p = 0; p < 10; ++p){
            postList = await postService.getList(10, p*10)
            expect(postList).toHaveLength(10)
            for(let i = 0; i < 10; ++i){
                expect(postList[i]).toMatchObject({
                    _id: expect.any(Types.ObjectId),
                    authorId: user._id,
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
    })

    it("delete post", async () => {
        await expect(postService.getPostTotalCount()).resolves.toBe(0)
        const post: IPost = await postService.post({
            authorId: user._id,
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
                authorId: user._id,
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
            authorId: user._id,
            authorName: user.name,
            summary: "it is not title1",
            text: "test",
            parent: null
        })
        
        const result = await postService.putPost({
            _id: post._id,
            authorId: user._id,
            authorName: user.name,
            summary: "update summary",
            text: "update text",
        })
        expect(result.modifiedCount).toBe(1)
        const postVerify = await postService.getPost(post._id.toString())
        expect(postVerify).toMatchObject({
            _id: expect.any(Types.ObjectId),
            authorId: user._id,
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
                authorId: user._id,
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
                authorId: user._id,
                authorName: user.name,
                summary: "update summary",
                text: "update text",
            }
        }))
        // expect(result2.modifiedCount).toBe(34)
        await expect(postService.getPostTotalCount()).resolves.toBe(10)
    })

    it("searchList", async () => {
        const arr = []
        for(let i = 0; i < 5; ++i){
            arr.push({
                authorId: user._id,
                authorName: "user",
                summary: "abcde",
                text: "fghijk",
                parent: null
            })
        }
        for(let i = 0; i < 5; ++i){
            arr.push({
                authorId: user._id,
                authorName: "2user2",
                summary: "lmopqrs",
                text: "touvwxyz",
                parent: null
            })
        }
        expect(arr).toHaveLength(10)
        const result = await postService.postMany(arr)
        expect(result).toHaveLength(10)
        const serarch1  = await postService.searchList(10, 0, "user")
        expect(serarch1).toHaveLength(10)
        const serarch2  = await postService.searchList(10, 0, "abcde")
        expect(serarch2).toHaveLength(5)
        const serarch3  = await postService.searchList(10, 0, "fghijk")
        expect(serarch3).toHaveLength(5)
        const serarch4  = await postService.searchList(10, 0, "2user2")
        expect(serarch4).toHaveLength(5)
        const serarch5  = await postService.searchList(10, 0, "lmopqrs")
        expect(serarch5).toHaveLength(5)
        const serarch6  = await postService.searchList(10, 0, "touvwxyz")
        expect(serarch6).toHaveLength(5)
    })
})