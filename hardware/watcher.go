package main

import (
        "fmt"
       // "time"
        "os/exec"

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
                fmt.Println("pin: ", pin.Read())
                if(pin.Read()) {
                        pin.Unwatch()
                        fmt.Println("Triggered shutdown")
                        cmd := exec.Command("/bin/sh", "etc/triggershutdown.sh")
                        cmd.Run()
                }
        })

        defer pin.Unwatch()

        fmt.Println("Watching Pin 11...")
	for {
        
        }
}
