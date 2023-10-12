package utils

import (
	"backend/config"
	"database/sql"

	_ "github.com/lib/pq"
)

// OpenDB abre la conexión con la base de datos y la devuelve
func OpenDB() (*sql.DB, error) {
	db, err := sql.Open("postgres", config.DBURL)
	if err != nil {
		return nil, err
	}
	return db, nil
}
