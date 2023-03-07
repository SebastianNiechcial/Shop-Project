import { ProductData } from "../models/ProductData";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Rest } from "./rest";

@Injectable()
export class ProductRestService extends Rest {
  constructor(private http: HttpClient) {
    super();
  }

  getTags() {
    return this.http.get(this.url + "product/tags");
  }

  addProduct(data: ProductData) {
    return this.http.post(this.url + "product/app", data);
  }

  editProduct(data: ProductData, idProduct: number) {
    return this.http.put(this.url + "product/edit/" + idProduct, data);
  }

  getProduct(productID: number, userID?: number) {
    const tmpUrl: string = userID
      ? "product/list/".concat(String(userID))
      : "product/list/";
    return this.http.get(this.url + tmpUrl);
  }

  deleteProduct(productID?: number, userID?: Number) {
    return this.http.delete(
      this.url + "product/remove/" + productID + "/" + userID
    );
  }
}
