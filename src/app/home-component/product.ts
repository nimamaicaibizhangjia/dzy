export class Menu{
    name:string;
    url:string;
}
export class Price{
    price :number;
    unit:string;
}
export class Product{
    category:string;
    pricing:Price;
    features:string[];
    action:string
}