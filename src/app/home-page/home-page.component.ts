import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageModalService } from '../language-modal.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

    constructor(private modalOpen: LanguageModalService) { }

    modalOpenSubscription!: Subscription

    ngOnInit(): void {}

    triggerModal() {
        this.modalOpen.modalOpen.next(null)
    }


}
