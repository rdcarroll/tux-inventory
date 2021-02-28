
export class Employee {
    ID: number;
    FullName: string;
    LastName: string;
    FirstName: number;
    IsAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export class Customer {
    ID: number;
    FullName: string;
    LastName: string;
    FirstName: number;
    Email: string;
    Phone: string;
    Address: string;
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
export class Order {
    ID: number;
    CustomerID: number;
    Customer:Customer;
    EventID: number;
    useDate: Date;
    pickUpDate: Date;
    returnDate: Date;
    actualReturnDate: Date;
    createdAt: Date;
    updatedAt: Date;
}