import "./ButtonSocial.css";
function ButtonSocial({ children, color, ...rest }) {
    return (
        <button
            {...rest}
            type="button"
            className={`buttonSocial button${color}`}
        >
            {children}
        </button>
    );
}
export default ButtonSocial;
