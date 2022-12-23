import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  depositeForm=this.fb.group({
    
    acno:['',[Validators.required,Validators.pattern(`${this.data.currentAcno}`)]],
    pass:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
    wacno:['',[Validators.required,Validators.pattern(`${this.data.currentAcno}`)]],
    wpass:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    wamount:['',[Validators.required,Validators.pattern('[0-9]*')]],
  })
  user=""
  cacno=""
  acno=""
  // pass=""
  // amount=""
  // wacno=""
  // wpass=""
  // wamount=""
 
   constructor(private data:DataService,private fb:FormBuilder,private router:Router) {
    if(localStorage.getItem("currentAcno")){
      this.user=JSON.parse(localStorage.getItem("currentUser")||"")
        this.cacno=JSON.parse(localStorage.getItem("currentAcno")||"")
    }
    
  
    }
 
   ngOnInit(): void {
    if(!localStorage.getItem("currentAcno")){
      alert("login again")
      this.router.navigateByUrl('')
    }
    
    
    
   }
   Deposite=()=>{
     this.data.deposite(this.depositeForm.value.acno,this.depositeForm.value.pass,this.depositeForm.value.amount).subscribe((result:any)=>{
      alert(result.message)
     },
     result=>{
      alert(result.error.message)
     })
     
     
   
     
     
   }
   WithDraw=()=>{
     this.data.withDraw(this.depositeForm.value.wacno,this.depositeForm.value.wpass,this.depositeForm.value.wamount).subscribe((result:any)=>{
      alert(result.message)
     },
     result=>alert(result.error.message))
 
   }
   logOut=()=>{
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("token")
    this.router.navigateByUrl('')
   }
   delete=()=>{
    this.acno=JSON.parse(localStorage.getItem("currentAcno")|| '')
   }
   onCancel=()=>{
    this.acno=""
   }
   onDelete=(event:any)=>{
    console.log(event)
    this.data.deleteAc(event).subscribe((result:any)=>{
      alert(result.message)
      this.logOut()
    },
    result=>{
      alert(result.error.message)
    })
    
   }
}
