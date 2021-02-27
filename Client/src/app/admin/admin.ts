
export class Employee {
    ID: number;
    FullName: string;
    LastName: string;
    FirstName: number;
    IsAdmin: boolean;
    createdAt: string;
    updatedAt: string;
}
export class Customer {
    ID: number;
    FullName: string;
    LastName: string;
    FirstName: number;
    Email: string;
    Phone: string;
    Address: string;
    createdAt: string;
    updatedAt: string;
}
export class EventType {
    ID: number;
    Name: string;
    createdAt: string;
    updatedAt: string;
}
export class Inventory {
    ID: number;
    ModelName: string;
    Description: string;
    InventoryTypeID: number;
    Cost: number;
    createdAt: string;
    updatedAt: string;
}
export class InventoryType {
    ID: number;
    Name: string;
    createdAt: string;
    updatedAt: string;
}
export class InventoryItem {
    ID: number;
    InventoryID: number;
    StatusID: number;
    Size: string;
    Barcode: string;
    SerialNumber: string;
    createdAt: string;
    updatedAt: string;
}
export class Package {
    ID: number;
    Name: string;
    createdAt: string;
    updatedAt: string;
}