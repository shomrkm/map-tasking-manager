import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateAvator,
} from '@/interface/controller/users';
import { advancedResults } from '@/interface/controller/advancedResults';
import { User } from '@/infrastructure/database/models/Users';
import { protect } from '@/interface/controller/authorization';
import { upload } from '@/interface/controller/uploadImage';

export const router = express.Router();

router.route('/').get(advancedResults(User), getUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

router.route('/:id/avatar').post(protect, upload.single('file'), updateAvator);