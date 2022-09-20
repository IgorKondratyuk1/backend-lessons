import {NextFunction, Request, Response, Router} from "express";

export const testRouter = Router({});
export let counter = 0;

export const logRequests = (req: Request, res: Response, next: NextFunction) => {
    counter++;
    next();
};

export const guardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.token === '123') {
        next();
    } else {
        res.sendStatus(403);
    }
}

testRouter.get("/",
    logRequests,
    guardMiddleware,
    (req: Request, res: Response) => {
        res.json({
            data: "Hello, counter: " + counter
        });
    }
);