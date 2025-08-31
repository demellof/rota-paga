import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, addDoc, deleteDoc, onSnapshot, collection, query, orderBy, serverTimestamp, DocumentSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// --- CONFIG & DATA ---
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const pillarZeroData = {
    title: "Pilar Zero: A Teia do Mundo (Cosmovisão)",
    symbol: "🕸️",
    content: `
        <h3 class="text-xl font-bold font-cinzel text-[#c8a44d] mb-4">A Ponte entre Mundos: O Caminho do Sincretismo Consciente</h3>
        <p class="mb-4 text-gray-400">O grande psicanalista Carl Jung, em seu seminário sobre a Ioga Kundalini, nos ofereceu uma chave para entender a jornada da alma moderna. Ele observou que, enquanto na cultura oriental o sistema de Chakras e os mandalas são realidades vividas, a mente ocidental tende a abordá-los como conceitos intelectuais.</p>
        <p class="mb-4 text-gray-400">Para Jung, o despertar da Kundalini e a jornada através dos Chakras era um mapa perfeito do <strong>processo de individuação</strong> – a jornada para se tornar um "todo" integrado. O mandala, em sua forma circular, é o símbolo máximo dessa totalidade, a representação do <em>Self</em>.</p>
        <p class="mb-4 text-gray-400">A Rota Pagã abraça essa visão. Ela não busca replicar cegamente as tradições, mas sim construir uma <strong>ponte consciente</strong>. Ao integrarmos arquétipos egípcios, gregos, iorubás, conceitos da Cabala, da PNL, da neurociência, a sabedoria das Zonas Azuis, a filosofia Ubuntu e o Hermetismo, estamos criando nosso próprio mandala. Estamos usando a força do intelecto ocidental não para nos distanciar, mas para construir um caminho seguro e compreensível de volta à experiência direta. Cada Pilar é um raio em nossa própria Roda, um caminho que nos leva de volta ao centro: o nosso florescimento.</p>
    `
};

