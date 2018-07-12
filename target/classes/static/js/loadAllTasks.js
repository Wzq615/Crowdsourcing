/**
 * Created by Leonarda on 2018/4/22.
 */
/*
* 对应mainpage.html
*
* 初始化header的用户名
* 加载所有任务，包括图片和任务信息
 */
$(function () {
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

    var user=new User(username,'aaa','0','aaa','aaa','aaa','aaa','aaa');
    var userJson=JSON.stringify(user);

    $.ajax({
        type:'POST',
        data:userJson,
        dataType:'text',
        contentType:'application/json',
        url:'/saveThePerferenceAndGood',
        success:function(data){
            alert(data);
        },
        false:function (e) {
            alert('error');
        }
    });

    var taskdata=null;
    $.ajax({
        type:'POST',
        data:userJson,
        dataType:'text',
        contentType:'application/json',
        url:'/recommendTasks',
        async:false,
        success:function (data) {
            taskdata=data;
        },
        false:function (e) {
            alert('error');
        }
    });
    var tasknum=0;

    var arr=taskdata.split('!');

    if(taskdata.length==0){
        new Vue({
            el:'#tasknum',
            data:{
                tasknum:0
            }
        });
        return;
    }
    else{
        for(var x in arr){
            var infoList=arr[x].split('#');
            var taskname=infoList[0];
            var tasktag=infoList[2];
            var numOfNeeded=infoList[5];
            var numOfPart=infoList[6];
            var deadline=infoList[8];

            var task=new Task(taskname,'aaa','aaa','aaa','aaa','aaa','aaa','aaa','aaa');
            var taskJson=JSON.stringify(task);

            var src;
            $.ajax({//获取任务封面图案
                type:'POST',
                data:taskJson,
                contentType:'application/json',
                dataType:'text',
                url:'/checkTaskImg',
                async:false,
                success:function (data) {
                    src=data.split(" ")[0];
                },
                error:function (e) {
                    alert('error');
                }
            });
            var taskkey=new Taskkey(taskname,username);
            var taskkeyJson=JSON.stringify(taskkey);

            var url='#';
            $.ajax({//判断用户和任务的关系：旁观者、参与者、发布者
                type:'POST',
                data:taskkeyJson,
                contentType:'application/json',
                dataType:'text',
                url:'/judgeRelation',
                async:false,
                success:function (data) {
                    if(data=='0'){//旁观者
                        url='/taskdetails'+'/'+taskname;
                    }else if(data=='2'){//参与者
                        url='/work'+'/'+taskname;
                    }else if(data=='1'){//发布者
                        url='/taskdetails_requestor'+'/'+taskname;
                    }
                },
                error:function (e) {
                    alert('error');
                }
            });
            $('#taskList').append('<li id="app"> <a href="'+url+'"> <img class="am-img-thumbnaill am-img-bdrs" src="data:image/jpeg;base64,'+src+'" alt=""/> <div class="gallery-title">'+tasktag+'</div> <div class="gallery-desc">人数：'+numOfPart+'/'+numOfNeeded+'</div> <div class="gallery-desc">截止：'+deadline+'</div> </a> </li>');

            tasknum=tasknum+1;
        }
    }

    new Vue({
        el:'#tasknum',
        data:{
            tasknum:tasknum
        }
    })
});


function releaseTaskClick() {
    window.location.href="/releaseTask";
}

function Task(taskname,requestor,tasktag,description,mode,numOfNeeded,numOfPart,point,deadline) {
    this.taskname=taskname;//任务ID，由后端自主分配
    this.requestor=requestor;//发起者的username
    this.tasktag=tasktag;//任务名称，由发布任务时填写
    this.description=description;//任务描述
    this.mode=mode;//标注模式
    this.numOfNeeded=numOfNeeded;//需要人数，由发布任务时填写
    this.numOfPart=numOfPart;//参与人数，由后端统计修改
    this.point=point;//积分
    this.deadline=deadline;//截止日期
}

function Taskkey(taskname,username) {
    this.taskname=taskname;
    this.username=username;
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