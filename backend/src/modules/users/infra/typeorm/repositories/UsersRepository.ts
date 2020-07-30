import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/infra/dtos/ICreateUserDTO'

import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {

    private ormRepository: Repository<User>

    constructor() {
        this.ormRepository = getRepository(User)
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where : { id } })

        return user
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where : { email } })

        return user
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const appointment = this.ormRepository.create(userData)

        await this.ormRepository.save(appointment)

        return appointment
    }

    public async save(user: User): Promise<User> {
        await this.ormRepository.save(user)

        return user
    }
}

export default UsersRepository;
