export interface AssigendServicesInput {
  employeeId?: string;
  agencyId?: string;
  clientId?: string;
  serviceId?: string;
  taskId?: JSON;
  servicesStatus?: string;
  refrencId: string;
  endService: string;
  startService: string;
  ServiceCode: string;
  PayorName: string;
}

export interface AssigendServicesInputArray
  extends Array<AssigendServicesInput> {}
export interface IdInputForAssignedServices {
  id?: string;
}

export interface ServiceObj {
  id: string;
  serviceStatus: string;
}
