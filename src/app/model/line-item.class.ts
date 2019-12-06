import { Product } from './product.class';
import {Request} from './request.class';

export class LineItem {
    id: number;
    product: Product; 
    request: Request; 
    quantity: number; 

    constructor(id: number = 0, product: Product = new Product(), request: Request = new Request(),quantity: number =0){
        this.id= id; 
        this. product = product; 
        this.request = request; 
        this. quantity = quantity;
    }
}
