export interface IOrders {
    autoId: Number,
    orderNo: string,
    name: string,
    contactNo: string,
    email: string,
    address: string,
    createdOn: string,
    qty: Number,
    amount: Number,
    discount: Number,
    shippingCharge: number,
    total: Number,
    orderItem: IorderItem[]
}
export interface IorderItem {
    itemId: String;
    itemName: String;
    mg: String;
    pack: Number;
    qty: Number;
    price: Number;
    discount: Number;
}