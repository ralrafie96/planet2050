import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CardComponent } from './common/card/card.component';
import { CarouselComponent } from './common/carousel/carousel.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { TriviaPageComponent } from './trivia-page/trivia-page.component';
import { MenuBtnService } from './menu-btn.service';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        CardComponent,
        CarouselComponent,
        QuizPageComponent,
        TriviaPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            defaultLanguage: 'en',}
        )
    ],
    providers: [MenuBtnService],
    bootstrap: [AppComponent]
})
export class AppModule { }
