# Template DrivenForms

    Use ngModel to create two-way data bindings for reading and writing input-control values.

    Track state changes and the validity of form controls.

    Provide visual feedback using special CSS classes that track the state of the controls.

    Display validation errors to users and enable/disable form controls.

    Share information across HTML elements using template reference variables.

The NgModel directive doesn't just track state; it updates the control with special Angular CSS classes that reflect the state. 
You can leverage those class names to change the appearance of the control.

| state| true| false|
|---|---|---|
| control visited | ng-touched | ng-untouched |
| value changed | ng-dirty | ng-pristine |
| value valid | ng-valid | ng-invalid |


