import User from "../model/users.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
const JWT_SEGREDO = "blackdiamond"
const SALT = 10

class ServiceUser {

    async FindAll(){
        return User.findAll()
    }

    async FindOne(id){
        if(!id){
            throw new Error("favor informar o ID")
        }

        const user = await User.findByPk(id)

        if(!user){
            throw new Error(`usuario ${id} não enontrado`)
        }

        return user
    }
    
    async Create(nome, email, senha, ativo, permissao){
        if (!nome || !email || !senha ) {
            throw new Error("Favor preencher todos os campos")
        }

        const senhaCrip = await bcrypt.hash(String(senha), SALT)

        await User.create({
            nome, email, senha: senhaCrip, ativo, permissao
        })
    }

    async Update(id, nome, email, senha, ativos){
        
        const user = await User.findByPk(id)
        user.senha = senha
        ? await bcrypt.hash(String(senha), SALT)
        : user.senha
        
        user.nome = nome || user.nome
        
        await user.save()
    }

    async Delete(id){
        if(!id){
            throw new Error("Informar ID valido")
        }

        const user = await User.findByPk(id)
        
        if(!user){
            throw new Error(`usuário ${id} não foi encontrado`)
        }

        await user.destroy()
    }

    async Login(email,senha){
        if(!email || !senha){
            throw new Error("email ou senha invalidos")
        }

        const user = await User.findOne({ where: { email }} )
        
        if(!user || !(await bcrypt.compare(String(senha), user.senha))){
            throw new Error("email ou senha invalidos")
        }

        return jwt.sign(
            { id: user.id,nome: user.nome, permissao: user.permissao }, 
            JWT_SEGREDO, {expiresIn: 60*60})
    }

}

export default new ServiceUser()