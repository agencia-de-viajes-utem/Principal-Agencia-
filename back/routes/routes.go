package routes

import (
	"backend/api/handlers"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func ConfigureRoutes(r *mux.Router) {
	// Habilitar CORS utilizando el paquete rs/cors solo para la ruta /aeropuertos
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"}, // Permite el acceso desde el puerto 5173
		AllowedMethods: []string{"GET"},
	})

	// Aplicar el middleware CORS solo a la ruta /aeropuertos
	r.Handle("/aeropuertos", c.Handler(http.HandlerFunc(handlers.ObtenerAeropuertos)))
	r.Handle("/paquetes", c.Handler(http.HandlerFunc(handlers.ObtenerPaquetes)))
	r.Handle("/paquetes/mes", c.Handler(http.HandlerFunc(handlers.ObtenerPaquetesMes)))

	// Agrega más configuraciones de rutas aquí si es necesario
}
