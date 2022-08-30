const mongoose = require('mongoose');
// ************************ connect to mongo db ***************************//
const connectDB = (dbURL) => { 
    return mongoose.connect(dbURL)
}
module.exports = connectDB;