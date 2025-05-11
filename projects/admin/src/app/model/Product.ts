export class Product {
    category: String;
    brandName: String;
    productId: String;
    productName: String;
    mg: String;
    qty: Number;
    price: Number;
    discount: Number;
    description: String;
    constructor() {
        this.category = "0";
        this.brandName = "";
        this.productId = "";
        this.productName = "";
        this.mg = "0";
        this.qty = 0;
        this.price = 0;
        this.discount = 0;
        this.description ="";
    }
}