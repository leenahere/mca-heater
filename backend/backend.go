package main

import (
	"encoding/json"
	"log"
	"net/http"

	"gopkg.in/mgo.v2/bson"

	"github.com/gorilla/mux"
	. "mca-heater/backend/config"
	. "mca-heater/backend/dao"
	. "mca-heater/backend/models"
)

var config = Config{}
var dao = TempDAO{}

// AllTempsEndPoint gets list of measured temperatures
func AllTempsEndPoint(w http.ResponseWriter, r *http.Request) {
	temperatures, err := dao.FindAll()
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJson(w, http.StatusOK, temperatures)
}

// CreateTempEndPoint posts new measured temperature
func CreateTempEndPoint(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var temperature Temp
	if err := json.NewDecoder(r.Body).Decode(&temperature); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	temperature.ID = bson.NewObjectId()
	if err := dao.Insert(temperature); err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJson(w, http.StatusCreated, temperature)
}

// AllTargetTempsEndPoint gets a list of all target temperatures
func AllTargetTempsEndPoint(w http.ResponseWriter, r *http.Request) {
	temperatures, err := dao.FindTargets()
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJson(w, http.StatusOK, temperatures)
}

// CreateTargetTempEndPoint posts a new target temperature
func CreateTargetTempEndPoint(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var targettemp TargetTemp
	if err := json.NewDecoder(r.Body).Decode(&targettemp); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	targettemp.ID = bson.NewObjectId()
	if err := dao.InsertTarget(targettemp); err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJson(w, http.StatusCreated, targettemp)
}

// UpdateTargetTempEndPoint puts updated information on target temperature
func UpdateTargetTempEndPoint(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var targettemp TargetTemp
	if err := json.NewDecoder(r.Body).Decode(&targettemp); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	if err := dao.Update(targettemp); err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJson(w, http.StatusOK, map[string]string{"result": "success"})
}

// // GET a movie by its ID
// func FindMovieEndpoint(w http.ResponseWriter, r *http.Request) {
// 	params := mux.Vars(r)
// 	movie, err := dao.FindById(params["id"])
// 	if err != nil {
// 		respondWithError(w, http.StatusBadRequest, "Invalid Movie ID")
// 		return
// 	}
// 	respondWithJson(w, http.StatusOK, movie)
// }
//

//
// // DELETE an existing movie
// func DeleteMovieEndPoint(w http.ResponseWriter, r *http.Request) {
// 	defer r.Body.Close()
// 	var movie Movie
// 	if err := json.NewDecoder(r.Body).Decode(&movie); err != nil {
// 		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
// 		return
// 	}
// 	if err := dao.Delete(movie); err != nil {
// 		respondWithError(w, http.StatusInternalServerError, err.Error())
// 		return
// 	}
// 	respondWithJson(w, http.StatusOK, map[string]string{"result": "success"})
// }
//

// respondWithError responds with JSON error
func respondWithError(w http.ResponseWriter, code int, msg string) {
	respondWithJson(w, code, map[string]string{"error": msg})
}

// responseWithJson responds with JSON
func respondWithJson(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET,POST")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}

// init parses the configuration file 'config.toml', and establishes a connection to DB
func init() {
	config.Read()

	dao.Server = config.Server
	dao.Database = config.Database
	dao.Connect()
}

// main defines HTTP request routes
func main() {
	r := mux.NewRouter()
	r.HandleFunc("/heater", AllTempsEndPoint).Methods("GET")
	r.HandleFunc("/heater", CreateTempEndPoint).Methods("POST")
	r.HandleFunc("/targets", AllTargetTempsEndPoint).Methods("GET")
	r.HandleFunc("/targets", CreateTargetTempEndPoint).Methods("POST")
	r.HandleFunc("/targets", UpdateTargetTempEndPoint).Methods("PUT")
	// r.HandleFunc("/movies", DeleteMovieEndPoint).Methods("DELETE")
	// r.HandleFunc("/movies/{id}", FindMovieEndpoint).Methods("GET")
	if err := http.ListenAndServe(":3000", r); err != nil {
		log.Fatal(err)
	}
}
