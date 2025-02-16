import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { DatePipe } from '@angular/common';
import { PokemonColorService } from '../services/pokemon-color.service';

@Component({
  selector: 'app-pokemon-profile',
  templateUrl: './pokemon-profile.component.html',
  imports: [DatePipe, RouterLink],
  styles: ``,
  standalone: true,
  providers: [PokemonService],
})
export class PokemonProfileComponent {
  readonly route = inject(ActivatedRoute);
  readonly pokemonService = inject(PokemonService);
  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));
  readonly pokemon = signal(this.pokemonService.getPokemonById(this.pokemonId)).asReadonly();
  private readonly colorService = inject(PokemonColorService);

  readonly typeColors = computed(() => {
    const type = this.pokemon().types[0];
    return this.colorService.getTypeColors(type as any);
  });
}
