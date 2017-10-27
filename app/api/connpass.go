package api

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"strconv"
	"time"
)

type ConnpassEvents struct {
	ResultNums int             `json:"results_returned"`
	Data       []ConnpassEvent `json:"events"`
}

type ConnpassEvent struct {
	EventId   uint32    `json:"event_id"`
	EventURL  string    `json:"event_url"`
	StartedAt time.Time `json:"started_at"`
	Lat       string    `json:"lat"`
	Lon       string    `json:"lon"`
	Title     string    `json:"title"`
	Address   string    `json:"address"`
	Place     string    `json:"place"`
}

func ConnpassGetEvents(city string, nums int) []ConnpassEvent {
	if nums == 0 {
		nums = 10
	}
	host := "https://connpass.com/api/v1/event/?"
	resp, _ := http.Get(host + "keyword=" + city + "&count=" + strconv.Itoa(nums))
	body, _ := ioutil.ReadAll(resp.Body)
	defer resp.Body.Close()

	var connpassEvents ConnpassEvents
	json.Unmarshal(body, &connpassEvents)
	return connpassEvents.Data
}
