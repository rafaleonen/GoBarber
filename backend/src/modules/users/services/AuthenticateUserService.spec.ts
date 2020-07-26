import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

import AppError from '@shared/errors/AppError'

describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository()
        const fakeHashProvider = new FakeHashProvider()

        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john.doe@mail.com',
            password: '121212'
        })

        const response = await authenticateUser.execute({
            email: 'john.doe@mail.com',
            password: '121212'
        })

        expect(response).toHaveProperty('token')
        expect(response.user).toEqual(user)
    })

    it('should not be able to authenticate with non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository()
        const fakeHashProvider = new FakeHashProvider()

        const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)

        expect(authenticateUser.execute({
            email: 'john.doe@mail.com',
            password: '121212'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const fakeUsersRepository = new FakeUsersRepository()
        const fakeHashProvider = new FakeHashProvider()

        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)

        await createUser.execute({
            name: 'John Doe',
            email: 'john.doe@mail.com',
            password: '121212'
        })

        expect(authenticateUser.execute({
            email: 'john.doe@mail.com',
            password: 'wrong-password'
        })).rejects.toBeInstanceOf(AppError)
    })
})
