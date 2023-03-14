import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Subscription } from 'rxjs';
import { MenuBtnService } from './menu-btn.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private menuBtn: MenuBtnService, private router: Router, private translate: TranslateService) {
        translate.setDefaultLang('en');
    }
    title = 'Planet2050';
    sidebarOpen = false

    menuBtnSubscription!: Subscription

    ngOnInit() {
        this.languageForm = new FormGroup({
            language: new FormControl(localStorage.getItem('language')),
        })
        this.changeLang(localStorage.getItem('language'))

        this.menuBtnSubscription = this.menuBtn.getButtonClicked().subscribe(() => {
            this.sidebarOpen = !this.sidebarOpen
            this.menuBtn.buttonState = this.sidebarOpen
        })
    }

    ngOnDestroy() {
        this.menuBtnSubscription.unsubscribe()
    }

    languageForm!: FormGroup
    navigate(page: String): void {
        this.router.navigate([page])
    }

    submitClicked(data: any): void {
        localStorage.setItem('language', data.language)
        this.changeLang(data.language)
        this.showModal = false
        // location.reload()
    }

    changeLang(lang: string | null) {
        let l!: string
        if (lang == "Spanish") {
            l = "sp"
        } else if (lang == "English") {
            l = "en"
        } else {
            console.log("Error: Unrecognized language: " + lang)
            l = "en"
        }
        this.translate.use(l)
    }

    triggerSidebar() {
        this.menuBtn.buttonClicked.next(null)
    }
    
    showModal = false
}

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
