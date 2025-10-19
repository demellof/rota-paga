export interface PlanetData {
  name: string;
  symbol: string; // Could be a unicode symbol or icon class
}

export const planetData: PlanetData[] = [
  { name: 'Sol', symbol: '☉' },
  { name: 'Lua', symbol: '☽' },
  { name: 'Mercúrio', symbol: '☿' },
  { name: 'Vênus', symbol: '♀' },
  { name: 'Marte', symbol: '♂' },
  { name: 'Júpiter', symbol: '♃' },
  { name: 'Saturno', symbol: '♄' },
];