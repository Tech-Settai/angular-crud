import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';


const PrefixURL = `https://crudcrud.com/api/7c866b40726b446687fb4c1270399bb8`;
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
  ) { }

  inputform = this.fb.group({
    age: [this.data.age, Validators.required],
    name: [this.data.name, Validators.required],
    rank: [this.data.rank, Validators.required],
  });


  ngOnInit(): void {
    console.log('this.data', this.data);
  }

  ClosePopup(): void {
    this.dialogRef.close();
  }

  updateUser() {
    this.http.put(`${PrefixURL}/users/${this.data._id}`, {
      age: this.inputform.value.age,
      name: this.inputform.value.name,
      rank: this.inputform.value.rank
    }).subscribe(() => {
      this.ClosePopup();
      this._snackBar.open('Updated successfully','', {
        duration: 2000,
      });

    });
  }
  AddUser() {
    this.http.post(`${PrefixURL}/users`, {
      age: this.inputform.value.age,
      name: this.inputform.value.name,
      rank: this.inputform.value.rank
    }).subscribe(() => {
      this.ClosePopup();
      this._snackBar.open('Added successfully','', {
        duration: 2000,
      });

    });
  }

}
