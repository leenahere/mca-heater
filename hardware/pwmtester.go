package main

import (
	"encoding/json"
	"fmt"
	"gopkg.in/mgo.v2/bson"
	"io/ioutil"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"syscall"
	"time"
)

type Temp struct {
	ID        bson.ObjectId `bson:"_id" json:"id"`
	Temp      string        `bson:"temp" json:"temp"`
	Timestamp string        `bson:"timestamp" json:"timestamp"`
}

type DayNight struct {
	ID       bson.ObjectId `bson:"_id" json:"id"`
	DayStart string        `bson:"daystart" json:"daystart"`
	DayEnd   string        `bson:"dayend" json:"dayend"`
}

type TargetTemp struct {
	ID         bson.ObjectId `bson:"_id" json:"id"`
	TargetTemp string        `bson:"targettemp" json:"targettemp"`
	Mode       string        `bson:"mode" json:"mode"`
}

func getLastMeasuredTemp() float64 {
	response, err := http.Get("http://localhost:3000/heater-latest")
	if err != nil {
		fmt.Printf("The HTTP request failed with error %s\n", err)
	} else {
		data, _ := ioutil.ReadAll(response.Body)
		var latestTemp Temp
		_ = json.Unmarshal([]byte(data), &latestTemp)
		temp, _ := strconv.ParseFloat(latestTemp.Temp, 64)
		return temp
	}

	return 0.0
}

func isDay() bool {
	var currentHour = time.Now().Hour()
	response, err := http.Get("http://localhost:3000/daysettings")
	if err != nil {
		fmt.Printf("The HTTP request failed with error %s\n", err)
	} else {
		data, _ := ioutil.ReadAll(response.Body)
		var daySettings DayNight
		_ = json.Unmarshal([]byte(data), &daySettings)
		start, _ := strconv.Atoi(daySettings.DayStart)
		end, _ := strconv.Atoi(daySettings.DayEnd)

		if start <= end {
			if (currentHour >= start) && (currentHour <= end) {
				return true
			}
		} else {
			if (currentHour >= start) || (currentHour <= end) {
				return true
			}
		}
	}
	return false
}

func getCurrentTarget() float64 {
	response, err := http.Get("http://localhost:3000/targets")
	if err != nil {
		fmt.Printf("The HTTP request failed with error %s\n", err)
	} else {
		data, _ := ioutil.ReadAll(response.Body)
		var targets []TargetTemp
		_ = json.Unmarshal([]byte(data), &targets)

		if isDay() {
			temp, _ := strconv.ParseFloat(targets[1].TargetTemp, 64)
			return temp
		} else {
			temp, _ := strconv.ParseFloat(targets[2].TargetTemp, 64)
			return temp
		}
	}
	return 0.0
}

func cleanup() {
	fmt.Println("cleanup")
}

func main() {
	c := make(chan os.Signal)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-c
		cleanup()
		os.Exit(1)
	}()

	var last = false

	for {
		var current = getCurrentTarget() > getLastMeasuredTemp()

		if last != current {
			fmt.Println("Toggle pin")
		}

		last = current

		time.Sleep(time.Second * 30)
	}
}