const pillarData = {
    terra: { 
        title: "🌍 Pilar da Terra", 
        symbol: "TETRAEDRO_PLACEHOLDER",
        chakra: "Muladhara (Corpo Físico e Abundância)", 
        content: `
            <h3 class="text-xl font-bold font-cinzel text-[#c8a44d] mb-4">O Templo do Corpo e a Abundância da Alma</h3>
            <p class="mb-4 text-gray-400">O Pilar da Terra é o fundamento de nossa existência, o arquétipo da estabilidade, nutrição e manifestação no plano material. Regido pelo Chakra Raiz (Muladhara), ele governa nosso corpo físico como um "altar sagrado", nossa saúde, segurança e a capacidade de materializar a abundância. Trabalhar este pilar é honrar o templo do corpo e fincar raízes fortes para que a alma possa florescer sem medo.</p>
            
            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar I: O Corpo como Altar Terreno</h4>
            <p class="mb-4 text-gray-400">Na visão holística, o corpo é o veículo sagrado da alma. Cuidar dele através da nutrição e do movimento transcende a saúde; torna-se um ato espiritual de honra ao templo que abriga a consciência. Aceitar os limites físicos do corpo é um trabalho direto com a energia da Terra, transformando frustração em estratégia adaptativa.</p>
            
            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar II: Nutrição como Magia Prática</h4>
            <p class="mb-4 text-gray-400">A alimentação é nossa alquimia diária que transforma a matéria do planeta em força vital. A prática de <strong>Mindful Eating</strong> (Alimentação Consciente) transforma a refeição em um ritual de presença, melhorando a digestão e a conexão com os sinais de fome e saciedade do corpo.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "benefícios mindful eating", "receitas de aterramento (grounding foods)", "dieta anti-inflamatória".</p>
            
            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar III: Rituais de Aterramento e Manifestação</h4>
            <p class="mb-4 text-gray-400">Práticas de aterramento, como caminhar descalço na natureza, nos permitem descarregar o excesso de energia. O plantio consciente de uma semente ou o enterro de um cristal como o <strong>Citrino</strong> ou a <strong>Pirita</strong> com uma intenção clara é um poderoso ritual de manifestação para ancorar a abundância no plano físico.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "como praticar grounding ou earthing", "ritual para manifestar abundância", "cristais para prosperidade".</p>
            
            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar IV: A Sombra da Terra</h4>
            <p class="mb-4 text-gray-400">O desequilíbrio da Terra manifesta-se como inércia, teimosia, apego excessivo ao material e medo da mudança. Reconhecer essa sombra é o primeiro passo para usar a energia do Fogo (Pilar 3) para quebrar a estagnação e cultivar a generosidade como antídoto ao apego.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "arquétipo do Amante", "como lidar com a procrastinação", "desapego material filosofia".</p>
        ` 
    },
    agua: { 
        title: "🌊 Pilar da Água", 
        symbol: "ICOSAEDRO_PLACEHOLDER",
        chakra: "Svadhisthana (Emoções e Criatividade)", 
        content: `
            <h3 class="text-xl font-bold font-cinzel text-[#c8a44d] mb-4">O Fluxo das Emoções e a Alquimia Criativa</h3>
            <p class="mb-4 text-gray-400">Este pilar explora o mundo fluido e profundo de nossas emoções, alinhado ao Chakra Sacral (Svadhisthana). A água simboliza o inconsciente, a intuição e a purificação. Como a água, nossas emoções precisam fluir para nos nutrir; quando estagnadas, tornam-se turvas.</p>

            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar I: O Oceano Interior e suas Tempestades</h4>
            <p class="mb-4 text-gray-400">A água representa nosso inconsciente. A sombra deste pilar é o "afogamento" em emoções e a ilusão (a sombra aquática de Netuno). O trabalho aqui é aprender a navegar, usando a consciência (Pilar da Luz) como seu barco.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "arquétipo do Mágico", "lidar com a sensibilidade emocional", "simbolismo da água na psicologia".</p>

            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar II: A Fonte da Energia Criativa</h4>
            <p class="mb-4 text-gray-400">A energia de Svadhisthana manifesta-se como força sexual e criativa. É possível transmutar essa energia para seus projetos de "Florescer" através da <strong>Sublimação Consciente</strong>: direcionar, com intenção, a energia do sacro para o coração (paixão) ou para a mente (clareza).</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "o que é sexualidade sagrada", "sublimação de energia criativa", "Tantra para iniciantes".</p>

            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar III: O Rio da Consciência (Regulação Emocional)</h4>
            <p class="mb-4 text-gray-400">Regular emoções não é suprimir, mas influenciar conscientemente como as vivenciamos. Ferramentas práticas incluem <strong>Mindfulness</strong> para fortalecer o córtex pré-frontal, <strong>Reavaliação Cognitiva</strong> para reinterpretar gatilhos e a <strong>Técnica 5-4-3-2-1</strong> para ancorar no presente.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "técnica 5-4-3-2-1 para ansiedade", "reavaliação cognitiva TCC", "como praticar mindfulness".</p>
            
            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar IV: A Gota e o Oceano (A Visão Budista)</h4>
            <p class="mb-4 text-gray-400">A sabedoria budista nos ensina que somos uma gota, e o universo, o oceano. Nosso sofrimento vem da crença na separação. Ao meditar sobre uma emoção, observe-a como uma onda passando no seu oceano interior. A gota, ao se reconhecer como oceano, encontra a paz.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "conceito de não-dualidade budismo", "metáfora gota no oceano", "Thich Nhat Hanh ensinamentos".</p>

            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar V: A Sabedoria Estratégica da Água (Lições de Sun Tzu)</h4>
            <p class="mb-4 text-gray-400"><em>(Aguardando suas passagens favoritas para tecermos aqui, conectando a tática militar à maestria emocional.)</em></p>
        `
    },
    fogo: { 
        title: "🔥 Pilar do Fogo", 
        symbol: "PIRAMIDE_PLACEHOLDER",
        chakra: "Manipura (Energia e Ação)", 
        content: `
            <h3 class="text-xl font-bold font-cinzel text-[#c8a44d] mb-4">A Centelha da Vontade e a Forja da Transformação</h3>
            <p class="mb-4 text-gray-400">O Pilar do Fogo é a centelha divina, a força da transformação, da vontade e da paixão. Alinhado ao Chakra do Plexo Solar (Manipura), ele é nosso centro de poder pessoal, o motor que nos impulsiona para a ação e a luz da consciência que dissipa a inércia.</p>

            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar I: A Chama Interior (Manipura e Agni)</h4>
            <p class="mb-4 text-gray-400">Na Ayurveda, <strong>Agni</strong> é o fogo digestivo, chave para a saúde e vitalidade. No corpo sutil, o Manipura governa nosso poder pessoal e autoestima. Práticas como a <strong>Respiração do Fogo (Bhastrika)</strong> e a meditação na chama de uma vela (<em>Trataka</em>) são usadas para gerar calor interno (<em>tapas</em>) e fortalecer a força de vontade.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "o que é Agni Ayurveda", "benefícios do Trataka", "como fortalecer o chakra Manipura".</p>

            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar II: Nutrição Ígnea (Sustentando a Chama a Longo Prazo)</h4>
            <p class="mb-4 text-gray-400">O fogo interior precisa do combustível certo. A sabedoria das <strong>Zonas Azuis</strong> ensina a arte da sustentabilidade. Uma dieta rica em alimentos da terra, com moderação, e o princípio de Okinawa de parar de comer aos 80% de saciedade (<em>Hara Hachi Bu</em>) permitem o descanso e a recuperação do fogo digestivo, prevenindo a inflamação crônica.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "dieta das Zonas Azuis", "o que é Hara Hachi Bu", "receitas anti-inflamatórias".</p>

            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar III: Rituais de Transformação e Vontade</h4>
            <p class="mb-4 text-gray-400">O fogo é o grande transmutador. Rituais como a <strong>Queima de Intenções</strong> (escrever em um papel o que se deseja liberar ou manifestar e entregá-lo à chama) e a <strong>Ceromancia</strong> (adivinhação pelas formas da cera) são atos psicomágicos poderosos de transformação.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "como fazer um ritual de queima de intenções", "ceromancia significados", "magia com velas cores".</p>
            
            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar IV: A Sombra do Fogo</h4>
            <p class="mb-4 text-gray-400">O fogo desequilibrado manifesta-se como raiva, arrogância, ou, no outro extremo, como procrastinação e baixa autoestima. O trabalho é <strong>canalizar a energia da raiva</strong>, reconhecendo-a como um sinal de um limite ultrapassado, e transmutá-la em combustível para a ação assertiva.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "como lidar com a raiva de forma saudável", "arquétipo do Guerreiro Carl Jung", "aumentar a força de vontade".</p>
        `
    },
    ar: { 
        title: "🌬️ Pilar do Ar", 
        symbol: "OCTAEDRO_PLACEHOLDER",
        chakra: "Anahata (Respiração & Coração)", 
        content: `
            <h3 class="text-xl font-bold font-cinzel text-[#c8a44d] mb-4">O Sopro da Conexão e a Sabedoria do Coração</h3>
            <p class="mb-4 text-gray-400">O Pilar do Ar é o sopro da vida, o elemento invisível que conecta tudo. Alinhado ao Chakra Cardíaco (Anahata), ele governa o intelecto, a comunicação, os relacionamentos e a capacidade de amar. A respiração é a ponte sagrada entre o corpo e a mente.</p>
            
            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar I: O Sopro como Ferramenta (Pranayama)</h4>
            <p class="mb-4 text-gray-400">Dominar a respiração é dominar nossa energia. A <strong>Respiração Diafragmática</strong> ativa o nervo vago e acalma. A <strong>Respiração das Narinas Alternadas (Nadi Shodhana)</strong> equilibra os hemisférios cerebrais, unindo lógica e intuição.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "tutorial Nadi Shodhana pranayama", "benefícios respiração diafragmática", "Wim Hof Method guiado".</p>

            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar II: A Ponte do Coração (Relacionamentos)</h4>
            <p class="mb-4 text-gray-400">A prática aqui é a <strong>Comunicação Não-Violenta (CNV)</strong>, que nos ensina a expressar nossas necessidades e ouvir as dos outros a partir de um lugar de empatia, fortalecendo os laços.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "introdução Comunicação Não-Violenta", "meditação Metta Bhavana (amor-bondade)".</p>

            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar III: A Sombra do Ar</h4>
            <p class="mb-4 text-gray-400">O Ar desequilibrado manifesta-se como excesso de racionalização, distanciamento emocional ou superficialidade. O antídoto é o <strong>aterramento</strong> (Pilar da Terra) e a conexão com o <strong>Pilar da Água</strong> para dar sentimento às palavras.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "exercícios de grounding para ansiedade", "como equilibrar razão e emoção".</p>
        `
    },
    som: { 
        title: "🎶 Pilar do Som", 
        symbol: "ESFERA_PLACEHOLDER",
        chakra: "Vishuddha (A Vibração e a Grande Orquestra)", 
        content: `
            <h3 class="text-xl font-bold font-cinzel text-[#c8a44d] mb-4">A Vibração da Verdade e a Expressão da Alma</h3>
            <p class="mb-4 text-gray-400">O Pilar do Som explora a vibração como a força primordial do universo. Alinhado ao Chakra Laríngeo (Vishuddha), ele governa não apenas o som que emitimos, mas nossa sintonia com a vasta orquestra de frequências que compõem a realidade.</p>

            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar I: O Coração Pulsante da Terra (Ressonância Schumann)</h4>
            <p class="mb-4 text-gray-400">A <strong>ionosfera</strong> age como uma "pele de tambor" ao redor do planeta. Os raios "batucam" nela, criando uma onda de baixíssima frequência (7.83 Hz), a <strong>Ressonância Schumann</strong>. Essa frequência corresponde às ondas cerebrais Alfa/Theta, associadas a estados de calma e meditação. Ao nos aterrarmos, sintonizamos nosso cérebro com o "coração" do planeta.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "o que é a Ressonância Schumann", "benefícios da frequência 7.83 Hz".</p>

            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar II: As Tempestades Solares (A Voz do Sol)</h4>
            <p class="mb-4 text-gray-400"><strong>Explosões solares</strong> são tempestades eletromagnéticas que interagem com nosso planeta. A visão holística sugere que essas flutuações podem impactar nosso sistema nervoso, causando insônia, ansiedade ou picos de intuição. É o Sol "aumentando o volume" da orquestra.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "efeitos das explosões solares no corpo humano", "próximo máximo solar 2025".</p>
            
            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar III: Higiene Vibracional</h4>
            <p class="mb-4 text-gray-400">Diante da poluição eletromagnética moderna (EMF, 5G), a prática da <strong>higiene vibracional</strong> se torna essencial: passar tempo na natureza, praticar o aterramento para descarregar o excesso de "carga" e usar o som (taças, mantras) para "reafinar" nosso corpo com frequências harmoniosas.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "poluição eletromagnética e saúde", "técnicas de earthing (aterramento)".</p>
        `
    },
    luz: { 
        title: "💡 Pilar da Luz", 
        symbol: "DODECAEDRO_PLACEHOLDER",
        chakra: "Ajna (Percepção e Intuição)", 
        content: `
            <h3 class="text-xl font-bold font-cinzel text-[#c8a44d] mb-4">O Olho da Intuição e a Clareza da Percepção</h3>
            <p class="mb-4 text-gray-400">O Pilar da Luz é a sabedoria que transcende a lógica, o reino da intuição e da visão interior. Regido pelo Chakra Frontal (Ajna), é nosso oráculo interno, a capacidade de ver além do véu das ilusões.</p>
            
            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar I: A Natureza da Percepção (Física Quântica como Metáfora)</h4>
            <p class="mb-4 text-gray-400">O <strong>experimento da dupla fenda</strong> nos ensina que a luz se comporta como partícula (matéria) quando observada e como onda (potencial) quando não observada. Usamos isso como uma metáfora: nossa percepção focada (o "observador") tem o poder de colapsar um campo de infinitas possibilidades em uma realidade manifesta.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "experimento da dupla fenda explicado", "efeito do observador física quântica".</p>

            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar II: Despertando o Terceiro Olho</h4>
            <p class="mb-4 text-gray-400">A intuição é um processamento de dados ultrarrápido. Práticas para desenvolvê-la incluem a <strong>meditação focada no Ajna</strong>, a atenção às <strong>sincronicidades</strong> (coincidências significativas de Jung) e o <strong>trabalho com sonhos</strong>.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "como meditar no chakra Ajna", "significado de sincronicidade Carl Jung".</p>
            
            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar III: A Chave Surrealista (Dalí e Magritte)</h4>
            <p class="mb-4 text-gray-400"><strong>Salvador Dalí</strong> nos ensina a capturar as imagens do subconsciente com seu método paranoico-crítico. <strong>René Magritte</strong> nos desafia a questionar a realidade com sua "Traição das Imagens". Juntos, eles nos dão ferramentas para explorar e decifrar nosso mundo interior.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "método paranoico-crítico Salvador Dalí", "René Magritte A Traição das Imagens".</p>

            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar IV: A Sombra da Luz</h4>
            <p class="mb-4 text-gray-400">A Luz desequilibrada manifesta-se como arrogância espiritual, desconexão da realidade ou paranoia. O antídoto é o <strong>aterramento</strong> (Pilar da Terra), que nos força a testar nossas visões na prática e a manter os pés firmes no chão.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "o que é bypass espiritual", "perigos do ego espiritual".</p>
        `
    },
    mente: { 
        title: "🌌 Pilar da Mente", 
        symbol: "MERKABA_PLACEHOLDER",
        chakra: "Sahasrara (A Coroa da Consciência)", 
        content: `
            <h3 class="text-xl font-bold font-cinzel text-[#c8a44d] mb-4">A Consciência Cósmica e a União com a Fonte</h3>
            <p class="mb-4 text-gray-400">Este é o pilar mestre, a ponte entre o finito e o infinito, regido pelo Chakra Coronário (Sahasrara). Ele não é apenas um pilar, mas a <strong>"Sala do Arquiteto"</strong>, onde o Guardião da Centelha aprende a se tornar o construtor consciente da sua própria realidade.</p>
            
            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar I: A Arquitetura da Realidade (Neurociência e Hermetismo)</h4>
            <p class="mb-4 text-gray-400">O princípio hermético "O Universo é Mental" encontra seu espelho na ciência da <strong>neuroplasticidade</strong>. Nossos pensamentos e hábitos repetidos esculpem as vias neurais do nosso cérebro, literalmente construindo a mente que experimenta a realidade. A mudança duradoura ocorre ao entendermos o <strong>Circuito do Hábito</strong> (Deixa -> Rotina -> Recompensa) e usarmos nossa vontade para forjar novos caminhos neurais.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "O Caibalion princípio do mentalismo", "neuroplasticidade como mudar hábitos", "livro O Poder do Hábito".</p>

            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar II: As Ferramentas do Arquiteto (PNL na Prática)</h4>
            <p class="mb-4 text-gray-400">A Programação Neurolinguística (PNL) nos oferece uma caixa de ferramentas para a "Química Mental": <strong>Ancoragem</strong> para criar gatilhos de poder, <strong>Reestruturação Cognitiva</strong> para mudar a moldura de uma situação e o <strong>Padrão "Swish"</strong> para substituir neurologicamente um gatilho indesejado.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "o que é ancoragem PNL", "técnica de reframing PNL", "padrão swish passo a passo".</p>
            
            <h4 class="text-lg font-bold font-cinzel text-[#a37e2c] mt-6 mb-2">Sub-Pilar III: A Consciência Unificada (Gaia, Sagan e Ubuntu)</h4>
            <p class="mb-4 text-gray-400">Aqui, transcendemos a mente individual. A <strong>Teoria de Gaia</strong> nos vê como células de um organismo planetário. A perspectiva cósmica de <strong>Carl Sagan</strong> nos lembra que somos "poeira de estrelas". E a filosofia <strong>Ubuntu</strong> ("Eu sou porque nós somos") nos ensina que a maestria da mente é um caminho para uma conexão mais profunda com toda a teia da vida.</p>
            <p class="text-sm text-gray-500"><strong>Termos de Pesquisa:</strong> "Teoria de Gaia James Lovelock", "Carl Sagan Pálido Ponto Azul", "filosofia Ubuntu explicada".</p>
        `
    }
};

