import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import axios from 'axios';
import geoip from 'geoip-lite'

const secretKey = crypto.randomBytes(32).toString('hex');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.COMPANY_EMAIL,
        pass: process.env.COMPANY_PASSWORD
    }
});

function fetchGeolocation(ipAddress) {
    const geoData = geoip.lookup(ipAddress);
    return geoData;
}

// Admin Login Function
export const userLogin = async (request, response) => {
    const { email, password } = request.body;
    const ipv4 = await axios.get('https://api.ipify.org?format=json');

    const user = {
        name: email,
        time: new Date().toLocaleString()
    };

    const emailContent = `
    <h2>Welcome to SocialTitli, ${user.name}!</h2>
    <p>You have successfully logged in as Admin</p>
    <p>Login Time: ${user.time}</p>
    <p>IP V4 Address: ${ipv4.data.ip}</p>
    <p>IP V4 Location: ${fetchGeolocation(ipv4.data.ip).city} ${fetchGeolocation(ipv4.data.ip).region} ${fetchGeolocation(ipv4.data.ip).country}</p>`;

    const mailOptions = {
        from: 'ks.aerospace19@gmail.com',
        to: email,
        subject: 'Login Notification',
        html: emailContent
    };

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ email: email }, secretKey, { expiresIn: '1h' });
        await transporter.sendMail(mailOptions);
        response.status(200).json({ message: 'Login successful. Email notification sent.' });
    } else {
        response.status(401).json({ message: 'Invalid email or password' });
    }
}