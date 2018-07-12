package com.seciii.crowdsourcing.Dao;

/**
 * @author: pis
 * @description: good good study
 * @date: create in 下午1:25 2018/4/14
 */
public class Taskkey {
    private String taskname;
    private String username;

    public Taskkey(){}
    public Taskkey(String taskname,String username){
        this.taskname=taskname;
        this.username=username;
    }

    public void setTaskname(String taskname) {
        this.taskname = taskname;
    }

    public String getTaskname() {
        return taskname;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }
}
