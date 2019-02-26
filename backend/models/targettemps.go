package models

import "gopkg.in/mgo.v2/bson"

type TargetTemp struct {
	ID         bson.ObjectId `bson:"_id" json:"id"`
	TargetTemp string        `bson:"targettemp" json:"targettemp"`
	Mode       string        `bson:"mode" json:"mode"`
}
