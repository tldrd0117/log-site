import { getPostCreateObject, getPostDelObject, getPostUpdateObject,
    getPostObject, getPostListObject, getPostSearchListObject } from '../../src/object/post'
import sha256 from 'crypto-js/sha256'
import createMongo, { Mongo } from '../../src/utils/mongo'
import Post, { IPost } from '../../src/models/post.model'
import User, { IUser } from '../../src/models/user.model'
import { createTestHashDbName } from '../utils/testUtils'
import joi from 'joi'
import { initI18n } from '../../src/utils/i18n'

const validateOptions = {
    errors: { wrap: { label: '' } },
    abortEarly: false,
}

describe("post object", function(){
    let mongo: Mongo
    let user: IUser
    let post: IPost
    beforeEach(async () => {
        mongo = createMongo(process.env.DB_ADDRESS || "", createTestHashDbName());
        await mongo.connect();
        await mongo.useDb();
        await mongo.resetDatabase();
        await User.syncIndexes();
        await Post.syncIndexes();
        await initI18n()
    })

    beforeEach(async () => {
        user = await User.create({
            name: "lsj",
            email: "root@naver.com",
            password: sha256("123451").toString(),
            role: "admin",
        })
    })

    beforeEach(async () => {
        post = await Post.create({
            author: user._id,
            authorName: user.name,
            summary: "test",
            text: "test",
        })
    })

    afterEach(async () => {
        if(mongo.isConnect()){
            await mongo.db.connection.dropDatabase()
            return mongo.disconnect()
        }
    })
    
    it("Testing successful validation of post object's ID", async function(){
        const postObject = await getPostObject("ko")
        await expect(postObject.validateAsync({
            _id: post._id.toString(),
        }, validateOptions)).resolves.toMatchObject({
            _id: post._id.toString()
        })

    })

    it("Testing required id validation of post object", async function(){
        const postObject = await getPostObject("ko")
        await expect(postObject.validateAsync({
        }, validateOptions)).rejects
        .toHaveProperty('details[0].message', '게시물 아이디은 필수 값 입니다')
        
    })

    it("Testing validation of post object's ID type", async function(){
        const postObject = await getPostObject("ko")
        
        await expect(postObject.validateAsync({
            _id: 123
        }, validateOptions)).rejects
        .toHaveProperty('details[0].message', '게시물 아이디은 문자열만 가능합니다.')

    })

    it("Testing validation of post object's ID pattern", async function(){
        const postObject = await getPostObject("ko")
        await expect(postObject.validateAsync({
            _id: "123"
        }, validateOptions)).rejects
        .toHaveProperty('details[0].message', '게시물 아이디은 올바른 형식이 아닙니다')

    })

    it("Testing successful validation of post list object", async function(){
        const postObject = await getPostListObject("ko")
        await expect(postObject.validateAsync({
            limit: 50,
            offset: 10000,
        }, validateOptions)).resolves.toMatchObject({
            limit: 50,
            offset: 10000,
        })
    })


    it("Testing the validation of the type of the field in the list of post objects", async function(){
        const postObject = await getPostListObject("ko")
        await expect(postObject.validateAsync({
            limit: "a50",
            offset: "a10000",
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '가져올 리스트 갯수은 숫자만 가능합니다',
                },
                {
                    message: '리스트 스킵 갯수은 숫자만 가능합니다',
                }                    
            ]
        })
    })

    it("Testing the validation of the required field in the list of post objects", async function(){
        const postObject = await getPostListObject("ko")
        await expect(postObject.validateAsync({
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '가져올 리스트 갯수은 필수 값 입니다',
                },
                {
                    message: '리스트 스킵 갯수은 필수 값 입니다',
                }                    
            ]
        })
    })

    it("Testing the validation of the minimum limit in the list of post objects", async function(){
        const postObject = await getPostListObject("ko")
        await expect(postObject.validateAsync({
            limit: -1,
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '가져올 리스트 갯수은 최소 1 이상만 가능합니다',
                },
                expect.anything()
            ]
        })
    })

    it("Testing the validation of the maximum limit in the list of post objects", async function(){
        const postObject = await getPostListObject("ko")
        await expect(postObject.validateAsync({
            limit: 1000,
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '가져올 리스트 갯수은 최대 100 이하만 가능합니다',
                },
                expect.anything()
            ]
        })
    })

    it("Testing the validation of the minimum offset in the list of post objects", async function(){
        const postObject = await getPostListObject("ko")
        await expect(postObject.validateAsync({
            limit: 50,
            offset: -1,
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '리스트 스킵 갯수은 최소 0 이상만 가능합니다',
                },
            ]
        })
    })

    it("Testing successful validation of post search list object", async function(){
        const postObject = await getPostSearchListObject("ko")
        await expect(postObject.validateAsync({
            limit: 50,
            offset: 10000,
            word: "hello"
        }, validateOptions)).resolves.toMatchObject({
            limit: 50,
            offset: 10000,
            word: "hello"
        })
    })


    it("Testing the validation of the type of the field in the list of post search objects", async function(){
        const postObject = await getPostSearchListObject("ko")
        await expect(postObject.validateAsync({
            limit: "a50",
            offset: "a10000",
            word: 123,
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '가져올 리스트 갯수은 숫자만 가능합니다',
                },
                {
                    message: '리스트 스킵 갯수은 숫자만 가능합니다',
                },
                {
                    message: '검색어은 문자열만 가능합니다.',
                }             
            ]
        })
    })

    it("Testing the validation of the required field in the list of post search objects", async function(){
        const postObject = await getPostSearchListObject("ko")
        await expect(postObject.validateAsync({
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '가져올 리스트 갯수은 필수 값 입니다',
                },
                {
                    message: '리스트 스킵 갯수은 필수 값 입니다',
                }                    
            ]
        })
    })

    it("Testing the validation of the minimum field in the list of post search objects", async function(){
        const postObject = await getPostSearchListObject("ko")
        await expect(postObject.validateAsync({
            limit: 0,
            offset: -1,
            word: ""
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '가져올 리스트 갯수은 최소 1 이상만 가능합니다',
                },
                {
                    message: '리스트 스킵 갯수은 최소 0 이상만 가능합니다',
                }
            ]
        })
    })

    it("Testing the validation of the maximum field in the list of post search objects", async function(){
        const postObject = await getPostSearchListObject("ko")
        await expect(postObject.validateAsync({
            limit: 101,
            offset: 10000,
            word: "a".repeat(21)
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '가져올 리스트 갯수은 최대 100 이하만 가능합니다',
                },
                {
                    message: '검색어은 최대 20글자 이하만 가능합니다',
                }
            ]
        })
    })


    it("Testing the successful post creation of post objects",async () => {
        const postCreateObject = await getPostCreateObject("ko")
        await expect(postCreateObject.validateAsync({
            author: user._id.toString(),
            authorName: user.name,
            summary: "test",
            text: "test",
        }, validateOptions)).resolves.toMatchObject({
            author: user._id.toString(),
            authorName: user.name,
            summary: "test",
            text: "test",
        })
    })

    it("Testing the validation of required fields in the post creation object", async () => {
        const postCreateObject = await getPostCreateObject("ko")
        await expect(postCreateObject.validateAsync({
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '작성자은 필수 값 입니다',
                },
                {
                    message: '작성자 이름은 필수 값 입니다',
                },
                {
                    message: '요약은 필수 값 입니다',
                },
                {
                    message: '내용은 필수 값 입니다',
                }
            ]
        })

    })

    it("Testing the validation of the field pattern in the post creation object", async () => {
        const postCreateObject = await getPostCreateObject("ko")
        
        await expect(postCreateObject.validateAsync({
            author: "123",
            authorName: "12",
            summary: "12",
            text: "12"
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '작성자은 올바른 형식이 아닙니다',
                },
                {
                    message: '작성자 이름은 최소 3글자 이상만 가능합니다',
                },
                {
                    message: '요약은 최소 3글자 이상만 가능합니다',
                },
                {
                    message: '내용은 최소 3글자 이상만 가능합니다',
                }
            ]
        })
    })

    it("Testing the validation of the field type in the post creation object", async () => {
        const postCreateObject = await getPostCreateObject("ko")
        await expect(postCreateObject.validateAsync({
            author: 123,
            authorName: 123,
            summary: 123,
            text: 123
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '작성자은 문자열만 가능합니다.',
                },
                {
                    message: '작성자 이름은 문자열만 가능합니다.',
                },
                {
                    message: '요약은 문자열만 가능합니다.',
                },
                {
                    message: '내용은 문자열만 가능합니다.',
                }
            ]
        })
    })

    it("Testing the validation of field length in the post creation object", async () => {
        const postCreateObject = await getPostCreateObject("ko")
        await expect(postCreateObject.validateAsync({
            author: "#".repeat(25),
            authorName: "a".repeat(21),
            summary: "b".repeat(101),
            text: "c".repeat(10001)
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '작성자은 올바른 형식이 아닙니다',
                },
                {
                    message: '작성자 이름은 최대 20글자 이하만 가능합니다',
                },
                {
                    message: '요약은 최대 100글자 이하만 가능합니다',
                },
                {
                    message: '내용은 최대 10000글자 이하만 가능합니다',
                }
            ]
        })
    })

    it("Testing the validation of field length and special characters in the post creation object.", async () => {
        const postCreateObject = await getPostCreateObject("ko")
        await expect(postCreateObject.validateAsync({
            author: user._id.toString()+"1",
            authorName: "###$$$",
            summary:"success",
            text: "go home"
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '작성자은 올바른 형식이 아닙니다',
                },
                {
                    message: '작성자 이름은 올바른 형식이 아닙니다',
                }
            ]
        })
    })

    it("Tests the successful validation of post update objects.", async () => {
        const postObject = await getPostUpdateObject("ko")
        await expect(postObject.validateAsync({
            _id: post._id.toString(),
            author: user._id.toString(),
            authorName: user.name,
            summary: "test",
            text: "test",
            parent: post._id.toString(),
            relatedPosts: [post._id.toString()],
        }, validateOptions)).resolves.toMatchObject({
            author: user._id.toString(),
            authorName: user.name,
            summary: "test",
            text: "test",
            parent: post._id.toString(),
            relatedPosts: [post._id.toString()],
        })
    })
    it("Tests the validation of required fields in the post update object.", async () => {
        const postObject = await getPostUpdateObject("ko")
        await expect(postObject.validateAsync({
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '게시물 아이디은 필수 값 입니다',
                }
            ]
        })
    })
    it("Tests the validation of minimum length in the post update object.", async () => {
        const postObject = await getPostUpdateObject("ko")
        await expect(postObject.validateAsync({
            _id: "123",
            author: "123",
            authorName: "12",
            summary: "12",
            text: "12",
            parent: "123",
            relatedPosts: ["123"],
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '게시물 아이디은 올바른 형식이 아닙니다',
                },
                {
                    message: '작성자은 올바른 형식이 아닙니다',
                },
                {
                    message: '작성자 이름은 최소 3글자 이상만 가능합니다',
                },
                {
                    message: '요약은 최소 3글자 이상만 가능합니다',
                },
                {
                    message: '내용은 최소 3글자 이상만 가능합니다',
                },
                {
                    message: '부모 게시물은 올바른 형식이 아닙니다',
                },
                {
                    message: 'relatedPosts[0]은 올바른 형식이 아닙니다',
                }
            ]
        })
    })
    it("Tests the validation of field type in the post update object.", async () => {
        const postObject = await getPostUpdateObject("ko")
        await expect(postObject.validateAsync({
            _id: post._id.toString(),
            author: 123,
            authorName: 123,
            summary: 123,
            text: 123,
            parent: 123,
            relatedPosts: [123],
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '작성자은 문자열만 가능합니다.',
                },
                {
                    message: '작성자 이름은 문자열만 가능합니다.',
                },
                {
                    message: '요약은 문자열만 가능합니다.',
                },
                {
                    message: '내용은 문자열만 가능합니다.',
                },
                {
                    message: '부모 게시물은 문자열만 가능합니다.',
                },
                {
                    message: 'relatedPosts[0]은 문자열만 가능합니다.'
                }
            ]
        })
    })
    it("Tests the validation of maximum length in the post update object.", async () => {
        const postObject = await getPostUpdateObject("ko")
        await expect(postObject.validateAsync({
            _id: post._id.toString() + "1",
            author: "###",
            authorName: "a".repeat(21),
            summary: "b".repeat(101),
            text: "c".repeat(10001),
            parent: post._id.toString() + "1",
            relatedPosts: [post._id.toString() + "1"],
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '게시물 아이디은 올바른 형식이 아닙니다',
                },
                {
                    message: '작성자은 올바른 형식이 아닙니다',
                },
                {
                    message: '작성자 이름은 최대 20글자 이하만 가능합니다',
                },
                {
                    message: '요약은 최대 100글자 이하만 가능합니다',
                },
                {
                    message: '내용은 최대 10000글자 이하만 가능합니다',
                },
                {
                    message: '부모 게시물은 올바른 형식이 아닙니다',
                },
                {
                    message: 'relatedPosts[0]은 올바른 형식이 아닙니다',
                }
            ]
        })
    })
    it("Tests the validation of field length and special characters in the post update object.", async () => {
        const postObject = await getPostUpdateObject("ko")
        await expect(postObject.validateAsync({
            _id: post._id.toString(),
            author: user._id.toString()+"1",
            authorName: "###$$$",
            summary:"success",
            text: "go home",
            parent: post._id.toString(),
            relatedPosts: [post._id.toString()],
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '작성자은 올바른 형식이 아닙니다',
                },
                {
                    message: '작성자 이름은 올바른 형식이 아닙니다',
                }
            ]
        })
    })

    it("Tests the successful validation of post delete objects.", async () => {
        const postObject = await getPostDelObject("ko")
        await expect(postObject.validateAsync({
            _id: post._id.toString(),
        }, validateOptions)).resolves.toMatchObject({
            _id: post._id.toString(),
        })
    })

    it("Tests the validation of required fields in the post delete object.", async () => {
        const postObject = await getPostDelObject("ko")
        await expect(postObject.validateAsync({
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '게시물 아이디은 필수 값 입니다',
                }
            ]
        })
    })

    it("Tests the validation of minimum length in the post delete object.", async () => {
        const postObject = await getPostDelObject("ko")
        await expect(postObject.validateAsync({
            _id: "123",
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '게시물 아이디은 올바른 형식이 아닙니다',
                }
            ]
        })
    })

    it("Tests the validation of field type in the post delete object.", async () => {
        const postObject = await getPostDelObject("ko")
        await expect(postObject.validateAsync({
            _id: 123,
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '게시물 아이디은 문자열만 가능합니다.',
                }
            ]
        })
    })

    it("Tests the validation of maximum length in the post delete object.", async () => {
        const postObject = await getPostDelObject("ko")
        await expect(postObject.validateAsync({
            _id: post._id.toString() + "1",
        }, validateOptions)).rejects
        .toMatchObject({
            details: [
                {
                    message: '게시물 아이디은 올바른 형식이 아닙니다',
                }
            ]
        })
    })


})