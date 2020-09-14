export class UserGroupFeature {
  Name: string;
  Child: UserGroupFeatureChild[] = [];
}

export class UserGroupFeatureChild {
  Name: string;
  Actions: Actions;
}

export class Actions {
  CanAdd: boolean;
  CanEdit: boolean;
  CanDelete: boolean;
  CanView: boolean;
}

export enum UserGroupFeatureParentEnum {
  //Academic = 'Academic',
  Student = 'Student',
  Staff = 'Staff',
  Administration = 'Administration',
  Transportation = 'Transportation',
  Finance = 'Finance'
}