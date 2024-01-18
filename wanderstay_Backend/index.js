const express = require("express");
const app = express();
require('dotenv').config();
const { env } = require('process');
const dbConfig = require('./db')
const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/userRoute')
const cors = require('cors');
const nodemailer = require("nodemailer")
app.use(cors());

const bookingsRoute = require('./routes/bookingsRoute');
app.use(express.json())

app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute);



//nodemailer 

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    }
});


app.post('/api/send-email', async (req, res) => {
    const { fromdate, email, todate, room, userid, totaldays, totalamount } = req.body;
    const mailOptions = {
        from: '"Confirmation" <omjadav04@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Booking Confirmation ✔", // Subject line
        html: `<h1>Your Room is Booked Successfully...</h1>
        <hr />
        <h3>Room: <b>${room.name}</b></h3>
        <table border=1>
        <tr>
        <th>User ID</th>
        <td>${userid}</td>
        </tr>
        <tr>
        <th>Check In</th>
        <td>${fromdate}</td>
        </tr>
        <tr>
        <th>Check Out</th>
        <td>${todate}</td>
        </tr>
        <tr>
        <th>Total Days</th>
        <td>${totaldays}</td>
        </tr>
        <tr>
        <th>Total Amount</th>
        <td>${totalamount}</td>
        </tr>
        </table>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});



const port = process.env.PORT;
app.listen(port, () => { console.log(`Server is running on ${port} 🔥`) })
