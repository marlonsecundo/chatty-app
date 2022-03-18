import API from "./api";

class BaseService {
  api: API;

  get axiosAPI() {
    return this.api.axiosApi;
  }

  constructor(api: API) {
    this.api = api;
  }
}

export default BaseService;
