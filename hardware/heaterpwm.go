package main

import (
	"encoding/json"
	"fmt"
	"github.com/stianeikeland/go-rpio"
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

type Party struct {
	ID      bson.ObjectId `bson:"_id" json:"id"`
	PartyOn bool          `bson:"partyon" json:"partyon"`
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

		if isParty() {
			return true
		}

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

func isParty() bool {
	response, err := http.Get("http://localhost:3000/party")
	if err != nil {
		fmt.Printf("The HTTP request failed with error %s\n", err)
	} else {
		data, _ := ioutil.ReadAll(response.Body)
		var party Party
		_ = json.Unmarshal([]byte(data), &party)
		return party.PartyOn
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

func main() {
	err := rpio.Open()
	if err != nil {
		os.Exit(1)
	}
	defer rpio.Close()

	pin := rpio.Pin(18)

	pin.Output()

	c := make(chan os.Signal)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-c
		fmt.Println("Interrupt, set low")
		pin.Low()
		os.Exit(1)
	}()

	for {
		if getCurrentTarget() > getLastMeasuredTemp() {
			pin.High()
		} else {
			pin.Low()
		}

		time.Sleep(time.Second * 30)
	}

	/*pin.Toggle()
	        time.Sleep(time.Second)
		pin.Toggle()
	        time.Sleep(time.Second)
		pin.Toggle()
	        time.Sleep(time.Second)*/

	/*pin.Mode(rpio.Pwm)
	  pin.Freq(64000)
	  pin.DutyCycle(0, 256)
	  // the LED will be blinking at 2000Hz
	  // (source frequency divided by cycle length => 64000/32 = 2000)

	  // five times smoothly fade in and out
	  for true {
	          for i := uint32(0); i < 256; i++ { // increasing brightness
	                  pin.DutyCycle(i, 256)
	                  time.Sleep(time.Second/256)
	          }
	          for i := uint32(256); i > 0; i-- { // decreasing brightness
	                  pin.DutyCycle(i, 256)
	                  time.Sleep(time.Second/256)
	          }
	  }*/
}
