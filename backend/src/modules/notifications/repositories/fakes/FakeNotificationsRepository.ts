import { getMongoRepository, MongoRepository } from 'typeorm'
import { ObjectID } from 'mongodb'

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import ICreateNotificationDTO from '@modules/notifications/infra/dtos/ICreateNotificationDTO'

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification'

class NotificationsRepository implements INotificationsRepository {
    private notifications: Array<Notification> = []

    public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {
        const notification = new Notification()

        Object.assign(notification, { id: new ObjectID(), content, recipient_id })

        this.notifications.push(notification)

        return notification
    }
}

export default NotificationsRepository
