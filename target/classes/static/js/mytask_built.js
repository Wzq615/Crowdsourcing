/**
 * mxf
 */
$(function(){
    var username;
    $.ajax({
        type:'POST',
        dataType:'text',
        url:'/getUsername',
        async:false,
        success:function(data){
            username=data;
        },
        error:function (e) {
            alert("error!");
        }
    });
    new Vue({
        el:'#user',
        data:{
            username:username
        }
    });

    var user = new User(username,"1","1","1","1","1","1","1");
    var userJson = JSON.stringify(user);
    var tasklist;
    $.ajax({
        type:'POST',
        data: userJson,
        contentType: 'application/json',
        dataType: 'text',
        url:'/checkBuildTasks',
        async:false,
        success:function(data){
            //alert(data);
            if(data==""){
                tasklist=null;
            }else {
                tasklist = data.split('!');
            }
        },
        error:function(e){
            alert('你未发布任务');
        }
    })

    var taskName;
    var taskTag;
    var numOfPart;
    var deadline;
    var built_tasknum = 0;

    if(tasklist==null){
    }else {
        for (x in tasklist) {
            var taskname = tasklist[x];
            //alert(taskname);
            var task = new Task(taskname, '1', '1', '1', '1', '1', '1', '1', '1');
            var taskJson = JSON.stringify(task);
            $.ajax({
                type: 'POST',
                data: taskJson,
                contentType: 'application/json',
                dataType: 'text',
                url: '/checkTaskInformation',
                async: false,
                success: function (data) {
                    var infoList = data.split('#');
                    taskName = infoList[0];
                    taskTag = infoList[2];
                    numOfPart = infoList[6];
                    deadline = infoList[8];
                },
                error: function (e) {
                    alert('error');
                }
            })

            var src;
            $.ajax({//获取任务封面图案
                type: 'POST',
                data: taskJson,
                contentType: 'application/json',
                dataType: 'text',
                url: '/checkTaskImg',
                async: false,
                success: function (data) {
                    src = data.split(" ")[0];
                },
                error: function (e) {
                    alert('error');
                }
            });

            var url = 'taskdetails_requestor/' + taskName;
            $('#myBuiltTaskList').prepend('<li> <a href="' + url + '"> <img class="am-img-thumbnail am-img-bdrs" src="data:image/jpeg;base64,' + src + '" alt=""/> <div class="gallery-title">' + taskTag + '</div> <div class="gallery-desc">参与人数：' + numOfPart + '</div> <div class="gallery-desc">截止：' + deadline + '</div> </a> </li>');

            built_tasknum = built_tasknum + 1;
        }
    }
    new Vue({
        el:'#built_tasknum',
        data: {
            built_tasknum:built_tasknum
        }
    });
});


function User(username, password, point, name, email, phone, description, taskAddress){
    this.username = username;
    this.password = password;
    this.point = point;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.description = description;
    this.taskAddress = taskAddress;
}

function Task(taskname,requestor,tasktag,description,mode,numOfNeeded,numOfPart,point,deadline){
    this.taskname=taskname;
    this.requestor=requestor;
    this.tasktag=tasktag;
    this.description=description;
    this.mode=mode;
    this.numOfNeeded=numOfNeeded;
    this.numOfPart=numOfPart;
    this.point=point;
    this.deadline=deadline;
}