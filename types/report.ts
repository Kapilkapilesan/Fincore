export interface Report {
  id: string;
  type: string;
  data: any;
  generatedAt: string;
  generatedBy: string;
}

export type ReportType = 
  | 'loan_summary'
  | 'collection_summary'
  | 'customer_summary'
  | 'branch_summary'
  | 'financial_summary';








