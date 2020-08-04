import { uuid } from 'uuidv4'
import { isEqual, getMonth, getYear } from 'date-fns'

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/infra/dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/infra/dtos/IFindAllInMonthFromProviderDTO'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentRepository {
    private appointments: Array<Appointment> = []

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date))

        return findAppointment
    }

    public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment()

        // appointment.id = uuid()
        // appointment.date = date
        // appointment.provider_id = provider_id

        Object.assign(appointment, { id: uuid(), date, provider_id })

        this.appointments.push(appointment)

        return appointment
    }

    public async findAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Array<Appointment>> {
        const appointments = this.appointments.filter(appointment =>
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
        )

        return appointments
    }
}

export default AppointmentsRepository;
