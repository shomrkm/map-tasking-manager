import { Workflow } from '@/domain/Workflow';
import { IWorkflowRepository } from '../repositories/IWorkflowRepository';

export class CreateWorkflow {
  private workflowRepository: IWorkflowRepository;

  constructor(workflowRepository: IWorkflowRepository) {
    this.workflowRepository = workflowRepository;
  }

  public async execute(
    title: string,
    description: string,
    status: string,
    createUser: string
  ): Promise<Workflow> {
    const workflow = new Workflow({
      title,
      description,
      status,
      createUser,
    });

    // TODO: Check authorization.
    return await this.workflowRepository.save(workflow);
  }
}