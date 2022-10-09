import {Request, Response, Router} from "express";
import {Paginator, RequestWithBody, RequestWithParams, RequestWithQuery} from "../types/types";
import {QueryUserModel, UserDBType} from "../types/userTypes";
import {UserViewModel} from "../models/user/user-view-model";
import {usersQueryRepository} from "../repositories/users/query-users-repository";
import {CreateUserModel} from "../models/user/create-user-model";
import {usersService} from "../domain/users-service";
import {UriParamsUserModel} from "../models/user/uri-params-user-model";

export const usersRouter = Router({});

usersRouter.get("/", async (req: RequestWithQuery<QueryUserModel>, res: Response<Paginator<UserViewModel>>) => {
    const users = await usersQueryRepository.findUsers(req.query);
    res.json(users);
});

usersRouter.post("/", async (req: RequestWithBody<CreateUserModel>, res: Response<UserDBType>) => {
    const createdUser: UserDBType = await usersService.createUser(req.body.login, req.body.password, req.body.email);

    if (!createdUser) {
        res.sendStatus(400);
        return;
    }
    res.json(createdUser);
});

usersRouter.delete("/:id", async (req: RequestWithParams<UriParamsUserModel>, res: Response) => {
    const isDeleted: boolean = await usersService.deleteUser(req.params.id);

    if (isDeleted) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});