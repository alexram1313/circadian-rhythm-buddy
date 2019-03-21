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
`POST /circadian`
- Body 
  ```json
    {
        "rates":[
            {
                "hour": 5,
                "heart_rate": 65
            },
            {
                "hour": 5.1,
                "heart_rate": 70
            },
            {
                "hour": 5.2,
                "heart_rate": 69
            },
            {
                "hour": 5.3,
                "heart_rate": 65
            },
            {
                "hour": 5.4,
                "heart_rate": 64
            },
            {
                "hour": 5.5,
                "heart_rate": 57
            },
            {
                "hour": 5.6,
                "heart_rate": 52
            }
        ]
    }
  ```