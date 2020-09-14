import { GroupModel } from '../componentgroup/componentgroup.model';

export class ComponentModel {
  id: number;
  groupId: string;
  group: GroupModel;
  name: string;
  shortName: string;
  sequenceNo: number;
  description: string;
  status: boolean;
  IsPaySlip: boolean;
  IsBasic: boolean;
  others: boolean;
}