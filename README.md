# Circadian Rhythm Buddy

## Routes

### Update User Info
`POST http://pluto.calit2.uci.edu:8084/v1/userinfo`
- Body 
  ```json
  {
	"age": 41,
	"gender": "male",
	"wake":"07:00",
	"sleep":"20:00"
  }
  ```

### Get Activities
`GET http://pluto.calit2.uci.edu:8084/v1/activities?lat=33.6295&lon=-117.8684`

### Select Activity
`POST http://pluto.calit2.uci.edu:8084/v1/activities/{assetGuid}`

### Insert Heart Rate info
Coming soon