import CreateUserService from './CreateUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

import AppError from '@shared/errors/AppError'

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository()
        const fakeHashProvider = new FakeHashProvider()

        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john.doe@mail.com',
            password: '121212'
        })

        expect(user).toHaveProperty('id')
    })

    it('should not be able to create a new user with the same email from another', async () => {
        const fakeUsersRepository = new FakeUsersRepository()
        const fakeHashProvider = new FakeHashProvider()

        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john.doe@mail.com',
            password: '121212'
        })

        expect(createUser.execute({
            name: 'John Doe',
            email: 'john.doe@mail.com',
            password: '121212'
        })).rejects.toBeInstanceOf(AppError)
    })
})
