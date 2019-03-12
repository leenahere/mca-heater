package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	//"strconv"
)

func main() {
	var loadingValue int = 0
	//var timestamp = 1552310100
	var timestamp = 1552310520
	//var end = 1552310520
	var end = 1552311000

	for timestamp < end {
		fmt.Println("Starting the application...")
		response, err := http.Get("http://localhost:3000/capacitor")
		if err != nil {
			fmt.Printf("The HTTP request failed with error %s\n", err)
		} else {
			data, _ := ioutil.ReadAll(response.Body)
			fmt.Println(string(data))
		}
		var newTime = timestamp + 10
		fmt.Println("Loading value: ", loadingValue)
		//var newLoadingValue int = loadingValue
		var newLoadingValue int = rand.Intn(85-79) + 79
		fmt.Println("new loading value: ", newLoadingValue)
		jsonData := map[string]int{"loadingvalue": newLoadingValue, "timestamp": newTime}
		jsonValue, errorr := json.Marshal(jsonData)
		fmt.Println(errorr)
		response, err = http.Post("http://localhost:3000/capacitor", "application/json", bytes.NewBuffer(jsonValue))
		if err != nil {
			fmt.Printf("The HTTP request failed with error %s\n", err)
		} else {
			data, _ := ioutil.ReadAll(response.Body)
			fmt.Println(string(data))
		}
		fmt.Println("Terminating the application...")
		loadingValue += 2
		timestamp += 10
		fmt.Println("Loading value: %d", loadingValue)
	}

}
