import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  sendMessage(payload: any): Observable<any> {
    // Placeholder: simulate success. Replace with real HTTP call to backend when available.
    return of({ success: true }).pipe(delay(500));
  }
}
