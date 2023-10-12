import { FaSuitcase, FaQuestionCircle } from 'react-icons/fa';
import Logo from './Logo'; // Importa componentes desde archivos separados
import NavItem from './NavItem';
import LoginButton from './LoginButton';
import './Header.css';

const Header = () => {
  return (
    
    <header className="header">
      <div className="left-section">
        <Logo />
        <NavItem icon={<FaSuitcase />} text="Paquetes" />
        <NavItem icon={<FaQuestionCircle />} text="Ayuda" />
      </div>
      <div className="right-section">
        <LoginButton />
      </div>
    </header>
    
  );
  
};

export default Header; // Exporta el componente Header