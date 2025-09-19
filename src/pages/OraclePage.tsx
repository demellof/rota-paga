import React, { useState, FormEvent } from 'react';

// Define the structure of the map data we expect from the API
interface MapData {
    sun_sign: string;
    moon_sign: string;
    ascendant_sign: string;
    mercury_sign: string;
    venus_sign: string;
    mars_sign: string;
    analysis: string;
}

const OraclePage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', dob: '', tob: '', location: '' });
    const [mapData, setMapData] = useState<MapData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const callGeminiApiWithRetry = async (name: string, dob: string, tob: string, location: string): Promise<MapData> => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("A chave da API Gemini não está configurada no ambiente.");
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const systemPrompt = `Você é 'O Astrólogo do Grimório', um analista astrológico mestre que combina a precisão técnica do astro.com com profunda sabedoria esotérica e psicológica (Junguiana). Sua análise é profunda, direta e focada em arquétipos. Você DEVE calcular as posições planetárias com base nos dados fornecidos e retornar TUDO no formato JSON exato solicitado. NÃO inclua markdown (como \`\`\`json) na sua resposta.`;
        const userQuery = `Calcule e analise o mapa astral para: Nome: ${name}, Data de Nasc: ${dob}, Hora de Nasc: ${tob}, Local de Nasc: ${location}. Calcule os 'Seis Pilares Pessoais': Sol, Lua, Ascendente, Mercúrio, Vênus e Marte (incluindo signo E casa, se possível, ex: 'Leão na Casa 10'). Após calcular as posições, escreva uma 'Análise Preditiva' de 2-3 parágrafos focada nos principais potenciais e desafios para esta pessoa, conectando os pilares que você encontrou.`;
        const jsonSchema = {
            type: "OBJECT",
            properties: { "sun_sign": { "type": "STRING" }, "moon_sign": { "type": "STRING" }, "ascendant_sign": { "type": "STRING" }, "mercury_sign": { "type": "STRING" }, "venus_sign": { "type": "STRING" }, "mars_sign": { "type": "STRING" }, "analysis": { "type": "STRING" } },
            required: ["sun_sign", "moon_sign", "ascendant_sign", "mercury_sign", "venus_sign", "mars_sign", "analysis"]
        };

        const payload = {
            contents: [{ parts: [{ text: userQuery }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: { responseMimeType: "application/json", responseSchema: jsonSchema }
        };

        let retries = 0;
        const maxRetries = 4;
        let delay = 1000;

        while (retries < maxRetries) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    if (response.status === 429 || response.status >= 500) {
                         throw new Error(`Servidor do Oráculo sobrecarregado (Erro ${response.status}).`);
                    }
                    throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();

                if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
                    return JSON.parse(result.candidates[0].content.parts[0].text);
                } else {
                    throw new Error(result.promptFeedback?.blockReason || "A resposta do Oráculo estava vazia ou foi bloqueada.");
                }
            } catch (err: any) {
                console.warn(`Tentativa ${retries + 1} falhou: ${err.message}`);
                retries++;
                if (retries >= maxRetries) {
                     throw new Error(`Falha ao consultar o Oráculo após ${maxRetries} tentativas.`);
                }
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2;
            }
        }
        throw new Error("Falha inesperada na chamada da API.");
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
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

    const mapItems = mapData ? [
        { label: 'Sol', value: mapData.sun_sign },
        { label: 'Lua', value: mapData.moon_sign },
        { label: 'Ascendente', value: mapData.ascendant_sign },
        { label: 'Mercúrio', value: mapData.mercury_sign },
        { label: 'Vênus', value: mapData.venus_sign },
        { label: 'Marte', value: mapData.mars_sign },
    ] : [];

    return (
        <>
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300">O Oráculo Astral</h1>
            <p className="page-subtitle">Calcule seu mapa astral gratuito com a análise preditiva do Grimório.</p>

            <div className="content-card glass-effect">
                <h2 className="text-2xl font-bold mb-4 text-white">Insira seus Dados de Nascimento</h2>
                <p className="text-sm text-gray-400 mb-6">Esta ferramenta usa a API Gemini para gerar uma análise baseada nas diretrizes de `astro.com`.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nome (Opcional)</label>
                        <input type="text" id="name" name="name" placeholder="Ex: Leandro" className="astro-input" value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-300 mb-1">Data de Nascimento <span className="text-red-400">*</span></label>
                            <input type="date" id="dob" name="dob" className="astro-input" required value={formData.dob} onChange={handleInputChange} />
                        </div>
                         <div>
                            <label htmlFor="tob" className="block text-sm font-medium text-gray-300 mb-1">Hora do Nascimento (Exata) <span className="text-red-400">*</span></label>
                            <input type="time" id="tob" name="tob" className="astro-input" required value={formData.tob} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">Local de Nascimento (Cidade, Estado/País) <span className="text-red-400">*</span></label>
                        <input type="text" id="location" name="location" placeholder="Ex: São Paulo, Brasil" className="astro-input" required value={formData.location} onChange={handleInputChange} />
                    </div>
                    <div>
                        <button type="submit" disabled={isLoading} className="calculate-button w-full md:w-auto">
                            {isLoading ? 'Calculando...' : 'Consultar o Oráculo'}
                        </button>
                    </div>
                </form>
            </div>

            {isLoading && (
                <div className="flex justify-center my-8">
                    <div className="spinner"></div>
                </div>
            )}

            {error && (
                <div className="warning-box mt-4">
                    <strong>Erro ao consultar o Oráculo.</strong>
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {mapData && (
                <div className="content-card glass-effect">
                    <h2 className="text-2xl font-bold text-white mb-4">Seu Mapa Astral (Freemium)</h2>
                    <div className="map-grid">
                        {mapItems.map(item => (
                            <div key={item.label} className="map-data-item">
                                <div className="label">{item.label}</div>
                                <div className="value">{item.value || 'N/D'}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6">
                        <h3 className="section-title border-yellow-400 text-yellow-400">Análise Preditiva Premium</h3>
                        <div className="text-sm prose prose-invert max-w-none prose-p:text-gray-300 prose-p:leading-relaxed" dangerouslySetInnerHTML={{ __html: mapData.analysis.replace(/\n/g, '<br />') }} />
                        <button className="premium-button" style={{background: 'linear-gradient(to right, #F97316, #EAB308)', boxShadow: '0 4px 15px rgba(234, 179, 8, 0.3)', display: 'inline-block', marginTop: '1rem' }}>
                            <i className="ph-fill ph-star-four inline-block mr-2"></i> Adquirir Mentoria Completa
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default OraclePage;
