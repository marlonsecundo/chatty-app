import DotEnv from "../core/contants/dotenv";
import API from "./api";
import AsyncStorageService from "./async-storage.service";
import AuthService from "./auth.service";
import NotificationService from "./notification.service";
import PostService from "./post.service";
import UserService from "./user.service";

class ServiceManager {
  private static _instance: ServiceManager;

  private constructor() {}

  public static getI(): ServiceManager {
    if (!this._instance) this._instance = new ServiceManager();

    return this._instance;
  }

  init = async (dotEnv: DotEnv) => {
    this.api = new API();

    await this.api.init(dotEnv);

    this.authService = new AuthService(this.api);
    this.postService = new PostService(this.api);
    this.userService = new UserService(this.api);
    this.notificationService = new NotificationService(this.api);
    this.asyncStorageService = new AsyncStorageService();
  };

  api!: API;
  authService!: AuthService;
  postService!: PostService;
  userService!: UserService;
  asyncStorageService!: AsyncStorageService;
  notificationService!: NotificationService;
}

export default ServiceManager;
