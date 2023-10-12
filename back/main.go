<<<<<<< HEAD
package main

import (
	"log"
	"net/http"

	"backend/routes"

	"github.com/gorilla/mux"
)

func main() {
	// Crear un enrutador utilizando gorilla/mux
	r := mux.NewRouter()

	// Configurar rutas desde routes/routes.go
	routes.ConfigureRoutes(r)

	// Configurar el servidor web para escuchar en el puerto 8080
	log.Fatal(http.ListenAndServe(":8080", r))
}
=======
package main

import (
	"log"
	"net/http"

	"backend/routes"

	"github.com/gorilla/mux"
)

func main() {
	// Crear un enrutador utilizando gorilla/mux
	r := mux.NewRouter()

	// Configurar rutas desde routes/routes.go
	routes.ConfigureRoutes(r)

	// Configurar el servidor web para escuchar en el puerto 8080
	log.Fatal(http.ListenAndServe(":8080", r))
}
>>>>>>> f690eb5b1e9e8574d3f967e883675abec8b8db90
