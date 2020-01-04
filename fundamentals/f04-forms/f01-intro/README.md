# Forms

    1. reactive 
    
    2. template-driven

Reactive and template-driven forms process and manage form data differently.

**Reactive forms** are more robust: they're more scalable, reusable, and testable. 

**Template-driven forms**: If you have very basic form requirements and logic that can be managed solely in the template, use template-driven forms.

|   | REACTIVE  | TEMPLATE-DRIVEN  |
|---|---|---|
| Setup (form model)  | More explicit   | Less explicit   |
| Created  | in component class | by directives |
| Data model  | Structured  | Unstructured  |
| Predictability  | Synchronous  | Asynchronous  |
| Form validation  | Functions  | Directives  |
| Mutability  | Immutable  | Mutable  |
| Scalability  | Low-level API access  | Abstraction on top of APIs  |

Common foundation

Both reactive and template-driven forms share underlying building blocks.

        FormControl tracks the value and validation status of an individual form control.
        
        FormGroup tracks the same values and status for a collection of form controls.
        
        FormArray tracks the same values and status for an array of form controls.
        
        ControlValueAccessor creates a bridge between Angular FormControl instances and native DOM elements.

Reactive forms: ReactiveFormsModule -> FormControl instance

Template-driven forms: FormsModule -> NgModel directive

The template-driven form directive NgModel is responsible for creating and managing the FormControl instance for a given form element.

## Mutability

Reactive forms keep the data model pure by providing it as an immutable data structure. Each time a change is triggered on the data model, the FormControl instance returns a new data model rather than updating the existing data model.

Template-driven forms rely on mutability with two-way data binding to update the data model in the component as changes are made in the template.

## Scalability
   
Reactive forms provide access to low-level APIs and synchronous access to the form model, making creating large-scale forms easier.

Template-driven forms focus on simple scenarios, are not as reusable, abstract away the low-level APIs, and provide asynchronous access to the form model.
