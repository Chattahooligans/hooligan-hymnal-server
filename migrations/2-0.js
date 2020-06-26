db.foes.update( { }, { $rename: { 'create_time': 'createTime', 'update_time': 'updateTime' } } )
db.players.updateMany( { }, { $rename: { 'create_time': 'createTime', 'update_time': 'updateTime' } } )
db.pushtokens.updateMany( { }, { $rename: { 'create_time': 'createTime', 'update_time': 'updateTime' } } )
db.rosters.updateMany( { }, { $rename: { 'create_time': 'createTime', 'update_time': 'updateTime' } } )
db.scheduledtasks.updateMany( { }, { $rename: { 'create_time': 'createTime', 'update_time': 'updateTime' } } )
db.songbooks.updateMany( { }, { $rename: { 'create_time': 'createTime', 'update_time': 'updateTime', 'back_cover': 'backCover', 'front_cover': 'frontCover', 'some_publish_or_expiration_dates': 'somePublishOrExpirationDates', 'songbook_title': 'songbookTitle' } } )
//manually rename chapter_title in your songbook chapters
db.songs.updateMany( { }, { $rename: { 'create_time': 'createTime', 'update_time': 'updateTime', 'delete_local': 'deleteLocal' } } )
db.team.updateMany( { }, { $rename: { 'site_url': 'siteUrl' } } )
