import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  // se encarga de traducir las palabras entregadas por la api para un mejor entendimiento del usuario

  transform(value: unknown, ...args: unknown[]): unknown {
    // Validaciones de Genero
    if(value === 'Male') return 'Hombre';
    if(value === 'Female') return 'Mujer';

    // Validaciones de origen
    if(value === 'unknown') return 'Desconocido';

    // Validaciones de especie
    if(value === 'Human') return 'Humano';
    if(value === 'Mythological Creature') return 'Criatura mitológica';
    if(value === 'Humanoid') return 'Humanoide';

    // Validaciones según el estatus
    if(value === 'Alive') return 'Vivo';
    if(value === 'Dead') return 'Muerto';

    return value;
  }

}
