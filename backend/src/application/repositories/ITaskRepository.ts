import { Task, Comment } from '@/domain/entities';

export interface ITaskRepository {
  findAll(): Promise<Task[]>;
  findById(id: string): Promise<Task>;
  findByWorkflowId(workflowId: string): Promise<Task[]>;
  save(task: Task): Promise<Task>;
  delete(taskId: string): Promise<Task>;
  findAllComments(): Promise<Comment[]>;
  findCommentById(id: string): Promise<Comment>;
  findComments(taskId: string): Promise<Comment[]>;
  addComment(comment: Comment): Promise<Comment>;
}
