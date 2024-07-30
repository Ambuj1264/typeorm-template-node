export interface TaskInput {
  taskCategory?: string;
  taskType?: string;
  taskStatus?: string;
  taskName: string;
  agencyId: string;
  ActivityID?: string;
}

export interface IdforTaskInput {
  id?: string;
}
