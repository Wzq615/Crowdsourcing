package com.seciii.crowdsourcing.Dao;

/**
 * @author: pis
 * @description: good good study
 * @date: create in 下午4:07 2018/4/8
 */
public class SquareLabel {
    private String type;
    private String startX;
    private String startY;
    private String width;
    private String height;
    private String comment;
    private String taskname;
    private String username;

    public SquareLabel(){}

    public SquareLabel(String type,String startX,String startY,String width,String height,String comment,String taskname,String username){
        this.type=type;
        this.startX=startX;
        this.startY=startY;
        this.width=width;
        this.height=height;
        this.comment=comment;
        this.taskname=taskname;
        this.username=username;
    }

    public SquareLabel(String startX,String startY,String width,String height,String comment,String taskname,String username){
        this.type="1";
        this.startX=startX;
        this.startY=startY;
        this.width=width;
        this.height=height;
        this.comment=comment;
        this.taskname=taskname;
        this.username=username;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getWidth() {
        return width;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public void setWidth(String width) {
        this.width = width;
    }

    public String getStartX() {
        return startX;
    }

    public String getStartY() {
        return startY;
    }

    public String getTaskname() {
        return taskname;
    }

    public String getType() {
        return type;
    }

    public void setStartX(String startX) {
        this.startX = startX;
    }

    public void setStartY(String startY) {
        this.startY = startY;
    }

    public void setTaskname(String taskname) {
        this.taskname = taskname;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }
}
