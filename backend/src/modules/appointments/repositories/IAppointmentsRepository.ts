import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '../infra/dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '../infra/dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '../infra/dtos/IFindAllInDayFromProviderDTO'

export default interface IApointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>
    findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>
    findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDTO): Promise<Array<Appointment>>
    findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO): Promise<Array<Appointment>>
}
