package models

import "gopkg.in/mgo.v2/bson"

type Costs struct {
	ID        bson.ObjectId `bson:"_id" json:"id"`
	Costs     string        `bson:"cost" json:"cost"`
	Timestamp string        `bson:"timestamp" json:"timestamp"`
}
