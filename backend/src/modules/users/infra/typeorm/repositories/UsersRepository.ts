import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/infra/dtos/ICreateUserDTO'
import IFindAllProvidersDTO from '@modules/users/infra/dtos/IFindAllProvidersDTO'

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

    public async findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<Array<User>> {
        let users: Array<User> = []

        if(except_user_id) {
            users = await this.ormRepository.find({
                where: {
                    id: Not(except_user_id)
                }
            })
        } else {
            users = await this.ormRepository.find()
        }

        return users
    }
}

export default UsersRepository;
