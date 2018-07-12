/**
 * Created by Leonarda on 2018/4/27.
 */
/*
* 发布任务，包括保存任务图片和信息 TODO 关于参与人数、积分、截止日期的输入规范问题未解决
* TODO html界面调整
 */

$(function () {
    var username;

    $.ajax({
        type:'POST',
        dataType:'text',
        url:'http://127.0.0.1:8080/getUsername',
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

    var date=new Date();
    $('#deadline').attr('min',date);
})

//即时显示上传的图片
$('#image').on('change',function () {
    $('#showPic').empty();
    var fileObj = document.getElementById("image");
    var fileList = fileObj.files;
    for(var i=0;i<fileList.length;i++){
        var src = window.URL.createObjectURL(this.files[i]);
        $('#showPic').prepend('<li> <img class="am-img-thumbnail am-img-bdrs" src="'+src+'" alt="failed" width="1000"/> </li>');
    }
})


function release() {
    if(saveImagesOfTask()==0){
        return;
    }
    saveInfoOfTask();
}


function saveImagesOfTask() {
    var img_file=document.getElementById("image");
    var fileList=img_file.files;

    if(img_file.files.length==0){
        alert("请上传至少一张图片");
        return 0;
    }

    for(var i=0;i<fileList.length;i++) {
        var formData=new FormData();
        var fileObj=img_file.files[0];
        formData.append("taskImg",fileObj);
        formData.append("imgName",i);

        $.ajax({
            url:"http://127.0.0.1:8080/releaseTaskImg",
            type:'POST',
            data:formData,
            async:false,
            processData:false,
            contentType:false,
            success:function (data) {
                return 1;
            },
            error:function (e) {
                alert("error");
                return 0;
            }
        });
    }
}

function saveInfoOfTask(){
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
    var taskname=$('#taskname').val();
    var mode=$('#mode').val();
    var numOfNeeded=$('#numofneed').val();
    var point=$('#point').val();
    var deadline=$('#deadline').val();
    var description=$('#description').val();
    var type=$('#type').val();
    var labels=$('#labels').val();

    if(taskname==""){
        alert('请输入任务名称');
        $('#taskname').focus();
        return;
    }
    if(numOfNeeded==""){
        alert('请输入需要人数');
        $('#numofneed').focus();
        return;
    }
    if(point==""){
        alert('请输入奖励分数');
        $('#point').focus();
        return;
    }
    if(deadline==""){
        alert('请输入截止日期');
        $('#deadline').focus();
        return;
    }
    if(description==""){
        alert('描述不能为空');
        $('#description').focus();
        return;
    }

    var task=new Task('aaa',username,taskname,description,mode,numOfNeeded,'aaa',point,deadline,type,labels);
    var taskJson=JSON.stringify(task);

    $.ajax({
        type:'POST',
        data:taskJson,
        contentType:'application/json',
        dataType:'text',
        url:'/releaseTaskInfo',
        success:function (data) {
            window.location.href="/mainpage";
            alert("发布成功");
        },
        error:function(e){
            alert("error");
        }
    });
}

function Task(taskname,requestor,tasktag,description,mode,numOfNeeded,numOfPart,point,deadline,type,labels) {
    this.taskname=taskname;//任务ID，由后端自主分配
    this.requestor=requestor;//发起者的username
    this.tasktag=tasktag;//任务名称，由发布任务时填写
    this.description=description;//任务描述
    this.mode=mode;//标注模式
    this.numOfNeeded=numOfNeeded;//需要人数，由发布任务时填写
    this.numOfPart=numOfPart;//参与人数，由后端统计修改
    this.point=point;//积分
    this.deadline=deadline;//截止日期
    this.type=type;
    this.labels=labels;
}