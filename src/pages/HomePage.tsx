import React from 'react';

const HomePage: React.FC = () => {
	return (
		<div className="relative flex flex-col items-center justify-center min-h-screen text-white bg-gray-900 bg-opacity-90 overflow-hidden">
			{/* Background */}
			<div className="absolute inset-0 bg-radial-gradient from-gray-800 to-black"></div>

			{/* Foreground */}
			<div className="z-10 flex flex-col items-center">
				{/* Tree of Wisdom Placeholder */}
				<div className="w-80 h-80 mb-12 bg-gray-800 bg-opacity-50 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/20">
					<p className="text-2xl font-fantasy text-yellow-200">Árvore da Sabedoria</p>
				</div>

				{/* Floating Icons */}
				<div className="flex space-x-12">
					{/* Icon 1: Ocultismo Teórico */}
					<div className="w-20 h-20 bg-purple-900 bg-opacity-70 rounded-full flex items-center justify-center shadow-md hover:shadow-purple-400/50 transition-shadow duration-300">
						<p className="text-4xl">🔮</p>
					</div>

					{/* Icon 2: Saúde Holística */}
					<div className="w-20 h-20 bg-green-900 bg-opacity-70 rounded-full flex items-center justify-center shadow-md hover:shadow-green-400/50 transition-shadow duration-300">
						<p className="text-4xl">🌿</p>
					</div>

					{/* Icon 3: Mitologia e Arquétipos */}
					<div className="w-20 h-20 bg-blue-900 bg-opacity-70 rounded-full flex items-center justify-center shadow-md hover:shadow-blue-400/50 transition-shadow duration-300">
						<p className="text-4xl">📚</p>
					</div>

					{/* Icon 4: Perspectivas Globais */}
					<div className="w-20 h-20 bg-yellow-900 bg-opacity-70 rounded-full flex items-center justify-center shadow-md hover:shadow-yellow-400/50 transition-shadow duration-300">
						<p className="text-4xl">🌍</p>
					</div>
				</div>
			</div>

			{/* Cosmic Compass */}
			<div className="absolute top-6 right-6 z-10 w-16 h-16 bg-gray-800 bg-opacity-70 rounded-full flex items-center justify-center shadow-md hover:shadow-cyan-400/50 transition-shadow duration-300">
				<p className="text-4xl">🧭</p>
			</div>
		</div>
	);
};

export default HomePage;
