import { AfterViewInit, Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-home',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    MatButtonModule, 
    MatTableModule, 
    FormsModule, 
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit{
  displayedColumns = ['id', 'product', 'quantity', 'price', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Order>();

  orders: Order[]=[]
  quantity:any=undefined
  price:any=undefined

  order:Order = {
    id: 0,
    product:'',
    quantity:0,
    price:0
  }

  constructor(private orderService:OrderService) {}

  ngAfterViewInit(): void {
    this.orderService.getOrders().subscribe((data)=>{
      this.orders=data;
      this.dataSource=new MatTableDataSource<Order>(data);
    })
  }

  setOrder(order:Order){
    this.order.id=order.id;
    this.order.price = order.price;
    this.order.quantity = order.quantity;
    this.order.product = order.product;
  }

  deleteOrder(order:Order){
    this.order.id=order.id;
    this.orderService.deleteOrder(order).subscribe({
      next:(data)=>{
        console.log("Product deleted successfully");
        window.location.reload();
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  addEditOrder(order:Order){
    if(order.id!=0){
      //update
      this.orderService.updateOrder(order).subscribe({
        next:(data)=>{
          console.log("Product Updated successfully");
          window.location.reload();
        },
        error:(error)=>{
          console.log(error)
        }
      })
    }else{
      //create order
      this.orderService.createOrder(order).subscribe({
        next:(data)=>{
          console.log("New Product Created successfully");
          window.location.reload();
        },
        error:(error)=>{
          console.log(error)
        }
      })
    }
    
  }

}


