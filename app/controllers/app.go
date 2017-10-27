package controllers

import (
	"near_me_server/app/api"
	"near_me_server/app/factory"

	"github.com/revel/revel"
)

type App struct {
	*revel.Controller
}

func (c App) Index() revel.Result {
	greeting := "Aloha World"
	return c.Render(greeting)
}

func (c App) Myplace() revel.Result {
	latitude := c.Params.Query.Get("lat")
	longitude := c.Params.Query.Get("lng")

	city := api.YahooGetLocation(latitude, longitude)

	connpassEventNums := 100
	connpassEvents := api.ConnpassGetEvents(city, connpassEventNums)
	events := factory.Events{}

	// add connpass events
	for _, connpassEvent := range connpassEvents {
		event := &factory.Event{}
		event.ConnpassAssign(&connpassEvent)
		if event.WillHold() {
			events.Data = append(events.Data, *event)
		}
	}

	doorkeeperEvents := api.DoorkeeperGetEvents(city, 0)

	// add doorkeeper events
	for _, doorkeeperEvent := range doorkeeperEvents {
		event := &factory.Event{}
		event.DoorkeeperAssign(&doorkeeperEvent)
		if event.WillHold() {
			events.Data = append(events.Data, *event)
		}
	}
	events.Size = len(events.Data)

	return c.RenderJSON(events)
}
