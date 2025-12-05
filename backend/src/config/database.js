import { Sequelize } from "sequelize"

class Database {
    constructor() {
        this.init()
    }

    init(){
        this.db = new Sequelize({
            database:"fullstackbanco",
            host:"dpg-d4plffer433s739f81j0-a",
            username:"fullstackbanco_user",
            password:"uIKWcjXaxnAeT5BYY8pISvTg3E4hSoNV",
            dialect:"postgres"
        })
    }
}

export default new Database()