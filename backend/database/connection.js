import mongoose from 'mongoose';

// MongoDB Connection
const Connection = async () => {
    const URL = process.env.DB
    await mongoose.connect(URL, { useNewUrlParser: true }).then(() => {
        console.log('Connected to MongoDB Database');
    })
    .catch((err) => {
            console.error('Error connecting to MongoDB:', err.message);
    });
}

export default Connection