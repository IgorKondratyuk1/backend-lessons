import {ObjectId} from "mongodb";

export type UserType = {
    id:	string
    login: string
    email: string
    passwordHash: string
    createdAt: string
}

export type UserDBType = {
    _id: ObjectId
    id:	string
    userName: string
    email: string
    passwordHash: string
    createdAt: string
}

export type QueryUserModel = {
    searchLoginTerm?: string
    searchEmailTerm?: string
    pageNumber?: string
    pageSize?: string
    sortBy?: string
    sortDirection?: string
}