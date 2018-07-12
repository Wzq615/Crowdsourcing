/**
 * Created by Leonarda on 2018/6/3.
 */
function givethePoint() {
    var usernameOfRequestor;
    $.ajax({
        type:'POST',
        dataType:'text',
        url:'/getUsername',
        async:false,
        success:function(data){
            usernameOfRequestor=data;
        },
        error:function (e) {
            alert("error!");
        }
    });
    var taskname;
    $.ajax({
        type:'POST',
        dataType:'text',
        url:'/getTaskname',
        async:false,
        success:function(data){
            taskname=data;
        },
        error:function (e) {
            alert("error!");
        }
    });
    var usernameOfWorker;
    $.ajax({
        type:'POST',
        dataType:'text',
        url:'/getUsernameOfWorker',
        async:false,
        success:function(data){
            usernameOfWorker=data;
        },
        error:function (e) {
            alert("error!");
        }
    });

    var taskInformation=null;
    var task=new Task(taskname,'aa','aa','aa','aa','aa','aa','aa','aa');
    var taskJson=JSON.stringify(task);
    $.ajax({
        type:'POST',
        data:taskJson,
        contentType:'application/json',
        dataType:'text',
        url:'http://127.0.0.1:8080/checkTaskInformation',
        async:false,
        success:function (data) {
            taskInformation=data.split('#');
        },
        error:function (e) {
            alert("info error");
        }
    });

    var taskPoint=taskInformation[7];

    var formData=new FormData();
    formData.append('username',usernameOfWorker);
    formData.append('point', taskPoint);

    $.ajax({
        url:"/giveThePoint",
        type:'POST',
        data:formData,
        async:false,
        processData:false,
        contentType:false,
        success:function (data) {
            alert("给予积分成功");
        },
        error:function (e) {
            alert("error");
        }

    });
}

function Taskkey(taskname,username) {
    this.taskname=taskname;
    this.username=username;
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
