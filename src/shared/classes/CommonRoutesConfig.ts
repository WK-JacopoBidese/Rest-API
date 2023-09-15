import { Application } from "express";

export abstract class CommonRoutesConfig {
    app: Application;
    name: string;
    apiPrefix: string;

    constructor(app: Application, name:string, apiPrefix:string) {
        this.app = app;
        this.name = name;
        this.apiPrefix = apiPrefix;
        this.configureRoutes();
    }

    abstract configureRoutes(): Application;

    getName(): string {
        return this.name;
    }
}