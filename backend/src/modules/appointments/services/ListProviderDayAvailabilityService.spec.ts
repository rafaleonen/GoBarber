import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService'
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'

import AppError from '@shared/errors/AppError'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderDayAvailability: ListProviderDayAvailabilityService

describe('ListProviderMounthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository()
        listProviderDayAvailability = new ListProviderDayAvailabilityService(fakeAppointmentsRepository)
    })

    it('should be able to list the mounth availability from provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 7, 21, 11, 0, 0)
        })

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 7, 21, 12, 0, 0)
        })

        jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 7, 21, 9, 0, 0).getTime())

        const availability = await listProviderDayAvailability.execute({
            provider_id: 'user',
            day: 21,
            year: 2020,
            month: 8
        })

        expect(availability).toEqual(expect.arrayContaining([
            { hour: 8, available: false },
            { hour: 9, available: false },
            { hour: 10, available: true },
            { hour: 11, available: false },
            { hour: 12, available: false },
            { hour: 13, available: true },
        ]))
    })
})
