const { getUsers, getUserByUsername } = require("../contollers")


const userRouter = require("express").Router()

userRouter.get('/', getUsers)

userRouter.get('/:username', getUserByUsername)

module.exports = { userRouter }