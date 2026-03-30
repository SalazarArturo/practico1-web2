import { Router } from "express";
import { serveInitPage } from "../controllers/users/login.controller.js";

const initRouter = Router();

initRouter.get('/', serveInitPage)

export default initRouter;