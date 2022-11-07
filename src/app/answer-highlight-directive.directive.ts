import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map } from 'rxjs';

@Directive({
  selector: '[appAnswerHighlightDirective]',
})
export class AnswerHighlightDirectiveDirective {
  // (1) See the file 'equation.component.html' for the first step (1).
  constructor(
    // (2) Then we use DI to bind the directive to the html element (via a 'nativeElement' property)
    // that is the elment that we tagged with the selector name 'appAnswerHighlightDirective'
    private el: ElementRef,

    //(3) We then bind this instance constructor to FormControlName, which is a class
    //    that has an instance declared in our el ElementRef.
    //    Explanation of the binding of FormControlName:
    //    (3a) In the equation.component.ts file, in the place where we declared the mathForm FormGroup, we
    //         also declared that one of the form controlers is a new instance of FormControl:
    //         we declared that fieldAnswer: new FormControl('')
    //    (3b) So angular went to the file equation.component.html and searched for an element that has
    //         an element that has formControlName="fieldAnswer".
    //         Once it finds that (it found it in the <input .. element) Angular will bind that new control
    //         instance we created in the ts file (the one we declared using
    //         fieldAnswer: new FormControl('')) to the html-file <input ...> element.
    //         The binding we described here is done by the class FormControlName, think of this class as the
    //         GLUE between a form-control and the actual html element.
    //         This means we have access to almost all the properties that FormCOntrol has because most of
    //         those properties also exist in FormControlName

    private controlName: NgControl
  ) {}

  ngOnInit() {
    //(a) We have access to control.Name control value here in the ngOnInit lifecycle method, if we try in
    //    the constructor then the value will be 'undefined'.
    //(b) This controlName.control gives the value of the fieldAnswer component because it is bound to it via
    //    the formControlName.
    //console.log(this.controlName.control);  //* Gives console.log of FormControl

    //(c) When we want to get access to the sibling formControl (i.e. fieldA & fieldB) then we
    //    use the 'parent' property:
    //console.log(this.controlName.control?.parent);  //* Gives console.log of FormCGroup

    //(d) When we want to access any changes to the sibling formControl (i.e. fieldA & fieldB) then we
    //    use the 'parent' property:
    //console.log(this.controlName.control?.parent?.valueChanges);  //* Gives console.log of FormCGroup

    //(e) Using valueChanges to detect any change in the form and output its value:
    // this.controlName.control?.parent?.valueChanges.subscribe(
    //   value => {
    //     console.log(value);
    //   }
    // );

    //(f) Processing the data flowing through 'valueChanges' observer
    this.controlName.control?.parent?.valueChanges
      .pipe(
        map(({ fieldA, fieldB, fieldAnswer }) =>
          Math.abs((fieldA + fieldB - fieldAnswer) / (fieldA + fieldB))
        )
      ) //end pipe
      .subscribe((value) => {
    //(g) Setting a class by logic on observer resultobserver
        if (value < 0.2) {
          this.el.nativeElement.classList.add('close');
        } else {
          this.el.nativeElement.classList.remove('close');
        }
      });
  }
}
