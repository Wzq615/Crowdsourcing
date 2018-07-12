/**
 * Created by Leonarda on 2018/4/23.
 */
function register() {
    var username=$('#username').val();
    var password=$('#password').val();
    var password2=$('#password2').val();

    if(password!=password2){
        alert("密码确认错误！");
        $('#password2').val('');
        $('#password2').focus();
    }else if(username==''){
        alert("用户名不可为空！");
        $('#username').focus();
    }else if(password==''){
        alert("密码不可为空！");
        $('#password').focus();
    }else{
        var newUser=new User(username,password,'0','aaa');
        var newUserJson=JSON.stringify(newUser);


        $.ajax({
            type:'POST',
            data:newUserJson,
            contentType:'application/json',
            dataType:'text',
            url:'/registerr',
            success:function (data) {
                if(data=="注册成功！"){
                    window.location.href="/login";
                }else{
                    alert(data);
                }
            },
            error:function(e){
                alert("error");
            }
        });
    }

    function User(username,password,point,taskAddress) {
        this.username=username;
        this.password=password;
        this.point=point;
        this.taskAddress=taskAddress;
    }
}