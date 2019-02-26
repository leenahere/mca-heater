package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"strconv"
)

func main() {
	var timestamp = 1546300810
	var end = 1551139200

	for timestamp < end {
		fmt.Println("Starting the application...")
		response, err := http.Get("http://localhost:3000/heater")
		if err != nil {
			fmt.Printf("The HTTP request failed with error %s\n", err)
		} else {
			data, _ := ioutil.ReadAll(response.Body)
			fmt.Println(string(data))
		}
		var newTime = timestamp + 10
		var newTemp = rand.Float64()*(23.5-15.5) + 15.5
		jsonData := map[string]string{"temp": strconv.FormatFloat(newTemp, 'f', 1, 64), "timestamp": strconv.Itoa(newTime)}
		jsonValue, _ := json.Marshal(jsonData)
		response, err = http.Post("http://localhost:3000/heater", "application/json", bytes.NewBuffer(jsonValue))
		if err != nil {
			fmt.Printf("The HTTP request failed with error %s\n", err)
		} else {
			data, _ := ioutil.ReadAll(response.Body)
			fmt.Println(string(data))
		}
		fmt.Println("Terminating the application...")
		timestamp += 900
	}

}
