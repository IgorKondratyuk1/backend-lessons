import {ProductViewModel} from "../models/post/product-view-model";
import {FilterType, ProductType, QueryType, UserFilterType} from "../types/types";
import {UserViewModel} from "../models/user/user-view-model";
import {QueryUserModel, UserType} from "../types/userTypes";

export const getProductViewModel = (dbProduct: ProductType): ProductViewModel => {
    return {
        id:	dbProduct.id,
        title: dbProduct.title
    }
}

export const getUserViewModel = (dbUser: UserType): UserViewModel => {
    return {
        id: dbUser.id,
        email: dbUser.email,
        login: dbUser.login,
        createdAt: dbUser.createdAt
    }
}

export const getFilters = (query: QueryType): FilterType => {
    const filters: FilterType = {
        searchNameTerm: query.searchNameTerm || null,
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize ? +query.pageSize : 10,
        sortBy: query.sortBy || "createdAt",
        sortDirection: query.sortDirection === 'asc' ? 'asc' : 'desc'
    }

    return filters;
}

export const getUserFilters = (query: QueryUserModel): UserFilterType => {
    const filters: UserFilterType = {
        searchEmailTerm: query.searchEmailTerm || null,
        searchLoginTerm: query.searchLoginTerm || null,
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize ? +query.pageSize : 10,
        sortBy: query.sortBy || "createdAt",
        sortDirection: query.sortDirection === 'asc' ? 'asc' : 'desc'
    }

    return filters;
}

export const getSkipValue = (pageNumber: number, pageSize: number): number => {
    return (pageNumber - 1) * pageSize;
}

export const getSortValue = (sortDirection: string): 1 | -1 => {
    return sortDirection === "asc" ? 1 : -1
}

export const getPagesCount = (totalCount: number, pageSize: number): number  => {
    return Math.ceil(totalCount / pageSize);
}