import CreateAppointmentService from './CreateAppointmentService'
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository'

import AppError from '@shared/errors/AppError'

let fakeAppointmentRepository: FakeAppointmentRepository
let createAppointment: CreateAppointmentService

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository()
        createAppointment = new CreateAppointmentService(fakeAppointmentRepository)
    })

    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 6, 10, 12).getTime()
        })

        const appointment = await createAppointment.execute({
            date: new Date(2020, 6, 10, 13),
            user_id: 'user-id',
            provider_id: 'provider-id'
        })

        expect(appointment).toHaveProperty('id')
        expect(appointment.provider_id).toBe('provider-id')
    })

    it('should not be able to create two appointments on the same time ', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 6, 10, 12).getTime()
        })

        const appointmentDate = new Date(2020, 6, 11, 11)

        await createAppointment.execute({
            date: appointmentDate,
            user_id: 'user-id',
            provider_id: 'provider-id'
        })

        await expect(createAppointment.execute({
            date: appointmentDate,
            user_id: 'user-id',
            provider_id: 'provider-id'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create an appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 6, 10, 12).getTime()
        })

        await expect(createAppointment.execute({
            date: new Date(2020, 6, 10, 10),
            provider_id: 'provider-id',
            user_id: 'user-id'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create an appointment with the same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 6, 10, 12).getTime()
        })

        await expect(createAppointment.execute({
            date: new Date(2020, 6, 10, 13),
            provider_id: 'user-id',
            user_id: 'user-id'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create an appointment before 7a.m. or after 5p.m.', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 6, 10, 12).getTime()
        })

        await expect(createAppointment.execute({
            date: new Date(2020, 6, 11, 7),
            provider_id: 'provider-id',
            user_id: 'user-id'
        })).rejects.toBeInstanceOf(AppError)

        await expect(createAppointment.execute({
            date: new Date(2020, 6, 10, 18),
            provider_id: 'provider-id',
            user_id: 'user-id'
        })).rejects.toBeInstanceOf(AppError)
    })
})
