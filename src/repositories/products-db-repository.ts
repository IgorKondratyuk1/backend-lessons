import {mongoClient, productsCollection} from "./db";
import {ProductType} from "../types/types";

export const productsDbRepository = {
    async findProducts(title: string | undefined | null): Promise<ProductType[]> {
        let filters: any = {};

        if (title) {
            filters.title = {$regex: title};
        }

        return productsCollection.find(filters).toArray();
    },
    async findProductById(id: number): Promise<ProductType | null> {
        const foundedProduct: ProductType | null = await productsCollection.findOne({ id: id});
        return foundedProduct;
    },
    async createProduct(newProduct: ProductType): Promise<ProductType> {
        const result = await productsCollection.insertOne(newProduct);
        return newProduct;
    },
    async updateProduct(id: number, title: string): Promise<boolean> {
        const result = await productsCollection.updateOne({id: id}, {$set: {title: title}});
        return result.matchedCount === 1;
    },
    async deleteProduct(id: number): Promise<boolean> {
        const result = await mongoClient.db("shop").collection("products").deleteOne({id: id});
        return result.deletedCount === 1;
    }
}