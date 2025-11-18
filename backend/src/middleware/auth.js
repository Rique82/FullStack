import jwt from "jsonwebtoken"
import ServiceUser from "../service/users.js"

const JWT_SEGREDO = "blackdiamond"

export default function authMiddleware(roles = []) {
    return async (req, res, next) => {
        try {

        const token = req.headers['authorization']
        

        if (!token) {
            throw new Error("nao podix acessarix")
        }

        const decoded = jwt.verify(token.split(' ')[1], JWT_SEGREDO)

        const user = await ServiceUser.FindOne(decoded.id)

        if(roles.length && !roles.includes(user.permissao)){
            throw new Error("voce nao tem permissao para realizar esta ação")
        }
        req.headers.user = user
        console.log(decoded)
        next()

    } catch (error) {

        res.status(403).send({
            data: null,
            msg: error.message,
            error: true
        })

    }
    }
}