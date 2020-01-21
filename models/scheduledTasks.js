var mongoose = require('mongoose');
var scheduledTasksSchema = require('./schemas/scheduledTasksSchema');
var ScheduledTasks = mongoose.model('scheduledTasks', scheduledTasksSchema);
var schedule = require('node-schedule');

function scheduleNewsPost(task, skipPersistence) {
    //we don't want server startup to re-save scheduled tasks,
    //so we provide an override. call without setting skipPersistence
    //to save to the DB as expected
    if(!skipPersistence) {
        task.completed = false;
        task.type = "newspost";
        saveTask(task);
    }
    //run npm-schedule
    var j = schedule.scheduleJob(task.triggerAt, function(){
        handleNewsPost(task);
    });
}

function handleNewsPost(task) {
    //NEWS LOGIC GOES HERE
    cleanupTask(task);
}

function saveTask(task) {
    var newTask = ScheduledTasks(task);
    newTask.save((error, foe) => {
        if(error) console.log("Failed to save scheduled task!");
    });
}

function cleanupTask(task) {
    task.Completed = true;
    saveTask(task);
}

function loadAllScheduledTasks() {
    //load from mongoose
    ScheduledTasks.find((error, tasks) => {
        if (error) {
          console.log("Error loading scheduled tasks!");
        }
        for(task of tasks) {
            if(task.completed) continue;
            var currentTime = new Date();
            if(task.triggerAt < currentTime) {
                //set to trigger in the past- we missed this one
                switch(task.type) {
                    case 'newspost':
                        handleNewsPost(task)
                        break;
                }
            } else {
                switch(task.type) {
                    case 'newspost':
                        scheduleNewsPost(task, true)
                        break;
                }
            }
        }
    });
}

module.exports = { loadAllScheduledTasks, scheduleNewsPost };
  