import { Component, OnInit, ViewChild } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { TransactionsService } from '../../service/transactions.service';
import { formatDate } from '../../lib/DateFormatter';
import { InventoryService } from '../../service/store-service.service';
import { Product } from '../../model/product.model';
import { NzDatePickerComponent, NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { LineComponent } from "../lib/line/line.component";
import { InventoryBalance } from '../../model/InventoryBalance';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NzIconModule, NzCardModule, NzDropDownModule, CommonModule, NzSelectModule, FormsModule, NzDatePickerComponent, NzDatePickerModule, LineComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  products: any[] = [];
  sells: any[] = [];
  moneyIn$: Observable<number>;
  moneyInTaxed$: Observable<number>| undefined;;
  moneyInTaxed: number=0;
  moneyInTax:number=0;
  moneyInUnTaxed:number = 0;
  unpaidTax: number = 0;
  afterTax: number = 0;
  moneyOut$: Observable<number>;
  moneyOut: number = 0;
  moneyOutTaxed$: Observable<number>| undefined;
  moneyOutTaxed: number = 0;
  totalUntaxedOut:number = 0;
  balance$: Observable<InventoryBalance>;
  productsInStore$: Observable<any>;
  productsMostSold$: Observable<any>;
  recentSales$: Observable<any>;
  productsMostAged$: Observable<any>
  productsSold$: Observable<any>;
  productions$: Observable<any>;
  profit = 0;


  startValue: Date = new Date();
  endValue: Date = new Date();
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  constructor(private readonly transactionService: TransactionsService, private readonly storeService: InventoryService){
    this.balance$ = transactionService.getBalance();
    this.productions$ = storeService.getProductions(formatDate(this.startValue), formatDate(this.endValue));
    this.moneyIn$ = transactionService.getMoneyIn(formatDate(this.startValue), formatDate(this.endValue));/*
    this.moneyInTaxed$ = transactionService.getMoneyInTaxed(formatDate(this.startValue), formatDate(this.endValue));*/
    this.moneyOut$ = transactionService.getMoneyOut(formatDate(this.startValue), formatDate(this.endValue));/*
    this.moneyOutTaxed$ = transactionService.getMoneyOutTaxed(formatDate(this.startValue), formatDate(this.endValue));*/
    this.productsInStore$ = storeService.getProducts({page:0,size:10 });
    this.productsMostSold$ = storeService.getProducts({page:0, size: 4});
    this.productsSold$ = transactionService.getProductsSoldInDates(formatDate(this.startValue), formatDate(this.endValue));
    this.recentSales$ = transactionService.getRecentSales();
    this.productsMostAged$ = transactionService.getAgedItems();
  }


  ngOnInit(): void {
    this.moneyOut$.subscribe((d)=>{
      this.moneyIn$.subscribe((i)=>{
        this.profit = i- d;
      })
    });

    /*
    this.moneyInTaxed$.subscribe((total)=>{
      this.moneyInTaxed = total;
      this.moneyInTax = total * 0.131;
      this.moneyIn$.subscribe((money)=>{
        this.moneyIn = money;
        this.moneyInUnTaxed = money - this.moneyInTaxed;
        this.unpaidTax = this.moneyInUnTaxed * 0.15;
        this.afterTax = this.moneyInUnTaxed*(0.8697) + total*(0.869);
      })
    })

    this.storeService.getProducts().subscribe((data)=>{
      this.products.push(...data)
      this.products.forEach((p)=>{
        p.quantity = 0;
      })
      this.storeService.getProductions(formatDate(this.startValue), formatDate(this.endValue)).subscribe((productions: any[])=>{
        productions.forEach((prod)=>{
          this.products.map((p)=>{
            if(p.product.id === prod.product.id){
              p.quantity += prod.quantity;
            }
          })
        })
        console.log(this.products);
      })
    })


    this.moneyOut$.subscribe((out)=>{
      this.moneyOut = out;
      this.moneyOutTaxed$.subscribe((taxed)=>{
        this.moneyOutTaxed = taxed;
      })
    })

    this.storeService.getProducts().subscribe((data)=>{
      this.sells.push(...data)
      this.sells.map((sell)=>{
        sell.quantity = 0;
      })

      this.productsSold$.subscribe((sells: any[])=>{
        sells.forEach((sell)=>{
          this.sells.forEach((s)=>{
            if(s.product.id == sell.product.id){
              s.quantity += sell.quantity;
            }
          })
        })
       })

       console.log(this.sells);



  });


*/

  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
  }

  handleEndOpenChange(open: boolean): void {

    this.productions$ = this.storeService.getProductions(formatDate(this.startValue), formatDate(this.endValue));
    this.moneyIn$ = this.transactionService.getMoneyIn(formatDate(this.startValue), formatDate(this.endValue));
    this.moneyInTaxed$ = this.transactionService.getMoneyInTaxed(formatDate(this.startValue), formatDate(this.endValue));
    this.moneyOut$ = this.transactionService.getMoneyOut(formatDate(this.startValue), formatDate(this.endValue));
    this.moneyOutTaxed$ = this.transactionService.getMoneyOutTaxed(formatDate(this.startValue), formatDate(this.endValue));
    this.productsSold$ = this.transactionService.getProductsSoldInDates(formatDate(this.startValue), formatDate(this.endValue));

    this.moneyOut$.subscribe((out)=>{
      this.moneyOut = out;
     /* this.moneyOutTaxed$.subscribe((taxed)=>{
        this.moneyOutTaxed = taxed;
      }) */
    })

    this.sells.map((sell)=>{
      sell.quantity = 0;
    })
      this.productsSold$.subscribe((sells: any[])=>{
        sells.forEach((sell)=>{
          this.sells.forEach((s)=>{
            if(s.product.id == sell.product.id){
              s.quantity += sell.quantity;
            }
          })
        })
       });
  }

}
