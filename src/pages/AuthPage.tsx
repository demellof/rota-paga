import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup, login, signInWithGoogle } = useAuth();

    const handleGoogleSignIn = async () => {
        setError('');
        try {
            await signInWithGoogle();
        } catch (err: any) {
            setError(err.message || 'Falha ao entrar com Google.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await signup(email, password);
            }
        } catch (err: any) {
            setError(err.message || 'Falha na autenticação');
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#111827]">
            <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg" style={{background: 'rgba(31, 41, 55, 0.5)', backdropFilter: 'blur(10px)'}}>
                <h2 className="text-2xl font-bold text-center font-fantasy text-white">
                    {isLogin ? 'Acessar a Rota Pagã' : 'Criar Conta'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="text-sm font-bold text-gray-400 block">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="astro-input mt-1 w-full"
                            placeholder="seu@email.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-bold text-gray-400 block">Senha</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="astro-input mt-1 w-full"
                            placeholder="********"
                        />
                    </div>
                    {error && <p className="text-red-400 text-xs text-center">{error}</p>}
                    <div>
                        <button type="submit" disabled={loading} className="calculate-button w-full">
                            {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Registrar')}
                        </button>
                    </div>
                </form>
                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-xs">OU</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                </div>
                <div>
                    <button onClick={handleGoogleSignIn} disabled={loading} className="w-full text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center" style={{backgroundColor: '#4285F4'}}>
                        <i className="fab fa-google mr-2"></i>
                        Entrar com Google
                    </button>
                </div>
                <div className="text-center">
                    <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-cyan-400 hover:underline">
                        {isLogin ? 'Não tem uma conta? Registre-se' : 'Já tem uma conta? Entre'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
