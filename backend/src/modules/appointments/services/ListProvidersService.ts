import "reflect-metadata"
import { injectable, inject } from 'tsyringe'
import { classToClass } from 'class-transformer'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

interface Request {
    user_id: string;
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ) {}

    public async execute({ user_id }: Request): Promise<Array<User>> {
        let users = await this.cacheProvider.recover<User[]>(`providers-list:${user_id}`)

        if(!users) {
            users = await this.usersRepository.findAllProviders({
               except_user_id: user_id
            })

            this.cacheProvider.save(`providers-list:${user_id}`, classToClass(users))
        }

        return users
    }
}

export default ListProvidersService;
