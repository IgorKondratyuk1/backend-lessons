import {ProductType} from "../types/types";

let products: ProductType[] = [
    {
        id: 1,
        title: "tomato"
    },
    {
        id: 2,
        title: "orange"
    },
    {
        id: 3,
        title: "apple"
    },
    {
        id: 4,
        title: "avocado"
    },
];

export const productsRepository = {
    async findProducts(title: string | undefined | null, count: number | undefined | null): Promise<ProductType[]> {
        let filteredProducts = products;

        if (title) {
            filteredProducts = filteredProducts.filter(p => p.title.indexOf(title) > -1);
        }

        if (count) {
            filteredProducts = filteredProducts.slice(0, count);
        }

        return filteredProducts;
    },
    async findProductById(id: number): Promise<ProductType | undefined> {
        const foundedProduct = products.find(p => p.id === id);
        return foundedProduct;
    },
    async createProduct(title: string): Promise<ProductType> {
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        products.push(newProduct);

        return newProduct;
    },
    async updateProduct(id: number, title: string): Promise<boolean> {
        let product = products.find(p => p.id === id);
        if (product) {
            product.title = title;
            return true;
        } else {
            return false;
        }
    },
    async deleteProduct(id: number): Promise<boolean> {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i,1);
                return true;
            }
        }

        return false;
    }
}