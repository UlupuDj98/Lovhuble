"use client";
import { useState, useEffect } from "react";


export default function ComponenteScorrevole() {
 
    
    const frasi = [
        "Spedizione gratuita sopra i 35€",
        "Anonimato garantito",
        "Consegna veloce",
    ];
    
    const [indiceCorrente, setIndiceCorrente] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            // Prima nasconde la frase corrente
            setIsVisible(false);
            
            // Dopo un breve delay, cambia la frase e la mostra
            setTimeout(() => {
                setIndiceCorrente((prev) => (prev + 1) % frasi.length);
                setIsVisible(true);
            }, 300); // Metà della durata dell'animazione fade
        }, 3000); // Cambia frase ogni 3 secondi

        return () => clearInterval(interval);
    }, [frasi.length]);

    return (
        <div className="h-6 sm:h-8 w-full flex items-center justify-center py-1 bg-[#d4a5a5]">
            <div 
                key={indiceCorrente}
                className={`text-black font-medium text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap text-center transition-opacity duration-300 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
            >
                {frasi[indiceCorrente]}
            </div>
        </div>
    );
}