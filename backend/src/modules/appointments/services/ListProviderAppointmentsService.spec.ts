import ListProviderAppointmentsService from './ListProviderAppointmentsService'
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'

import AppError from '@shared/errors/AppError'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderAppointments: ListProviderAppointmentsService

describe('ListProviderMounthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository()
        listProviderAppointments = new ListProviderAppointmentsService(fakeAppointmentsRepository)
    })

    it('should be able to list the appointments in a specific day', async () => {
        const appointment1 = await fakeAppointmentsRepository.create({
            provider_id: 'provider-id',
            user_id: 'user-id',
            date: new Date(2020, 7, 21, 7, 0, 0)
        })


        const appointment2 = await fakeAppointmentsRepository.create({
            provider_id: 'provider-id',
            user_id: 'user-id',
            date: new Date(2020, 7, 21, 8, 0, 0)
        })

        const availability = await listProviderAppointments.execute({
            provider_id: 'provider-id',
            day: 21,
            year: 2020,
            month: 8
        })

        expect(availability).toEqual([
            appointment1,
            appointment2
        ])
    })
})