const astrologyData = [
    { year: "2024-2026", title: "Transformação e Fundações", icon: "fas fa-sync-alt", description: "Plutão em Aquário desafia sua identidade (Asc) e segurança (Lua), pedindo uma reestruturação profunda de quem você é e do que você valoriza. É tempo de soltar velhas estruturas e abraçar a autenticidade." },
    { year: "2025", title: "Expansão da Criatividade", icon: "fas fa-palette", description: "Júpiter em Leão traz uma grande oportunidade para expandir sua autoexpressão, criatividade e alegria. É um período para brilhar, se arriscar em projetos apaixonados e se conectar com sua criança interior." },
    { year: "2026-2028", title: "Disciplina e Novos Inícios", icon: "fas fa-fire", description: "Saturno em Áries testará sua coragem e iniciativa. Será um tempo para construir novas estruturas com disciplina e ação focada, solidificando sua nova identidade. O esforço agora define a base para o futuro." },
    { year: "Contínuo", title: "Navegando a Sensibilidade", icon: "fas fa-water", description: "Com Netuno em Peixes e Júpiter natal, sua jornada é marcada por uma profunda sensibilidade e intuição. O desafio é usar essa conexão como uma força, sem se perder em ilusões. O aterramento é crucial." }
];

const seasonalHerbData = {
    'Primavera': [
        { name: 'Lavanda', scientificName: 'Lavandula angustifolia', image: 'https://placehold.co/150x150/9370DB/FFFFFF?text=Lavanda', planet: 'Mercúrio', element: 'Ar', deities: 'Hécate, Saturno', magicalUses: ['Calma e clareza mental', 'Sono tranquilo e sonhos proféticos', 'Purificação e equilíbrio', 'Rituais de novos começos'], medicinalUses: 'Ansiolítico, relaxante muscular, auxilia no sono.' },
        { name: 'Manjericão', scientificName: 'Ocimum basilicum', image: 'https://placehold.co/150x150/2E8B57/FFFFFF?text=Manjericão', planet: 'Marte', element: 'Fogo', deities: 'Vishnu, Erzuli', magicalUses: ['Atração de prosperidade e sorte', 'Proteção e banimento', 'Amor e harmonia em relacionamentos', 'Coragem'], medicinalUses: 'Anti-inflamatório, digestivo, fortalece o sistema imunológico.' },
        { name: 'Alecrim', scientificName: 'Rosmarinus officinalis', image: 'https://placehold.co/150x150/556B2F/FFFFFF?text=Alecrim', planet: 'Sol', element: 'Fogo', deities: 'Apolo, Hélio', magicalUses: ['Purificação energética intensa', 'Clareza mental e memória', 'Vitalidade e energia', 'Proteção contra energias densas'], medicinalUses: 'Estimulante da memória e circulação, alivia dores de cabeça.' }
    ],
    'Verão': [
        { name: 'Rosa', scientificName: 'Rosa spp.', image: 'https://placehold.co/150x150/FF69B4/FFFFFF?text=Rosa', planet: 'Vênus', element: 'Água', deities: 'Afrodite, Ísis', magicalUses: ['Amor-próprio e atração', 'Cura emocional e do coração', 'Adivinhação e intuição', 'Harmonização de ambientes'], medicinalUses: 'Calmante, tonificante para a pele, alivia sintomas de TPM.' },
        { name: 'Canela', scientificName: 'Cinnamomum verum', image: 'https://placehold.co/150x150/D2691E/FFFFFF?text=Canela', planet: 'Sol', element: 'Fogo', deities: 'Ra, Apolo', magicalUses: ['Atração de sucesso e prosperidade rápida', 'Aumento da energia vital e paixão', 'Proteção e espiritualidade', 'Aceleração de feitiços'], medicinalUses: 'Termogênico, auxilia no controle de açúcar no sangue, anti-inflamatório.' },
        { name: 'Hortelã-pimenta', scientificName: 'Mentha piperita', image: 'https://placehold.co/150x150/3CB371/FFFFFF?text=Hortelã', planet: 'Mercúrio', element: 'Ar', deities: 'Hermes, Perséfone', magicalUses: ['Clareza mental e foco', 'Purificação e cura', 'Despertar da consciência', 'Viagens astrais e sonhos lúcidos'], medicinalUses: 'Alivia náuseas e dores de cabeça, descongestionante.' }
    ],
    'Outono': [
        { name: 'Sálvia Branca', scientificName: 'Salvia apiana', image: 'https://placehold.co/150x150/CAD3C8/000000?text=Sálvia', planet: 'Júpiter', element: 'Ar', deities: 'Zeus, Povos Nativos Americanos', magicalUses: ['Limpeza energética profunda (banimento)', 'Sabedoria e clareza espiritual', 'Proteção de espaços e pessoas', 'Consagração de ferramentas mágicas'], medicinalUses: 'Antisséptico, auxilia em problemas respiratórios (uso em defumação).' },
        { name: 'Arruda', scientificName: 'Ruta graveolens', image: 'https://placehold.co/150x150/006400/FFFFFF?text=Arruda', planet: 'Marte', element: 'Fogo', deities: 'Hécate, Diana', magicalUses: ['Proteção forte contra negatividade e mau-olhado', 'Quebra de feitiços e maldições', 'Banimento de energias intrusas', 'Fortalecimento pessoal'], medicinalUses: 'Usada topicamente para dores reumáticas (com cautela, é tóxica se ingerida).' },
        { name: 'Louro', scientificName: 'Laurus nobilis', image: 'https://placehold.co/150x150/808000/FFFFFF?text=Louro', planet: 'Sol', element: 'Fogo', deities: 'Apolo, Nike', magicalUses: ['Atração de sucesso, vitória e reconhecimento', 'Clareza em visões e profecias', 'Proteção e purificação', 'Realização de desejos (escrever em folhas)'], medicinalUses: 'Digestivo, alivia gases e problemas estomacais.' }
    ],
    'Inverno': [
        { name: 'Mirra', scientificName: 'Commiphora myrrha', image: 'https://placehold.co/150x150/B8860B/FFFFFF?text=Mirra', planet: 'Lua', element: 'Água', deities: 'Ísis, Adônis', magicalUses: ['Conexão com o sagrado e cura profunda', 'Meditação e introspecção', 'Rituais de passagem (luto, transformações)', 'Proteção espiritual'], medicinalUses: 'Poderoso antisséptico e cicatrizante (uso em resina).' },
        { name: 'Olíbano', scientificName: 'Boswellia sacra', image: 'https://placehold.co/150x150/DEB887/000000?text=Olíbano', planet: 'Sol', element: 'Fogo', deities: 'Ra, Baal', magicalUses: ['Elevação espiritual e purificação de alta vibração', 'Consagração de espaços e objetos', 'Conexão com guias e divindades', 'Meditação e oração'], medicinalUses: 'Anti-inflamatório potente, auxilia na saúde das articulações.' },
        { name: 'Gengibre', scientificName: 'Zingiber officinale', image: 'https://placehold.co/150x150/F4A460/000000?text=Gengibre', planet: 'Marte', element: 'Fogo', deities: 'Agni, Ogum', magicalUses: ['Acelerar e potencializar feitiços', 'Aumentar energia, coragem e paixão', 'Atrair sucesso e dinheiro', 'Proteção e fortalecimento'], medicinalUses: 'Anti-inflamatório, alivia náuseas e dores de garganta, termogênico.' }
    ]
};

