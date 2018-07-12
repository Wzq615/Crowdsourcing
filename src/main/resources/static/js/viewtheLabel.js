/*
 * 加载任务简介及当前批阅的工人、TODO 加载第一张图片
 * TODO 查看上一张
 * TODO 查看下一张
 * TODO 给予积分奖励
 */
$(function () {

    $('#lab').hide();

    var usernameOfRequestor=null;
    var taskname=null;
    var usernameOfWorker=null;

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

    var task=new Task(taskname,'aa','aa','aa','aa','aa','aa','aa','aa');
    var taskJson=JSON.stringify(task);

    var imgBase=null;
    $.ajax({
        type:'POST',
        data:taskJson,
        contentType:'application/json',
        dataType:'text',
        url:'http://127.0.0.1:8080/checkTaskImg',
        async:false,
        success:function (data) {
            imgBase=data.split(" ");
        },
        error:function (e) {
            alert("img error");
        }
    });


    //整合标注
    if(usernameOfWorker==usernameOfRequestor){
        $('#submit').hide();
        $('#comment').hide();
    }



    var taskInformation=null;
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

    var tasktag=taskInformation[2];
    var taskdescription=taskInformation[3];
    var taskmode=taskInformation[4];
    var deadline=taskInformation[8];

    new Vue({
        el:'#taskInfo',
        data:{
            taskTag:tasktag,
            taskMode:taskmode,
            taskDescription:taskdescription,
            taskDeadline:deadline
        }
    })



    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = new Image();
    img.src = 'data:image/jpeg;base64,'+imgBase[0];

    //ctx.globalCompositeOperation="source-over";

    c.width = 750;
    c.height = 550;
    var FitWidth = 750;
    var FitHeight = 550;

    img.onload = function() {
        var _width = img.width;
        var _height = img.height;
        if(_width <= FitWidth && _height <= FitHeight){
            var offset_w = (FitWidth - _width)/2;
            var offset_h = (FitHeight - _height)/2;
            //ctx.drawImage(img, offset_w, offset_h, _width, _height);
            $("#myCanvas").addLayer({
                type:'image',
                source:img,
                x:offset_w,
                y:offset_h,
                width:_width,
                height:_height,
                fromCenter:false,
                index:0
            })
        }
        else {
            if (_width / _height >= FitWidth / FitHeight) {
                if (_width > FitWidth) {
                    img.width = FitWidth;
                    img.height = (_height * FitWidth) / _width;
                }
                else{
                    img.width = _width;
                    img.height = _height;
                }
            }
            else {
                if (_height > FitHeight) {
                    img.height = FitHeight;
                    img.width = (_width * FitHeight) / _height;
                }
                else{
                    img.width = _width;
                    img.height = _height;
                }
            }
            img.width = 750;
            img.height = 550;
            //ctx.drawImage(img, 0, 0, 750, 550);
            $("#myCanvas").addLayer({
                type:'image',
                source:img,
                x:0,
                y:0,
                width:750,
                height:550,
                fromCenter:false,
                index:0
            })
        }
    };


    var labelList=null;
    var tKey=new Taskkey(taskname,usernameOfWorker);
    var keyJson=JSON.stringify(tKey);


    $.ajax({
        type:'POST',
        data:keyJson,
        contentType:'application/json',
        dataType:'text',
        async:false,
        url:'http://127.0.0.1:8080/checkCertainLabel',
        success:function (data) {
            var result="准确率："+data;
            $('#accuracy').html(result);
        },
        error:function (e) {
            alert("error!");
        }
    });

    $.ajax({
        type:'POST',
        data:keyJson,
        contentType:'application/json',
        dataType:'text',
        url:'http://127.0.0.1:8080/loadWorkerFile',
        async:false,
        success:function(data){
            if(data==""){
                labelList=null;
            }else {
                labelList=data.split('#');
            }
            //alert(labelList);
        },
        error:function (e) {
            alert("error!");
        }
    });


    if(labelList==null){
    }
    else{
        var layername=0;
        for(var i=0;i<labelList.length;i++){
            //alert(labelList[i]);
            var jsonLabel=eval('(' + labelList[i] + ')');
            var mode=jsonLabel.type;

            if(mode=='0'){
                $('#lab').show();
                $('#whole').html(jsonLabel.comment);
            }
            else if(mode=='1'){

                var bot=document.getElementById("bottom");
                var layer="layer"+i;
                $("#myCanvas").addLayer({
                    type:'rectangle',
                    fillStyle:'rgb(254,67,101,0.6)',
                    fromCenter:false,
                    x:jsonLabel.startX,
                    y:jsonLabel.startY,
                    width:jsonLabel.width,
                    height:jsonLabel.height
                });
                $("#myCanvas").addLayer({
                    type:'text',
                    text:jsonLabel.comment,
                    fontSize:20,
                    x:jsonLabel.startX,
                    y:jsonLabel.startY,
                    fillStyle:'black',
                    strokeStyle:'black',
                    strokeWidth:1
                });
            }
            else if(mode=='2'){
                var layer;
                var bot=document.getElementById("bottom");
                var dotList=(jsonLabel.dotlist).split('!');
                for(var j=0;j<dotList.length-1;j++){
                    var x1=dotList[j].split(',')[0];
                    var y1=dotList[j].split(',')[1];
                    var x2=dotList[j+1].split(',')[0];
                    var y2=dotList[j+1].split(',')[1];

                    layer="layer"+layername;
                    $("#myCanvas").addLayer({
                        type:'line',
                        layer:true,
                        name:layer,
                        strokeStyle:'black',
                        strokeWidth:1,
                        x1:x1,y1:y1,
                        x2:x2,y2:y2
                    });
                    layername++;
                }
                $("#myCanvas").addLayer({
                    type:'text',
                    text:jsonLabel.comment,
                    fontSize:20,
                    x:dotList[0].split(',')[0],
                    y:dotList[0].split(',')[1],
                    fillStyle:'black',
                    strokeStyle:'black',
                    strokeWidth:1
                });
            }
            else{}

        }
    }

});


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