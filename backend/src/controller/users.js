import ServiceUser from "../service/users.js"

class ControllerUser {

    async FindAll(_, res) {
        try {

            const nomes = await ServiceUser.FindAll()
            console.log(nomes)
            res.status(200).send({ nomes })

        } catch (error) {
            res.status(500).send({ error: error.message })
        }

    }

    async FindOne(req, res) {
        try {
            const id = req.params.id || req.headers?.user?.id

            const user = await ServiceUser.FindOne(id)
            res.status(200).send({ user })

        } catch (error) {
            res.status(500).send({ error: error.message })
        }

    }

    async Create(req, res) {
        try {

            const loggedUser = req.headers?.user
            let permissao = 1
            if (loggedUser) {
                permissao = req.body.permissao
            }
            const { nome, email, senha, ativo } = req.body
            await ServiceUser.Create(nome, email, senha, ativo, permissao)
            res.status(201).send("Usuario criado com sucesso")

        } catch (error) {
            res.status(500).send({ error: error.message })
        }

    }

    async Update(req, res) {
        try {

            const id = req.params.id || req.headers?.user?.id

            const { nome, email, senha, ativo } = req.body
            ServiceUser.Update(id, nome, email, senha, ativo)
            res.status(200).send()

        } catch (error) {
            res.status(500).send({ error: error.message })
        }

    }
    async Delete(req, res) {
        try {
            const id = req.params.id || req.headers?.user?.id
            await ServiceUser.Delete(id)
            res.status(204).send("usuario deletado com sucesso")

        } catch (error) {
            res.status(500).send({ error: error.message })
        }

    }

    async Login(req, res) {

        try {

            const { email, senha } = req.body
            const token = await ServiceUser.Login(email, senha)
            res.status(200).send({ token })
        } catch (error) {
            res.status(500).send({ error: error.message })
        }

    }

}

export default new ControllerUser()