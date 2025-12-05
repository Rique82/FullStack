import { Sequelize } from "sequelize"

class Database {
    constructor() {
        this.init()
    }

    init(){
        this.db = new Sequelize({
            database: process.env.DBname ?? "exemplo",
            host: process.env.DBhost ?? "localhost",
            username: process.env.DBusername ?? "root",
            password: process.env.DBpassword ?? "",
            dialect: process.env.dialectDB ?? "mysql"
        })
    }
}

export default new Database()