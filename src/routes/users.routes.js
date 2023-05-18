const { Router } = require("express")

const UserController = require("../controllers/usersController")

const usersRoutes = Router()

const usersController = new UserController()

usersRoutes.post("/", usersController.create)

module.exports = usersRoutes