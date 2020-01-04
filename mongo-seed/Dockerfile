FROM mongo

COPY data /data

CMD mongoimport --host mongo --db hymnal --collection songs /data/songs.json
CMD mongoimport --host mongo --db hymnal --collection players /data/players.json
# Add any other collections here