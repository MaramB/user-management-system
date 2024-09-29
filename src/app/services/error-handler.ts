import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private toastr: ToastrService) {}

  handle(error: any): void {
    let errorMessage: string = '';
    try {
      console.log('er-handle', error);
      const errorObject = JSON.parse(error);

      if (errorObject?.Message) {
        errorMessage = errorObject.Message;
      } else {
        errorMessage = 'An unexpected error occurred.';
      }
    } catch (parseError) {
      errorMessage = 'An unexpected error occurred.';
    }
    this.toastr.error(errorMessage, '', {
      timeOut: 3000,
    });
  }
}
