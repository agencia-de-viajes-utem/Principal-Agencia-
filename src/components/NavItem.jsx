import PropTypes from 'prop-types'; // Importa PropTypes si aún no lo has hecho

const NavItem = ({ icon, text }) => {
    return (
        <div className="nav-item">
          {icon}
          <span className="nav-text">{text}</span> {/* Agrega una clase para el texto */}
        </div>
    );
};

NavItem.propTypes = {
  icon: PropTypes.element.isRequired, // Valida que icon sea un elemento React (puedes ajustar la validación según tus necesidades)
  text: PropTypes.string.isRequired,   // Valida que text sea una cadena de texto (puedes ajustar la validación según tus necesidades)
};

export default NavItem;
