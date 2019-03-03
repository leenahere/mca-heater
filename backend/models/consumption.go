package models

import "gopkg.in/mgo.v2/bson"

type Consumption struct {
	ID        bson.ObjectId `bson:"_id" json:"id"`
	WattHour  int           `bson:"watthour" json:"watthour"`
	Timestamp int           `bson:"timestamp" json:"timestamp"`
}