const crystalData = {
    'Cristais de Aterramento e Proteção': [
        { name: 'Turmalina Negra', image: 'https://placehold.co/100x100/000000/FFFFFF?text=Turmalina', description: 'O escudo impenetrável. Repele e transmuta energias negativas, criando um campo de força protetor.' },
        { name: 'Hematita', image: 'https://placehold.co/100x100/A9A9A9/FFFFFF?text=Hematita', description: 'A âncora da alma. Aterra a energia no corpo físico, promove foco, coragem e fortalece a vontade.' },
        { name: 'Obsidiana Negra', image: 'https://placehold.co/100x100/1C1C1C/FFFFFF?text=Obsidiana', description: 'O espelho da verdade. Revela o que está oculto, corta laços energéticos e limpa o subconsciente.' },
    ],
    'Cristais de Cura e Elevação': [
         { name: 'Quartzo Rosa', image: 'https://placehold.co/100x100/FFC0CB/000000?text=Quartzo+Rosa', description: 'O bálsamo do coração. Vibra amor incondicional, cura feridas emocionais e promove paz e compaixão.' },
         { name: 'Ametista', image: 'https://placehold.co/100x100/8A2BE2/FFFFFF?text=Ametista', description: 'A transmutadora violeta. Eleva a vibração, acalma a mente, transmuta energia e abre portais para a espiritualidade.' },
         { name: 'Quartzo Verde', image: 'https://placehold.co/100x100/2E8B57/FFFFFF?text=Quartzo+Verde', description: 'O curador do corpo e da alma. Traz equilíbrio, saúde e bem-estar, alinhando o corpo físico e emocional.' },
    ]
};

