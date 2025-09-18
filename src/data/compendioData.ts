export interface Ritual {
    title: string;
    ritual: string;
    science: string;
}

export interface CompendioItem {
    id: string;
    title: string;
    focus: string;
    crystals: {
        list: string;
        synergy: {
            traditional: string;
            scientific: string;
        };
    };
    herbs: {
        list: string;
        synergy: {
            traditional: string;
            scientific: string;
        };
    };
    rituals: Ritual[];
    warning?: string;
}

export const compendioData: CompendioItem[] = [
    {
        id: "muladhara",
        title: "Etapa 1: Muladhara (Raiz)",
        focus: "Aterramento, Segurança, Estabilidade Física e Estrutura.",
        crystals: {
            list: "Hematita, Turmalina Negra, Jaspe Vermelho, Quartzo Fumê, Ônix.",
            synergy: {
                traditional: "Usados para proteção, absorção de negatividade e aterramento. Conectam o corpo à energia da Terra, fortalecendo a segurança.",
                scientific: "Muitos (Hematita, Jaspe) são ricos em Óxido de Ferro. O ferro é o que dá a cor vermelha ao sangue e está ligado à força e vitalidade física. Sua densidade literal nos 'aterra'. A Turmalina Negra possui propriedades piezoelétricas, demonstrando uma capacidade física de transmutar energia."
            }
        },
        herbs: {
            list: "Gengibre, Cúrcuma (Açafrão-da-terra), Sálvia, Arruda.",
            synergy: {
                traditional: "Ervas 'quentes' e raízes (Gengibre, Cúrcuma) trazem energia para o corpo físico. Sálvia e Arruda são universalmente usadas para limpeza espiritual e banimento, criando um espaço seguro.",
                scientific: "Gengibre (Gingerol) e Cúrcuma (Curcumina) são potentes anti-inflamatórios naturais. A Sálvia (em chá ou aroma) contém compostos que auxiliam a clareza mental."
            }
        },
        rituals: [
            {
                title: "Banho de Descarrego (Limpeza e Aterramento)",
                ritual: "Ferva água e adicione um punhado de Sal Grosso, folhas de Sálvia e/ou Arruda. Coe. Após seu banho higiênico, despeje a mistura do pescoço para baixo, visualizando qualquer energia densa ou medo 'escorrendo' para a terra.",
                science: "O sal (osmose) limpa a pele. Os óleos essenciais voláteis das ervas liberados no vapor (aromaterapia) têm efeitos neurológicos que promovem clareza (Sálvia)."
            },
            {
                title: "Chá de Aterramento",
                ritual: "Um chá forte de Gengibre fresco ralado com uma pitada de Cúrcuma. O sabor picante e terroso 'acorda' o corpo.",
                science: "As propriedades anti-inflamatórias do Gengibre e da Cúrcuma cuidam da sua fundação física."
            }
        ]
    },
    {
        id: "svadhisthana",
        title: "Etapa 2: Svadhisthana (Sacral)",
        focus: "Fluidez Emocional, Criatividade, Prazer e Relações.",
        crystals: {
            list: "Cornalina, Pedra da Lua, Calcita Laranja.",
            synergy: {
                traditional: "Associados à energia criativa, vitalidade sexual e equilíbrio emocional. A Pedra da Lua conecta-se diretamente aos ciclos da lua e à intuição.",
                scientific: "A cor laranja vibrante (Cornalina, Calcita) está psicologicamente ligada à criatividade e entusiasmo. A adularescência (brilho) da Pedra da Lua evoca mistério e o subconsciente."
            }
        },
        herbs: {
            list: "Camomila, Erva-Cidreira (Melissa), Calêndula.",
            synergy: {
                traditional: "Ervas que 'acalmam as águas' (emoções). A Calêndula é uma flor solar, trazendo 'luz' e alegria. Camomila e Melissa acalmam e abrem espaço para a criatividade fluir.",
                scientific: "Camomila (Apigenina) e Erva-Cidreira (Ácido Rosmarínico) são relaxantes comprovados do sistema nervoso central, atuando em receptores GABA para reduzir a ansiedade."
            }
        },
        rituals: [
            {
                title: "Banho de Criatividade e Calma",
                ritual: "Infusão forte de pétalas de Calêndula (para alegria solar) e Camomila (para paz emocional). Pode-se adicionar uma colher de mel. Despeje sobre o corpo visualizando um fluxo criativo e tranquilo.",
                science: "Banho quente relaxa os músculos. A aromaterapia da Camomila é calmante. A Calêndula tem propriedades anti-inflamatórias e curativas para a pele."
            },
            {
                title: "Chá para Fluidez Emocional",
                ritual: "Chá de Camomila com Erva-Cidreira antes de dormir ou em momentos de estresse.",
                science: "Relaxa o sistema nervoso (benefício científico) permitindo que o subconsciente (reino da Água) processe emoções de forma mais fluida durante o sono."
            }
        ]
    },
    {
        id: "manipura",
        title: "Etapa 3: Manipura (Plexo Solar)",
        focus: "Poder Pessoal, Vontade, Metabolismo e Transformação.",
        crystals: {
            list: "Citrino, Pirita, Olho de Tigre.",
            synergy: {
                traditional: "Pedras 'solares'. O Citrino atrai sucesso. A Pirita atrai riqueza e bloqueia energia negativa. Olho de Tigre dá coragem e foco na ação.",
                scientific: "Pirita e Olho de Tigre são à base de ferro, ligado à força e ação (Marte). A cor amarela (Citrino) está psicologicamente ligada à confiança e energia."
            }
        },
        herbs: {
            list: "Alecrim (Rosemary), Canela.",
            synergy: {
                traditional: "Ambas são ervas de Fogo/Sol. Alecrim para coragem e clareza. Canela para paixão e sucesso rápido.",
                scientific: "O aroma do Alecrim (cineol) melhora a memória e o estado de alerta. A Canela ajuda na regulação do açúcar no sangue (energia metabólica)."
            }
        },
        rituals: [
            {
                title: "Banho Energético (Ritual)",
                ritual: "Banhos de Fogo são menos comuns; prefere-se chás ou defumação. Um banho com infusão de Alecrim pode ser usado pela manhã para 'acordar' e dar coragem.",
                science: ""
            },
            {
                title: "Chá da Vontade",
                ritual: "Chá de Alecrim (foco mental) com Canela (energia metabólica) e Gengibre (fogo digestivo/Agni).",
                science: "Esta combinação estimula a circulação e o estado de alerta (científico) enquanto fortalece ritualisticamente a vontade (energético)."
            }
        ]
    },
    {
        id: "anahata",
        title: "Etapa 4: Anahata (Coração)",
        focus: "Amor Incondicional, Compaixão, Equilíbrio e Conexão.",
        crystals: {
            list: "Quartzo Rosa, Quartzo Verde (Aventurina), Esmeralda.",
            synergy: {
                traditional: "Pedras clássicas do chakra do coração. Rosa para amor-próprio e compaixão. Verde para cura e conexão com a natureza.",
                scientific: "As cores verde e rosa têm um efeito psicológico calmante e redutor de estresse. Verde está ligado à harmonia, e rosa suave à gentileza."
            }
        },
        herbs: {
            list: "Pétalas de Rosa, Manjericão (Basil).",
            synergy: {
                traditional: "A Rosa é o arquétipo do amor. O Manjericão Sagrado (Tulsi) abre o coração e promove a devoção (Bhakti).",
                scientific: "O aroma da Rosa tem efeitos ansiolíticos. O Manjericão Sagrado é um poderoso adaptógeno, ajudando o corpo a lidar com o estresse."
            }
        },
        rituals: [
            {
                title: "Banho de Amor-Próprio",
                ritual: "Infusão de Pétalas de Rosa (amor) e folhas de Manjericão (proteção e paz). Focar na intenção de auto-aceitação e cura.",
                science: "Aromaterapia relaxante da Rosa. Propriedades calmantes e anti-inflamatórias para a pele."
            },
            {
                title: "Chá do Coração Aberto",
                ritual: "Chá de botões ou pétalas de Rosa (seguro para consumo).",
                science: "O aroma e o sabor suaves promovem um estado meditativo e relaxado, permitindo uma conexão com sentimentos de gratidão."
            }
        ]
    },
    {
        id: "vishuddha",
        title: "Etapa 5: Vishuddha (Garganta)",
        focus: "Comunicação, Expressão Autêntica e Verdade.",
        crystals: {
            list: "Sodalita, Cianita Azul, Lápis Lazúli.",
            synergy: {
                traditional: "Pedras azuis que estimulam a garganta e o terceiro olho, conectando o que pensamos com o que falamos.",
                scientific: "A cor Azul está universalmente associada à calma, lógica e comunicação clara, promovendo um estado mental ordenado."
            }
        },
        herbs: {
            list: "Hortelã/Menta (Peppermint/Mint), Erva-Doce (Fennel), Sálvia.",
            synergy: {
                traditional: "Ervas que 'limpam' e 'abrem' o canal. Hortelã traz clareza, Sálvia purifica a palavra, Erva-doce relaxa a tensão.",
                scientific: "Hortelã (Mentol) é um broncodilatador. Erva-doce (Anetol) é um relaxante muscular, ajudando a relaxar a tensão na laringe."
            }
        },
        rituals: [
            {
                title: "Chá da Verdade Clara",
                ritual: "Chá de Hortelã-Pimenta ou sementes de Erva-Doce. Energeticamente, a indigestão (Manipura) bloqueia a expressão (Vishuddha).",
                science: "Ao acalmar o estômago (científico), você libera o fluxo de energia para a garganta. O mentol também refresca fisicamente a garganta."
            }
        ]
    },
    {
        id: "ajna",
        title: "Etapa 6: Ajna (Frontal)",
        focus: "Intuição, Percepção, Sabedoria e Visão Interior.",
        crystals: {
            list: "Ametista, Lápis Lazúli, Sodalita, Fluorita.",
            synergy: {
                traditional: "As grandes pedras da 'visão interior'. Ametista acalma a mente para que a intuição possa ser ouvida. Lápis Lazúli conecta à sabedoria ancestral.",
                scientific: "Fluorita cresce em estruturas cúbicas perfeitas, representando a ordem divina. A cor Violeta/Índigo (Ametista) tem a frequência mais alta do espectro visível, simbolizando a transição para o 'invisível'."
            }
        },
        herbs: {
            list: "Lavanda (Alfazema), Artemísia (Mugwort).",
            synergy: {
                traditional: "Lavanda acalma a mente consciente. Artemísia é a erva clássica da 'vidente', usada para induzir sonhos vívidos e viagens astrais.",
                scientific: "Lavanda (Linalol) melhora a qualidade do sono REM. Artemísia (Tujona) é levemente psicoativa, podendo afetar a qualidade dos sonhos."
            }
        },
        rituals: [
            {
                title: "Ritual de Intuição (Travesseiro)",
                ritual: "Colocar um saquinho com flores de Lavanda secas e (opcionalmente) Artemísia dentro da fronha. Antes de dormir, peça clareza.",
                science: "A aromaterapia da Lavanda promove o sono profundo necessário para o processamento subconsciente (intuição)."
            }
        ],
        warning: "O chá de Artemísia pode ser tóxico em grandes quantidades. Não deve ser ingerido por gestantes ou pessoas com condições neurológicas. O uso aromático é mais seguro."
    },
    {
        id: "sahasrara",
        title: "Etapa 7: Sahasrara (Coroa)",
        focus: "Conexão Espiritual, Unidade, Transcendência e Consciência Pura.",
        crystals: {
            list: "Quartzo Transparente, Selenita, Ametista.",
            synergy: {
                traditional: "Cristais de 'Luz Pura'. Quartzo Transparente canaliza energia universal. Selenita limpa a aura. Ametista transmuta energia inferior em frequência superior.",
                scientific: "Quartzo Transparente (Dióxido de Silício) é piezoelétrico, usado em computadores para armazenar e transmitir informação/frequência – uma analogia científica para sua função energética."
            }
        },
        herbs: {
            list: "Lótus (Flor), Olíbano (Frankincense - Resina).",
            synergy: {
                traditional: "Lótus é o símbolo da iluminação. Olíbano é usado há milênios em rituais para purificar o espaço e elevar a consciência.",
                scientific: "Olíbano (resina queimada) libera compostos com efeitos antidepressivos e ansiolíticos, atuando em receptores cerebrais que acalmam a mente, ideal para meditação."
            }
        },
        rituals: [
            {
                title: "Ritual de Conexão (Meditação com Incenso)",
                ritual: "Este pilar transcende o físico. O ritual é a meditação. Queime resina de Olíbano e medite em silêncio, focando na conexão no topo da cabeça.",
                science: "A meditação silenciosa comprovadamente altera as ondas cerebrais para estados de consciência profunda. A aromaterapia do Olíbano facilita esse estado."
            }
        ]
    }
];
