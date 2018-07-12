$(function () {
    $.get("/statistics",function (data) {
        var infoList=data.split("#");
        new Vue({
            el:"#info",
            data:{
                numOfUsers:infoList[0],
                numOfTasks:infoList[1],
                numOfDoing:infoList[2],
                numOfFinished:infoList[3]
            }
        });
    })
});