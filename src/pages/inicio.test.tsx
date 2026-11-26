// @vitest-environment jsdom
/* ************************************************************************** */
/*      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     */
/*     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    */
/*    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       */
/*   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       */
/*                                                                            */
/*   File: inicio.test.tsx    Project: portfolio                              */
/*   Created: 2026/11/25 21:30:00  by claude                                  */
/*   Updated: 2026/11/26 01:49:07  by vm                                      */
/* ************************************************************************** */

/** La pagina entera: idioma, catalogo, detalle y los estados del widget de GitHub. */

import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ActividadDeGithub } from '@/components/hero/actividad-de-github';
import { ProveedorDeIdioma } from '@/i18n';
import type { ProveedorDeActividad } from '@/types/github';
import { Inicio } from './inicio';

function dibujarPagina(): void {
  render(
    <ProveedorDeIdioma inicial="es">
      <Inicio />
    </ProveedorDeIdioma>,
  );
}

const catalogo = (): HTMLElement => document.getElementById('proyectos') as HTMLElement;
const titulos = (): string[] =>
  within(catalogo())
    .getAllByRole('heading', { level: 3 })
    .map((titulo) => titulo.textContent ?? '');

beforeEach(() => {
  window.localStorage.clear();
  // La API no contesta: el widget queda cargando y la pagina no depende de el.
  vi.stubGlobal(
    'fetch',
    vi.fn(() => new Promise(() => undefined)),
  );
});

afterEach(() => vi.unstubAllGlobals());

describe('pagina de inicio', () => {
  it('muestra cuatro proyectos y amplia el catalogo de a poco', () => {
    dibujarPagina();
    expect(titulos()).toHaveLength(4);
    expect(titulos()[0]).toBe('ArduMaker Developer');
    fireEvent.click(screen.getByRole('button', { name: /Ver más/ }));
    expect(titulos()).toHaveLength(8);
  });

  it('combina busqueda y filtros, cuenta los resultados y los limpia', () => {
    dibujarPagina();
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'whatsapp' } });
    fireEvent.click(within(catalogo()).getByRole('button', { name: 'Clientes' }));
    fireEvent.click(within(catalogo()).getByRole('button', { name: 'Django' }));
    const encontrados = titulos();
    expect(encontrados).toContain('ViveNadando');
    expect(encontrados).not.toContain('ArduMaker Developer');
    expect(within(catalogo()).getByRole('status').textContent).toMatch(/^\d+ proyectos?$/);

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'cobol' } });
    expect(within(catalogo()).getByText('Sin resultados.')).toBeTruthy();

    fireEvent.click(within(catalogo()).getAllByRole('button', { name: 'Limpiar filtros' })[0]);
    expect(titulos()).toHaveLength(4);
    expect((screen.getByRole('searchbox') as HTMLInputElement).value).toBe('');
  });

  it('cambia todos los textos al pasar a portugues y lo recuerda', () => {
    dibujarPagina();
    fireEvent.click(screen.getAllByRole('button', { name: 'Português' })[0]);
    expect(screen.getByRole('heading', { level: 2, name: /Experiência/ })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: /Sobre mim/ })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: /Falamos\?/ })).toBeTruthy();
    expect(screen.queryByText(/Experiencia/)).toBeNull();
    expect(document.documentElement.lang).toMatch(/^pt/);
    expect(window.localStorage.getItem('portfolio-idioma')).toBe('pt');
    expect(window.location.pathname).toBe('/pt/');
  });

  it('abre el detalle de un proyecto privado sin boton de repositorio', async () => {
    dibujarPagina();
    fireEvent.click(screen.getByRole('button', { name: 'Ver el detalle de ViveNadando' }));
    const ventana = await screen.findByRole('dialog');
    expect(within(ventana).getByText('Problema')).toBeTruthy();
    expect(within(ventana).getByText('Arquitectura')).toBeTruthy();
    expect(within(ventana).queryByRole('link', { name: /Repositorio/ })).toBeNull();
    expect(within(ventana).getByText('Código privado')).toBeTruthy();
  });

  it('no ofrece descargar un CV que no existe', () => {
    dibujarPagina();
    expect(screen.queryByRole('link', { name: 'CV' })).toBeNull();
  });
});

describe('actividad de GitHub', () => {
  const dibujarWidget = (proveedor: ProveedorDeActividad): void => {
    render(
      <ProveedorDeIdioma inicial="es">
        <ActividadDeGithub proveedor={proveedor} />
      </ProveedorDeIdioma>,
    );
  };

  it('si la API no responde, lo dice y deja reintentar', async () => {
    const leer = vi
      .fn<ProveedorDeActividad['leer']>()
      .mockRejectedValueOnce(new Error('caida'))
      .mockResolvedValue({
        username: 'FranDorrego',
        total: 90,
        commits: 12,
        pullRequests: 4,
        merges: 3,
        contributions: [{ date: '2026-11-01', count: 2 }],
        updatedAt: '2026-11-25',
        includesPrivate: true,
        periodos: [
          {
            clave: 'ultimo',
            total: 90,
            commits: 12,
            pullRequests: 4,
            merges: 3,
            repos: 6,
            contributions: [{ date: '2026-11-01', count: 2 }],
          },
          {
            clave: '2025',
            total: 40,
            commits: 30,
            pullRequests: 1,
            merges: 1,
            repos: 2,
            contributions: [{ date: '2025-03-01', count: 5 }],
          },
        ],
      });
    dibujarWidget({ leer });
    expect(screen.getByRole('status', { name: /Cargando/ })).toBeTruthy();
    fireEvent.click(await screen.findByRole('button', { name: 'Reintentar' }));
    await waitFor(() =>
      expect(screen.getByText('90 contribuciones en el último año')).toBeTruthy(),
    );
    expect(screen.getByRole('img', { name: /Mapa de contribuciones/ })).toBeTruthy();
    expect(screen.getByText('12')).toBeTruthy();
    expect(screen.getByText('Repositorios')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '2025' }));
    expect(screen.getByText('40 contribuciones en 2025')).toBeTruthy();
    expect(screen.getByText('30')).toBeTruthy();
  });

  it('sin los repos privados lo aclara', async () => {
    const leer = vi.fn<ProveedorDeActividad['leer']>().mockResolvedValue({
      username: 'FranDorrego',
      total: 90,
      commits: 12,
      pullRequests: 0,
      merges: 0,
      contributions: [{ date: '2026-11-01', count: 2 }],
      updatedAt: '2026-11-25',
      includesPrivate: false,
      periodos: [
        {
          clave: 'ultimo',
          total: 90,
          commits: 12,
          pullRequests: 0,
          merges: 0,
          repos: 1,
          contributions: [{ date: '2026-11-01', count: 2 }],
        },
      ],
    });
    dibujarWidget({ leer });
    expect(await screen.findByText('90 contribuciones en el último año')).toBeTruthy();
    expect(screen.getByText(/solo los públicos/)).toBeTruthy();
  });

  it('sin ningun dato muestra el estado vacio', async () => {
    const leer = vi.fn<ProveedorDeActividad['leer']>().mockResolvedValue({
      username: 'FranDorrego',
      total: null,
      commits: null,
      pullRequests: null,
      merges: null,
      contributions: [],
      updatedAt: null,
      includesPrivate: null,
      periodos: [],
    });
    dibujarWidget({ leer });

    expect(await screen.findByText('Todavía no hay actividad para mostrar.')).toBeTruthy();
  });
});
