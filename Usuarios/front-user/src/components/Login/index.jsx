import "./Login.css";
import Input from "../Form/Input";
import ButtonSubmit from "../Form/ButtonSubmit";
import ButtonSocial from "../Form/ButtonSocial";
import { FacebookIcon, GoogleIcon } from "../Icons";
import { useState } from "react";
import { Link } from "wouter";
import { loginWithGoogle } from "../../api";

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleLoginGoogle = async () => {
        try {
            const userData = await loginWithGoogle();
            console.log("User data:", userData);
        } catch (error) {
            console.error("Login failed:", error.message);
        }
    };
    return (
        <div className="container-login">
            <div className="container-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <h1>BIENVENIDO</h1>
                        <p>Por favor ingrese sus datos</p>
                    </div>
                    <Input
                        name="email"
                        type="email"
                        content="Correo electronico"
                        placeholder="Ingrese su correo electronico"
                        handle={handleInputChange}
                    />
                    <Input
                        name="password"
                        type="password"
                        content="Contraseña"
                        placeholder="*********"
                        handle={handleInputChange}
                    />
                    <div className="container-checkbox">
                        <label htmlFor="checkbox">
                            <input
                                name="checkbox"
                                type="checkbox"
                                className="checkbox-form"
                            />
                            Mantener sesion iniciada
                        </label>
                    </div>
                    <ButtonSubmit content="Iniciar sesion" />
                    <div className="container-btn-social">
                        <ButtonSocial color="White" onClick={handleLoginGoogle}>
                            <GoogleIcon />
                        </ButtonSocial>
                        <ButtonSocial color="Blue">
                            <FacebookIcon />
                        </ButtonSocial>
                    </div>
                    <div className="container-forgotten">
                        <p>
                            ¿No tienes una cuenta?{" "}
                            <span className="text-high">Registrate</span>
                        </p>
                        <Link href="/forgot-password">
                            <p className="text-high">
                                ¿Olvidaste tu contraseña?
                            </p>
                        </Link>
                    </div>
                </form>
            </div>
            <div className="container-logo">
                <img src="/logo.png" alt="logo" className="logo" />
            </div>
        </div>
    );
}
export default Login;
