import React, { useState, FormEvent } from 'react';
import '../styles/oracle.css';

interface MapData {
    dadosFreemium: {
        Sol: { posicao: string; casa: string; };
        Lua: { posicao: string; casa: string; };
        Ascendente: { posicao: string; };
        RegenteNascimento: { planeta: string; justificativa: string; };
        cicloAtual: {
            planeta: string;
            sephirah: string;
            periodoAnos: string;
            quadradoMagico: string;
        };
    };
    analisePremium: string;
}

const OraclePage: React.FC = () => {
    const [formData, setFormData] = useState({ name: 'Leandro', dob: '1986-07-01', tob: '19:40', location: 'São Paulo, SP, Brasil' });
    const [mapData, setMapData] = useState<MapData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /*
    // useEffect is temporarily commented out to prevent a Vite dev server crash.
    // This allows the prokeralaService.ts to be committed without breaking the app.
    // The underlying issue appears to be with the Vite environment, not the service itself.
    useEffect(() => {
        const testApi = async () => {
            try {
                // Use dynamic import to lazy-load the service client-side.
                const { fetchGeoDetails } = await import('../services/prokeralaService');
                console.log("Testing Prokerala API...");
                const data = await fetchGeoDetails("São Paulo");
                console.log("Prokerala API test successful:", data);
            } catch (err) {
                console.error("Prokerala API test failed:", err);
            }
        };
        testApi();
    }, []);
    */

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const callGeminiApiWithRetry = async (name: string, dob: string, tob: string, location: string): Promise<MapData> => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) throw new Error("A chave da API Gemini não está configurada no ambiente.");

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const systemPrompt = `Você é o "Oráculo Astral", um astrólogo mestre que combina o rigor técnico do astro.com com a profundidade da Cabala Hermética (Nilton Schutz) e do sincretismo (Clavículas de Salomão). Seu tom é sábio, místico e prático. Você DEVE responder APENAS com a estrutura JSON definida no schema. Regras de Cálculo Cabalístico (Sistema Schutz): 1. Determine o Regente da Hora de Nascimento. 2. Use o regente para determinar o primeiro ciclo de 39 anos. Os ciclos seguintes seguem a ordem DECRESCENTE (inversa) da tabela planetária. 3. Calcule o ciclo planetário ATUAL do usuário, com base na idade. 4. Popule o objeto 'cicloAtual'. A 'analisePremium' deve ser uma análise preditiva e de personalidade profunda, focando no potencial de "Florescimento" do usuário, conectando seus principais posicionamentos (Sol, Lua, Ascendente) aos desafios e oportunidades da vida, e DEVE mencionar como o 'cicloAtual' (ex: Júpiter) influencia este momento.`;
        const userPrompt = `Calcule os dados e gere a análise para: Nome: ${name}, Data: ${dob}, Hora: ${hora}, Local: ${location}. Siga o schema JSON exatamente. Calcule o 'cicloAtual' usando a lógica Schutz.`;
        const responseSchema = { type: "OBJECT", properties: { "dadosFreemium": { type: "OBJECT", properties: { "Sol": { type: "OBJECT", properties: {"posicao": { "type": "STRING" }, "casa": { "type": "STRING" } } }, "Lua": { type: "OBJECT", properties: {"posicao": { "type": "STRING" }, "casa": { "type": "STRING" } } }, "Ascendente": { type: "OBJECT", properties: {"posicao": { "type": "STRING" }} }, "RegenteNascimento": { type: "OBJECT", properties: {"planeta": { "type": "STRING" }, "justificativa": { "type": "STRING" } } }, "cicloAtual": { type: "OBJECT", description: "O ciclo planetário cabalístico atual do usuário (Sistema Schutz)", properties: { "planeta": { "type": "STRING" }, "sephirah": { "type": "STRING" }, "periodoAnos": { "type": "STRING" }, "quadradoMagico": { "type": "STRING" } } } } }, "analisePremium": { type: "STRING" } }, required: ["dadosFreemium", "analisePremium"] };
        const payload = { contents: [{ parts: [{ text: userPrompt }] }], systemInstruction: { parts: [{ text: systemPrompt }] }, generationConfig: { responseMimeType: "application/json", responseSchema: responseSchema, temperature: 0.8 } };

        let retries = 0;
        const maxRetries = 4;
        let delay = 1000;
        while (retries < maxRetries) {
            try {
                const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                if (!response.ok) {
                    if (response.status === 429 || response.status >= 500) throw new Error(`Servidor do Oráculo sobrecarregado (Erro ${response.status}).`);
                    const errorBody = await response.json();
                    throw new Error(errorBody?.error?.message || `Erro na API: ${response.status}`);
                }
                const result = await response.json();
                if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
                    return JSON.parse(result.candidates[0].content.parts[0].text);
                } else {
                    throw new Error(result.promptFeedback?.blockReason || "A resposta do Oráculo foi bloqueada por segurança.");
                }
            } catch (err: any) {
                console.warn(`Tentativa ${retries + 1} falhou: ${err.message}`);
                retries++;
                if (retries >= maxRetries) throw new Error(`Falha ao consultar o Oráculo após ${maxRetries} tentativas.`);
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2;
            }
        }
        throw new Error("Falha inesperada na chamada da API.");
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!formData.dob || !formData.tob || !formData.location) {
            setError("Por favor, preencha todos os campos de nascimento.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setMapData(null);
        try {
            const data = await callGeminiApiWithRetry(formData.name, formData.dob, formData.tob, formData.location);
            setMapData(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="content-panel p-6">
            <h2 className="font-fantasy text-4xl text-yellow-200 mb-4">Oráculo Astral do Florescimento</h2>
            <p className="mb-6">Insira seus dados de nascimento. O Oráculo usará a API Gemini para calcular seu alinhamento planetário (Freemium) e gerar uma análise preditiva (Premium) para guiar sua jornada.</p>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <input name="name" value={formData.name} onChange={handleInputChange} className="astro-input" placeholder="Nome"/>
                <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required className="astro-input" style={{colorScheme: 'dark'}}/>
                <input type="time" name="tob" value={formData.tob} onChange={handleInputChange} required className="astro-input" style={{colorScheme: 'dark'}}/>
                <input name="location" value={formData.location} onChange={handleInputChange} required className="astro-input" placeholder="Local de Nascimento"/>
                <button type="submit" disabled={isLoading} className="calculate-button font-fantasy text-lg">
                    {isLoading ? 'Calculando...' : 'Consultar Oráculo'}
                </button>
            </form>

            {isLoading && (
                <div className="my-8 flex justify-center items-center space-x-3">
                    <div className="loader h-12 w-12"></div>
                    <span className="font-fantasy text-yellow-200">Calculando os fios do destino...</span>
                </div>
            )}
            {error && <div className="warning-box mt-4">{error}</div>}
            {mapData && (
                <div className="mt-8 space-y-6">
                    <div className="border border-yellow-800/50 rounded-lg p-4">
                        <h3 className="font-fantasy text-2xl text-yellow-300 mb-3">Dados Astrais (Freemium)</h3>
                        <div className="map-grid">
                            <div className="map-data-item"><strong>Sol:</strong> {mapData.dadosFreemium.Sol.posicao} (Casa {mapData.dadosFreemium.Sol.casa})</div>
                            <div className="map-data-item"><strong>Lua:</strong> {mapData.dadosFreemium.Lua.posicao} (Casa {mapData.dadosFreemium.Lua.casa})</div>
                            <div className="map-data-item"><strong>Ascendente:</strong> {mapData.dadosFreemium.Ascendente.posicao}</div>
                            <div className="map-data-item col-span-2 md:col-span-3"><strong>Regente da Hora de Nascimento:</strong> {mapData.dadosFreemium.RegenteNascimento.planeta} ({mapData.dadosFreemium.RegenteNascimento.justificativa})</div>
                            <div className="map-data-item col-span-2 md:col-span-3"><strong>Ciclo Cabalístico Atual:</strong> {mapData.dadosFreemium.cicloAtual.planeta} ({mapData.dadosFreemium.cicloAtual.periodoAnos})</div>
                        </div>
                    </div>
                    <div className="border border-yellow-500 rounded-lg p-6 bg-yellow-900/20">
                        <h3 className="font-fantasy text-2xl text-yellow-200 mb-3">Análise Preditiva (Premium)</h3>
                        <p className="text-lg leading-relaxed whitespace-pre-wrap">{mapData.analisePremium}</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default OraclePage;
