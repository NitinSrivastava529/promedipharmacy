export class Order {
    name: String;
    contactNo: String;
    email: String;
    address: String;
    qty: Number;
    amount: Number;
    discount: Number;
    total: Number;
    orderItem: orderItem[];
    constructor() {
        this.name = "";
        this.contactNo = "";
        this.email = "";
        this.address = "";
        this.qty = 1;
        this.amount = 0;
        this.discount = 0;
        this.total = 0;
        this.orderItem = [];
    }
}
export class orderItem {
    itemId: String;
    itemName: String;
    mg: String;
    pack: Number;
    qty: Number;
    price: Number;
    discount: Number;
    constructor() {
        this.itemId = "";
        this.itemName = "";
        this.mg ="";
        this.pack = 0;
        this.qty = 0;
        this.price = 0;
        this.discount = 0;
    }
}