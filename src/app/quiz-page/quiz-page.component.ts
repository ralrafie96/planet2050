import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuBtnService } from '../menu-btn.service';

@Component({
    selector: 'app-quiz-page',
    templateUrl: './quiz-page.component.html',
    styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit {

    constructor(private menuBtn: MenuBtnService, private translate: TranslateService) {
    }

    ngOnInit(): void {
        this.quizForm = new FormGroup({
            q1: new FormControl(null),
            q2: new FormControl(null),
            q3: new FormControl(null),
            q4: new FormControl(null),
            q5: new FormControl(null),
            q6: new FormControl(null),
            q7: new FormControl(null),
            q8: new FormControl(null),
            q9: new FormControl(null),
            q10: new FormControl(null),
        })
        
        this.sidebarOpen = this.menuBtn.buttonState
        this.menuBtnSub = this.menuBtn.getButtonClicked().subscribe(() => {
            this.sidebarOpen = this.menuBtn.buttonState
        })

        this.quizQuestionSub = this.translate.stream('QUIZ.QUESTIONS').subscribe((data) => {
            this.bankOfQuestions = data
            console.log(this.bankOfQuestions)
            this.refreshQuestions()
        })
    }

    ngOnDestroy(){
        // this.destroy$.
        // this.destroy$.complete(); 
        this.quizFormSub.unsubscribe()
        this.quizQuestionSub.unsubscribe()
        this.menuBtnSub.unsubscribe()
    }

    private destroy$ = new Subject();
    menuBtnSub!: Subscription
    quizFormSub!: Subscription
    quizQuestionSub!: Subscription
    sidebarOpen!: boolean
    showModal: boolean = false
    currentQ: number = 0
    disablePrev: boolean = true
    disableNext: boolean = true
    disableSubmit: boolean = true
    quizForm!: FormGroup;
    numOfQuestions!: number
    numCorrect!: number
    score = 0
    title = "Planeteer"
    medal = "bronze"
    submitted = false
    questions: any[] = []
    bankOfQuestions!: any[]

    refreshQuestions() {
        this.chooseQuestions(10, this.bankOfQuestions)
        this.quizFormSub = this.quizForm.valueChanges.subscribe(data => { // try takeUntil(this.destroy$)
            let check = false
            console.log(data)
            for (let key in data) {
                if (data[key] == null) {
                    check = true
                }
            }
            this.disableSubmit = check
        });
    }

    chooseQuestions(n: number, arr: string | any[]) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        this.questions = result
    }

    submitClicked(data: any) {
        console.log(data)
        this.numOfQuestions = 0
        this.numCorrect = 0
        for (let i in this.questions) {
            this.numOfQuestions++
            for (let j in data) {
                console.log(j)
                console.log("q" + (Number(i) + 1))
                if ("q" + (Number(i) + 1) == j && this.questions[i].answer == data[j]) {
                    this.numCorrect++
                }
            }
        }
        console.log(this.numCorrect)
        console.log(this.numOfQuestions)
        this.score = (this.numCorrect / this.numOfQuestions) * 100
        if (this.score >= 80) {
            this.title = this.translate.instant('QUIZ.CAPTAIN EARTH')
            this.medal = "gold"
        } else if (this.score >= 50 && this.score < 80) {
            this.title = this.translate.instant('QUIZ.GEO-FORCE')
            this.medal = "silver"
        } else {
            this.title = this.translate.instant('QUIZ.PLANETEER')
            this.medal = "bronze"
        }
        this.submitted = true
        this.showModal = true
    }

    start() {
        this.disableNext = false
        this.currentQ = 0
        this.next()
    }

    reset() {
        this.quizFormSub.unsubscribe()
        this.refreshQuestions()
        this.start()
    }

    refreshComponent() {
        // this.router.navigate([this.router.url])
        location.reload()
     }

    next() {
        this.currentQ = this.currentQ + 1
        document.getElementById("separator" + this.currentQ)?.scrollIntoView({ behavior: "smooth", inline: "end" })
        this.validateBtns()
    }

    prev() {
        this.currentQ = this.currentQ - 1
        document.getElementById("separator" + this.currentQ)?.scrollIntoView({ behavior: "smooth", inline: "end" })
        this.validateBtns()
    }

    validateBtns() {
        if (this.currentQ <= 1) {
            this.disablePrev = true
        } else {
            this.disablePrev = false
        }
        if (this.currentQ >= this.questions.length) {
            this.disableNext = true
        } else {
            this.disableNext = false
        }
    }

}
