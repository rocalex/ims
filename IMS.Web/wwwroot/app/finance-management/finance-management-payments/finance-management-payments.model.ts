export class FinancePaymentAc {
    id: number;
    code: string;
    paymentDate: Date;
    paymentTypeId: number;
    paymentReference: FinancePaymentReferenceEnum;
    paymentReferenceName: string;
    referenceCode: string;
    referenceDate: Date;
    paymentById: string;
    paidToId: number;
    amount: number;
}

export enum FinancePaymentReferenceEnum {
    Breakdown,
    Accident,
    Repair,
    Maintenance,
    PurchaseIndent
}