import { Router } from "express";
import serveFormPage from "../../controllers/users/new-user-form.controller.js";

const newUserRoute = Router();

newUserRoute.get('/', serveFormPage);

export default newUserRoute;