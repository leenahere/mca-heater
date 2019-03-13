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

const (
	DAYCOLLECTION = "daysettings"
)

const (
	PARTYCOLLECTION = "party"
)

const (
	CAPACITORCOLLECTION = "capacitor"
)

const (
	COSTCOLLECTION = "costs"
)

const (
	CONSUMPTIONCOLLECTION = "consumption"
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

func (m *TempDAO) FindLatest() (Temp, error) {
	var temperature Temp
	err := db.C(COLLECTION).Find(bson.M{}).Sort("-timestamp").Limit(1).One(&temperature)
	return temperature, err
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

// InsertDay inserts daytime settings into database
func (m *TempDAO) InsertDay(daynight DayNight) error {
	err := db.C(DAYCOLLECTION).Insert(&daynight)
	return err
}

// Update updates target temperature in database
func (m *TempDAO) Update(targettemp TargetTemp) error {
	err := db.C(TARGETCOLLECTION).UpdateId(targettemp.ID, &targettemp)
	return err
}

// UpdateDay updates daytime settings in database
func (m *TempDAO) UpdateDay(daynight DayNight) error {
	err := db.C(DAYCOLLECTION).UpdateId(daynight.ID, &daynight)
	return err
}

// FindTargets finds list of all target temperatures
func (m *TempDAO) FindTargets() ([]TargetTemp, error) {
	var targettemps []TargetTemp
	err := db.C(TARGETCOLLECTION).Find(bson.M{}).All(&targettemps)
	return targettemps, err
}

// FindDay finds current daytime settings
func (m *TempDAO) FindDay() (DayNight, error) {
	var daynight DayNight
	err := db.C(DAYCOLLECTION).Find(bson.M{}).One(&daynight)
	return daynight, err
}

func (m *TempDAO) InsertCosts(costs Costs) error {
	err := db.C(COSTCOLLECTION).Insert(&costs)
	return err
}

func (m *TempDAO) InsertCapacitor(capacitor Capacitor) error {
	err := db.C(CAPACITORCOLLECTION).Insert(&capacitor)
	return err
}

func (m *TempDAO) InsertConsumption(consumption Consumption) error {
	err := db.C(CONSUMPTIONCOLLECTION).Insert(&consumption)
	return err
}

func (m *TempDAO) InsertParty(party Party) error {
	err := db.C(PARTYCOLLECTION).Insert(&party)
	return err
}

func (m *TempDAO) FindCosts() ([]Costs, error) {
	var costs []Costs
	err := db.C(COSTCOLLECTION).Find(bson.M{}).All(&costs)
	return costs, err
}

func (m *TempDAO) FindCapacitor() ([]Capacitor, error) {
	var capacitor []Capacitor
	err := db.C(CAPACITORCOLLECTION).Find(bson.M{}).All(&capacitor)
	return capacitor, err
}

func (m *TempDAO) FindConsumption() ([]Consumption, error) {
	var consumption []Consumption
	err := db.C(CONSUMPTIONCOLLECTION).Find(bson.M{}).All(&consumption)
	return consumption, err
}

func (m *TempDAO) FindParty() ([]Party, error) {
	var party []Party
	err := db.C(PARTYCOLLECTION).Find(bson.M{}).All(&party)
	return party, err
}

func (m *TempDAO) UpdateParty(party Party) error {
	err := db.C(PARTYCOLLECTION).UpdateId(party.ID, &party)
	return err
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
