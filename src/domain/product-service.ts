import { productsDbRepository } from "../repositories/products-db-repository";
import {ProductType} from "../types/types";


export const productsService = {
    async findProducts(title: string | undefined | null): Promise<ProductType[]> {
        return await productsDbRepository.findProducts(title);
    },
    async findProductById(id: number): Promise<ProductType | null> {
        return await productsDbRepository.findProductById(id);
    },
    async createProduct(title: string): Promise<ProductType> {
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        const createdProduct = await productsDbRepository.createProduct(newProduct)
        return createdProduct;
    },
    async updateProduct(id: number, title: string): Promise<boolean> {
        return await productsDbRepository.updateProduct(id, title);
    },
    async deleteProduct(id: number): Promise<boolean> {
        return await productsDbRepository.deleteProduct(id);
    }
}