const chakraData = [
    { name: "Muladhara", translation: "Chakra Raiz", color: "bg-red-700", description: "Sua fundação, sua conexão com a Terra. Governa a sobrevivência, segurança e estabilidade. Um Muladhara forte te aterra na realidade e te dá a base para crescer." },
    { name: "Svadhisthana", translation: "Chakra Sacral", color: "bg-orange-600", description: "O centro do fluxo, da criatividade e das emoções. Governa o prazer, a paixão e a capacidade de se adaptar. Um Svadhisthana fluido permite que a vida flua através de você." },
    { name: "Manipura", translation: "Chakra do Plexo Solar", color: "bg-yellow-500", description: "Sua forja interior, o centro do poder pessoal e da vontade. Governa a autoestima, a disciplina e a ação. Um Manipura aceso transforma intenção em realidade." },
    { name: "Anahata", translation: "Chakra Cardíaco", color: "bg-green-600", description: "A ponte entre o material e o espiritual. Governa o amor, a compaixão e a conexão. Um Anahata aberto te permite dar e receber amor incondicionalmente." },
    { name: "Vishuddha", translation: "Chakra Laríngeo", color: "bg-blue-500", description: "O centro da expressão e da verdade. Governa a comunicação e a autenticidade. Um Vishuddha claro te permite expressar sua alma e manifestar sua verdade." },
    { name: "Ajna", translation: "Chakra do Terceiro Olho", color: "bg-indigo-600", description: "O portal da intuição e da sabedoria. Governa a percepção, a clareza e a visão além do véu. Um Ajna desperto te guia com a sabedoria do universo." },
    { name: "Sahasrara", translation: "Chakra Coronário", color: "bg-purple-700", description: "Sua conexão com o Divino, a Fonte. Governa a transcendência e a consciência cósmica. Um Sahasrara aberto revela a unidade de todas as coisas." }
];

const pranayamaData = [
    { name: "Nadi Shodhana", translation: "Respiração das Narinas Alternadas", purpose: "Para harmonizar os hemisférios cerebrais, acalmar o sistema nervoso e equilibrar as energias masculina (Pingala) e feminina (Ida) dentro de você.", comoPraticar: ["Sente-se confortavelmente com a coluna ereta.", "Use o polegar direito para fechar a narina direita. Inspire lenta e profundamente pela narina esquerda.", "Feche a narina esquerda com o dedo anelar direito, libere o polegar e expire completamente pela narina direita.", "Inspire pela narina direita.", "Feche a narina direita com o polegar, libere o anelar e expire pela narina esquerda. Este é um ciclo. Continue por 3-5 minutos."], pontoFoco: "Sinta que, ao inspirar pela narina esquerda, você está nutrindo seu lado intuitivo e receptivo. Ao inspirar pela direita, você alimenta sua ação e poder no mundo.", termosPesquisa: "tutorial Nadi Shodhana para iniciantes, equilibrar Ida e Pingala nadis" },
    { name: "Ujjayi Pranayama", translation: "Respiração Vitoriosa ou do Oceano", purpose: "Para aquecer o corpo, aumentar o foco e a concentração, e criar um ritmo meditativo que ancora a mente no presente. O som do oceano interior.", comoPraticar: ["Sente-se ou fique em uma postura confortável.", "Contraia suavemente a parte de trás da sua garganta (glote), como se estivesse sussurrando.", "Inspire e expire pelo nariz, mantendo a contração. A respiração produzirá um som suave, sibilante, como as ondas do mar.", "Mantenha a inspiração e a expiração com a mesma duração. Pratique por 2-3 minutos, aumentando gradualmente."], pontoFoco: "O som não é um efeito colateral, é a própria ferramenta. Concentre-se na vibração suave na sua garganta para ancorar no momento presente.", termosPesquisa: "como fazer a respiração Ujjayi, benefícios do som na meditação" },
    { name: "Bhastrika", translation: "Respiração do Fole", purpose: "Para energizar o corpo e a mente, aumentar a vitalidade e transmutar a inércia. É uma explosão de Prana que purifica e desperta o fogo interior.", comoPraticar: ["Sente-se com a coluna ereta.", "Inspire e expire de forma forçada e rápida pelo nariz. O movimento deve vir do seu diafragma.", "Faça um ciclo de 10 respirações, depois respire normalmente. Comece com um ciclo e aumente para 3. (Cuidado: pode causar tontura)."], pontoFoco: "Visualize que você é um fole de ferreiro atiçando as brasas do seu Chakra do Plexo Solar (Manipura).", termosPesquisa: "Bhastrika pranayama tutorial, contraindicações Bhastrika" },
    { name: "Sama Vritti", translation: "Respiração Quadrada", purpose: "Para acalmar a mente, reduzir a ansiedade e criar um estado de equilíbrio e estabilidade. É uma âncora de serenidade em meio ao caos.", comoPraticar: ["Sente-se ou deite-se confortavelmente.", "Expire todo o ar.", "Inspire contando até 4.", "Segure o ar, contando até 4.", "Expire contando até 4.", "Segure sem ar, contando até 4. Este é um ciclo. Continue por 3-5 minutos."], pontoFoco: "Visualize a construção de um quadrado perfeito com sua respiração, dando à sua mente uma estrutura sagrada para habitar.", termosPesquisa: "box breathing navy seals, respiração quadrada para ansiedade" },
    { name: "Sheetali Pranayama", translation: "Respiração Refrescante", purpose: "Para resfriar o corpo, acalmar a mente e aliviar a frustração ou o excesso de 'fogo' (raiva).", comoPraticar: ["Sente-se confortavelmente.", "Enrole a língua em formato de 'U', colocando-a para fora da boca.", "Inspire lentamente pela língua enrolada, como se estivesse bebendo o ar por um canudo.", "Recolha a língua, feche a boca e expire lentamente pelo nariz.", "Repita por 5 a 10 ciclos."], pontoFoco: "Sinta o ar frio entrando e refrescando todo o seu sistema, como uma brisa suave em um dia quente.", termosPesquisa: "Sheetali pranayama tutorial, pranayama para resfriar o corpo" },
    { name: "Bhramari Pranayama", translation: "Respiração da Abelha", purpose: "Para acalmar a mente de forma quase instantânea, aliviar a ansiedade e a raiva. A vibração do som tem um efeito calmante profundo no sistema nervoso.", comoPraticar: ["Sente-se em um lugar tranquilo e feche os olhos.", "Use os polegares para tapar suavemente os ouvidos.", "Inspire profundamente pelo nariz.", "Ao expirar, mantenha a boca fechada e produza um som de 'Mmmmm', como o zumbido de uma abelha.", "Continue pelo tempo que for confortável."], pontoFoco: "Concentre-se na vibração que o som produz em todo o seu crânio, permitindo que ela dissolva os pensamentos agitados.", termosPesquisa: "Bhramari pranayama benefícios, respiração da abelha para ansiedade" }
];


