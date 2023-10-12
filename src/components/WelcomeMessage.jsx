import { useState, useEffect } from 'react';

const WelcomeMessage = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
      sessionStorage.setItem('hasShownWelcome', 'true'); // Guarda en sessionStorage que el mensaje se ha mostrado
    }, 3000);

    // Verifica si el mensaje ya se ha mostrado previamente en sessionStorage
    const hasShownWelcome = sessionStorage.getItem('hasShownWelcome');
    if (hasShownWelcome) {
      // Si el mensaje ya se ha mostrado previamente, ocúltalo de inmediato
      setShowWelcome(false);
      clearTimeout(timer); // Limpia el temporizador si ya se ha mostrado antes
    }

    return () => {
      clearTimeout(timer); // Limpia el temporizador cuando el componente se desmonta
    };
  }, []);

  return (
    <div className={`welcome-message ${showWelcome ? 'show' : 'hide'}`} style={{ zIndex: 9999 }}>
      <h1>Bienvenido</h1>
    </div>
  );
};

export default WelcomeMessage;
