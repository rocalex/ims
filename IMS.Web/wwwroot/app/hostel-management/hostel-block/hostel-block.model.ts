export class BlockModel {
  id: number;
  hostelId: number;
  hostel: HostelModel;
  name: string;
  floorAmount: number;
  status: boolean;
  description: string;
  createdOn: Date;
}

export class HostelModel {
  id: number;
  name: string;
}