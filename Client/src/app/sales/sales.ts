
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
export class OrderItem {
    ID: number;
    OrderID: number;
    CustomerID: number;
    EmployeeID: number;
    Confirmed: number;
    InventoryItemID: number;
    Cost: number;
    createdAt: Date;
    updatedAt: Date;
    InventoryItem: {};
    $$editing: boolean;
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