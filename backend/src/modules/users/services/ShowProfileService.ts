import "reflect-metadata"
import { injectable, inject } from 'tsyringe'

import IUsersRepository from '../repositories/IUsersRepository'
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from "@shared/errors/AppError"

interface Request {
    user_id: string;
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        ) {}

    public async execute({ user_id }: Request): Promise<User> {
        const user = await this.usersRepository.findById(user_id)

        if(!user) {
            throw new AppError('User not found')
        }

        return user
    }
}

export default ShowProfileService;
