import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MathValidator } from '../math-validator';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  mathForm = new FormGroup(
    {
      fieldA: new FormControl(this.generateRandomNumber()),
      fieldB: new FormControl(this.generateRandomNumber()),
      fieldAnswer: new FormControl(''),
    },
    [ MathValidator.addition('fieldAnswer', 'fieldA', 'fieldB'),  ]
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
