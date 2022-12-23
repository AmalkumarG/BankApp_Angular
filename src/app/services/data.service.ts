import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const options={
  headers:new HttpHeaders()
}
@Injectable({
  providedIn: 'root'
})


export class DataService {

  userDetails:any={
    1000:{acno:1000,username:"amal",password:1000,balance:1000,transaction:[]},
    1001:{acno:1001,username:"akku",password:1001,balance:1000,transaction:[]},
    1002:{acno:1002,username:"abc",password:1002,balance:1000,transaction:[]},
    
  }

  constructor(private http:HttpClient) { 
    this.getDetails()
  }
  currentUser:any
  currentAcno:any
  saveDetails=()=>{
    if(this.userDetails)
      localStorage.setItem("database",JSON.stringify(this.userDetails))
    if(this.currentAcno)
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    if(this.currentUser)
      localStorage.setItem("currentUser",JSON.stringify(this.currentUser))
  }
  getDetails=()=>{
    if(localStorage.getItem("database"))
      this.userDetails=JSON.parse(localStorage.getItem('database')||'')
    if(localStorage.getItem("currentAcno"))
      this.currentAcno=JSON.parse(localStorage.getItem('currentAcno')||'')
    if(localStorage.getItem("currentUser"))
      this.currentUser=JSON.parse(localStorage.getItem('currentUser')||'')
  }
  register(acno:any,password:any,username:any){
    const data={
      acno,password,username
    }
     return this.http.post('http://localhost:3000/register',data)
    // var userDetails=this.userDetails
    // if(acno in userDetails){
    //   return false
    // }
    // else{
      
    //   userDetails[acno]={
    //     acno:acno,username:username,password:password,balance:0,transaction:[]
    //   }
    //   this.saveDetails()
    //   console.log(userDetails);
      
    //   return true
    // }
  }
  login(acno:any,pass:any){
const data={
  acno,pass
}
    return this.http.post("http://localhost:3000/login",data)
    // if(acno in userDetails){
    //   if(pass==userDetails[acno]["password"])
    //   {
    //     this.currentUser=userDetails[acno].username
    //     this.currentAcno=acno
    //     this.saveDetails()
    //     return true
    //   }
        
    //   else return false
    // }
    // else return false
  }
  getToken=()=>{
    const token=JSON.parse(localStorage.getItem("token")||'')
    let headers=new HttpHeaders()
    if(token){
     options.headers=headers.append('token',token)
    }
    return options
  }
  deposite=(acno:any,pass:any,amount:any)=>{
    let data={
      acno,pass,amount
    }
    return this.http.post("http://localhost:3000/deposite",data,this.getToken())
    // var userDetails=this.userDetails
    // var amt=parseInt(amount)
    // if(acno in userDetails){
    //   if(pass==userDetails[acno].password){
    //     userDetails[acno].transaction.push({
    //       type:"credit",
    //       amount
    //     })
    //     console.log(userDetails);
        
    //     userDetails[acno]["balance"]+=amt
    //     this.saveDetails()
    //     return  userDetails[acno]["balance"]
    //   }
    //   else {
    //     alert("invalid password")
    //     return false
    //   }
    // }
    // else{
    //   alert("invalid username")
    //   return false
    // }
  }
  withDraw=(acno:any,pass:any,amount:any)=>{
    let data={
      acno,
      pass,
      amount 
    }
    return this.http.post("http://localhost:3000/withdraw",data,this.getToken())
    // var userDetails=this.userDetails
    // var amt=parseInt(amount)
    // if(acno in userDetails){
    //   if(pass==userDetails[acno].password){
    //     if(userDetails[acno]["balance"]>amt){
    //       userDetails[acno].transaction.push({
    //         type:"debit",
    //         amount
    //       })
    //       console.log(userDetails);
    //       userDetails[acno]["balance"]-=amt
    //       this.saveDetails()
    //     return  userDetails[acno]["balance"]
    //     }
    //     else {
    //       alert("insufficient balance")
    //       return false
    //     }

        
    //   }
    //   else {
    //     alert("invalid password")
    //     return false
    //   }
    // }
    // else{
    //   alert("invalid username")
    //   return false
    // }
  }
  getTransaction=(acno:any)=>{
    return this.http.post("http://localhost:3000/transaction",{acno})
  }
  deleteAc=(acno:any)=>{
    return this.http.delete("http://localhost:3000/delete/"+acno)
  }
}
