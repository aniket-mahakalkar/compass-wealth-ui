import { request } from "./axios";

export const InvestService = {
  getAllInvestments: () => {
    return request.post<Record<string, never>, unknown>("/api/v1/assets", {});
  },
};