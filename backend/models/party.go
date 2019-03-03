package models

import "gopkg.in/mgo.v2/bson"

type Party struct {
	ID      bson.ObjectId `bson:"_id" json:"id"`
	PartyOn bool          `bson:"partyon" json:"partyon"`
}
