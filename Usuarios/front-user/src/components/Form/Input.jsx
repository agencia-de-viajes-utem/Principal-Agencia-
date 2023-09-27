import "./Input.css";
function Input({ name, type, content, placeholder, handle }) {
    return (
        <div className="box-input">
            <label htmlFor={name}>{content}</label>
            <input
                onChange={handle}
                type={type}
                name={name}
                placeholder={placeholder}
            />
        </div>
    );
}

export default Input;
