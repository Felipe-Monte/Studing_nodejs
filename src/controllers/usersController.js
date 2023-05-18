const { hash } = require("bcryptjs")
const appError = require("../utils/appError")

const sqliteConnection = require('../database/sqlite')

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body

    const database = await sqliteConnection()
    const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if (checkUserExist) {
      throw new appError("Este email já esta em uso !")
    }

    const hashedPassword = await hash(password, 8)

    await database.run("INSERT INTO users  (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])

    return response.status(201).json()
  }
}

module.exports = UserController