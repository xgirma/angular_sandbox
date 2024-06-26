/* tslint:disable: member-ordering forin */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { identityRevealedValidator } from '../shared/identity-revealed.directive';
import { UniqueAlterEgoValidator } from '../shared/alter-ego.directive';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];
  hero = { name: 'John', alterEgo: 'John What', power: this.powers[0] };
  heroForm: FormGroup;

  ngOnInit(): void {
    this.heroForm = new FormGroup({
      name: new FormControl(this.hero.name, [
        Validators.required,
        Validators.minLength(4),
        forbiddenNameValidator(/bob/i)
      ]),
      alterEgo: new FormControl(this.hero.alterEgo, {
        asyncValidators: [this.alterEgoValidator.validate.bind(this.alterEgoValidator)],
        updateOn: 'blur'
      }),
      power: new FormControl(this.hero.power, Validators.required)
    },  { validators: identityRevealedValidator }); // <-- add custom validator at the FormGroup level
  }

  get name() { return this.heroForm.get('name'); }

  get power() { return this.heroForm.get('power'); }

  get alterEgo() { return this.heroForm.get('alterEgo'); }

  constructor(private alterEgoValidator: UniqueAlterEgoValidator) { }
}
