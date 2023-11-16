import { Component, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';

import { api } from '../../endpoints/server';
import Boop from 'src/app/models/boop';

@Component({
  selector: 'get-boop-dialog',
  templateUrl: './get-boop-dialog.component.html',
  styleUrls: ['./get-boop-dialog.component.css']
})
export class GetBoopDialogComponent {
  dialogRef = inject(MatDialogRef);
  loaded: boolean = true;

  id!: number;
  idError: boolean = false;

  constructor(private httpClient: HttpClient) { }

  getBoop(): void {
    this.loaded = false;
    this.idError = false;

    // TODO: better handle connection errors (snackbar with retry?)
    this.httpClient.get<Boop>(api.boop.get + '/' + this.id)
    .pipe(catchError((err: HttpErrorResponse) => {
      if(err.status === 0)
        alert('Connection error');
      else if(err.status === 404)
        this.idError = true;

      this.loaded = true;
      return throwError(() => new Error())
    }))
    .subscribe(data => {
      this.dialogRef.close(data);
    });

    // Mock call
    // this.httpClient.get<Boop[]>(api.mock.boop.list).subscribe(data => {
    //   const boop: Boop | undefined = data.find((b: Boop) => b.id === this.id);

    //   setTimeout(() => {
    //     if(!boop) {
    //       this.idError = true;
    //       this.loaded = true;
    //       return;
    //     }

    //     this.dialogRef.close(boop);
    //   }, 1000);
    // });
  }
}
