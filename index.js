require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// ****************************** importing custom packages *****************************//
const connectDB = require('./config/db/connect');
const authRoutes = require('./routes/auth_routes');
const userRoutes = require('./routes/user_routes');

// ****************************** body parsers ******************************//
app.use(express.urlencoded({ extended: false }));

// ****************************** cookie parser ***************************//
app.use(cookieParser())

// ****************************** static files *******************************//
app.use(express.static('./public'));

// ******************************* main routes ******************************//
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// ****************************** spinning up the server *******************************//
const PORT = process.env.PORT || 5000;
const start = async (PORT) => {
    try {
        await connectDB(process.env.MONGO_DB_URI);
        app.listen(PORT, () => {
            console.log(`Server is running successfully on port ${PORT}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start(PORT);