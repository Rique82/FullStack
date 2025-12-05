import { Sequelize } from "sequelize"

class Database {
    constructor() {
        this.init()
    }

    init(){
        this.db = new Sequelize({
            database: process.env.DBname ?? "FullstackBanco",
            host: process.env.DBhost ?? "dpg-d4plffer433s739f81j0-a",
            username: process.env.DBusername ?? "fullstackbanco_user",
            password: process.env.DBpassword ?? "uIKWcjXaxnAeT5BYY8pISvTg3E4hSoNV",
            dialect: process.env.dialectDB ?? "postgres"
        })
    }
}

export default new Database()