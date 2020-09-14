export class ItemModel {
    id: number;
    code: string;
    name: string;
    alias: string;
    uomId: string;
    status: boolean;
    description: string;
    itemTypeId: number;
    isParent: boolean;
    fileId: string;
    sellingRateA: number;
    sellingRateB: number;
    sellingAccountId: number;
    sellingDescription: string;
    purchaseRateA: number;
    purchaseRateB: number;
    purchaseAccountId: number;
    purchaseDescription: string;
}

export class NoteModel {
    id: number;
    description: string;
    createdOn: Date;
    itemId: number;
}

export class DocumentModel {
    id: number;
    name: string;
    expiryDate: Date;
    metaData: string;
    documentUrl: string;
    itemId: number;
}

export class UOMModel {
    id: number;
    name: string;
}

export class ItemTypeModel {
    id: number;
    name: string;
}