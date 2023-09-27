import "./ForgotPassword.css";
import Input from "../Form/Input";
import ButtonSubmit from "../Form/ButtonSubmit";
export default function ForgotPasword() {
    return (
        <main className="container">
            <div className="container_text">
                <h1>¿OLVIDASTE TU CONTRASEÑA?</h1>
                <p>
                    Ingrese su direccion de correo electronico y le enviaremos
                    un enlace para restablecer su contraseña
                </p>
            </div>
            <div className="container_form">
                <form>
                    <Input
                        name="forgot-password"
                        type="text"
                        content="Correo electronico"
                        placeholder="Introduce tu correo electronico"
                    />
                    <ButtonSubmit content="Continuar" />
                </form>
            </div>
        </main>
    );
}
