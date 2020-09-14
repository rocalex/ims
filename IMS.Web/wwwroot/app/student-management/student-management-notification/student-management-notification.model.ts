export class StudentNotification {
    id: number;
    studentId: number;
    name: string;
    email: string;
    phoneNumber: string;
    notificationType: NotificationTypeEnum;
    subject: string;
    message: string;
}

export enum NotificationTypeEnum {
    Email,
    Sms
}
