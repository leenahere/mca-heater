package main

import (
  "log"
  "time"

  rpio "github.com/stianeikeland/go-rpio"
)

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
  ticker := time.NewTicker(time.Millisecond * 1000)

  //change 0 from range 0 to 7 to read from different channels
  channel := byte(0)
  for range ticker.C {
    data := []byte{1, (8 + channel) << 4, 0}

    rpio.SpiExchange(data)

    code := int(data[1]&3)*256 + int(data[2])
