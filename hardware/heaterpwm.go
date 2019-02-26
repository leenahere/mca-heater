package main

import (
        "os"
        "time"
        "github.com/stianeikeland/go-rpio"
)

func main() {
        err := rpio.Open()
        if err != nil {
                os.Exit(1)
        }
        defer rpio.Close()

        pin := rpio.Pin(18)
        pin.Mode(rpio.Pwm)
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
        }
}
