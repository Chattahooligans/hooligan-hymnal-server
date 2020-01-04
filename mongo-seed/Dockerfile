FROM mongo

COPY data /data

CMD mongoimport --host mongo --db hymnal --collection songs /data/songs.json
# Add any other collections here