import { Component, signal, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pokemon } from '../../pokemon.model';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { DatePipe } from '@angular/common';
import { PokemonService } from '../../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonBorderDirective, DatePipe, RouterLink],
  templateUrl: './pokemon-list.component.html',
  providers: [PokemonService],
})
export class PokemonListComponent {
  private readonly pokemonService = inject(PokemonService);
  readonly pokemonList = signal(this.pokemonService.getPokemonList());
  readonly searchTerm = signal('');
  readonly filteredPokemonList = computed(() => {
    const searchFirstLetter = this.searchTerm().trim().toLowerCase()[0] || '';
    return this.pokemonList().filter(pokemon =>
      pokemon.name.toLowerCase().startsWith(searchFirstLetter)
    );
  });

  size(pokemon: Pokemon) {
    if (pokemon.life <= 15) {
      return 'Petit';
    }

    if (pokemon.life >= 25) {
      return 'Grand';
    }

    return 'Moyen';
  }
}
