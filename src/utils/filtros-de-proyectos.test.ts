/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: filtros-de-proyectos.test.ts    Project: portfolio                 */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/25 22:46:46  by vm                                      */
/* ************************************************************************** */

/** El buscador y los filtros del catalogo, sobre el catalogo real. */

import { describe, expect, it } from 'vitest';
import { PROYECTOS } from '@/data/proyectos';
import { es } from '@/i18n/es';
import { pt } from '@/i18n/pt';
import { SIN_CRITERIOS, filtrarProyectos, hayCriterios, normalizar } from './filtros-de-proyectos';

const etiquetas = { categorias: es.proyectos.categorias, tecnologias: es.proyectos.tecnologias };
const buscar = (cambio: Partial<typeof SIN_CRITERIOS>): string[] =>
  filtrarProyectos(PROYECTOS, { ...SIN_CRITERIOS, ...cambio }, 'es', etiquetas).map((p) => p.id);

describe('filtros de proyectos', () => {
  it('sin criterios devuelve todo el catalogo, en su orden', () => {
    expect(buscar({})).toEqual(PROYECTOS.map((p) => p.id));
    expect(hayCriterios(SIN_CRITERIOS)).toBe(false);
  });

  it('ignora mayusculas y acentos', () => {
    expect(normalizar('Automatización')).toBe('automatizacion');
    expect(buscar({ texto: 'NATACION' })).toEqual(['vivenadando']);
  });

  it('busca por nombre, tecnologia, lenguaje, categoria y rol', () => {
    expect(buscar({ texto: 'distrivalto' })).toEqual(['distrivalto']);
    expect(buscar({ texto: 'jackrabbit' })).toEqual(['vivenadando']);
    expect(buscar({ texto: 'fundador' })).toContain('ardumaker-developer');
    expect(buscar({ texto: '42 porto' })).toContain('sistemas-42');
    expect(buscar({ texto: 'bash' })).toContain('agente-minivps');
  });

  it('exige todas las palabras escritas', () => {
    expect(buscar({ texto: 'django whatsapp natacion' })).toEqual(['vivenadando']);
    expect(buscar({ texto: 'django cobol' })).toEqual([]);
  });

  it('combina tecnologia, categoria y texto', () => {
    const clientesConDjango = buscar({ tecnologia: 'django', categoria: 'cliente' });
    expect(clientesConDjango).toContain('vivenadando');
    expect(clientesConDjango).not.toContain('ardumaker-developer');
    expect(buscar({ tecnologia: 'c', categoria: 'sistemas' })).toContain('sistemas-42');
    expect(buscar({ tecnologia: 'c', categoria: 'cliente' })).toEqual([]);
    expect(buscar({ tecnologia: 'django', categoria: 'cliente', texto: 'ocr' })).toContain(
      'auralyx',
    );
  });

  it('busca en el idioma de la pagina', () => {
    const enPortugues = filtrarProyectos(PROYECTOS, { ...SIN_CRITERIOS, texto: 'natação' }, 'pt', {
      categorias: pt.proyectos.categorias,
      tecnologias: pt.proyectos.tecnologias,
    });
    expect(enPortugues.map((p) => p.id)).toEqual(['vivenadando']);
  });
});
