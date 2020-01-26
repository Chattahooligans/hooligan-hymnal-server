#!/bin/sh

mongoimport --host mongo --db hymnal --collection songs /data/songs.json
mongoimport --host mongo --db hymnal --collection players /data/players.json
mongoimport --host mongo --db hymnal --collection users /data/users.json
mongoimport --host mongo --db hymnal --collection pushTokens /data/pushTokens.json
mongoimport --host mongo --db hymnal --collection feedItems /data/feedItems.json
# Add any other collections here