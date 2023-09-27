const baseURL = "http://localhost:3000";
export async function loginWithGoogle() {
    try {
        // Haciendo una solicitud GET a la ruta /login-google en tu servidor
        const response = await fetch(baseURL + "/login-google");
        if (!response.ok) {
            throw new Error(
                "Network response was not ok " + response.statusText
            );
        }

        // Parseando la respuesta JSON para obtener la URL de redirección
        const data = await response.json();
        const redirectURL = data.url;

        if (redirectURL) {
            // Redirigiendo al usuario a la página de autenticación de Google
            window.location.href = redirectURL;
        } else {
            console.error("No se pudo obtener la URL de redirección");
        }
    } catch (error) {
        console.error("Error al iniciar sesión con Google:", error);
    }
}
