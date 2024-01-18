const express = require("express");
const app = express();
require('dotenv').config();
const { env } = require('process');
const dbConfig = require('./db')
const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/userRoute')
const cors = require('cors');

app.use(cors());

const bookingsRoute = require('./routes/bookingsRoute')
app.use(express.json())

app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute);

const port = process.env.PORT;
app.listen(port, () => { console.log(`Server is running on ${port} 🔥`) })
