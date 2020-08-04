import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '../infra/dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '../infra/dtos/IFindAllInMonthFromProviderDTO'

export default interface IApointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>
    findByDate(date: Date): Promise<Appointment | undefined>
    findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDTO): Promise<Array<Appointment>>
}
