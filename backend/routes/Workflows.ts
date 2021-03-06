import express from 'express';
import { advancedResults, protect, authorize } from '../middleware';
import {
  getWorkflows,
  getWorkflow,
  createWorkflow,
  updateWorkflow,
  deleteWorkflow,
} from '../controller/workflows';
import { Workflow } from '../models/Workflows';
import { router as taskRouter } from './Tasks';

export const router = express.Router();

router.use('/:workflowid/tasks', taskRouter);

router
  .route('/')
  .get(advancedResults(Workflow, [{ path: 'createUser', select: 'name avatar' }]), getWorkflows)
  .post(protect, authorize('publisher', 'admin'), createWorkflow);

router
  .route('/:id')
  .get(getWorkflow)
  .put(protect, authorize('publisher', 'admin'), updateWorkflow)
  .delete(protect, authorize('publisher', 'admin'), deleteWorkflow);