const jornadaFlorescerData = [
    { etapa: 1, title: "Etapa 1: Despertar da Consciência (Iniciação)", arquétipos: "Perseu e Medusa, Rá, Atena", pilares: "Terra e Luz", praticas: "Aterramento Diário, Diário de Sincronicidades, Meditação 'Não-Cachimbo' de Magritte." },
    { etapa: 2, title: "Etapa 2: Definindo o Propósito", arquétipos: "Hércules, Ísis, Thoth", pilares: "Água e Som", praticas: "Criação de um 'Altar de Intenções', Prática do 'Eu Sou' com o Pilar do Som, Escrita Terapêutica para explorar paixões." },
    { etapa: 3, title: "Etapa 3: A Forja da Vontade", arquétipos: "Teseu e o Minotauro, Sekhmet, Ares", pilares: "Fogo", praticas: "Rituais de Queima de Intenções para liberar o que não serve mais, Prática de Bhastrika Pranayama para gerar energia, Ação Focada em uma meta desafiadora." },
    { etapa: 4, title: "Etapa 4: A Ponte do Coração", arquétipos: "Inanna, Afrodite, Kuan Yin", pilares: "Ar", praticas: "Meditação Metta Bhavana (Amor-Bondade), Prática da Comunicação Não-Violenta (CNV) em um relacionamento, Atos de generosidade anônima." },
    { etapa: 5, title: "Etapa 5: A Voz da Alma", arquétipos: "Hermes, Apolo, Bragi", pilares: "Som e Mente", praticas: "Prática de canto de mantras, Exercício de falar sua verdade em uma situação segura, Prática da Escuta Ativa." },
    { etapa: 6, title: "Etapa 6: A Visão Interior", arquétipos: "Anúbis, Hécate, Odin", pilares: "Luz", praticas: "Diário de Sonhos com foco na interpretação, Meditação no Terceiro Olho (Ajna), Prática de atenção às sincronicidades." },
    { etapa: 7, title: "Etapa 7: União Divina", arquétipos: "Shiva e Shakti, A Grande Mãe, O Andrógino Divino", pilares: "Mente", praticas: "Meditação Silenciosa para transcender o ego, Contemplação da natureza para sentir a unidade, Estudo do Pilar Zero 'A Teia do Mundo'." }
];

// --- STATE & DOM ELEMENTS ---
let app, db, auth, userId;

const errorModal = document.getElementById('error-modal');
const modalMessage = document.getElementById('modal-message');
const modalTitle = document.getElementById('modal-title');
const loadingMessage = document.getElementById('loading-message');
const appContainer = document.getElementById('app-container');

// --- CORE FUNCTIONS ---
function showDiagnosticModal(title, checklist) {
    modalTitle.innerHTML = `<i class="fas fa-exclamation-triangle mr-3"></i><span>${title}</span>`;
    modalMessage.innerHTML = checklist;
    errorModal.classList.remove('hidden');
}

function hideModal() { errorModal.classList.add('hidden'); }

// --- RENDER FUNCTIONS ---
function renderPillarCards() {
    const grid = document.getElementById('pillar-grid');
    if (!grid) return;
    grid.innerHTML = ''; // Clear existing content

    // Pilar Zero Card
    const pZero = pillarZeroData;
    const pZeroCard = document.createElement('div');
    pZeroCard.className = 'pillar-card rounded-lg p-4 text-center md:col-span-2 lg:col-span-4 cursor-pointer';
    pZeroCard.dataset.pillar = 'zero';
    pZeroCard.innerHTML = `<div class="text-3xl mb-2">${pZero.symbol}</div><h3 class="font-cinzel font-bold">${pZero.title}</h3><p class="text-xs text-gray-400">A Cosmovisão Sincrética</p>`;
    grid.appendChild(pZeroCard);

    // Other Pillar Cards
    grid.innerHTML += Object.keys(pillarData).map(key => {
        const p = pillarData[key];
        return `<div class="pillar-card rounded-lg p-4 text-center" data-pillar="${key}"><div class="text-3xl mb-2">${p.title.split(' ')[0]}</div><h3 class="font-cinzel font-bold">${p.title.split(' ').slice(2).join(' ')}</h3><p class="text-xs text-gray-400">${p.chakra}</p></div>`;
    }).join('');
}


function createGrimoireCard(doc) {
    const data = doc.data();
    const card = document.createElement('div');
    card.className = 'card rounded-lg p-4';
    const tagsHtml = (data.tags && Array.isArray(data.tags)) ? data.tags.map(tag => `<span class="text-xs bg-[#444] text-[#a37e2c] font-semibold px-2 py-1 rounded">${tag}</span>`).join(' ') : `<span class="text-xs bg-[#444] text-[#a37e2c] font-semibold px-2 py-1 rounded">${data.tags || 'Sem Selo'}</span>`;
    card.innerHTML = `<div class="flex justify-between items-start"><div><h4 class="text-lg font-bold font-cinzel text-[#c8a44d]">${data.title}</h4><p class="text-sm text-gray-400 whitespace-pre-wrap my-2">${data.content}</p><div class="flex flex-wrap gap-2">${tagsHtml}</div></div><button class="delete-btn text-red-500 hover:text-red-700" data-id="${doc.id}"><i class="fas fa-times"></i></button></div>`;
    return card;
}

function renderAstrologyTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;
    container.innerHTML = `<div class="timeline absolute h-full"></div>` + astrologyData.map(item => `<div class="timeline-item relative mb-8 pl-8"><div class="flex items-center mb-1"><div class="bg-[#a37e2c] text-[#1a1a1a] rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold ring-4 ring-[#1a1a1a] z-10"><i class="${item.icon}"></i></div><div class="flex-1 ml-4"><h4 class="font-cinzel font-bold">${item.title} (${item.year})</h4></div></div><div class="ml-4"><p class="text-sm text-gray-400">${item.description}</p></div></div>`).join('');
}

