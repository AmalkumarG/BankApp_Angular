import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pass:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]]
  })
   register=()=>{
    
    if(this.registerForm.valid){
      const result=this.data.register(this.registerForm.value.acno,this.registerForm.value.pass,this.registerForm.value.uname).subscribe((result:any)=>{
        alert(result.message)
        this.router.navigateByUrl('')
        
      },
      result=>alert(result.error.message))
    }

    }
    
   

 
  constructor(private data:DataService,private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }


}
