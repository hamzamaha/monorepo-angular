/* eslint-disable @typescript-eslint/member-ordering */
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Order, Product, ResProduct, ResUser, User } from '@hcoding/shared';
import { OrdersService } from 'libs/shared/src/lib/services/orders.service';
import { ProductService } from 'libs/shared/src/lib/services/product.service';
import { UserService } from 'libs/shared/src/lib/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrls: ['./add-orders.component.css'],
})
export class AddOrdersComponent implements OnInit {
  productss: Product[] = [];
  selectedProducts: string[] = [];
  userss: User[] = [];
  newOrder: Order[] = [];
  countStock1 = '';
  constructor(
    private productService: ProductService,
    private orderService: OrdersService,
    private usersService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUsers();
    this.productService.getAllProducts().subscribe((res: ResProduct) => {
      this.productss = res.products;
      console.log(res);
    });
  }

  OrderForm = new FormGroup({
    shippingAddress: new UntypedFormControl('', Validators.required),
    invoiceAddress: new UntypedFormControl('', Validators.required),
    city: new UntypedFormControl('', Validators.required),
    country: new UntypedFormControl('', Validators.required),
    phone: new UntypedFormControl('', Validators.required),
    items: new UntypedFormControl('', Validators.required),
    user: new UntypedFormControl('', Validators.required),
  });

  onDeleteOrder(product: any) {
    // TODO: implement logic to delete the product
  }

  getUsers() {
    this.usersService.getAllUsers().subscribe(({ success, users }: ResUser) => {
      if (success) {
        this.userss = users;
      }
    });
  }
  onSelectProduct(product: Product): void {
    const index = this.selectedProducts.indexOf(product._id ?? '');
    if (index === -1) {
      this.selectedProducts.push(product._id ?? '');
    } else {
      this.selectedProducts.splice(index, 1);
    }
    // this.selectedProducts.map(id => ({ product: id   })),
    // console.log(this.selectedProducts)
  }
  onAddOrder() {
    // TODO: implement logic to add a new product
    // this.orderService.addOrder(this.OrderForm.value).subscribe(()=>{
    //   newOrder = this.selectedProducts
    // })
    // console.log(this.selectedProducts);
    const newOrder = {
      ...this.OrderForm.value,
      // product: this.selectedProducts.map(id => ({ product: id   })),
      items: this.selectedProducts.map((productId) => {
        return {
          product: productId,
          quantity: 1, // assuming each product has a quantity of 1 for simplicity
        };
      }),
    };
    console.log(this.selectedProducts);
    this.orderService.addOrder(newOrder).subscribe(
      () => {
        this.router.navigate(['/admin/orders']);
        console.log('Order created successfully');
      },
      (error) => {
        console.error('Error creating order:', error);
      }
    );
  }
}
