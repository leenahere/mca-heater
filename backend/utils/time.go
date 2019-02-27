package main

import (
	"fmt"
	"strconv"
	"time"
)

func main() {
	fmt.Println(strconv.FormatInt(time.Now().Unix(), 10))
}
