import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import quizRoutes from './routes/quiz.js';
import takeRoutes from './routes/take.js';
import resultRoutes from './routes/result.js';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "32mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "32mb", extended:true}));
app.use(cors());

app.use('/quizes', quizRoutes);
app.use('/quiz', takeRoutes);
app.use('/result', resultRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('welcome to quizzy API');
});

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

const connectDB = async() => {
    try {
        await mongoose.connect(MONGO_URI);
        app.listen(PORT, () =>console.log(`Server running on port: ${PORT}`));
    } catch(err) {
        console.log("Connection to MongoDB failed",err.message);
    }
}

connectDB();

mongoose.connection.on("open", () => console.log("Connection to database has been established successfully"));