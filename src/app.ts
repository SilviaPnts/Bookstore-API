import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: false}));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

const MONGO_URL = 'mongodb+srv://silvia:UnxRXEQZz8yWo1Ka@cluster0.m9uilhf.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));