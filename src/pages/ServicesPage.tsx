import React, { useState } from 'react';
import { servicesData, Service } from '../data/servicesData';
import { useAuth } from '../context/AuthContext';

const ServicesPage: React.FC = () => {
    const { currentUser } = useAuth();
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [name, setName] = useState(currentUser?.displayName || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSelectService = (service: Service) => {
        setSelectedService(service);
        setMessage(`Olá, tenho interesse no serviço de ${service.title}.`);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            name,
            email,
            selectedService: selectedService?.title,
            message,
        });
        setIsSubmitted(true);
    };

    return (
        <>
            <h2 className="text-2xl font-bold font-cinzel text-center text-[#c8a44d] mb-8">Consultas e Serviços</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
                {servicesData.map(service => (
                    <div key={service.id} className="card p-6 text-center no-hover">
                        <i className={`${service.icon} text-4xl text-[#a37e2c] mb-4`}></i>
                        <h3 className="text-xl font-bold font-cinzel text-[#c8a44d] mb-2">{service.title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                        <p className="text-lg font-semibold text-white mb-6">{service.price}</p>
                        <button onClick={() => handleSelectService(service)} className="btn-primary w-full py-2 px-4 rounded-lg">
                            Tenho Interesse
                        </button>
                    </div>
                ))}
            </div>

            {selectedService && !isSubmitted && (
                <div className="card p-8 max-w-2xl mx-auto no-hover">
                    <h3 className="text-xl font-bold font-cinzel text-center text-[#c8a44d] mb-6">
                        Formulário de Contato para {selectedService.title}
                    </h3>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="text-sm font-bold text-gray-400 block">Nome</label>
                            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="form-input mt-1" />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm font-bold text-gray-400 block">Email</label>
                            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="form-input mt-1" />
                        </div>
                        <div>
                            <label htmlFor="message" className="text-sm font-bold text-gray-400 block">Mensagem</label>
                            <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows={5} required className="form-input mt-1"></textarea>
                        </div>
                        <button type="submit" className="btn-primary w-full py-2 px-4 rounded-lg">
                            Enviar Solicitação
                        </button>
                    </form>
                </div>
            )}

            {isSubmitted && (
                <div className="card p-8 max-w-2xl mx-auto text-center no-hover">
                    <h3 className="text-xl font-bold font-cinzel text-[#c8a44d] mb-4">Obrigado!</h3>
                    <p className="text-gray-400">Sua solicitação foi enviada. Entrarei em contato com você em breve pelo email fornecido.</p>
                </div>
            )}
        </>
    );
};

export default ServicesPage;
