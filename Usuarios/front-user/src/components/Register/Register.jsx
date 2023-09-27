import "./Register.css";
import Input from "../Form/Input";
import ButtonSubmit from "../Form/ButtonSubmit";
import { useState } from "react";

export default function Register() {
    const [user, setUser] = useState({
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        password: "",
        confirmpassword: "",
    });
    const handleInputChange = (event) => {
        console.log(event.target.value);
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };
    const enviarDatos = (event) => {
        event.preventDefault();
        console.log("enviando datos..." + user.nombre + " " + user.email);
    };

    return (
        <div className="registro-login">
            <div className="registro-logo">
                <img src="/logo.png" />
            </div>
            <div className="registro-form">
                <form onSubmit={enviarDatos}>
                    <div>
                        <h1 className="titulo">Registro</h1>
                        <p className="titulo">Ingrese sus datos</p>
                    </div>
                    <Input
                        name="nombre"
                        type="text"
                        content="Nombre"
                        placeholder="Ej: Diego Andres"
                        onChange={handleInputChange}
                    />
                    <Input
                        name="apellidos"
                        type="text"
                        content="Apellidos"
                        placeholder="Ej: Hernandez Garcia"
                        onChange={handleInputChange}
                    />
                    <Input
                        name="email"
                        type="email"
                        content="Email"
                        placeholder="Ingrese su correo electrónico"
                        onChange={handleInputChange}
                    />
                    <Input
                        name="telefono"
                        type="numb"
                        content="Telefono"
                        placeholder="+56977172355"
                        onChange={handleInputChange}
                    />
                    <Input
                        name="password"
                        type="password"
                        content="Contraseña"
                        placeholder="********"
                        onChange={handleInputChange}
                    />
                    <Input
                        name="confirmpassword"
                        type="password"
                        content="Confirmar contraseña"
                        placeholder="********"
                        onChange={handleInputChange}
                    />
                    {user.password === user.confirmpassword ? (
                        <></>
                    ) : (
                        <p>Las contraseñas no coinciden</p>
                    )}

                    <ButtonSubmit content="Registrarse" />
                </form>
            </div>
        </div>
    );
}
