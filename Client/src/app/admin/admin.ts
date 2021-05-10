
export class Employee {
    ID: number;
    FullName: string;
    LastName: string;
    UserName: string;
    FirstName: number;
    IsAdmin: boolean;
    Password: string;
    createdAt: Date;
    updatedAt: Date;
}
export class EventType {
    ID: number;
    Name: string;
    createdAt: Date;
    updatedAt: Date;
}
export class Inventory {
    ID: number;
    ModelName: string;
    Description: string;
    InventoryTypeID: number;
    Cost: number;
    createdAt: Date;
    updatedAt: Date;
}
export class InventoryType {
    ID: number;
    Name: string;
    createdAt: Date;
    updatedAt: Date;
}
export class InventoryItem {
    ID: number;
    InventoryID: number;
    StatusID: number;
    Size: string;
    Barcode: string;
    SerialNumber: string;
    createdAt: Date;
    updatedAt: Date;
}
export class Package {
    ID: number;
    Name: string;
    createdAt: Date;
    updatedAt: Date;
}
export class PackageInventory {
    ID: number;
    InventoryID: number;
    PackageID: number;
    createdAt: Date;
    updatedAt: Date;
}