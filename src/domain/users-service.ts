import {usersDbRepository} from "../repositories/users/users-db-repository";
import {UserDBType, UserType} from "../types/userTypes";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import {ObjectId} from "mongodb";

export const usersService = {
    async createUser(login:	string, password: string, email: string) {
        const passwordSalt: string = await bcrypt.genSalt(10);
        const passwordHash: string = await this._generateHash(password, passwordSalt);

        const newUser: UserDBType = {
            _id: new ObjectId(),
            id: uuidv4(),
            createdAt: (new Date()).toISOString(),
            userName: login,
            email: email,
            passwordHash: passwordHash
        }

        return usersDbRepository.createUser(newUser);
    },
    async findUserById(id: string): Promise<UserDBType | null> {
        return await usersDbRepository.findUserById(id);
    },
    async deleteUser(id: string): Promise<boolean> {
        return await usersDbRepository.deleteUser(id);
    },
    async checkCredentionals(password: string, userLogin: string) {
        const user = await usersDbRepository.findUserByLogin(userLogin);
        if (!user) return false;
        return bcrypt.compareSync(password, user.passwordHash);
    },
    async _generateHash(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
}