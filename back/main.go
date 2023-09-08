package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux" // Importa el paquete gorilla/mux para manejar el enrutamiento
	_ "github.com/lib/pq"
	"github.com/rs/cors"
)

type Aeropuerto struct {
	ID         int    `json:"id"`
	Aeropuerto string `json:"aeropuerto"`
}

func obtenerAeropuertos(w http.ResponseWriter, r *http.Request) {
	// Establece la conexión con la base de datos PostgreSQL utilizando la URL de conexión
	db, err := sql.Open("postgres", "postgres://llvcagdg:xQIbymPtjG9bva11nOfPBbYqvuHscwFR@silly.db.elephantsql.com/llvcagdg")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Consulta SQL para obtener aeropuertos
	rows, err := db.Query(`
	SELECT
		Aeropuerto.id,
		CONCAT(Aeropuerto.nombre, ', ', Ciudad.nombre, ', ', Pais.nombre) as Aeropuerto_Origen
	FROM
		Aeropuerto
	JOIN
		Ciudad ON Aeropuerto.ciudad_id = Ciudad.id
	JOIN
		Pais ON Ciudad.pais_id = Pais.id;
	`)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	// Slice para almacenar los aeropuertos
	var aeropuertos []Aeropuerto

	// Itera a través de los resultados y agrega a la slice
	for rows.Next() {
		var aeropuerto Aeropuerto
		err := rows.Scan(&aeropuerto.ID, &aeropuerto.Aeropuerto)
		if err != nil {
			log.Fatal(err)
		}
		aeropuertos = append(aeropuertos, aeropuerto)
	}

	// Convierte los resultados a JSON y envía la respuesta
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(aeropuertos)
}

func main() {
	// Crear un enrutador utilizando gorilla/mux
	r := mux.NewRouter()

	// Habilitar CORS utilizando el paquete rs/cors solo para la ruta /aeropuertos
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"}, // Permite el acceso desde el puerto 5173
		AllowedMethods: []string{"GET"},
	})

	// Aplicar el middleware CORS solo a la ruta /aeropuertos
	r.Handle("/aeropuertos", c.Handler(http.HandlerFunc(obtenerAeropuertos)))

	// Configurar el servidor web para escuchar en el puerto 8080
	log.Fatal(http.ListenAndServe(":8080", r))
}
