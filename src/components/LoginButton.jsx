
import { FaSignInAlt } from 'react-icons/fa';

const LoginButton = () => {
  return (
    <div className="login">
      <button className="login-button">
        <FaSignInAlt className="icon" />
        Ingresar
      </button>
    </div>
  );
};

export default LoginButton;
