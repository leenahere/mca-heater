package dao

import (
	"log"

	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	. "mca-heater/backend/models"
)

type TempDAO struct {
	Server   string
	Database string
}

var db *mgo.Database

const (
	// COLLECTION is a MongoDB collection for measured temperatures
	COLLECTION = "heater"
)

const (
	// TARGETCOLLECTION is a MongoDB collection for temperature targets
	TARGETCOLLECTION = "targets"
)

// Connect establishes a connection to database
func (m *TempDAO) Connect() {
	session, err := mgo.Dial(m.Server)
	if err != nil {
		log.Fatal(err)
	}
	db = session.DB(m.Database)
}

// FindAll finds list of temperatures
func (m *TempDAO) FindAll() ([]Temp, error) {
	var temperatures []Temp
	err := db.C(COLLECTION).Find(bson.M{}).All(&temperatures)
	return temperatures, err
}

// Insert inserts temperature into database
func (m *TempDAO) Insert(temperature Temp) error {
	err := db.C(COLLECTION).Insert(&temperature)
	return err
}

// InsertTarget inserts target temperature into database
func (m *TempDAO) InsertTarget(targettemp TargetTemp) error {
	err := db.C(TARGETCOLLECTION).Insert(&targettemp)
	return err
}

// Update updates target temperature in database
func (m *TempDAO) Update(targettemp TargetTemp) error {
	err := db.C(TARGETCOLLECTION).UpdateId(targettemp.ID, &targettemp)
	return err
}

// FindTargets finds list of all target temperatures
func (m *TempDAO) FindTargets() ([]TargetTemp, error) {
	var targettemps []TargetTemp
	err := db.C(TARGETCOLLECTION).Find(bson.M{}).All(&targettemps)
	return targettemps, err
}

// // Find a movie by its id
// func (m *TempDAO) FindById(id string) (Movie, error) {
// 	var movie Movie
// 	err := db.C(COLLECTION).FindId(bson.ObjectIdHex(id)).One(&movie)
// 	return movie, err
// }
//
//
// // Delete an existing movie
// func (m *TempDAO) Delete(movie Movie) error {
// 	err := db.C(COLLECTION).Remove(&movie)
// 	return err
// }
//