function renderSeasonalHerbs() {
    const container = document.getElementById('herbs-container');
    if (!container) return;
    const month = new Date().getMonth();
    let season;
    if ([8, 9, 10].includes(month)) season = 'Primavera'; // Set-Nov
    else if ([11, 0, 1].includes(month)) season = 'Verão'; // Dez-Fev
    else if ([2, 3, 4].includes(month)) season = 'Outono'; // Mar-Mai
    else season = 'Inverno'; // Jun-Ago

    const herbs = seasonalHerbData[season];
    const planetIcons = { 'Sol': '☀️', 'Lua': '🌙', 'Mercúrio': '☿️', 'Vênus': '♀️', 'Marte': '♂️', 'Júpiter': '♃', 'Saturno': '♄' };
    const elementIcons = { 'Fogo': '🔥', 'Água': '💧', 'Ar': '🌬️', 'Terra': '🌍' };

    const createHerbCard = (herb) => `
        <div class="card p-4 flex flex-col no-hover">
            <img src="${herb.image}" alt="${herb.name}" class="w-full h-32 rounded-md object-cover mb-4 border-2 border-[#444]">
            <div class="flex-1">
                <h4 class="font-bold font-cinzel text-lg text-[#c8a44d]">${herb.name}</h4>
                <p class="text-xs text-gray-500 italic mb-2">${herb.scientificName}</p>
                
                <div class="text-sm space-y-1 mb-3">
                    <p><strong>Correspondências:</strong></p>
                    <div class="flex flex-wrap gap-x-4 text-xs">
                       <span>${planetIcons[herb.planet] || ''} ${herb.planet}</span>
                       <span>${elementIcons[herb.element] || ''} ${herb.element}</span>
                    </div>
                    <p class="text-xs"><strong>Divindades:</strong> ${herb.deities}</p>
                </div>

                <div class="border-t border-[#444] pt-2 mt-2">
                    <h5 class="font-semibold text-sm text-[#a37e2c] mb-1">Usos Mágicos:</h5>
                    <ul class="list-disc list-inside text-xs text-gray-400 space-y-1">
                        ${herb.magicalUses.map(use => `<li>${use}</li>`).join('')}
                    </ul>
                </div>

                <div class="border-t border-[#444] pt-2 mt-3">
                    <h5 class="font-semibold text-sm text-[#a37e2c] mb-1">Usos Medicinais:</h5>
                    <p class="text-xs text-gray-400">${herb.medicinalUses}</p>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = `
        <div class="mb-6">
            <h3 class="text-lg font-bold font-cinzel text-center text-[#c8a44d] mb-4">Sabedoria Herbal para o ${season}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${herbs.map(createHerbCard).join('')}
            </div>
        </div>
    `;
}


function renderCrystalList() {
    const container = document.getElementById('crystals-list');
    if (!container) return;
    const createInfoCard = (item) => `<div class="card p-4 flex gap-4 items-center no-hover"><img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-md object-cover border-2 border-[#444]"><div class="flex-1"><h4 class="font-bold text-[#c8a44d]">${item.name}</h4><p class="text-xs text-gray-400">${item.description}</p></div></div>`;
    container.innerHTML = Object.entries(crystalData).map(([category, items]) => `<div class="mb-6"><h3 class="text-lg font-bold font-cinzel text-[#c8a44d] mb-4">${category}</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4">${items.map(createInfoCard).join('')}</div></div>`).join('');
}

function renderChakras() {
    const container = document.getElementById('chakra-list');
    if (!container) return;
    container.innerHTML = chakraData.map(chakra => `
        <div class="card p-4 flex flex-col items-center text-center no-hover">
            <div class="w-12 h-12 rounded-full ${chakra.color} mb-3 flex items-center justify-center font-bold text-white shadow-lg"></div>
            <h4 class="font-bold font-cinzel text-[#c8a44d]">${chakra.name}</h4>
            <p class="text-sm text-gray-400 mb-2">(${chakra.translation})</p>
            <p class="text-xs text-gray-400">${chakra.description}</p>
        </div>
    `).join('');
}

function renderPranayamas() {
    const container = document.getElementById('pranayama-list');
    if (!container) return;

    container.innerHTML = `
        <div class="text-center mb-8">
            <h2 class="text-2xl font-bold font-cinzel text-center text-[#c8a44d] mb-4">Sopros de Vida</h2>
            <p class="text-sm text-gray-400 max-w-3xl mx-auto">Se você, como muitos de nós, sente que a respiração consciente é uma "deficiência", saiba que esta é a porta mais convidativa da Rota Pagã. Não há nada a "conquistar", apenas a redescobrir. A respiração é sua âncora, sua aliada mais antiga. Este pilar não é sobre técnicas complexas, é sobre reacender a amizade com seu próprio sopro. Como um primeiro ritual, a qualquer hora do dia, apenas pause e faça três respirações profundas. Sinta sua mente voltar para casa, para o seu corpo. Quando se sentir pronto, explore as chaves abaixo para diferentes estados de ser.</p>
        </div>
        <div class="space-y-8">
        ${pranayamaData.map(pranayama => `
            <div class="card p-6 no-hover">
                <div class="flex flex-col md:flex-row gap-6 items-start">
                    <div class="flex-1 text-center md:text-left">
                        <h3 class="text-xl font-bold font-cinzel text-[#c8a44d]">${pranayama.name}</h3>
                        <p class="text-sm text-gray-400 mb-3 italic">(${pranayama.translation})</p>
                        <p class="text-sm text-gray-300 mb-4"><strong>Para que serve:</strong> ${pranayama.purpose}</p>
                        <p class="text-sm text-[#a37e2c] mb-4"><strong>Ponto de Foco:</strong> ${pranayama.pontoFoco}</p>
                    </div>
                </div>
                <div class="mt-4 border-t border-[#444] pt-4">
                    <h4 class="font-semibold mb-2">Como Praticar:</h4>
                    <ol class="list-decimal list-inside space-y-2 text-sm text-gray-400">
                        ${pranayama.comoPraticar.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
                <div class="mt-4 border-t border-[#444] pt-4">
                    <p class="text-xs text-gray-500"><strong>Termos de Pesquisa:</strong> <em>${pranayama.termosPesquisa}</em></p>
                </div>
            </div>
        `).join('')}
        </div>
    `;
}

function renderJornadaFlorescer() {
    const container = document.getElementById('jornada-container');
    if (!container) return;
    
    container.innerHTML = jornadaFlorescerData.map(etapa => `
        <div class="border-l-4 border-gray-700">
            <div class="accordion-header flex justify-between items-center p-4 bg-[#1f1f1f] rounded-r-lg">
                <h3 class="font-semibold font-cinzel text-lg text-[#a37e2c]">${etapa.title}</h3>
                <i class="fas fa-chevron-down text-xs"></i>
            </div>
            <div class="accordion-content bg-[#1f1f1f] px-4 pb-4 rounded-b-lg text-sm text-gray-400 space-y-2">
                <p><strong>Arquétipos-Guia:</strong> ${etapa.arquétipos}</p>
                <p><strong>Pilares de Foco:</strong> ${etapa.pilares}</p>
                <p><strong>Rituais e Práticas Sugeridas:</strong> ${etapa.praticas}</p>
            </div>
        </div>
    `).join('');

    container.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('i');
            // Close other accordions
            document.querySelectorAll('#jornada-container .accordion-content').forEach(c => {
                if (c !== content && c.style.maxHeight) {
                    c.style.maxHeight = null;
                    c.previousElementSibling.querySelector('i').classList.replace('fa-chevron-up', 'fa-chevron-down');
                }
            });
            // Toggle current accordion
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            }
        });
    });
}


