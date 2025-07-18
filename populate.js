import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
import { readFile } from 'fs/promises';

import Job from './models/JobModel.js';
import User from './models/UserModel.js';

try {
  await mongoose.connect(process.env.MONGO_URL);
  const user = await User.findOne({ email: 'test@test.com' });
  const jsonJobs = JSON.parse(
    await readFile(new URL('./utils/mockData.json', import.meta.url), 'utf-8')
  );

  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });

  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log('Success!!!');
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
