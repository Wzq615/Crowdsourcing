/**
 * Created by Leonarda on 2018/5/23.
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
            // $("#myCanvas").drawImage({
            //     source:img,
            //     fromCenter:false,
            //     x:offset_w,
            //     y:offset_h
            // });
            $("#myCanvas").addLayer({
                type:'image',
                source:img,
                name:'img',
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
            // $("#myCanvas").drawImage({
            //     source:img,
            //     fromCenter:false,
            //     x:0,
            //     y:0
            // })
            $("#myCanvas").addLayer({
                type:'image',
                source:img,
                name:'img',
                x:0,
                y:0,
                width:750,
                height:550,
                fromCenter:false,
                index:0
            })
        }
    };

    //显示之前保存的标注
    var labelList=null;
    var tKey=new Taskkey(taskname,username);
    var keyJson=JSON.stringify(tKey);
    $.ajax({
        type:'POST',
        data:keyJson,
        contentType:'application/json',
        dataType:'text',
        url:'http://127.0.0.1:8080/loadTemporaryFile',
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

    // //清除临时文件的标注
    // $.ajax({
    //     type:'POST',
    //     data:keyJson,
    //     contentType:'application/json',
    //     dataType:'text',
    //     url:'http://127.0.0.1:8080/clearTheLabel',
    //     success:function (data) {
    //         alert(data);
    //     },
    //     error:function (e) {
    //         alert("clearTheLabel");
    //     }
    // })


    if(labelList==null){
    }
    else{
        var layername=0;
        for(var i=0;i<labelList.length;i++){
            //alert(labelList[i]);
            var jsonLabel=eval('(' + labelList[i] + ')');
            var mode=jsonLabel.type;

            if(mode=='0'){
                setLayers(labelList.length);
                CanvasExt.drawWholeLabel();
                $('#description').text(jsonLabel.comment);
            }
            else if(mode=='1'){

                var bot=document.getElementById("bottom");
                var layer="layer"+i;
                $("#myCanvas").addLayer({
                    type:'rectangle',
                    fillStyle:'rgb(254,67,101,0.6)',
                    name:layer,
                    fromCenter:false,
                    x:jsonLabel.startX,
                    y:jsonLabel.startY,
                    width:jsonLabel.width,
                    height:jsonLabel.height
                });

                var text=document.createElement("textarea");
                bot.appendChild(text);
                text.id=layer;
                text.left=jsonLabel.startX;
                text.top=jsonLabel.startY;
                text.innerHTML=jsonLabel.comment;
                //text.style.background='transparent';
                text.height=2;
                text.width=10;

            }
            else if(mode=='2'){
                var color="#000000";
                var width=2+'px';

                var layer;
                var bot=document.getElementById("bottom");
                alert(jsonLabel.dotlist);
                var dotList=(jsonLabel.dotlist).split('!');
                for(var j=0;j<dotList.length-1;j++){
                    var x1=dotList[j].split(',')[0];
                    var y1=dotList[j].split(',')[1];
                    var x2=dotList[j+1].split(',')[0];
                    var y2=dotList[j+1].split(',')[1];

                    layer="layer"+layername;
                    $("#myCanvas").drawLine({
                        layer:true,
                        name:layer,
                        strokeStyle:color,
                        strokeWidth:width,
                        x1:x1,y1:y1,
                        x2:x2,y2:y2
                    });
                    layername++;
                }

                var text=document.createElement("textarea");
                bot.appendChild(text);
                text.id=layer;
                text.left=jsonLabel.startX;
                text.top=jsonLabel.startY;
                text.innerHTML=jsonLabel.comment;
                //text.style.background='transparent';
                text.height=2;
                text.width=10;
            }
            else{}

        }
    }

    //工作界面敲定
    if(taskmode=="整体标注"){
        CanvasExt.drawWholeLabel();
    }
    else if(taskmode=="方框标注"){
        if(labelList==null){
            setLayers(0);
        }else{
            setLayers(labelList.length);
        }
        CanvasExt.drawSquareLabel();
    }
    else if(taskmode=="局部标注"){
        if(labelList==null){
            setLayers(0);
        }else{
            setLayers(labelList.length);
        }
        CanvasExt.drawCurveLabel();
    }
    else{}

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
