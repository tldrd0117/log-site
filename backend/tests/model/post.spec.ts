import app from '../../src/app'
import { describe, it, afterEach } from 'mocha'
import createMongo, { Mongo } from '../../src/utils/mongo'
import User, { IUser } from '../../src/models/user.model'
import Post, { IPost } from '../../src/models/post.model'
import { expect } from '../utils/chaiUtils'
import { makeTree } from '../utils/treeUtils'


describe('post model test', () => {
    let mongo: Mongo
    let user: IUser
    beforeEach(async () => {
        mongo = createMongo(process.env.DB_ADDRESS || "", "log-site-test");
        await mongo.connect();
        await mongo.useDb();
        await mongo.resetDatabase();
        await User.syncIndexes()
    })

    beforeEach(async () => {
        user = await User.create({
            name: "lsj",
            email: "root@naver.com",
            password: "123451"
        })
    })

    afterEach(() => {
        // mongo.db.connection.dropDatabase()
        return mongo.disconnect()
    })

    it("verify user indexes", async () => {
        let indexes = await User.listIndexes()
        expect(indexes.map(v => v.key)).to.be.deep.equals([{ _id: 1 }, { name: 1 }, { email: 1 }, { name: 1, email: 1 }])
    })

    describe("insert post and Find", () => {
        it("insert one post", async () => {
            expect(await Post.count()).to.be.equal(0)
            await Post.create({
                authorId: user._id,
                authorName: user.name,
                text: "it is Test",
            })
            expect(await Post.count()).to.be.equal(1)
            const result = await Post.find({})
            expect(result).to.be.lengthOf(1)
            expect((result[0] as IPost).order).to.be.equal(1)
        })

        it("insert 10 Post And check Order Column", async () => {
            expect(await Post.count()).to.be.equal(0)
            for (let i = 0; i < 10; ++i) {
                await Post.create({
                    authorId: user._id,
                    authorName: user.name,
                    text: "it is Test",
                })
                expect(await Post.count()).to.be.equal(i + 1)
            }
            const result = await Post.find({}).sort({ createAt: 1 })
            expect(result).to.be.lengthOf(10)
            for (let i = 0; i < 10; ++i) {
                expect((result[i] as IPost).order).to.be.equal(i + 1)
            }
        })
    })

    describe("check tree posts", function () {
        it("loopup posts", async () => {
            let onePost = await Post.create({
                authorId: user._id,
                authorName: user.name,
                text: "it is Test",
                parent: null
            })
            let twoPost = await Post.create({
                authorId: user._id,
                authorName: user.name,
                text: "it is Test2",
                parent: onePost._id
            })

            let threePost = await Post.create({
                authorId: user._id,
                authorName: user.name,
                text: "it is Test2",
                parent: twoPost._id
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
            expect(tree).to.be.not.undefined
            const keys = Object.keys(tree)
            expect(tree[keys[0]].children.length).to.be.equal(1)
            let child: any = tree[keys[0]].children[0]
            expect(child.children.length).to.be.equal(1)
            child = tree[keys[0]].children[0].children[0]
            expect(child.children.length).to.be.equal(0)
            // console.log(JSON.stringify(tree, null, 2))
        });
    })

});