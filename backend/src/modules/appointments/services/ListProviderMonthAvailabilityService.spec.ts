import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService'
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'

import AppError from '@shared/errors/AppError'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderMonthAvailability: ListProviderMonthAvailabilityService

describe('ListProviderMounthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository()
        listProviderMonthAvailability = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository)
    })

    it('should be able to list the mounth availability from provider', async () => {
        for(let x = 0; x < 10; x++) {
            await fakeAppointmentsRepository.create({
                provider_id: 'user',
                user_id: 'user',
                date: new Date(2020, 7, 20, 7 + x, 0, 0)
            })
        }

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 7, 21, 8, 0, 0)
        })

        const availability = await listProviderMonthAvailability.execute({
            provider_id: 'user',
            year: 2020,
            month: 8
        })

        expect(availability).toEqual(expect.arrayContaining([
            { day: 19, available: true },
            { day: 20, available: false },
            { day: 21, available: true },
            { day: 22, available: true }
        ]))
    })
})
