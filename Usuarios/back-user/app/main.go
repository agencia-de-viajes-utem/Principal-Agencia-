package main

import (
	"fmt"
	"net/http"
	"back-user/api"
	"github.com/rs/cors"
)

func main() {
	router := api.NewRouter()

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"}, // Cambia esto a los orígenes que desees permitir
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders: []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
		Debug: true,  // Poner en true para ver los mensajes de debug, útil para resolver problemas
	})

	handler := c.Handler(router)

	fmt.Println("Servidor en ejecución en http://localhost:3000")
	http.ListenAndServe(":3000", handler)
}
