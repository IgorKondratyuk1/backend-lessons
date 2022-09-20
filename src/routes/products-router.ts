import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";
import {body, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

export const productsRouter = Router({});

const titleValidation = body("title", )
    // .exists({checkFalsy: true}).withMessage("Field title is not exist or value is falsy")
    .isString().withMessage("Not string")
    .notEmpty({ignore_whitespace: true}).withMessage("Field title is empty")
    .trim()
    .isLength({min: 3, max: 10}).withMessage("Min length 3 and max length 10 symbols");

productsRouter.get('/', (req: Request, res: Response) => {
    const productsResult = productsRepository.findProducts(req.query.title?.toString(),
        typeof(req.query.count) === "number" ? req.query.count : null);

    res.send(productsResult);
});
productsRouter.get('/:id', (req: Request, res: Response) => {
    const product = productsRepository.findProductById(+req.params.id);

    if (product) {
        res.send(product);
    } else {
        res.sendStatus(404);
    }
});

productsRouter.post('/',
    titleValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const createdProduct = productsRepository.createProduct(req.body.title.toString());

        res.status(201)
            .json(createdProduct);
});
productsRouter.put('/:id', (req: Request, res: Response) => {
    if (!req.body.title) {
        res.sendStatus(400);
        return;
    }

   const isUpdated = productsRepository.updateProduct(+req.params.id, req.body.title);

    if (isUpdated) {
        const upadatedProduct = productsRepository.findProductById(+req.params.id);
        res.json(upadatedProduct);
    } else {
        res.status(404);
    }
});
productsRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = productsRepository.deleteProduct(+req.params.id);

    if (isDeleted) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});