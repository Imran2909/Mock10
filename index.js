const express = require("express")
const { Server } = require("socket.io")
const http = require("http")
const app = express()
const { connection } = require("./config/db")
const { UserRouter } = require("./Routes/User.Route")
const cors = require('cors')
app.use(express.json())
app.use(cors())
const { sendMail } = require("./sendMail")

const httpServer = http.createServer(app)

const wss = new Server(httpServer)

app.get("/", (req, res) => {
    res.end("Homee")
})

app.use("/user", UserRouter)

app.get("/mailVerf", sendMail)

wss.on("connection", (socket) => {
    console.log("client connected")
    socket.on("msg", (evnt) => {
        socket.emit("msgo", evnt)
        socket.broadcast.emit("msgo", evnt)
        console.log(evnt)
    })
})

httpServer.listen(2020, async () => {
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log("Port 2020")
})
