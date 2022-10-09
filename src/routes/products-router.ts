import {Request, Response, Router} from "express";
import {postValidationSchema} from "../shemas/post-schema";
import {authenticationMiddleware} from "../middlewares/authentication-middleware";
import {ProductType, RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../types/types";
import {ProductViewModel} from "../models/post/product-view-model";
import {getProductViewModel} from "../helpers/helpers";
import {UriParamsProductModel} from "../models/post/uri-params-product-model";
import {CreateProductModel} from "../models/post/create-product-model";
import {UpdateProductModel} from "../models/post/update-product-model";
import {productsService} from "../domain/product-service";

export const productsRouter = Router({});

productsRouter.get('/', async (req: Request, res: Response<ProductViewModel[]>) => {
    const productsResult: ProductType[] = await productsService.findProducts(req.query.title?.toString());

    res.send(productsResult.map(getProductViewModel));
});
productsRouter.get('/:id', async (req: RequestWithParams<UriParamsProductModel>, res: Response) => {
    const product: ProductType | null = await productsService.findProductById(+req.params.id);

    if (product) {
        res.send(getProductViewModel(product));
    } else {
        res.sendStatus(404);
    }
});
productsRouter.post('/',
    authenticationMiddleware,
    postValidationSchema,
    async (req: RequestWithBody<CreateProductModel>, res: Response<ProductViewModel>) => {
        const createdProduct: ProductType = await productsService.createProduct(req.body.title.toString());

        res.status(201)
            .json(getProductViewModel(createdProduct));
});
productsRouter.put('/:id',
    authenticationMiddleware,
    postValidationSchema,
    async (req: RequestWithBodyAndParams<UriParamsProductModel, UpdateProductModel>, res: Response<ProductViewModel>) => {
    if (!req.body.title) {
        res.sendStatus(400);
        return;
    }

   const isUpdated: boolean = await productsService.updateProduct(+req.params.id, req.body.title);

    if (isUpdated) {
        const upadatedProduct = await productsService.findProductById(+req.params.id);
        if (!upadatedProduct) {
            res.status(404);
        } else {
            res.json(getProductViewModel(upadatedProduct));
        }
    } else {
        res.status(404);
    }
});
productsRouter.delete('/:id',
    authenticationMiddleware,
    async (req: Request<UriParamsProductModel>, res: Response) => {
    const isDeleted: boolean = await productsService.deleteProduct(+req.params.id);

    if (isDeleted) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});