import React, { useState, FormEvent, useEffect } from 'react';
import { useNatalChart } from '../hooks/useNatalChart';
import { BirthData } from '../services/astrologyService';
import '../styles/oracle.css';

const OraclePage: React.FC = () => {
    // State for the form inputs
    const [formData, setFormData] = useState({
        dob: '2000-01-01',
        time: '12:00',
        lat: 34.0522, // Default to Los Angeles
        lon: -118.2437,
    });

    // State to hold the birth data that will be sent to the API
    const [birthData, setBirthData] = useState<BirthData | null>(null);

    // useNatalChart hook, disabled until birthData is set
    const { data: natalChart, isLoading, error, refetch } = useNatalChart(birthData, { enabled: false });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Set the birth data from the form, which will trigger the useEffect below
        setBirthData({
            dob: formData.dob,
            time: formData.time,
            lat: formData.lat,
            lon: formData.lon,
        });
    };

    // This effect triggers the API call when `birthData` is updated
    useEffect(() => {
        if (birthData) {
            refetch();
        }
    }, [birthData, refetch]);

    return (
        <section className="content-panel p-6">
            <h2 className="font-fantasy text-4xl text-yellow-200 mb-4">Oráculo Astral do Florescimento</h2>
            <p className="mb-6">Insira seus dados de nascimento para calcular seu mapa astral usando a AstrologyAPI.</p>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    required
                    className="astro-input"
                    style={{colorScheme: 'dark'}}
                />
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="astro-input"
                    style={{colorScheme: 'dark'}}
                />
                <input
                    type="number"
                    name="lat"
                    value={formData.lat}
                    onChange={handleInputChange}
                    required
                    className="astro-input"
                    placeholder="Latitude"
                    step="any"
                />
                <input
                    type="number"
                    name="lon"
                    value={formData.lon}
                    onChange={handleInputChange}
                    required
                    className="astro-input"
                    placeholder="Longitude"
                    step="any"
                />
                <button type="submit" disabled={isLoading} className="calculate-button font-fantasy text-lg">
                    {isLoading ? 'Calculando...' : 'Calcular Mapa Astral'}
                </button>
            </form>

            {isLoading && (
                <div className="my-8 flex justify-center items-center space-x-3">
                    <div className="loader h-12 w-12"></div>
                    <span className="font-fantasy text-yellow-200">Calculando seu mapa astral...</span>
                </div>
            )}

            {error && <div className="warning-box mt-4">Ocorreu um erro: {error.message}</div>}

            {natalChart && (
                <div className="mt-8 border border-yellow-800/50 rounded-lg p-4">
                    <h3 className="font-fantasy text-2xl text-yellow-300 mb-3">Mapa Astral Calculado com Sucesso!</h3>
                    <pre className="text-sm bg-gray-900 p-4 rounded-md overflow-x-auto text-white">
                        {JSON.stringify(natalChart, null, 2)}
                    </pre>
                </div>
            )}
        </section>
    );
};

export default OraclePage;
