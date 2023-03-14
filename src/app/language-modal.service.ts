import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageModalService {

  constructor() { }

    modalOpen = new Subject()
    modalState!: boolean

    getModalState() {
        return this.modalOpen.asObservable()
    }
}
