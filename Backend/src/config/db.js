const mongoose = require("mongoose")
async function connectdb() {
   try{ mongoose.connect(process.env.MONGO_URL)
    console.log("DB is connected")

    }
    catch(err){
        console.log(err)
    }
}
module.exports = connectdb