function showPillarDetails(pillarId) {
    const data = pillarId === 'zero' ? pillarZeroData : pillarData[pillarId];
    if (!data) return;
    const contentDiv = document.getElementById('pillar-content');
    if (!contentDiv) return;
    contentDiv.innerHTML = `<h2 class="text-2xl font-bold font-cinzel text-center text-[#c8a44d] mb-6">${data.title}</h2><div class="text-left">${data.content}</div>`;
    
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.getElementById('pillar-detail-section')?.classList.add('active');
}

// --- FIRESTORE FUNCTIONS ---
const getCollectionRef = (collectionName) => collection(db, `users/${userId}/${collectionName}`);

async function handleAddItem(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // --- O FEITIÇO DE REVELAÇÃO ---
    const dataToSave = {
        title: formData.get('title'),
        content: formData.get('content'),
        tags: formData.get('tags') ? formData.get('tags').split(',').map(t => t.trim()).filter(Boolean) : [],
        createdAt: serverTimestamp()
    };
    console.log("🔮 Objeto sendo enviado ao Firestore:", dataToSave);
    // -----------------------------

    try { 
        await addDoc(getCollectionRef('grimoire_entries'), dataToSave); 
        form.reset(); 
        const accordionContent = form.closest('.accordion-content');
        if (accordionContent) accordionContent.style.maxHeight = null;
    }
    catch (error) { 
        console.error("🔥 Erro ao selar a inscrição no Tomo:", error);
        showDiagnosticModal("Falha ao Salvar", "Ocorreu um erro ao salvar sua inscrição. Verifique os detalhes no console do navegador (F12)."); 
    }
}

async function handleDeleteItem(event) {
    const button = event.target.closest('.delete-btn');
    if (!button) return;
    if (confirm("Tem certeza que deseja apagar esta inscrição do seu Tomo?")) {
        try { 
            await deleteDoc(doc(db, `users/${userId}/grimoire_entries/${button.dataset.id}`)); 
        }
        catch (error) { 
            console.error("Falha ao Apagar:", { message: error.message, code: error.code });
            showDiagnosticModal("Falha ao Apagar", "Não foi possível apagar a inscrição. Verifique sua conexão e tente novamente."); 
        }
    }
}

function setupCollectionListener(collectionName, listId, cardFn) {
    const q = query(getCollectionRef(collectionName), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
        const listEl = document.getElementById(listId);
        if (!listEl) return;
        listEl.innerHTML = '';
        if (snapshot.empty) { listEl.innerHTML = '<p class="text-center text-gray-500">Seu tomo ainda aguarda as primeiras palavras.</p>'; return; }
        snapshot.forEach(doc => {
            try {
                listEl.appendChild(cardFn(doc));
            } catch (renderError) {
                console.error(`Error rendering document ${doc.id}:`, { message: renderError.message });
                const errorEl = document.createElement('div');
                errorEl.className = 'card rounded-lg p-4 text-red-500';
                errorEl.textContent = `Falha ao renderizar a inscrição: ${doc.id}. Verifique os dados no console.`;
                listEl.appendChild(errorEl);
            }
        });
    }, (error) => {
        console.error("Firestore Snapshot Error:", { message: error.message, code: error.code });
        const checklist = `
            <p>A aplicação não conseguiu se conectar ao seu santuário de dados. Por favor, verifique os seguintes pontos no seu Console do Firebase:</p>
            <ul class="list-disc list-inside mt-2 space-y-1">
                <li><strong>Cloud Firestore Ativado:</strong> Verifique se você criou um banco de dados Cloud Firestore no seu projeto.</li>
                <li><strong>Regras de Segurança:</strong> Suas regras de segurança podem estar bloqueando o acesso.</li>
            </ul>
        `;
        showDiagnosticModal("Falha na Conexão com o Santuário de Dados", checklist);
    });
}

// --- EVENT LISTENERS ---
function setupEventListeners() {
    document.getElementById('close-modal-btn')?.addEventListener('click', hideModal);
    
    document.querySelectorAll('#main-nav .tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const currentTarget = e.currentTarget;
            const sectionId = currentTarget.dataset.section;
            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
            document.getElementById(sectionId)?.classList.add('active');
            document.querySelectorAll('#main-nav .tab').forEach(t => t.classList.remove('active'));
            currentTarget.classList.add('active');
        });
    });

    document.getElementById('pillar-grid')?.addEventListener('click', (e) => {
        const card = e.target.closest('.pillar-card');
        if(card) showPillarDetails(card.dataset.pillar);
    });

    document.querySelectorAll('.back-to-main').forEach(btn => {
        btn.addEventListener('click', () => {
             document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
             document.getElementById('main-section')?.classList.add('active');
             document.querySelectorAll('#main-nav .tab').forEach(t => t.classList.remove('active'));
             document.querySelector('#main-nav .tab[data-section="main-section"]')?.classList.add('active');
        });
    });
    
    document.getElementById('add-grimoire-form')?.addEventListener('submit', handleAddItem);
    document.getElementById('grimoire-list')?.addEventListener('click', handleDeleteItem);

    document.querySelector('#tomo-de-poder-section .accordion-header')?.addEventListener('click', (e) => {
        const header = e.currentTarget;
        const content = header.nextElementSibling;
        const icon = header.querySelector('i');
        if (!content || !icon) return;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        }
    });
}

// --- INITIALIZATION ---
function initApp() {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                userId = user.uid;
                loadingMessage?.classList.add('hidden');
                appContainer?.classList.remove('hidden');
                const userIdDisplay = document.getElementById('user-id-display');
                if (userIdDisplay) {
                    userIdDisplay.innerHTML = `<strong>Guardião da Centelha:</strong><br><span class="text-xs text-gray-500">A água, como a magia, sempre encontra seu caminho.</span>`;
                }
                
                setupCollectionListener('grimoire_entries', 'grimoire-list', createGrimoireCard);
                
                // Render all static content
                renderPillarCards();
                renderAstrologyTimeline();
                renderSeasonalHerbs();
                renderCrystalList();
                renderChakras();
                renderPranayamas();
                renderJornadaFlorescer();
                setupEventListeners();
                
            } else {
                signInAnonymously(auth).catch((err) => {
                    console.error("Auth Error:", { message: err.message, code: err.code });
                     const checklist = `
                        <p>A autenticação anônima falhou. Verifique no seu Console do Firebase:</p>
                        <ul class="list-disc list-inside mt-2 space-y-1">
                            <li><strong>Autenticação Anônima Ativada:</strong> Vá para 'Authentication' -> 'Sign-in method' e garanta que 'Anônimo' está ativado.</li>
                            <li><strong>Domínios Autorizados:</strong> Verifique se o domínio da aplicação está na lista de domínios autorizados.</li>
                        </ul>
                    `;
                    showDiagnosticModal("Falha na Autenticação", checklist);
                });
            }
        });
    } catch (error) {
        console.error("Initialization Error:", { message: error.message, code: error.code });
        const errorMessage = "Ocorreu um erro crítico na inicialização. Verifique o console para mais detalhes.";
        if(loadingMessage) {
            loadingMessage.innerHTML = `<p class="text-red-500 font-semibold text-center">${errorMessage}</p>`;
        }
        showDiagnosticModal("Erro Crítico de Inicialização", errorMessage);
    }
}

document.addEventListener('DOMContentLoaded', initApp);