export interface VisitInput {
  assignedServiceId?: string;
  startVisit?: string;
  endVisit?: string;
  comment: string;
  isApproved: boolean;
}

export interface SearchObj {
  startVisit?: string;
  endVisit?: string;
  agencyId?: string;
}
export interface SearchManual {
  agencyId?: string;
  search: string;
}
