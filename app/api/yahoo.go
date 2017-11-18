package api

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"os"
)

type MyAddress struct {
	ResultSet struct {
		Address []string `json:"Address"`
	} `json:"ResultSet"`
}

func YahooGetLocation(latitude string, longitude string) (string, error) {
	// TODO move this data to conf
	yahooAppID := os.Getenv("YAHOO_APP_KEY")
	resp, err := http.Get("https://map.yahooapis.jp/placeinfo/V1/get?appid=" + yahooAppID + "&lat=" + latitude + "&lon=" + longitude)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var myAddress MyAddress
	json.Unmarshal(body, &myAddress)

	city := myAddress.ResultSet.Address[0]
	return city, nil
}
