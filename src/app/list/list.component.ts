import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AddUserComponent } from '../add-user/add-user.component';

const PrefixURL = `https://crudcrud.com/api/c0804642dbe74ab1b31c0ad53a573782`;
export interface PeriodicElement {
  name: string;
  rank: number;
  age: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[];
  dataSource;
  constructor(private http: HttpClient,
    private changeDetectorRefs: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }
  ELEMENT_DATA: PeriodicElement[] = [];

  ngOnInit(): void {
    this.displayedColumns = ['rank', 'name', 'age', 'action'];
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.loadData();
  }

  loadData() {
    this.http.get(`${PrefixURL}/users`).subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  delete(element) {
    this.http.delete(`${PrefixURL}/users/${element._id}`).subscribe(() => {
      this.loadData();
      this._snackBar.open('Deleted successfully','', {
        duration: 2000,
      });
    });
  }

  OpenEditDialog(element) {
     const dialogRef =  this.dialog.open(AddUserComponent, {
      width: '500px',
      data: {...element,
        OpenAs: 'edit'
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    });
  }

  OpenAddDialog() {
     const dialogRef =  this.dialog.open(AddUserComponent, {
      width: '500px',
      data: {
        OpenAs: 'add'
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();
  }

}
