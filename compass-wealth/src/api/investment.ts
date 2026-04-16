
import type { Investment } from "@/pages/Investments/ManageInvestment";
import { request } from "./axios";


type InvestmentsResponse = {
  data: Investment[];
};


export const InvestService = {
  getAllInvestments: () => {
    return request.get<InvestmentsResponse>("/api/v1/assets", {});
  },

  addInvestment: (payload: Investment) => {
    return request.post("/api/v1/asset", payload);
  },

  updateInvestment: (payload: Investment) => {
    return request.put(`/api/v1/asset`, payload);
  }

};