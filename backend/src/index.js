import express from "express"
import router from "./router/users.js"
import database from "./config/database.js"
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/v1', router)

const port = 3000

database.db.sync({ force: true })

.then((_)=> {
    app.listen(port, () => {
    console.info(`Servidor rodando na porta ${port}`)
})

})
.catch((e)=> {
    console.log("não conectou com o banco")
})
