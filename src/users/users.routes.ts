import { Application } from "express";
import { CommonRoutesConfig } from "../shared/classes/CommonRoutesConfig";
import * as Users from "./controllers/user.controller";
import { body } from "express-validator";
import bodyValidationMiddleware from "../shared/middlewares/body.validation.middleware";
import userValidationMiddleware from "./middlewares/user.validation.middleware";

export default class UserRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, "UserRoutes", "/v1/users");
    }

    configureRoutes(): Application {
        this.app.route(this.apiPrefix + "/:id")
            .get(
                userValidationMiddleware.userExists,
                Users.findOne
            )
            .put(
                userValidationMiddleware.userExists,
                body("username").isString().optional({ values: "null" }),
                body("email").isEmail().optional({ values: "null" }),
                body("password").isLength({ min: 6 }).optional({ values: "null" }),
                bodyValidationMiddleware.verifyBodyFieldsError,
                Users.update
            )
            .delete(
                userValidationMiddleware.userExists,
                Users.remove
            )

        this.app.route(this.apiPrefix)
            .post(
                body("username").isString().withMessage("Il campo username è obbligatorio e deve essere una stringa."),
                body("email").isEmail().withMessage("Il campo email è obbligatorio e deve essere una stringa."),
                body("password").isLength({ min: 6 }),
                bodyValidationMiddleware.verifyBodyFieldsError,
                Users.create
            )
            .get(Users.findAll)

        return this.app;
    }
}