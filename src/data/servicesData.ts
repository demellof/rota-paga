export interface Service {
    id: string;
    title: string;
    description: string;
    price: string;
    icon: string;
}

export const servicesData: Service[] = [
    {
        id: 'tarot',
        title: 'Leitura de Tarô Intuitivo',
        description: 'Uma sessão de 45 minutos para explorar suas questões, obter clareza e receber orientação através das cartas do Tarô. Foco em autoconhecimento e direcionamento.',
        price: 'R$ 150',
        icon: 'fas fa-magic',
    },
    {
        id: 'mapa-astral',
        title: 'Análise de Mapa Astral',
        description: 'Uma análise completa do seu mapa de nascimento. Entenda seus potenciais, desafios e a dinâmica planetária que molda sua personalidade. Inclui relatório em PDF.',
        price: 'R$ 250',
        icon: 'fas fa-star-of-david',
    },
    {
        id: 'mentoria',
        title: 'Mentoria Holística Pessoal',
        description: 'Um pacote de 4 sessões mensais para trabalhar em seus objetivos de forma profunda, integrando as ferramentas da Rota Pagã para o seu florescimento pessoal.',
        price: 'R$ 500 / mês',
        icon: 'fas fa-user-graduate',
    },
];
