#!/bin/sh

mongoimport --host mongo --db hymnal --collection songs /data/songs.json
mongoimport --host mongo --db hymnal --collection players /data/players.json
# Add any other collections here