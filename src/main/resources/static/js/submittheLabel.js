/**
 * Created by Leonarda on 2018/5/26.
 */
function submittheLabel(){

    savetheLabel();

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

    var formdata=new FormData();

    formdata.append("username",username);
    formdata.append("taskname",taskname);

    $.ajax({
        url:"/submittheLabel",
        type:'POST',
        data:formdata,
        async:false,
        processData:false,
        contentType:false,
        success:function (data) {
            alert("success");
        },
        error:function (e) {
            alert("error");
        }
    });

}