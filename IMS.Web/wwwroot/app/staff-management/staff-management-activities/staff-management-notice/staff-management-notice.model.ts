export enum NoticeToEnum {
    AllStudents,
    AllStaffs,
    Student,
    Staff,
    SystemUser
}

export enum NoticeTypeEnum {
    Notice,
    Circular
}

export class CircularNotice {
    id: number;
    noticeDate: Date;
    noticeTo: NoticeToEnum;
    noticeToString: string;
    noticeType: NoticeTypeEnum;
    noticeTypeString: string;
    message: string;
    description: string;
    isNotificationSendingEnabled: boolean;
    circularNoticeRecipientsList: CircularNoticeRecipient[];
}

export class CircularNoticeRecipient {
    circularNoticeId: number;
    recipientId: number;
    recipientName: string;
    recipientType: NoticeToEnum;
    recipientTypeString: string;
    isSelected: boolean;
}