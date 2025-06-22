package main

import (
	"net/http"
	"sync"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan DeviceCommand)
var mu sync.Mutex

// Structs

type DeviceCommand struct {
	DeviceID string `json:"device_id"`
	Command  string `json:"command"`
}

func main() {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST"},
		AllowHeaders: []string{"Origin", "Content-Type"},
	}))

	r.POST("/api/device/control", func(c *gin.Context) {
		var cmd DeviceCommand
		if err := c.BindJSON(&cmd); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		broadcast <- cmd
		c.JSON(http.StatusOK, gin.H{"status": "command sent"})
	})

	r.GET("/ws", func(c *gin.Context) {
		conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
		if err != nil {
			return
		}
		mu.Lock()
		clients[conn] = true
		mu.Unlock()
	})

	go func() {
		for cmd := range broadcast {
			for conn := range clients {
				conn.WriteJSON(cmd)
			}
		}
	}()

	r.Run(":8080")
}
