const mogoose = require('mongoose')

const connectDB = async () => {
    const conn = await mogoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
}
module.exports = connectDB;