export interface AncientSeal {
  name: string;
  description: string;
  imageUrl: string; // Caminho para o arquivo SVG
}

export const ancientSealsData: AncientSeal[] = [
  {
    name: 'Selo de Salomão',
    description: 'Um poderoso símbolo de proteção e união dos opostos.',
    imageUrl: '/seals/seal_of_solomon.svg',
  },
  {
    name: 'Selo de Júpiter',
    description: 'Associado à expansão, abundância e sabedoria.',
    imageUrl: '/seals/seal_of_jupiter.svg',
  },
  {
    name: 'Selo de Marte',
    description: 'Um selo de coragem, força e ação assertiva.',
    imageUrl: '/seals/seal_of_mars.svg',
  },
  {
    name: 'Selo do Sol',
    description: 'Representa a vitalidade, o sucesso e a clareza.',
    imageUrl: '/seals/seal_of_sun.svg',
  },
  {
    name: 'Selo de Vênus',
    description: 'Conectado ao amor, harmonia, beleza e relacionamentos.',
    imageUrl: '/seals/seal_of_venus.svg',
  },
  {
    name: 'Selo de Mercúrio',
    description: 'Para comunicação, intelecto e transmutação.',
    imageUrl: '/seals/seal_of_mercury.svg',
  },
  {
    name: 'Selo da Lua',
    description: 'Ligado à intuição, aos ciclos e ao subconsciente.',
    imageUrl: '/seals/seal_of_moon.svg',
  },
];