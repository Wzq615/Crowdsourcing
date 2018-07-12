package com.seciii.crowdsourcing.Controller;

import com.seciii.crowdsourcing.Dao.Task;
import com.seciii.crowdsourcing.Dao.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;

/**
 * @author: pis
 * @description: good good study
 * @date: create in 上午11:49 2018/5/14
 */

@Controller
public class UrlController {


    static User user=new User();
    static Task task=new Task();
    static User worker=new User();

    //判断是否已登录
    boolean haveLoggedIn(){
        if(user.getUsername()!=null)
            return true;
        else
            return false;
    }

    //进入平台
    @RequestMapping(value="/")
    public String index(){
        if(haveLoggedIn())
            return "mainpage";
        return "login";

    }

    //进入“登录”界面
    @RequestMapping(value="/login")
    public String login(){
        return "login";
    }

    //登录后，进入“主页”
    @RequestMapping(value="/mainpage")
    public String mainpage(){
        if(haveLoggedIn())
            return "mainpage";
        return "login";
    }

    //访问“我发布的任务”
    @RequestMapping(value="/mytask_built")
    public String mytask_built(){
        if(haveLoggedIn())
            return "mytask_built";
        return "login";
    }

    //访问“我参与的任务”
    @RequestMapping(value="/mytask_joined")
    public String mytask_joined(){
        if(haveLoggedIn())
            return "mytask_joined";
        return "login";
    }

    //“注册”新用户
    @RequestMapping(value="/register")
    public String register(){
        user=new User();
        return "register";
    }

    //访问“发布任务”
    @RequestMapping(value="/releaseTask")
    public String releaseTask(){
        if(haveLoggedIn())
            return "releaseTask";
        return "login";
    }

    //查看“个人主页”
    @RequestMapping(value="/selfpage")
    public String selfpage(){
        if(haveLoggedIn())
            return "selfpage";
        return "login";
    }

    //“编辑个人主页”
    @RequestMapping(value="/selfpageeditor")
    public String selfpageeditor(){
        if(haveLoggedIn())
            return "selfpageeditor";
        return "login";
    }

    //以旁观者的身份查看“任务详细信息”
    @RequestMapping(value="/taskdetails/{taskname}")
    public String taskdetails(@PathVariable("taskname") String taskname){
        if(haveLoggedIn()){
            task.setTaskname(taskname);
            return "taskdetails";
        }
        return "login";
    }

    //以发起者的身份查看“任务详细信息”
    @RequestMapping(value="/taskdetails_requestor/{taskname}")
    public String taskdetails_requestor(@PathVariable("taskname") String taskname){
        if(haveLoggedIn()){
            task.setTaskname(taskname);
            TaskController tc=new TaskController();
            try{
                tc.integration();
            }catch (IOException e){
                e.printStackTrace();
            }
            return "taskdetails_requestor";
        }
        return "login";
    }

    //发起者“批阅”工人标注
    @RequestMapping(value="/TaskView/{taskname}/{usernameOfWorker}")
    public String taskView(@PathVariable("taskname") String taskname,@PathVariable("usernameOfWorker") String usernameOfWorker){
        if(haveLoggedIn()){
            task.setTaskname(taskname);
            worker.setUsername(usernameOfWorker);
            return "TaskView";
        }
        return "login";
    }

    //标注工作区
    @RequestMapping(value="/work/{taskname}")
    public String work(@PathVariable("taskname") String taskname){
        if(haveLoggedIn()) {
            if(taskname!=null)
                task.setTaskname(taskname);
            return "work";
        }
        return "login";
    }

    //退出登录
    @RequestMapping(value="/logout")
    public String logout(){
        user=new User();
        return "login";
    }

    //系统管理员
    @RequestMapping(value="/administrator")
    public String administrator(){
        return "administrator";
    }
}
