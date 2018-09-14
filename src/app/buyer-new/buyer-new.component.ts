import { Component, OnInit, ViewChild } from '@angular/core';
import { Buyer } from '../buyer';
import { BuyerService } from '../buyer.service';
import { FormBuilder, FormGroup , FormControl, Validators,NgForm,FormsModule,FormGroupDirective} from '@angular/forms';
import { patternValidator } from '../pattern-validator';

@Component({
  selector: 'app-buyer-new',
  templateUrl: './buyer-new.component.html',
  styleUrls: ['./buyer-new.component.scss']
})
export class BuyerNewComponent implements OnInit {
  model = new Buyer('','','','','','','');
  newBuyerRegisterForm: FormGroup;
  @ViewChild(FormGroupDirective) myForm;

  constructor(private buyerService: BuyerService, private fb: FormBuilder) {
    // To initialize FormGroup  
    this.newBuyerRegisterForm = this.fb.group({   
      'firstName': new FormControl('', Validators.compose([
         Validators.required
      ])),
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'middleName' : new FormControl('', Validators.compose([
      ])),
      'lastName'   : new FormControl('', Validators.compose([
         Validators.required
      ])),
      'company'    : new FormControl('', Validators.compose([
      ])),
      'address'    : new FormControl('', Validators.compose([
         Validators.required
      ])),
      'phone'      : new FormControl('', Validators.compose([
         Validators.required,
         Validators.pattern('^[0-9]{10}$')
      ]))
     }); 

      this.newBuyerRegisterForm.controls['firstName' ].setValue('');
      this.newBuyerRegisterForm.controls['email' ].setValue('');
      this.newBuyerRegisterForm.controls['middleName' ].setValue('');
      this.newBuyerRegisterForm.controls['lastName' ].setValue('');
      this.newBuyerRegisterForm.controls['company' ].setValue('');
      this.newBuyerRegisterForm.controls['address' ].setValue('');
      this.newBuyerRegisterForm.controls['phone' ].setValue('');

  }


  validation_messages = {
    firstName : [
      { type: 'required', message: 'First name is required' }
    ],
    email : [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    middleName : [
      
    ],
    lastName : [
      { type: 'required', message: 'Last name is required' }
    ],
    company : [
      
    ],
    address : [
      { type: 'required', message: 'Address is required' }
    ],
    phone : [
      { type: 'required', message: 'Phone number is required' },
      { type: 'pattern', message: 'Enter a valid phone number' }
    ]
  };

  ngOnInit() {
   
  }

  onSubmit(formDirective: NgForm) { 
     this.model = new Buyer(this.newBuyerRegisterForm.value.firstName,
                  this.newBuyerRegisterForm.value.middleName,
                  this.newBuyerRegisterForm.value.lastName,
                  this.newBuyerRegisterForm.value.company,
                  this.newBuyerRegisterForm.value.address,
                  this.newBuyerRegisterForm.value.phone,
                  this.newBuyerRegisterForm.value.email
      );
      
      this.buyerService.addBuyer(this.model)
      .subscribe(buyer => {
         this.reset();
      });
  }//onSubmit
  
  reset(){
    this.newBuyerRegisterForm.reset();
  }

}
