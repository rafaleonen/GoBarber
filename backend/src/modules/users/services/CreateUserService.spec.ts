import CreateUserService from './CreateUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeHashProvider = new FakeHashProvider()
        createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
    })

    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john.doe@mail.com',
            password: '121212'
        })

        expect(user).toHaveProperty('id')
    })

    it('should not be able to create a new user with the same email from another', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'john.doe@mail.com',
            password: '121212'
        })

        await expect(createUser.execute({
            name: 'John Doe',
            email: 'john.doe@mail.com',
            password: '121212'
        })).rejects.toBeInstanceOf(AppError)
    })
})
