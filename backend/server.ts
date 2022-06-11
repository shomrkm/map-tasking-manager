import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { connectDB } from './config/db';
import { router as tasks } from './routes/Tasks';
import { router as users } from './routes/Users';

dotenv.config({ path: './config/.env' });

connectDB();

const app: Application = express();

// Body parser
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Mount Router
app.use('/api/v1/tasks', tasks);
app.use('/api/v1/users', users);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(colors.yellow.bold(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
});

// Handle unhandled rejections
process.on('unhandledRejection', (err: Error, promise) => {
  console.log(colors.red.bold(`Error: ${err.message}`));
  server.close(() => process.exit(1));
});
