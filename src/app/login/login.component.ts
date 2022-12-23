import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  aim="manage account"
  // acno=""
  // pass=""
  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],pass:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  login=()=>{
    if(this.loginForm.valid){
      const result=this.data.login(this.loginForm.value.acno,this.loginForm.value.pass).subscribe((result:any)=>{
        console.log("result===",result);
        localStorage.setItem("currentUser",JSON.stringify(result.currentUser))
        localStorage.setItem("currentAcno",JSON.stringify(result.currentAcno))
        localStorage.setItem("token",JSON.stringify(result.token))
        
        alert(result.message)
        this.router.navigateByUrl('homePage')
      },result=>alert(result.error.message))
    //   if(result){
    //     alert("login success")
    //     this.router.navigateByUrl("homePage")
    //   }
    //   else alert("failed")
    // }
    // else alert("login failed")
    }}
  
  // acnoChange(event:any){
  //   this.acno=event.target.value
  //   console.log(this.acno);
    
  // }
  // passChange(event:any){
  //   this.pass=event.target.value
  //   console.log(this.pass);
    
  // }
 
 
//4 user defined fn
  constructor(private router:Router,private data:DataService,private fb:FormBuilder) { }//1

  ngOnInit(): void {//2
    if(localStorage.getItem("token")){
      this.router.navigateByUrl("homePage")
    }
  }

}
