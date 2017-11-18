package factory

import (
	"near_me_server/app/api"
	"time"
)

// TODO it should be seperated size and data
type Events struct {
	Data []Event
	Size int
}

// type bySortStartDate []Event
//
// func (es Events) sortEventByStartDateReverse() {
// 	if len(es) == 0 {
// 		return
// 	}
// 	sort.Sort(bySortStartDate(es))
// }

type Event struct {
	EventID   uint32    `json:"event_id"`
	EventURL  string    `json:"event_url"`
	StartedAt time.Time `json:"started_at"`
	Lat       string    `json:"lat"`
	Lon       string    `json:"lon"`
	Title     string    `json:"title"`
	Address   string    `json:"address"`
	Place     string    `json:"place"`
	Site      string    `json:"site"`
}

func (e *Event) ConnpassAssign(ce *api.ConnpassEvent) {
	if ce.StartedAt.Before(time.Now()) {
		return
	}
	e.Title = ce.Title
	e.EventID = ce.EventID
	e.EventURL = ce.EventURL
	e.StartedAt = ce.StartedAt
	e.Lat = ce.Lat
	e.Lon = ce.Lon
	e.Site = "Connpass"
	// ...
}

func (e *Event) DoorkeeperAssign(de *api.DoorkeeperEvent) {
	if de.Event.StartsAt.Before(time.Now()) {
		return
	}
	e.Title = de.Event.Title
	e.EventID = de.Event.ID
	e.EventURL = de.Event.PublicURL
	e.StartedAt = de.Event.StartsAt
	e.Lat = de.Event.Lat
	e.Lon = de.Event.Long
	e.Site = "Doorkeeper"
}

func (e *Event) WillHold() bool {
	return *e != Event{}
}
