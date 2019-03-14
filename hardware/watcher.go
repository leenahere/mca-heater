package main

import (
        "fmt"
	"os"
	"os/signal"
	"syscall"
        //"time"
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

	c := make(chan os.Signal)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-c
		fmt.Println("Unwatch pin")
		pin.Unwatch()
		os.Exit(1)
	}()

	for {
        pin.Watch(gpio.EdgeBoth, func(pin *gpio.Pin) {
                fmt.Println("pin: ", pin.Read())
                if(pin.Read()) {
                        fmt.Println("Triggered shutdown")
                       	cmd := exec.Command("/bin/sh", "/etc/triggershutdown.sh")
                        err := cmd.Run()
			if err != nil {
    				fmt.Println("something bad happened: ", err)
			}
                }
        })
	}

        fmt.Println("Watching Pin 11...")
}
