import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  listFilter = '';
  showImage = false;

  imageWidth = 50;
  imageMargin = 2;
  errorMessage = ''

  //using getter and setter for two way data binding
  private _listFilter: string | undefined;
  get listFilter1(): string | undefined{
    return this._listFilter;
  }
  set listFilter1(value : string | undefined) {
    this._listFilter = value;
    this.performFilter(this.listFilter);
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        debugger
        this.performFilter(this.listFilter);
      },
      error: err => this.errorMessage = err
    });
  }

  onFilterChange(filter: string): void{
    this.listFilter = filter;
    this.performFilter(this.listFilter);
  }
  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter(product =>
        product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
    } else {
      this.filteredProducts = this.products;
    }
  }
}
