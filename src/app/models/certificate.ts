export interface Certificate {
    id?: number;
    certificateTypeId?: number;
    certificateTypeName?: string;
    issueDate: Date;
    expiryDate: Date;
    crewId?: number;
    name?: string;
  }