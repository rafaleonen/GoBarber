import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService
let authenticateUser: AuthenticateUserService
let fakeCacheProvider: FakeCacheProvider

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeHashProvider = new FakeHashProvider()
        fakeCacheProvider = new FakeCacheProvider()
        createUser = new CreateUserService(
            fakeUsersRepository, 
            fakeHashProvider,
            fakeCacheProvider
            )
        authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider
            )
    })

    it('should be able to authenticate', async () => {
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
        await expect(authenticateUser.execute({
            email: 'john.doe@mail.com',
            password: '121212'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'john.doe@mail.com',
            password: '121212'
        })

        await expect(authenticateUser.execute({
            email: 'john.doe@mail.com',
            password: 'wrong-password'
        })).rejects.toBeInstanceOf(AppError)
    })
})
