import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../employee';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent {
  employee: Employee

  constructor(public dialogRef: MatDialogRef<EmpAddEditComponent>
              ) {
    this.employee = {
      firstName: "",
      lastName: "",
      email: "",
      learningDate: ""
    }           
  }

  onSubmit(myForm: any): void {
    console.log('in save');
    this.dialogRef.close(this.employee);
  }
}
