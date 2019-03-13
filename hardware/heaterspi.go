package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"time"

	rpio "github.com/stianeikeland/go-rpio"
)

// postNewTempData posts the measured temperature to the restful API. Currently i should be the Volt measured.
//TODO: Function for temperature probably needs some adjustment, depending on data type of i
func postNewTempData(i float64) {
	var temperature float64 = (((10000 / (5 - i)) * i) * (-0.003045)) + 55.45
	jsonData := map[string]string{"temp": strconv.FormatFloat(temperature, 'f', 1, 64), "timestamp": strconv.FormatInt(time.Now().Unix(), 10)}
	jsonValue, _ := json.Marshal(jsonData)
	response, err := http.Post("http://localhost:3000/heater", "application/json", bytes.NewBuffer(jsonValue))
	if err != nil {
		fmt.Printf("The HTTP request failed with error %s\n", err)
	} else {
		data, _ := ioutil.ReadAll(response.Body)
		fmt.Println(string(data))
	}
}

func postNewCapacitorData(i float64) {
	jsonData := map[string]string{"loadingvalue": strconv.FormatFloat(i, 'f', 1, 64), "timestamp": strconv.FormatInt(time.Now().Unix(), 10)}
	jsonValue, _ := json.Marshal(jsonData)
	response, err := http.Post("http://localhost:3000/capacitor", "application/json", bytes.NewBuffer(jsonValue))
	if err != nil {
		fmt.Printf("The HTTP request failed with error %s\n", err)
	} else {
		data, _ := ioutil.ReadAll(response.Body)
		fmt.Println(string(data))
	}
}

func main() {
	if err := rpio.Open(); err != nil {
		log.Println(err)
		return
	}

	defer rpio.Close()

	if err := rpio.SpiBegin(rpio.Spi0); err != nil {
		log.Println(err)
		return
	}

	rpio.SpiSpeed(1000000)
	rpio.SpiChipSelect(0)
	//TODO: Ticker needs to be adjusted. How often to we want to measure temp?
	ticker := time.NewTicker(time.Millisecond * 1000)

	//change 0 from range 0 to 7 to read from different channels
	//TODO: Somewhere here postNewTempData needs to be called with correct spi value
	channel := byte(0)
	for range ticker.C {
		data := []byte{1, (8 + channel) << 4, 0}

		rpio.SpiExchange(data)

		code := int(data[1]&3)*256 + int(data[2])

		//channels

		if channel == 0 {
			var voltage = float64(code) * (5.0 / 1024.0)
			log.Println(voltage)
			postNewTempData(voltage)
			log.Println(code)
		} else if channel == 1 {
			var voltage = float64(code) * (5.0 / 1024.0)
			postNewCapacitorData(voltage)
			log.Println(code)
		}

		channel = (channel + 1) % 2
	}
	defer rpio.SpiEnd(rpio.Spi0)
}
