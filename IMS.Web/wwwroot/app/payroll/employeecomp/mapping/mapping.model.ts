import { ComponentModel } from "../../component/component.model";

export class MappingModel {
    id: number;
    component: ComponentModel;
    componentId: number;
    componentTypeId: number;
    operator: string;
    formula: string;
    amount: number;
    staffId: number;
    isAll: boolean;
    createdOn: Date;
}