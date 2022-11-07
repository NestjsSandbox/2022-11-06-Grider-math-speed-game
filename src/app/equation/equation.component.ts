import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { delay, filter } from 'rxjs';
import { MathValidator } from '../math-validator';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {

    this.mathForm.statusChanges
      .pipe(
        filter( value => value === 'VALID'),
        delay(200)
      )
      .subscribe( () => {

    //* This is another option to verify if the form is valid, it uses an if-statement
    // instead of the 'filter()' operator.
    // this.mathForm.statusChanges.pipe((delay(200))).subscribe((value) => {
    //   if (value === 'INVALID') {
    //     return; //If wrong answer then ignore
    //   }

      //From this line downward is the case where user entered a correct answer

      //(1) Generate new random numbers and emoty the Answer field to reset equation
      //*This is the long-way to set multiple values:
      // this.mathForm.controls.fieldA.setValue(this.generateRandomNumber());
      // this.mathForm.controls.fieldB.setValue(this.generateRandomNumber());
      // this.mathForm.controls.fieldAnswer.setValue('');

      //*This is the long-way to set multiple values:
      this.mathForm.setValue({
        fieldA: this.generateRandomNumber(),
        fieldB: this.generateRandomNumber(),
        fieldAnswer: '',
      });

    });
  }

  mathForm = new FormGroup(
    {
      fieldA: new FormControl(this.generateRandomNumber()),
      fieldB: new FormControl(this.generateRandomNumber()),
      fieldAnswer: new FormControl(''),
    },
    [MathValidator.addition('fieldAnswer', 'fieldA', 'fieldB')]
  );

  get fieldA() {
    return this.mathForm.value.fieldA;
  }
  get fieldB() {
    return this.mathForm.value.fieldB;
  }
  get fieldAnswer() {
    return this.mathForm.value.fieldAnswer;
  }

  generateRandomNumber(): number {
    // THe 'floor' method rounds-DOWN to lower number
    // Exampole 3.6 => 3  3.9 => 3
    return Math.floor(Math.random() * 10);
  }
}
