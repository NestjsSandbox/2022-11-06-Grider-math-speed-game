import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { delay, filter, scan } from 'rxjs';
import { MathValidator } from '../math-validator';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  constructor() {}

  secondsPerAnswer: number = 0;

  ngOnInit(): void {

    this.mathForm.statusChanges
      .pipe(
        filter((value) => value === 'VALID'),
        delay(200),
        //*  We use scan in this way: scan ( () => {}, {})  where the 2nd initial 
        //* argument is an object. With every iteration of the scan the object we rturn from the scan will be used as input for the new iteration.
        //*This also sets the type of acc to that object

        scan ( (acc) => {
          return {
            numberAnswered: acc.numberAnswered + 1,
            startTime: acc.startTime
          }
        }
        , {numberAnswered: 0, startTime: new Date()}
        ) //end scan operator
      )
      
      //* Here n the subscribe we destructurize the value passed down from 
      //* the scan operator in the pipe.
      .subscribe(({numberAnswered, startTime}) => {
       
        numberAnswered++;
        this.secondsPerAnswer = (new Date().getTime() - startTime.getTime()) / numberAnswered /1000;


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
