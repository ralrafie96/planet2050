import { Component, OnInit } from '@angular/core';
import { LoremIpsum } from 'lorem-ipsum';

@Component({
	selector: 'app-trivia-page',
	templateUrl: './trivia-page.component.html',
	styleUrls: ['./trivia-page.component.css']
})
export class TriviaPageComponent implements OnInit {

    loremTxt = ""
	lorem = new LoremIpsum({
		sentencesPerParagraph: {
			max: 8,
			min: 4
		},
		wordsPerSentence: {
			max: 16,
			min: 4
		}
	})

	constructor() { }

	ngOnInit(): void {
        this.loremTxt = "\n\t" + this.lorem.generateSentences(5) + "\n\n\t" + this.lorem.generateSentences(8) + "\n\n\t" + this.lorem.generateSentences(6)
	}

}
