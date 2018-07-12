/*
* 初始化，显示原有个人信息和头像
* 修改之后的信息和头像的保存
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
        contentType:'application/json',
        dataType:'text',
        url:'/showUserInformation',
        success:function (data) {
            if(data=='no'){
                return;
            }else {
                var infoList=data.split(' ');
                $('#name').val(infoList[1]);
                $('#telephone').val(infoList[2]);
                $('#email').val(infoList[3]);
                $('#description').val(infoList[4]);
            }
        },
        error:function(e){
            alert("error");
        }
    });

    $.ajax({
        type:'POST',
        data:userJson,
        contentType:'application/json',
        dataType:'text',
        url:'/showUserImg',
        success:function (data) {
            if(data=='no') {
                return;
            }else{
                $('#newImage').attr('src',"data:image/jpeg;base64,"+data);
            }
        },
        error:function(e){
            alert("error");
        }
    });
});

function save() {
    saveImageOfUser();
    saveInfoOfUser();
}

function saveImageOfUser() {
    //var form=document.getElementById("imageForm")
    //var formData=new formData(form);
    var formData=new FormData();
    var img_file=document.getElementById("image");

    if(img_file.files.length==0){
        return;
    }


    var fileObj=img_file.files[0];

    var username=null;

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
    alert(username);
    formData.append("classIcon",fileObj);
    formData.append("className",username);

    $.ajax({
        url:"/saveUserImg",
        type:'POST',
        data:formData,
        async:false,
        processData:false,
        contentType:false,
        success:function (data) {
            alert(data);
        },
        error:function (e) {
            alert("error");
        }
    });
}


$('#image').on('change',function () {
    src = window.URL.createObjectURL(this.files[0]);
    $('#newImage').attr('src',src);
})

function saveInfoOfUser() {
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
    var name=$('#name').val();
    var email=$('#email').val();
    var phone=$('#telephone').val();
    var description=$('#description').val();

    if(name==""){
        alert('请输入您的名字');
        $('#name').focus();
        return;
    }
    if(email==""){
        alert('请输入您的邮箱');
        $('#email').focus();
        return;
    }
    if(phone==""){
        alert('请输入您的电话');
        $('#telephone').focus();
        return;
    }
    if(description==""){
        alert('描述不能为空');
        $('#description').focus();
        return;
    }

    var user=new User(username,'aaa','0',name,email,phone,description,'aaa');
    var userJson=JSON.stringify(user);

    $.ajax({
        type:'POST',
        data:userJson,
        contentType:'application/json',
        dataType:'text',
        url:'/saveUserInfo',
        success:function (data) {
            window.location.href="/selfpage";
        },
        error:function(e){
            alert("error");
        }
    });
}

function User(username,password,point,name,email,phone,description,taskAddress) {
    this.username=username;
    this.password=password;
    this.point=point;
    this.name=name;
    this.email=email;
    this.phone=phone;
    this.description=description;
    this.taskAddress=taskAddress;
}