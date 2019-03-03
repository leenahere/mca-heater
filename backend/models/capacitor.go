package models

import "gopkg.in/mgo.v2/bson"

type Capacitor struct {
	ID           bson.ObjectId `bson:"_id" json:"id"`
	LoadingValue int           `bson:"loadingvalue" json:"loadingvalue"`
	Timestamp    int           `bson:"timestamp" json:"timestamp"`
}
