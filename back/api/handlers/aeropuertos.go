package handlers

import (
	"backend/models"
	"backend/utils"
	"encoding/json"
	"log"
	"net/http"
)

func ObtenerAeropuertos(w http.ResponseWriter, r *http.Request) {
	// Abre la conexión con la base de datos
	db, err := utils.OpenDB()
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Error al conectar a la base de datos", http.StatusInternalServerError)
		return
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
		http.Error(w, "Error al consultar la base de datos", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	// Slice para almacenar los aeropuertos
	var aeropuertos []models.Aeropuerto

	// Itera a través de los resultados y agrega a la slice
	for rows.Next() {
		var aeropuerto models.Aeropuerto
		err := rows.Scan(&aeropuerto.ID, &aeropuerto.Aeropuerto)
		if err != nil {
			log.Fatal(err)
			http.Error(w, "Error al escanear resultados", http.StatusInternalServerError)
			return
		}
		aeropuertos = append(aeropuertos, aeropuerto)
	}

	// Convierte los resultados a JSON y envía la respuesta
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(aeropuertos); err != nil {
		log.Fatal(err)
		http.Error(w, "Error al convertir a JSON", http.StatusInternalServerError)
	}
}
