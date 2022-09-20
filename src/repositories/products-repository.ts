let products = [
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
    findProducts(title: string | undefined | null, count: number | undefined | null) {
        let filteredProducts = products;

        if (title) {
            filteredProducts = filteredProducts.filter(p => p.title.indexOf(title) > -1);
        }

        if (count) {
            filteredProducts = filteredProducts.slice(0, count);
        }

        return filteredProducts;
    },
    findProductById(id: number) {
        const foundedProduct = products.find(p => p.id === id);
        return foundedProduct;
    },
    createProduct(title: string) {
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        products.push(newProduct);

        return newProduct;
    },
    updateProduct(id: number, title: string) {
        let product = products.find(p => p.id === id);
        if (product) {
            product.title = title;
            return true;
        } else {
            return false;
        }
    },
    deleteProduct(id: number) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i,1);
                return true;
            }
        }

        return false;
    }
}