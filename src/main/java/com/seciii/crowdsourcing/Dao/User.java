package com.seciii.crowdsourcing.Dao;

import java.io.File;

/**
 * @author: pis
 * @description: good good study
 * @date: create in 下午8:19 2018/3/29
 */
public class User {

    private String username; //id
    private String password;  //密码
    private String point;  //积分
    private String name;
    private String email;
    private String phone;
    private String description;
    private String taskAddress; //任务地址

    public User(){}
    public User(String username,String password){
        this.username=username;
        this.password=password;
        this.point="0";

        String filename="src/main/java/com/seciii/crowdsourcing/Data/UserTaskIndexList/"+username+".txt";
        try{
            File file=new File(filename);
            if(!file.exists()){
                file.createNewFile();
            }
        }catch (Exception e){
            e.printStackTrace();
        }

        this.taskAddress=filename;

    }

    public User(String username,
                String password,
                String point,
                String name,
                String email,
                String phone,
                String description,
                String taskAddress){
        this.username=username;
        this.password=password;
        this.point=point;
        this.name=name;
        this.email=email;
        this.phone=phone;
        this.description=description;
        this.taskAddress=taskAddress;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public String getPoint() {
        return point;
    }

    public String getUsername() {
        return username;
    }

    public void setPoint(String point) {
        this.point = point;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getTaskAddress() {
        return taskAddress;
    }

    public void setTaskAddress(String taskAddress) {
        this.taskAddress = taskAddress;
    }
}

