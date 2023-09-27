package api

import(
	"back-user/api/handlers"
	"github.com/gorilla/mux"
	"net/http"
)

func NewRouter() *mux.Router{
	router := mux.NewRouter()
	
	//rutas google login
	router.HandleFunc("/login-google", handlers.LoginGoogle).Methods(http.MethodGet)
	router.HandleFunc("/callback-google", handlers.CallbackGoogle).Methods(http.MethodGet)

	//rutas facebook login
	router.HandleFunc("/login-facebook", handlers.LoginFacebook)
	router.HandleFunc("/callback-facebook", handlers.CallbackFacebook)

	return router
}