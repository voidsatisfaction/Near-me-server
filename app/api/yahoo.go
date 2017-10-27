package api

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
)

type MyAddress struct {
	ResultSet struct {
		Address []string `json:"Address"`
	} `json:"ResultSet"`
}

func YahooGetLocation(latitude string, longitude string) string {
	// TODO move this data to conf
	yahooAppID := "dj00aiZpPUFuRWxDTE5rZFBBayZzPWNvbnN1bWVyc2VjcmV0Jng9MmE-"
	resp, _ := http.Get("https://map.yahooapis.jp/placeinfo/V1/get?appid=" + yahooAppID + "&lat=" + latitude + "&lon=" + longitude)
	body, _ := ioutil.ReadAll(resp.Body)
	defer resp.Body.Close()

	var myAddress MyAddress
	json.Unmarshal(body, &myAddress)

	city := myAddress.ResultSet.Address[0]
	return city
}
