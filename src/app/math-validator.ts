import { AbstractControl } from '@angular/forms';

export class MathValidator {
  //We need the method to be 'static' so that there is no need for a constructor.
  //Otherwise we would have needed a constructor to create an instance, then call the function using that instance.
  //But because we are using satic then nothing in the function can make use of any variables or methods of this class. That is ok in our case because the functions only use the property they receive as an argument.

  static addition(target: string, sourceOne: string, sourceTwo: string) {
    
    return (form: AbstractControl) => {
        const sum = form.value[target];
        const numberOne = form.value[sourceOne];
        const numberTwo = form.value[sourceTwo];

      if ( numberOne + numberTwo     === parseInt(sum)) {
        return null;
      }
      return { addition: true };
    };
  }
}

//   static addition(form: AbstractControl) {

//     const { fieldA, fieldB, fieldAnswer } = form.value;

//     if (fieldA + fieldB === parseInt(fieldAnswer)) {
//       return null;
//     }
//     return { addition: true };
//   }
