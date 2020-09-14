export class LocationModel {
    id: number;
    code: string;
    name: string;
    description: string;
    alias: string;
    status: boolean;
    isParent: boolean;
    billingAddressId: number;
    billingAddress: AddressModel;
    shippingAddressId: number;
    shippingAddress: AddressModel;
}

export class BranchModel {
    id: number;
    code: string;
    name: string;
    description: string;
    locationId: number;
    location: LocationModel;
    alias: string;
    status: boolean;
    isParent: boolean;
    billingAddressId: number;
    billingAddress: AddressModel;
    shippingAddressId: number;
    shippingAddress: AddressModel;
}

export class AddressModel {
    id: number;
    countryId: number;
    country: PositionModel;
    stateId: number;
    state: PositionModel;
    cityId: number;
    city: PositionModel;
    address1: string;
    address2: string;
    zipCode: string;
    description: string;
}

export class PositionModel {
    id: number;
    name: string;
}