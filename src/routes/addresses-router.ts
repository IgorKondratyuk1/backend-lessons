import {Request, Response, Router} from "express";
import {addressesRepository} from "../repositories/addresses-repository";


export const adressesRouter = Router({});

adressesRouter.get('/', (req: Request, res: Response) => {
    const addresses = addressesRepository.findAddresses();
    res.send(addresses);
});
adressesRouter.delete('/:id', (req: Request, res: Response) => {
    if (!req.params.id) {
        res.sendStatus(404);
        return;
    }

    const isDeleted = addressesRepository.deleteAddress(+req.params.id);

    if (isDeleted) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});