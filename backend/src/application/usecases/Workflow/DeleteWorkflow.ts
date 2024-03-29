import { ErrorResponse } from '@/shared/core/utils';
import { Workflow } from '@/domain/entities';

import { IWorkflowRepository } from '../../repositories/IWorkflowRepository';

export class DeleteWorkflow {
  private workflowRepository: IWorkflowRepository;

  constructor(workflowRepository: IWorkflowRepository) {
    this.workflowRepository = workflowRepository;
  }

  public async execute(workflowId: string): Promise<Workflow> {
    if (!(await this.workflowRepository.find(workflowId))) {
      throw new ErrorResponse(`Workflow was not found with id of ${workflowId}`, 404);
    }

    return await this.workflowRepository.delete(workflowId);
  }
}
