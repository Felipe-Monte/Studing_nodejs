const { Router } = require("express")

const UserController = require("../controllers/usersController")

const usersRoutes = Router()

// Testing Middleware
const usersController = new UserController()

function myMiddleware(request, response, next) {
  console.log("passei pelo middleware")

  if (!request.body.isAdmin) {
    return response.json({ message: "user unauthorized" })
  }

  next()
}

usersRoutes.post("/", myMiddleware, usersController.create)

module.exports = usersRoutes