import ListProvidersService from './ListProvidersService'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let listProviders: ListProvidersService

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        listProviders = new ListProvidersService(fakeUsersRepository)
    })

    it('should be able to list all providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@mail.com',
            password: '121212'
        })

        const user2 = await fakeUsersRepository.create({
            name: 'John Trê',
            email: 'john.tre@mail.com',
            password: '121212'
        })

        const loggedUser = await fakeUsersRepository.create({
            name: 'John Qua',
            email: 'john.qua@mail.com',
            password: '121212'
        })

        const providers = await listProviders.execute({
            user_id: loggedUser.id
        })

        expect(providers).toEqual([
            user1,
            user2
        ])
    })
})
