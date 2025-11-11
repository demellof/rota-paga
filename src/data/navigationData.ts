export interface NavPage {
  title: string;
  path: string;
}

export interface NavBook {
  category: string;
  pages: NavPage[];
}

export const navigationData: NavBook[] = [
  {
    category: 'O GRIMÓRIO VIRTUAL',
    pages: [
      { title: 'Santuário (Início)', path: '/' },
      { title: 'Jornada Florescer', path: '/jornada' },
      { title: 'Panteão', path: '/panteao' },
      { title: 'Roda do Ano', path: '/roda-do-ano' },
    ]
  },
  {
    category: 'A ROTA PAGÃ (APP)',
    pages: [
      { title: 'Oráculo Astral', path: '/oracle' },
      { title: 'Forjador de Sigilos', path: '/forjador' },
      { title: 'O Guardião (Sobre)', path: '/about' },
    ]
  },
];
