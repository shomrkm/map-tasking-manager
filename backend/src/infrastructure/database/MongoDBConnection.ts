import { Task as TaskModel } from './models';
import { IDBConnection } from '@/interface/database/IDBConnection';
import { TaskDTO, CreateTaskDTO } from '@/interface/database/dto/taskDto';
import { ErrorResponse } from '@/interface/controller/errorResponse';

export class MongoDBConnection extends IDBConnection {
  constructor() {
    super();
  }

  public async findAllTasks(): Promise<TaskDTO[]> {
    const tasks: TaskDTO[] = await TaskModel.find()
      .populate({ path: 'createUser', select: 'name avatar' })
      .populate({ path: 'assignedUsers', select: 'name avatar' });
    return tasks;
  }

  public async findTasksByWorkflowId(workflowId: string): Promise<TaskDTO[]> {
    const tasks: TaskDTO[] = await TaskModel.find({ workflow: workflowId })
      .populate({ path: 'createUser', select: 'name avatar' })
      .populate({ path: 'assignedUsers', select: 'name avatar' });
    return tasks;
  }

  public async findTaskById(taskId: string): Promise<TaskDTO> {
    const task: TaskDTO = await TaskModel.findById(taskId)
      .populate({ path: 'createUser', select: 'name avatar' })
      .populate({ path: 'assignedUsers', select: 'name avatar' });
    if (!task) {
      throw new ErrorResponse(`Task was not found with id of ${taskId}`, 404);
    }

    return task;
  }

  public async createTask(task: CreateTaskDTO): Promise<TaskDTO> {
    return (await TaskModel.create(task)) as TaskDTO;
  }

  public async deleteTask(taskId: string): Promise<TaskDTO> {
    const task = await TaskModel.findById(taskId);
    if (!task) {
      throw new ErrorResponse(`Task was not found with id of ${taskId}`, 404);
    }
    task.remove();
    return task;
  }
}
