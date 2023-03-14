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
        this.refreshQuestions()
        this.subscription = this.menuBtn.getButtonClicked().subscribe(() => {
            this.sidebarOpen = !this.sidebarOpen
            console.log(this.sidebarOpen)
            console.log(this.disableNext)
        })
    }

    ngOnDestroy(){
        // this.destroy$.
        // this.destroy$.complete(); 
        this.subscription.unsubscribe()
    }

    private destroy$ = new Subject();
    subscription!: Subscription
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
    bankOfQuestionsSp = [
        {
            "question": "¿Cuál de las siguientes es la principal razón para producir el efecto invernadero atmosférico?",
            "options": [
                "Absorción y reemisión de radiaciones ultravioleta por la atmósfera",
                "Absorción y reemisión de radiaciones infrarrojas por la atmósfera",
                "Absorción y reemisión de luz visible por la atmósfera",
                "Ninguna de las anteriores"
            ],
            "answer": "Absorción y reemisión de radiaciones infrarrojas por la atmósfera"
        },
        {
            "question": "La salinización se puede definir como -",
            "options": [
                "Acumulación de sales en el cuerpo",
                "Acumulación de sales en el agua",
                "Acumulación de sales en animales",
                "Acumulación de sales en el suelo"
            ],
            "answer": "Acumulación de sales en el suelo"
        },
        {
            "question": "La razón principal del azul del cielo es -",
            "options": [
                "Por la presencia de vapor de agua",
                "Debido a la absorción de la luz azul debido al aire",
                "Debido a la dispersión de la luz solar por las moléculas de aire",
                "Ninguna de las anteriores"
            ],
            "answer": "Debido a la dispersión de la luz solar por las moléculas de aire"
        },
        {
            "question": "¿Cuál de las siguientes es la causa de la contaminación del suelo?",
            "options": [
                "Ozono",
                "Aerosol",
                "Lluvia ácida",
                "Ninguna de las anteriores"
            ],
            "answer": "Lluvia ácida"
        },
        {
            "question": "¿Qué es el vapor de agua?",
            "options": [
                "Es la fase gaseosa del agua",
                "es una gota de lluvia",
                "El vapor de agua es la gota de la nube",
                "Ninguna de las anteriores"
            ],
            "answer": "Es la fase gaseosa del agua."
        },
        {
            "question": "¿Cuál de las siguientes es la causa de la melanornia (cáncer de piel)?",
            "options": [
                "Lluvia ácida",
                "Alérgenos",
                "Agotamiento del ozono",
                "Ninguna de las anteriores"
            ],
            "answer": "Agotamiento del ozono"
        },
        {
            "question": "El color amarillento del Taj Mahal es un efecto de -",
            "options": [
                "Lluvia ácida",
                "Alérgenos",
                "Agotamiento del ozono",
                "Ninguna de las anteriores"
            ],
            "answer": "Lluvia ácida"
        },
        {
            "question": "La parte de la planta que evapora el agua es -",
            "options": [
                "Fruta",
                "Estomas",
                "Raíz",
                "Ninguna de las anteriores"
            ],
            "answer": "Estomas"
        },
        {
            "question": "¿A qué hora del día la humedad relativa en el ambiente es mínima?",
            "options": [
                "Cuando la temperatura del aire es más baja",
                "Antes del amanecer",
                "Medianoche",
                "Cuando la temperatura del aire es más alta"
            ],
            "answer": "Cuando la temperatura del aire es más alta"
        },
        {
            "question": "¿Qué es la hibernación?",
            "options": [
                "Sueño de invierno",
                "sueño de verano",
                "Adaptación de los animales para escapar de los depredadores",
                "Todo lo anterior"
            ],
            "answer": "Sueño de invierno"
        },
        {
            "question": "¿Qué es la estivación?",
            "options": [
                "Sueño de invierno",
                "sueño de verano",
                "Adaptación de los animales para escapar de los depredadores",
                "Todo lo anterior"
            ],
            "answer": "sueño de verano"
        },
        {
            "question": "¿Cuál de los siguientes gases está presente en el aire en cantidad máxima",
            "options": [
                "Nitrógeno",
                "Oxígeno",
                "Dióxido de carbono",
                "Metano"
            ],
            "answer": "Nitrógeno"
        },
        {
            "question": "¿Qué energía convierte la célula solar en energía eléctrica?",
            "options": [
                "Energía química",
                "Energía solar",
                "Energía magnética",
                "Ninguna de las anteriores"
            ],
            "answer": "Energía solar"
        },
        {
            "question": "¿Cuál de las siguientes es una fuente de energía renovable?",
            "options": [
                "Carbón",
                "Uranio",
                "Viento",
                "Ninguna de las anteriores"
            ],
            "answer": "Viento"
        },
        {
            "question": "El proceso de cambio de sólido a líquido mediante el suministro de calor se denomina como -",
            "options": [
                "Derritiendo",
                "Evaporación",
                "Hirviendo",
                "Condensación"
            ],
            "answer": "Derritiendo"
        }
    ]
    bankOfQuestionsEn = [
        {
            'question': 'Which of the following is the main reason for producing the atmospheric greenhouse effect?',
            'options': [
                'Absorption and re-emission of ultraviolet radiations by the atmosphere',
                'Absorption and re-emission of infrared radiations by the atmosphere',
                'Absorption and re-emission of visible light by the atmosphere',
                'None of the above'
            ],
            'answer': 'Absorption and re-emission of infrared radiations by the atmosphere'
        },
        {
            'question': 'The salinization can be defined as -',
            'options': [
                'Accumulation of salts in the body',
                'Accumulation of salts in water',
                'Accumulation of salts in animals',
                'Accumulation of salts in the soil'
            ],
            'answer': 'Accumulation of salts in the soil'
        },
        {
            'question': 'The main reason for blueness of the sky is -',
            'options': [
                'Due to the presence of water vapor',
                'Due to the absorption of blue light due to the air',
                'Due to the scattering of sunlight by air molecules',
                'None of the above'
            ],
            'answer': 'Due to the scattering of sunlight by air molecules'
        },
        {
            'question': 'Which of the following is the cause of soil pollution?',
            'options': [
                'Ozone',
                'Aerosol',
                'Acid rain',
                'None of the above'
            ],
            'answer': 'Acid rain'
        },
        {
            'question': 'What is the water vapor?',
            'options': [
                'It is the gaseous phase of water',
                'It is a rain droplet',
                'Water vapor is the cloud droplet',
                'None of the above'
            ],
            'answer': 'It is the gaseous phase of water'
        },
        {
            'question': 'Which of the following is the cause of Melanornia (skin cancer)?',
            'options': [
                'Acid rain',
                'Allergens',
                'Ozone depletion',
                'None of the above'],
            'answer': 'Ozone depletion'
        },
        {
            'question': 'The yellowness of the Taj Mahal is an effect of -',
            'options': [
                'Acid rain',
                'Allergens',
                'Ozone depletion',
                'None of the above'],
            'answer': 'Acid rain'
        },
        {
            'question': 'The part of the plant that evaporates water is -',
            'options': [
                'Fruit',
                'Stomata',
                'Root',
                'None of the above'],
            'answer': 'Stomata'
        },
        {
            'question': 'At what time of the day relative humidity in the environment is at minimum?',
            'options': [
                'When the air temperature is lowest',
                'Before sunrise',
                'Midnight',
                'When the air temperature is higher'],
            'answer': 'When the air temperature is higher'
        },
        {
            'question': 'What is hibernation?',
            'options': [
                'Winter sleep',
                'Summer sleep',
                'Adaptation of animals to escape from predators',
                'All of the above'],
            'answer': 'Winter sleep'
        },
        {
            'question': 'What is aestivation?',
            'options': [
                'Winter sleep',
                'Summer sleep',
                'Adaptation of animals to escape from predators',
                'All of the above'],
            'answer': 'Summer sleep'
        },
        {
            'question': 'Which of the following gas is present in the air in maximum amount?',
            'options': [
                'Nitrogen',
                'Oxygen',
                'Carbon dioxide',
                'Methane'],
            'answer': 'Nitrogen'
        },
        {
            'question': 'The solar cell converts which energy into electrical energy?',
            'options': [
                'Chemical energy',
                'Solar energy',
                'Magnetic energy',
                'None of the above'],
            'answer': 'Solar energy'
        },
        {
            'question': 'Which of the following is a renewable source of energy?',
            'options': [
                'Coal',
                'Uranium',
                'Wind',
                'None of the above'],
            'answer': 'Wind'
        },
        {
            'question': 'The process of changing the solid into a liquid by supplying the heat is called as -',
            'options': [
                'Melting',
                'Evaporation',
                'Boiling',
                'Condensation'],
            'answer': 'Melting'
        },
    ]

    refreshQuestions() {
        if (localStorage.getItem("language") == "English") {
            this.chooseQuestions(10, this.bankOfQuestionsEn)
        } else if (localStorage.getItem("language") == "Spanish") {
            this.chooseQuestions(10, this.bankOfQuestionsSp)
        }
        

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
        this.subscription = this.quizForm.valueChanges.subscribe(data => { // try takeUntil(this.destroy$)
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
        this.subscription.unsubscribe()
        this.quizForm.reset()
        this.refreshQuestions()
        this.chooseQuestions(10, this.bankOfQuestionsSp)
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
