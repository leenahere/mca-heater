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

// AllTargetTempsEndPoint gets a list of all target temperatures
func AllDaySettingsEndPoint(w http.ResponseWriter, r *http.Request) {
	daysettings, err := dao.FindDay()
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJson(w, http.StatusOK, daysettings)
}

// CreateTargetTempEndPoint posts a new target temperature
func CreateDaySettingsEndPoint(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var daysettings DayNight
	if err := json.NewDecoder(r.Body).Decode(&daysettings); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	daysettings.ID = bson.NewObjectId()
	if err := dao.InsertDay(daysettings); err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJson(w, http.StatusCreated, daysettings)
}

// UpdateTargetTempEndPoint puts updated information on target temperature
func UpdateDaySettingsEndPoint(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var daysettings DayNight
	if err := json.NewDecoder(r.Body).Decode(&daysettings); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	if err := dao.UpdateDay(daysettings); err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJson(w, http.StatusOK, map[string]string{"result": "success"})
}

func UpdatePartyEndPoint(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var party Party
	if err := json.NewDecoder(r.Body).Decode(&party); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	if err := dao.UpdateParty(party); err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJson(w, http.StatusOK, map[string]string{"result": "success"})
}

func CreatePartyEndPoint(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var party Party
	if err := json.NewDecoder(r.Body).Decode(&party); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	party.ID = bson.NewObjectId()
	if err := dao.InsertParty(party); err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJson(w, http.StatusCreated, party)
}

func CreateCostsEndPoint(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var costs Costs
	if err := json.NewDecoder(r.Body).Decode(&costs); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	costs.ID = bson.NewObjectId()
	if err := dao.InsertCosts(costs); err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJson(w, http.StatusCreated, costs)
}

func CreateCapacitorEndPoint(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var capacitor Capacitor
	if err := json.NewDecoder(r.Body).Decode(&capacitor); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	capacitor.ID = bson.NewObjectId()
	if err := dao.InsertCapacitor(capacitor); err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJson(w, http.StatusCreated, capacitor)
}

func CreateConsumptionEndPoint(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var consumption Consumption
	if err := json.NewDecoder(r.Body).Decode(&consumption); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	consumption.ID = bson.NewObjectId()
	if err := dao.InsertConsumption(consumption); err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJson(w, http.StatusCreated, consumption)
}

func AllPartyEndPoint(w http.ResponseWriter, r *http.Request) {
	party, err := dao.FindParty()
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJson(w, http.StatusOK, party)
}

func AllCostsEndPoint(w http.ResponseWriter, r *http.Request) {
	costs, err := dao.FindCosts()
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJson(w, http.StatusOK, costs)
}

func AllConsumptionEndPoint(w http.ResponseWriter, r *http.Request) {
	consumption, err := dao.FindConsumption()
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJson(w, http.StatusOK, consumption)
}

func AllCapacitorEndPoint(w http.ResponseWriter, r *http.Request) {
	capacitor, err := dao.FindCapacitor()
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJson(w, http.StatusOK, capacitor)
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

func handlePreflight(w http.ResponseWriter, r *http.Request) {
	respondWithJson(w, http.StatusOK, map[string]string{"result": "OK"})
}

// respondWithError responds with JSON error
func respondWithError(w http.ResponseWriter, code int, msg string) {
	respondWithJson(w, code, map[string]string{"error": msg})
}

// responseWithJson responds with JSON
func respondWithJson(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS")
	//w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
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
	r.HandleFunc("/targets", handlePreflight).Methods("OPTIONS")
	r.HandleFunc("/daysettings", handlePreflight).Methods("OPTIONS")
	r.HandleFunc("/party", handlePreflight).Methods("OPTIONS")
	r.HandleFunc("/heater", AllTempsEndPoint).Methods("GET")
	r.HandleFunc("/heater", CreateTempEndPoint).Methods("POST")
	r.HandleFunc("/targets", AllTargetTempsEndPoint).Methods("GET")
	r.HandleFunc("/targets", CreateTargetTempEndPoint).Methods("POST")
	r.HandleFunc("/targets", UpdateTargetTempEndPoint).Methods("PUT")
	r.HandleFunc("/daysettings", AllDaySettingsEndPoint).Methods("GET")
	r.HandleFunc("/daysettings", CreateDaySettingsEndPoint).Methods("POST")
	r.HandleFunc("/daysettings", UpdateDaySettingsEndPoint).Methods("PUT")
	r.HandleFunc("/party", AllPartyEndPoint).Methods("GET")
	r.HandleFunc("/party", CreatePartyEndPoint).Methods("POST")
	r.HandleFunc("/party", UpdatePartyEndPoint).Methods("PUT")
	r.HandleFunc("/costs", AllCostsEndPoint).Methods("GET")
	r.HandleFunc("/costs", CreateCostsEndPoint).Methods("POST")
	r.HandleFunc("/consumption", AllConsumptionEndPoint).Methods("GET")
	r.HandleFunc("/consumption", CreateConsumptionEndPoint).Methods("POST")
	r.HandleFunc("/capacitor", AllCapacitorEndPoint).Methods("GET")
	r.HandleFunc("/capacitor", CreateCapacitorEndPoint).Methods("POST")
	// r.HandleFunc("/movies", DeleteMovieEndPoint).Methods("DELETE")
	// r.HandleFunc("/movies/{id}", FindMovieEndpoint).Methods("GET")
	if err := http.ListenAndServe(":3000", r); err != nil {
		log.Fatal(err)
	}
}
