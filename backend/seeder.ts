import fs from 'fs';
import { connect, Schema } from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import { Workflow, Task, User, Comment } from './src/infrastructure/mongoose/models';

dotenv.config({ path: './config/.env' });

// Usage
// npx ts-node seeder <option>

// Connect to DB
connect(process.env.MONGO_URI as string);

// Read JSON files
const workflows = JSON.parse(fs.readFileSync(`${__dirname}/_data/workflows.json`, 'utf-8'));
const tasks = JSON.parse(fs.readFileSync(`${__dirname}/_data/tasks.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));
const comments = JSON.parse(fs.readFileSync(`${__dirname}/_data/comments.json`, 'utf-8'));

// Import into DB
const importData = async () => {
  try {
    await Workflow.create(workflows);
    await Task.create(tasks);
    await User.create(users);
    await Comment.create(comments);
    console.log(colors.green.inverse('Data Imported...'));
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Workflow.deleteMany();
    await Task.deleteMany();
    await User.deleteMany();
    await Comment.deleteMany();
    console.log(colors.red.inverse('Data Destroyed...'));
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
