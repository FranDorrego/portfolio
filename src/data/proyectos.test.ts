/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: proyectos.test.ts    Project: portfolio                            */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 23:31:53  by vm                                      */
/* ************************************************************************** */

/** Lo que el catalogo promete: orden, identificadores unicos y nada inventado. */

import { describe, expect, it } from 'vitest';
import { PROYECTOS } from './proyectos';

describe('catalogo de proyectos', () => {
  it('los proyectos con capturas van primero', () => {
    const conFotos = PROYECTOS.map((p) => p.screenshots.length > 0);
    const primeroSinFotos = conFotos.indexOf(false);
    expect(conFotos.slice(primeroSinFotos).every((tiene) => !tiene)).toBe(true);
    expect(PROYECTOS[0].id).toBe('ardumaker-developer');
  });

  it('no repite id ni slug', () => {
    expect(new Set(PROYECTOS.map((p) => p.id)).size).toBe(PROYECTOS.length);
    expect(new Set(PROYECTOS.map((p) => p.slug)).size).toBe(PROYECTOS.length);
  });

  it('trae cada texto en los dos idiomas', () => {
    for (const proyecto of PROYECTOS) {
      for (const texto of [proyecto.shortDescription, proyecto.fullDescription, proyecto.role]) {
        expect(texto.es.trim(), proyecto.id).not.toBe('');
        expect(texto.pt.trim(), proyecto.id).not.toBe('');
      }
    }
  });

  it('un proyecto privado no enlaza un repositorio', () => {
    for (const proyecto of PROYECTOS) {
      if (proyecto.visibility === 'privado')
        expect(proyecto.repositoryUrl, proyecto.id).toBeUndefined();
    }
  });

  it('toda metrica dice de donde sale', () => {
    for (const proyecto of PROYECTOS) {
      for (const metrica of proyecto.metrics ?? []) {
        expect(metrica.source.es.trim(), proyecto.id).not.toBe('');
        expect(metrica.source.pt.trim(), proyecto.id).not.toBe('');
      }
    }
  });

  it('las etiquetas de la tarjeta son pocas', () => {
    for (const proyecto of PROYECTOS)
      expect(proyecto.cardTags.length, proyecto.id).toBeLessThanOrEqual(5);
  });
});
