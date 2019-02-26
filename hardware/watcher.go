package main

import (
        "fmt"
        "time"

        "github.com/warthog618/gpio"
)

func main() {
        err := gpio.Open()
        if err != nil {
                panic(err)
        }
        defer gpio.Close()
        pin := gpio.NewPin(gpio.J8p11)
        pin.Input()
        pin.PullUp()
        pin.Watch(gpio.EdgeBoth, func(pin *gpio.Pin) {
                fmt.Printf("pin: %v", pin.Read())
        })

        defer pin.Unwatch()

        fmt.Println("Watching Pin 7...")
        time.Sleep(time.Minute)
}
