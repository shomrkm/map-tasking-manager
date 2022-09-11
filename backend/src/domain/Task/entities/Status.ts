import { ErrorResponse } from '@/interface/controller/errorResponse';
import { ValueObject } from '../../base/ValueObject';

export const statusTypes = ['unassigned', 'mapping', 'validating', 'finished'] as const;
export type StatusType = typeof statusTypes[number];

function isStatus(status: string): status is StatusType {
  return statusTypes.includes(status as StatusType);
}

export class Status extends ValueObject<StatusType> {
  constructor(status: string) {
    if(!isStatus(status)){
      throw new ErrorResponse(`Status must be ${statusTypes.join(',')}`, 400);
    }
    super(status);
  }
}