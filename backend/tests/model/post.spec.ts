import app from '../../src/app'
import createMongo, { Mongo } from '../../src/utils/mongo'
import User, { IUser } from '../../src/models/user.model'
import Post, { IPost } from '../../src/models/post.model'
import { makeTree } from '../utils/treeUtils'
import { createTestHashDbName } from '../utils/testUtils'
import Role from '../../src/models/role.model'


describe('post model test', () => {
    let mongo: Mongo
    let user: IUser
    beforeEach(async () => {
        mongo = createMongo(process.env.DB_ADDRESS || "", createTestHashDbName());
        await mongo.connect();
    })

    beforeEach(async () => {
        const roles = await Role.find({})
        console.log(roles)
        user = await User.create({
            name: "lsj",
            email: "root@naver.com",
            password: "123451",
            role: roles[0]._id.toString()
        })
    })

    afterEach(async () => {
        await mongo.resetDatabase()
        if(mongo.isConnect()){
            await mongo.db.connection.dropDatabase()
            return mongo.disconnect()
        }
    })

    describe("insert post and Find", () => {
        it("insert one post", async () => {
            expect(await Post.count()).toEqual(0)
            await Post.create({
                author: user._id,
                authorName: user.name,
                summary: "it is not title",
                text: "it is Test",
            })
            expect(await Post.count()).toEqual(1)
            const result = await Post.find({})
            expect(result).toHaveLength(1)
            expect((result[0] as IPost).order).toEqual(1)
        })

        it("insert 10 Post And check Order Column", async () => {
            expect(await Post.count()).toEqual(0)
            for (let i = 0; i < 10; ++i) {
                await Post.create({
                    author: user._id,
                    authorName: user.name,
                    summary: "it is not title",
                    text: "it is Test",
                })
                expect(await Post.count()).toEqual(i + 1)
            }
            const result = await Post.find({}).sort({ createAt: 1 })
            expect(result).toHaveLength(10)
            for (let i = 0; i < 10; ++i) {
                expect((result[i] as IPost).order).toEqual(i + 1)
            }
        })
    })

    describe("check tree posts", function () {
        it("loopup posts tree", async () => {
            let onePost = await Post.create({
                author: user._id,
                authorName: user.name,
                summary: "it is not title",
                text: "it is Test",
                parent: null
            })
            let twoPost = await Post.create({
                author: user._id,
                authorName: user.name,
                summary: "it is not title",
                text: "it is Test2",
                parent: onePost._id
            })

            let threePost = await Post.create({
                author: user._id,
                authorName: user.name,
                summary: "it is not title",
                text: "it is Test3",
                parent: twoPost._id
            })

            let fourPost = await Post.create({
                author: user._id,
                authorName: user.name,
                summary: "it is not title",
                text: "it is Test4",
                parent: null,
                relatedPost: [onePost._id, twoPost._id, threePost._id]
            })

            const result = await Post.aggregate([
            {
                $graphLookup: {
                    from: "posts",
                    startWith: "$_id",
                    connectFromField: "_id",
                    connectToField: "parent",
                    as: "_children",
                    maxDepth: 0,
                    depthField: "depth"
                },
            }])
            const tree = makeTree(result)
            expect(tree).toBeDefined()
            const keys = Object.keys(tree)
            expect(tree[keys[0]].children.length).toEqual(1)
            let child: any = tree[keys[0]].children[0]
            expect(child.children.length).toEqual(1)
            child = tree[keys[0]].children[0].children[0]
            expect(child.children.length).toEqual(0)
            // console.log(JSON.stringify(tree, null, 2))
        });

        it("loopup posts tree with relatedPost", async () => {
            let onePost = await Post.create({
                author: user._id,
                authorName: user.name,
                summary: "it is not title",
                text: "it is Test",
                parent: null
            })
            let twoPost = await Post.create({
                author: user._id,
                authorName: user.name,
                summary: "it is not title",
                text: "it is Test2",
                parent: onePost._id,
                relatedPosts: [onePost._id]
            })

            let threePost = await Post.create({
                author: user._id,
                authorName: user.name,
                summary: "it is not title",
                text: "it is Test3",
                parent: twoPost._id
            })

            let fourPost = await Post.create({
                author: user._id,
                authorName: user.name,
                summary: "it is not title",
                text: "it is Test4",
                parent: null,
                relatedPosts: [onePost._id, twoPost._id, threePost._id]
            })

            const result = await Post.aggregate([
            {
                $graphLookup: {
                    from: "posts",
                    startWith: "$relatedPosts",
                    connectFromField: "relatedPosts",
                    connectToField: "_id",
                    as: "_relatedPosts",
                    maxDepth: 0,
                    depthField: "depth"
                },
            }])
            expect(result).toHaveLength(4)
            expect(result[0]._relatedPosts).toHaveLength(0)
            expect(result[1]._relatedPosts).toHaveLength(1)
            expect(result[2]._relatedPosts).toHaveLength(0)
            expect(result[3]._relatedPosts).toHaveLength(3)
            // console.log(JSON.stringify(result, null, 2))
        });
    })

});