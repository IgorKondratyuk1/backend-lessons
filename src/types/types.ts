import {Request} from "express";

export type RequestWithBody<T> = Request<{}, {}, T>
export type RequestWithQuery<T> = Request<{}, {}, {}, T>
export type RequestWithParams<T> = Request<T>
export type RequestWithBodyAndParams<T, B> = Request<T, {}, B>

export type APIErrorResult = {
    errorsMessages: Array<FieldError>
}

export type FieldError = {
    message: string
    field: string
}

export type ProductType = {
    id: number
    title: string
}



export type Paginator<T> = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<T>
}

export type QueryType = {
    searchNameTerm?: string
    pageNumber?: string
    pageSize?: string
    sortBy?: string
    sortDirection?: string
}

export type FilterType = {
    searchNameTerm?: string | null
    pageNumber: number
    pageSize: number
    sortBy: string
    sortDirection: "asc" | "desc"
}

export type UserFilterType= {
    searchLoginTerm: string | null
    searchEmailTerm: string | null
    pageNumber: number
    pageSize: number
    sortBy: string
    sortDirection: "asc" | "desc"
}

