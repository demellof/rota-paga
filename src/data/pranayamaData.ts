// src/data/pranayamaData.ts

export interface Pranayama {
  id: string;
  nome: string;
  descricao: string;
  beneficios: string[];
  contraindicacoes: string[];
  passos: {
    inspiracao: number;    // Duração em segundos
    retencaoCheio: number;
    expiracao: number;
    retencaoVazio: number;
    totalCiclo: number; // inspiracao + retencaoCheio + expiracao + retencaoVazio
  };
}

export const pranayamaData: Pranayama[] = [
  {
    id: 'sama-vritti',
    nome: 'Respiração Quadrada (Sama Vritti)',
    descricao: 'Uma técnica fundamental para acalmar o sistema nervoso, reduzir o estresse e aumentar o foco. Ideal para iniciantes.',
    beneficios: ['Reduz a ansiedade', 'Melhora a concentração', 'Regula o ritmo cardíaco'],
    contraindicacoes: ['Pratique com gentileza e sem forçar a respiração.'],
    passos: {
      inspiracao: 4,
      retencaoCheio: 4,
      expiracao: 4,
      retencaoVazio: 4,
      totalCiclo: 16
    },
  },
  {
    id: '4-7-8',
    nome: 'Respiração 4-7-8',
    descricao: 'Uma poderosa técnica de relaxamento, conhecida por ajudar a induzir o sono e acalmar a mente rapidamente.',
    beneficios: ['Promove relaxamento profundo', 'Auxilia no combate à insônia', 'Reduz o estresse agudo'],
    contraindicacoes: ['Pratique com cautela se tiver pressão baixa. Iniciantes podem se sentir tontos; comece com poucos ciclos.'],
    passos: {
      inspiracao: 4,
      retencaoCheio: 7,
      expiracao: 8,
      retencaoVazio: 0,
      totalCiclo: 19
    },
  },
  // Adicione outras técnicas conforme necessário
];
