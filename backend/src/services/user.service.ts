import User from '../models/user.model'
import { MessageError } from '../utils/error'
import { UserJoin, UserLogin } from '../interfaces/user'

/**
 * 
 * @param email 로그인 이메일
 * @param password 로그인 패스워드
 */
const doLogin = async (user: UserLogin) => {
    return await User.findOne({email: user.email, password: user.password})
}

const doJoin = async (userJoin: UserJoin)=>{
    return await createUser(userJoin)
}

const createUser = async (userJoin: UserJoin) => {
    return await User.create(userJoin)
}

const checkEmailDuplicate =async (email: string) => {
    const result = await User.findOne({email})
    return !result
}

const checkNameDuplicate =async (name: string) => {
    const result = await User.findOne({name})
    return !result
}

const getUserByEmail = (email: string) => {
    return User.findOne({ email }, {_id: 0, "name": 1, "email": 1, "role": 1, "createAt": 1})
}


const userService = {
    doLogin,
    doJoin,
    getUserByEmail,
    checkEmailDuplicate,
    checkNameDuplicate
}

export default userService