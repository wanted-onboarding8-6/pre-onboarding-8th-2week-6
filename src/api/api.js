import axios from "axios";

export const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const issueAPI = {
  createIssue: (data) => request.post(`/issue`, data),
  getIssues: () => request.get(`/issue`),
  updateIssue: (issueId, data) => request.put(`/issue/${issueId}`, data),
  deleteIssue: (issueId) => request.delete(`/issue/${issueId}`),
};

export const nameAPI = {
  getNames: () => request.get(`/name`),
};
