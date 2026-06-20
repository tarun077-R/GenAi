require("dotenv").config()
const app = require("./src/app")
const connectdb = require("./src/config/db")
connectdb()

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
})