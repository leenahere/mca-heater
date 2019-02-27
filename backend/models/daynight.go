package models

import "gopkg.in/mgo.v2/bson"

type DayNight struct {
	ID       bson.ObjectId `bson:"_id" json:"id"`
	DayStart string        `bson:"daystart" json:"daystart"`
	DayEnd   string        `bson:"dayend" json:"dayend"`
}
