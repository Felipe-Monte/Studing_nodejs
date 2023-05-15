const appError = require("../utils/appError")

  class UserController {
    create(request, response) {
      const { name, email, password } = request.body

      if (!name) {
        throw new appError("Name is mandatory")
      }

      response.json({ name, email, password })
    }
  }

module.exports = UserController