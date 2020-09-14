import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackbarService {

    constructor(private snackBar: MatSnackBar) { }

    showSnackbar(message: string) {
        this.snackBar.open(message, '', {
            duration: 2500,
            verticalPosition: 'top',
            horizontalPosition: 'right'
        });
    }
}