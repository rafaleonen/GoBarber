import ShowProfileService from './ShowProfileService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let showProfile: ShowProfileService

describe('ShowProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        showProfile = new ShowProfileService(fakeUsersRepository)
    })

    it('should be able to show profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@mail.com',
            password: '121212'
        })

        const showedUser = await showProfile.execute({
            user_id: user.id,
        })

        expect(showedUser.name).toBe('John Doe')
        expect(showedUser.email).toBe('john.doe@mail.com')
    })

    it('should not be able to show profile from non-existing user', async () => {
        await expect(showProfile.execute({
            user_id: 'non-existing-user-id',
        })).rejects.toBeInstanceOf(AppError)
    })
})
