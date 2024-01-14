import express from 'express';
import mongoose from 'mongoose';
import router from './routes';

const app = express();
const PORT = 3000;
const MONGO_URL = 'mongodb+srv://silvia:UnxRXEQZz8yWo1Ka@cluster0.m9uilhf.mongodb.net/?retryWrites=true&w=majority';

app.use(express.json())
app.use(express.urlencoded({extended: false}));

mongoose.connect(MONGO_URL, {
  dbName: "bookstore-api",
}).then(() => {
  console.log("Database Connected");
}).catch((error) => console.log(error));

app.use("/", router);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});