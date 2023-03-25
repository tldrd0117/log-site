import User from '../models/user.model'
import { MessageStatusError, MessageErrors } from '../utils/error'
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
    const isPassedName = await checkNameDuplicate(userJoin.name)
    const isPassedEmail = await checkEmailDuplicate(userJoin.email)
    const errors = []
    if(!isPassedName){
        errors.push(new MessageStatusError('user.name.duplicated', 400))
    }
    if(!isPassedEmail){
        errors.push(new MessageStatusError('user.email.duplicated', 400))
    }
    if(errors.length > 0) throw new MessageErrors(errors)
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