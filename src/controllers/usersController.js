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

  async update(request, response) {
    const { name, email } = request.body
    const { id } = request.params

    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])

    if (!user) {
      throw new appError("Usuário não econtrado")
    }

    const userWithUpdateEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email])

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new appError("Este email já existe no nosso sistema")
    }

    user.name = name
    user.email = email

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      updated_at = ?
      WHERE id = ?`, 
      [user.name, user.email, new Date(), id]
    )

    return response.json()
  }
}

module.exports = UserController