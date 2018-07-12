/**
 * Created by Leonarda on 2018/4/21.
 */
function login(){

    var username=$('#username').val();
    var password=$('#password').val();
    var user=new User(username,password,'0','aaa');
    if(username == "admin"&&password=="admin"){
        window.location.href="/administrator";
        return;
    }

    var userJson=JSON.stringify(user);
    $.ajax({
        type:'POST',
        data:userJson,
        contentType:'application/json',
        dataType:'text',
        url:'/loginn',
        success:function (data) {
            if(data=="登录成功"){
                window.location.href="/mainpage";
            }else{
                alert(data);
            }
        },
        error:function(e){
            alert("error");
        }


    });

    function User(username,password,point,taskAddress) {
        this.username=username;
        this.password=password;
        this.point=point;
        this.taskAddress=taskAddress;
    }
}

