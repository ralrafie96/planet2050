import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MenuBtnService {

    constructor() { }
    buttonClicked = new Subject()

    getButtonClicked() {
        return this.buttonClicked.asObservable()
    }
}
