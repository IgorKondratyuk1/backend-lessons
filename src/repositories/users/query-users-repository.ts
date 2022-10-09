import {QueryUserModel, UserDBType, UserType} from "../../types/userTypes";
import {UserViewModel} from "../../models/user/user-view-model";
import {Paginator, UserFilterType} from "../../types/types";
import {getPagesCount, getSkipValue, getSortValue, getUserFilters} from "../../helpers/helpers";
import {usersCollection} from "../db";

export const usersQueryRepository = {
    async findUsers(queryObj: QueryUserModel): Promise<Paginator<UserViewModel>> {
        const filters: UserFilterType = getUserFilters(queryObj);
        const skipValue: number = getSkipValue(filters.pageNumber, filters.pageSize);
        const sortValue: 1 | -1 = getSortValue(filters.sortDirection);
        const searchLoginTermValue = filters.searchLoginTerm || "";
        const searchEmailTermValue = filters.searchEmailTerm || "";

        const foundedUsers: UserDBType[] = await usersCollection
            .find({$or: [{login: {$regex: new RegExp(searchLoginTermValue, 'i')}}, {email: {$regex: new RegExp(searchEmailTermValue, 'i')}}]})
            .sort({[filters.sortBy]: sortValue})
            .skip(skipValue)
            .limit(filters.pageSize).toArray();

        const usersViewModels: UserViewModel[] = foundedUsers.map(this._mapUserDBTypeToUserViewModel); // Get View models of Blogs
        const totalCount: number = await usersCollection.countDocuments({$or: [{login: {$regex: new RegExp(searchLoginTermValue, 'i')}}, {email: {$regex: new RegExp(searchEmailTermValue, 'i')}}]});
        const pagesCount = getPagesCount(totalCount, filters.pageSize);

        return {
            pagesCount: pagesCount,
            page: filters.pageNumber,
            pageSize: filters.pageSize,
            totalCount: totalCount,
            items: usersViewModels
        };
    },
    async findUserById(id: string): Promise<UserViewModel | null> {
        const dbUser = await usersCollection.findOne({id: id});
        if (!dbUser) return null;

        return this._mapUserDBTypeToUserViewModel(dbUser);
    },
    _mapUserDBTypeToUserViewModel(dbUser: UserDBType): UserViewModel {
        return {
            id: dbUser.id,
            email: dbUser.email,
            login: dbUser.userName,
            createdAt: dbUser.createdAt
        }
    }
}