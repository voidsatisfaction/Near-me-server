package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"time"
)

type DoorkeeperEvents []DoorkeeperEvent

type DoorkeeperEvent struct {
	Event struct {
		ID           uint32    `json:"id"`
		Title        string    `json:"title"`
		StartsAt     time.Time `json:"starts_at"`
		Lat          string    `json:"lat"`
		Long         string    `json:"long"`
		PublicURL    string    `json:"public_url"`
		Participants int       `json:"participants"`
		Waitlisted   int       `json:"waitlisted"`
	} `json:"event"`
}

func DoorkeeperGetEvents(city string, nums int) DoorkeeperEvents {
	key := os.Getenv("DOORKEEPER_KEY")
	fmt.Println("key:", key)
	host := "https://api.doorkeeper.jp/"
	url := host + "events?q=" + city + "&sort=starts_at"

	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Add("Authorization", "Bearer "+key)
	req.Header.Add("Content-Type", "application/json")
	// not parsed
	client := &http.Client{}
	resp, _ := client.Do(req)
	body, _ := ioutil.ReadAll(resp.Body)
	defer resp.Body.Close()

	doorkeeperEvents := DoorkeeperEvents{}
	json.Unmarshal(body, &doorkeeperEvents)
	return doorkeeperEvents
}
