package models

import "gopkg.in/mgo.v2/bson"

type Temp struct {
	ID        bson.ObjectId `bson:"_id" json:"id"`
	Temp      string        `bson:"temp" json:"temp"`
	Timestamp string        `bson:"timestamp" json:"timestamp"`
}
