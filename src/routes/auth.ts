import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";

export const authRouter = Router({});

authRouter.post("/login", async (req: Request, res: Response) => {
    const haveCreds = await usersService.checkCredentionals(req.body.password, req.body.login);
    if (haveCreds) {
        res.sendStatus(204);
    } else {
        res.sendStatus(401);
    }
});