import { Application } from "express";
import { CommonRoutesConfig } from "../shared/classes/CommonRoutesConfig";
import * as Products from "./controllers/product.controller";
import { body } from "express-validator";
import bodyValidationMiddleware from "../shared/middlewares/body.validation.middleware";
import productValidationMiddleware from "./middlewares/product.validation.middleware";

export default class ProductRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, "ProductRoutes", "/v1/products");
    }

    configureRoutes(): Application {
        this.app.route(this.apiPrefix + "/:id")
            .get(
                productValidationMiddleware.productExists,
                Products.findOne
            )
            .put(
                productValidationMiddleware.productExists,
                body("code").isString().optional({ values: "null" }),
                body("description").isString().optional({ values: "null" }),
                body("um").isString().isLength({ max: 2 }).optional({ values: "null" }),
                body("price").isNumeric().optional({ values: "null" }),
                body("discontinued").isBoolean().optional({ values: "null" }),
                productValidationMiddleware.productCodeExists,
                productValidationMiddleware.productDiscontinued,
                bodyValidationMiddleware.verifyBodyFieldsError,
                Products.update
            )
            .delete(
                productValidationMiddleware.productExists,
                Products.remove
            )

        this.app.route(this.apiPrefix)
            .post(
                body("code").isString().withMessage("Il campo code è obbligatorio e deve essere una stringa."),
                body("description").isString().withMessage("Il campo description è obbligatorio e deve essere una stringa."),
                body("um").default("nr").isString().isLength({ max: 2 }),
                body("price").default(0).isNumeric(),
                body("discontinued").default(false).isBoolean(),
                productValidationMiddleware.productCodeExists,
                bodyValidationMiddleware.verifyBodyFieldsError,
                Products.create
            )
            .get(Products.findAll)

        return this.app;
    }
}