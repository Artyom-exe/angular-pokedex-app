import { Injectable } from '@angular/core';

type PokemonType = 'Feu' | 'Eau' | 'Plante' | 'Insecte' | 'Vol' | 'Poison' | 'Fée' | 'Electrik';

@Injectable({
  providedIn: 'root'
})
export class PokemonColorService {
  private colors: Record<PokemonType, { primary: string; secondary: string; text: string }> = {
    'Feu': {
      primary: 'from-red-500',
      secondary: 'to-red-600',
      text: 'text-[#EF5350]'
    },
    'Eau': {
      primary: 'from-blue-500',
      secondary: 'to-blue-600',
      text: 'text-[#42A5F5]'
    },
    'Plante': {
      primary: 'from-green-500',
      secondary: 'to-green-600',
      text: 'text-[#66BB6A]'
    },
    'Insecte': {
      primary: 'from-amber-700',
      secondary: 'to-amber-800',
      text: 'text-[#8d6e63]'
    },
    'Vol': {
      primary: 'from-sky-400',
      secondary: 'to-sky-500',
      text: 'text-[#90CAF9]'
    },
    'Poison': {
      primary: 'from-purple-400',
      secondary: 'to-purple-500',
      text: 'text-[#b388ff]'
    },
    'Fée': {
      primary: 'from-pink-300',
      secondary: 'to-pink-400',
      text: 'text-[#f8bbd0]'
    },
    'Electrik': {
      primary: 'from-yellow-300',
      secondary: 'to-yellow-400',
      text: 'text-[#f4ff81]'
    }
  };

  getTypeColors(type: PokemonType) {
    return this.colors[type] || {
      primary: 'from-gray-400',
      secondary: 'to-gray-500',
      text: 'text-[#303030]'
    };
  }
}
