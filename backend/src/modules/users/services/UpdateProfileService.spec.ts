import UpdateProfileService from './UpdateProfileService'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let updateProfile: UpdateProfileService

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeHashProvider = new FakeHashProvider()
        updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider)
    })

    it('should be able to update profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@mail.com',
            password: '121212'
        })

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'john.tre@mail.com'
        })

        expect(updatedUser.name).toBe('John Trê')
        expect(updatedUser.email).toBe('john.tre@mail.com')
    })

    it('should not be able to change another user email', async () => {
        await fakeUsersRepository.create({
            name: 'John Trê',
            email: 'john.tre@mail.com',
            password: '123456'
        })

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@mail.com',
            password: '121212'
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'John Doe',
            email: 'john.tre@mail.com'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@mail.com',
            password: '121212'
        })

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'john.tre@mail.com',
            old_password: '121212',
            password: '123456'
        })

        expect(updatedUser.password).toBe('123456')
    })

    it('should not be able to update the password without old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@mail.com',
            password: '121212'
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'john.tre@mail.com',
            password: '123456'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to update the password with wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@mail.com',
            password: '121212'
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'john.tre@mail.com',
            old_password: 'wrong_old_password',
            password: '123456'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to update a non existing user', async () => {
        await expect(updateProfile.execute({
            user_id: 'non-existing-user-id',
            name: 'John Trê',
            email: 'john.tre@mail.com',
        })).rejects.toBeInstanceOf(AppError)
    })
})
