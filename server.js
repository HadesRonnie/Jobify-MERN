import 'express-async-errors';
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const port = process.env.PORT || 5000;
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';

//routers
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
//public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
//middleware
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const __dirname = dirname(fileURLToPath(import.meta.url));
const __buildDirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.static(path.resolve(__buildDirname, './client/dist')));

// cors

app.use(
  cors({
    origin: '*',
  })
);

//ROUTES
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);

//NOT FOUND MIDDLEWARE
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

//ERROR MIDDLEWARE
app.use(errorHandlerMiddleware);

try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('connected to database...');

  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
