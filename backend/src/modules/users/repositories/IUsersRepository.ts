import User from '@modules/users/infra/typeorm/entities/User'
import ICreateUserDTO from '../infra/dtos/ICreateUserDTO'
import IFindProvidersDTO from '../infra/dtos/IFindAllProvidersDTO'

export default interface IUsersRepository {
    findById(id: string): Promise<User | undefined>
    findByEmail(email: string): Promise<User | undefined>
    create(data: ICreateUserDTO): Promise<User>
    save(data: ICreateUserDTO): Promise<User>
    findAllProviders(data: IFindProvidersDTO): Promise<Array<User>>
}
