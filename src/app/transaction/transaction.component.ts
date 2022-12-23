import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
 acno:any
 transaction:any
  constructor(private data:DataService) { 
    this.acno=JSON.parse(localStorage.getItem("currentAcno")||'')
    data.getTransaction(this.acno).subscribe((result:any)=>{
      console.log("transs",result);
      
      this.transaction=result.message
    })
  }

  ngOnInit(): void {
  }

}
