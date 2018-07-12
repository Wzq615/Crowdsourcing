/*
* 初始化任务信息、参与者列表:参与者点击跳转至查看参与者的标注情况
* TODO 关闭任务响应
 */

$(function () {
    var username;
    var taskname;

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

    //加载任务信息
    var task=new Task(taskname,'aaa','aaa','aaa','aaa','aaa','aaa','aaa','aaa');
    var taskJson=JSON.stringify(task);
    $.ajax({
        type:'POST',
        data:taskJson,
        contentType:'application/json',
        dataType:'text',
        url:'/checkTaskInformation',
        success:function (data) {
            var infoList=data.split("#");
            new Vue({
                el:"#info",
                data:{
                    requester:infoList[1],
                    taskName:infoList[2],
                    mode:infoList[4],
                    numOfNeeded:infoList[5],
                    numOfPart:infoList[6],
                    point:infoList[7],
                    deadline:infoList[8],
                    kindOfTask:infoList[9]
                }
            });
        },
        error:function(e){
            alert("error");
        }
    });


    // //添加整合框列表
    // var integrationUrl='TaskView/'+taskname+'/'+username;
    // $('#workerList').prepend('<li> <a href="'+integrationUrl+'"> <img class="am-img-thumbnail am-img-bdrs" src="data:image/jpeg;base64,'+src+'" alt="http://s.amazeui.org/media/i/demos/bw-2014-06-19.jpg?imageView/1/w/200/h/200/q/80"/> <div class="gallery-title">整合结果</div> </a> </li>');


    var imageList;
    //加载任务封面
    $.ajax({
        type:'POST',
        data:taskJson,
        contentType:'application/json',
        dataType:'text',
        url:'/checkTaskImg',
        async:false,
        success:function (data) {
            imageList=data.split(" ");
            $('#cover').attr("src","data:image/jpeg;base64,"+imageList[0]);
        },
        error:function(e){
            alert("error");
        }
    });

    //加载参与者列表
    $.ajax({
        type:'POST',
        data:taskJson,
        contentType:'application/json',
        dataType:'text',
        url:'/checkAllWorker',
        success:function (data) {
            if(data==""){
                $('#description').html('当前没有参与者。');
                return;
            }
            //添加整合框列表
            var integrationUrl='/TaskView/'+taskname+'/'+username;
            $('#workerList').prepend('<li> <a href="'+integrationUrl+'"> <img class="am-img-thumbnail am-img-bdrs" src="data:image/jpeg;base64,'+imageList[0]+'" alt="http://s.amazeui.org/media/i/demos/bw-2014-06-19.jpg?imageView/1/w/200/h/200/q/80"/> <div class="gallery-title">整合结果</div> </a> </li>');

            var workList=data.split('#');
            for(var x in workList){
                var usernameOfWorker=workList[x];
                var src=imageList[0];
                var url='/TaskView'+'/'+taskname+'/'+usernameOfWorker;

                $('#workerList').prepend('<li> <a href="'+url+'"> <img class="am-img-thumbnail am-img-bdrs" src="data:image/jpeg;base64,'+src+'" alt="http://s.amazeui.org/media/i/demos/bw-2014-06-19.jpg?imageView/1/w/200/h/200/q/80"/> <div class="gallery-title">'+usernameOfWorker+'</div> </a> </li>');
            }
        },
        error:function (e) {
            alert('error');
        }
    });

});


function closeTask() {
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

    var task=new Task(taskname,'aaa','aaa','aaa','aaa','aaa','aaa','aaa','aaa');
    var taskJson=JSON.stringify(task);
    $.ajax({
        type:'POST',
        data:taskJson,
        contentType:'application/json',
        dataType:'text',
        url:'/closeTask',
        success:function (data) {
            alert(data);
        },
        error:function(e){
            alert("error");
        }
    });


}

function Task(taskname,requestor,tasktag,description,mode,numOfNeeded,numOfPart,point,deadline) {
    this.taskname=taskname;//任务ID，由后端自主分配
    this.requestor=requestor;//发起者的username
    this.tasktag=tasktag;//任务名称，由发布任务时填写
    this.description=description;//任务描述
    this.mode=mode;//标注模式
    this.numOfNeed=numOfNeeded;//需要人数，由发布任务时填写
    this.numOfPart=numOfPart;//参与人数，由后端统计修改
    this.point=point;//积分
    this.deadline=deadline;//截止日期，格式为xxxx-xx-xx
}

function User(username,password,point,name,email,phone,description,taskAddress) {
    this.username = username;
    this.password = password;
    this.point = point;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.description = description;
    this.taskAddress = taskAddress;
}