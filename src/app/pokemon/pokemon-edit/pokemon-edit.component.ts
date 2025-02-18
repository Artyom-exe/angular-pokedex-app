import { DatePipe, JsonPipe, NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getPokemonColor, POKEMON_RULES } from '../../pokemon.model';

@Component({
  selector: 'app-pokemon-edit',
  standalone: true,
  imports: [DatePipe, RouterLink, ReactiveFormsModule, JsonPipe, NgClass],
  templateUrl: './pokemon-edit.component.html',
  styles: ``,
  providers: [PokemonService],
})
export class PokemonEditComponent {
  // ====== CONSTANTS & DEPENDENCIES ======
  readonly POKEMON_RULES = signal(POKEMON_RULES).asReadonly();
  readonly route = inject(ActivatedRoute);
  readonly pokemonService = inject(PokemonService);

  // ====== POKEMON DATA INITIALIZATION ======
  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));
  readonly pokemon = signal(
    this.pokemonService.getPokemonById(this.pokemonId)
  ).asReadonly();

  // ====== FORM CONFIGURATION ======
  readonly form = new FormGroup({
    name: new FormControl(this.pokemon().name, [
      Validators.required,
      Validators.minLength(POKEMON_RULES.MIN_NAME),
      Validators.maxLength(POKEMON_RULES.MAX_NAME),
      Validators.pattern(POKEMON_RULES.NAME_PATTERN),
    ]),
    life: new FormControl(this.pokemon().life),
    damage: new FormControl(this.pokemon().damage),
    types: new FormArray(
      this.pokemon().types.map((type) => new FormControl(type))
    ),
  });

  // ====== FORM GETTERS ======
  get pokemonName() { return this.form.get('name') as FormControl; }
  get pokemonLife() { return this.form.get('life') as FormControl; }
  get pokemonDamage() { return this.form.get('damage') as FormControl; }
  get pokemonTypeList(): FormArray { return this.form.get('types') as FormArray; }

  // ====== LIFE POINTS MANAGEMENT ======
  incrementLife() {
    const newValue = this.pokemonLife.value + 1;
    this.pokemonLife.setValue(newValue);
  }

  decrementLife() {
    const newValue = this.pokemonLife.value - 1;
    this.pokemonLife.setValue(newValue);
  }

  // ====== DAMAGE POINTS MANAGEMENT ======
  incrementDamage() {
    const newValue = this.pokemonDamage.value + 1;
    this.pokemonDamage.setValue(newValue);
  }

  decrementDamage() {
    const newValue = this.pokemonDamage.value - 1;
    this.pokemonDamage.setValue(newValue);
  }

  // ====== POKEMON TYPES MANAGEMENT ======
  isPokemonTypeSelected(type: string): boolean {
    return !!this.pokemonTypeList.controls.find(
      (control) => control.value === type
    );
  }

  onPokemonTypeChange(type: string, isChecked: boolean): void {
    if (isChecked) {
      this.pokemonTypeList.push(new FormControl(type));
    } else {
      const index = this.pokemonTypeList.controls
        .map((control) => control.value)
        .indexOf(type);
      this.pokemonTypeList.removeAt(index);
    }
  }

  // ====== UTILITY METHODS ======
  getPokemonColor(type: string) {
    return getPokemonColor(type);
  }

  // ====== FORM SUBMISSION ======
  onSubmit(): void {
    console.log(this.form.value);
  }
}

