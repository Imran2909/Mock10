const express = require("express")
const { UserModel } = require("../Models/User.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()

const UserRouter = express.Router()
UserRouter.use(express.json())

UserRouter.post("/register", (req, res) => {
    const {username, mail, password } = req.body
    try {
        bcrypt.hash(password, 4 , async (err, hash) => {
            if (err) {
                res.send(err)
            }
            else {
                const data = new UserModel({username,mail, password: hash })
                await data.save()
                res.send({"message":"SignUp successfull",data})
            }
        })
    } catch (error) {
        res, send(error)
    }
})

UserRouter.post("/login", async (req, res) => {
    const { mail, password } = req.body;
    const userAvail = await UserModel.find({mail})
    console.log(userAvail)
    if (userAvail.length > 0) {
        try {
            bcrypt.compare(password, userAvail[0].password, async (err, result) => {
                if(result==true){
                let token = jwt.sign({ UserId: userAvail[0]._id }, process.env.secretKey)
                res.send({ "message": "Login Successful", token,userAvail })
            }
            else if(result==false){
                    res.send({ "message": "Invalid Credentials" })
                }
            })
        } catch (error) {
            res.send(error)
        }
    }
    else {
        res.send({"message":"User not found  , Please Signup first"})
    }
})

UserRouter.get("/", async (req, res) => {
    const data = await UserModel.find()
    res.send(data)
})

module.exports = {
    UserRouter
}