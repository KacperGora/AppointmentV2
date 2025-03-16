import { ServiceType } from "@types";

export type PayloadType = {
  sortOrder: 'ASC' | 'DESC';
  sortBy: keyof ServiceType;
  search?: string;
};
