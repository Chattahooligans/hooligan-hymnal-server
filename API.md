
### Notifications

#### Notification Schema
{
  sender: String, `//sender name`
  send_time: String, `//time sent`
  expire_time: String, `//expiry time`
  sender_latitude: String, `//sender latitude`
  sender_longitude: String,  `//sender longitude`
  message: String, `//message for notification`
  push: Boolean, `//determines whether to send the notification`
  song: songSchema `//song object to be sent in the notification`
}

##### /api/notifications/
* GET => this method returns all notifications from the database

##### /api/notifications/last
* GET => returns only the most recent notification from the database

##### /api/notification
* POST => creates a notification. if `push` is true, then this sends a notification to all pushTokens stored in the database. otherwise, the notificaiton is just written to the database.

##### /api/notification/:id
* GET => this method returns a single notification form the database with the matching `id`.
* DELETE => this method deletes a single notification from the database with the matching `id`.
* PUT => this method updates a single notification from the database with the matching `id`.



### Push Tokens

#### Push Token Schema
{
  pushToken: String, `//pushToken string`
  lastUsed: String `//current date string`
}

##### /api/pushToken
* GET => this method returns all pushTokens from the database
* POST => this method creates a new pushToken. if the token already exists in the database, it simply updates the existing item with the correct `lastUsed` time




### Songs

#### Song Schema
{
  category: String,
  delete_local: String,
  instructions: String,
  is_nisa_player: Boolean,
  is_npsl_player: Boolean,
  is_wpsl_player: Boolean,
  lyrics: String,
  override_html: String,
  player_name: String,
  player_number: String,
  reference_link: String,
  reference_title: String,
  tags: String,
  tbd_various_boolean_flags: String,
  title: String
}, {
  timestamps: {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  }
}

##### /api/songs
* GET => returns all songs from the database

##### /api/song
* POST => this method creates a new song and saves it to the database

##### /api/song/:id
* GET => returns a single song from the database with the same `id`
* PUT => updates a single song in the database with the same `id`
* DELETE => deletes a single song on the database with the same `id`




### Players

#### Player Schema
{
  name: String,
  squad_number: Number,
  position: String,
  teams: [{ type: ObjectId, ref: 'Team' }],
  bio: String,
  image_thumbnail: String,
  image: String,
  image_hash: String
}, {
  timestamps: {
    createdAt: 'create_time',
    updatedAt: 'update_time'
  }
}

##### /api/players
* GET => returns all players from the database

##### /api/player
* POST => this method creates a new player and saves it to the database

##### /api/player/:id
* GET => returns a single player from the database with the same `id`
* PUT => updates a single player in the database with the same `id`
* DELETE => deletes a single player on the database with the same `id`
