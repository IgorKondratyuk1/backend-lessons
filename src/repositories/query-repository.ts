
type ProductOutputModel = {
    id:	number
    title: string
    address: {
        id: number
        title: string
    }
}

type DBProduct = {
    id:	number
    title: string
    addressId: number
}

type DBAddress = {
    id:	number
    title: string
}

export const queryDbRepository = {
    getProducts(): ProductOutputModel[] {
        const dbProducts: DBProduct[] = [];
        const dbAddresses: DBAddress[] = [];

        return dbProducts.map(dbProduct => {
            const foundedAddress: DBAddress | undefined = dbAddresses.find(a => a.id === dbProduct.addressId);
            return this._mapDBProductToProductOutputModel(dbProduct, foundedAddress!);
        });
    },
    getProductById(id: string): ProductOutputModel {
        const dbProduct: DBProduct = {
            id: 123,
            title: 'Mango',
            addressId: 333
        }

        const dbAddress: DBAddress = {
            id: 333,
            title: 'Some Address 1'
        }

        return this._mapDBProductToProductOutputModel(dbProduct, dbAddress);
    },
    _mapDBProductToProductOutputModel(dbProduct: DBProduct, dbAddress: DBAddress) {
        return {
            id: dbProduct.id,
            title: dbProduct.title,
            address: {
                id: dbAddress!.id,
                title: dbAddress!.title
            }
        }
    }
}