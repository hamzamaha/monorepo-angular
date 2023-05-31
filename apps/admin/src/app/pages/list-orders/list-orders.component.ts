/* eslint-disable @typescript-eslint/member-ordering */
import { OrdersService } from './../../../../../../libs/shared/src/lib/services/orders.service';
import { Component, OnInit } from '@angular/core';
import { Order, ResOrder } from '@hcoding/shared';

@Component({
  selector: 'admin-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css'],
})
export class ListOrdersComponent implements OnInit {
  // constructor(private service: OrdersService) {}
  // orders: Order[] | undefined = [];

  // patchUser(option: string | undefined, id: string | undefined) {
  //   this.orderToPatch.status = option;
  //   if (id && option) {
  //     this.service.updateOrders(id, this.orderToPatch).subscribe();
  //   }
  // }
  // orderToPatch: Order = {};
  // status = ['shipped', 'received', 'canceled', 'pending'];
  // ngOnInit(): void {
  //   this.getOrders();
  // }
  // getOrders() {
  //   this.service.getAllOrders().subscribe((response: ResOrder) => {
  //     console.log('responce', response);
  //     this.orders = response.orders;
  //   });
  // }

  constructor(private service: OrdersService) {}
  orders: Order[] | undefined = [];

  patchOrder(order: Order) {
    if (order._id && order.status) {
      this.service
        .updateOrders(order._id, { status: order.status })
        .subscribe(() => {
          order.editing = false;
        });
    }
  }

  editOrder(order: Order) {
    order.editing = true;
  }

  cancelEditOrder(order: Order) {
    order.editing = false;
  }

  status = ['shipped', 'received', 'canceled', 'pending'];
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this.service.getAllOrders().subscribe((response: ResOrder) => {
      console.log('response', response);
      this.orders = response.orders.map((order) => ({
        ...order,
        editing: false,
      }));
    });
  }

  getStatusColor(status: string | undefined) {
    switch (status) {
      case 'shipped':
        return '#28a745';
      case 'received':
        return '#6c757d';
      case 'canceled':
        return '#dc3545';
      case 'pending':
        return '#ffc107';
      default:
        return '';
    }
  }
}
