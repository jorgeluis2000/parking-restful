import { createToken, decodeJsonWebToken, encrypt } from '../utils/security/security.secure.js'
import { security } from '../environments/security.env.js'


const lookMyToken = () => {
    const myToken = encrypt(createToken(security.MAINWORD, 'HS512'))
    console.log('Mi token:', myToken)
    console.log(decodeJsonWebToken(myToken))
}

lookMyToken()