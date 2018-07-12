package com.seciii.crowdsourcing.Controller;

import com.seciii.crowdsourcing.Dao.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Encoder;

import java.io.*;
import java.util.ArrayList;

/**
 * @author: pis
 * @description: 用户管理和处理
 * @date: create in 下午8:18 2018/3/29
 */
@CrossOrigin
@RestController
public class UserController {

    //保存个人信息
    @RequestMapping(value="/saveUserInfo",method = RequestMethod.POST)
    public String saveUserInformation(@RequestBody User user) throws IOException{
        String userId=user.getUsername();
        String username=user.getName();
        String userphone=user.getPhone();
        String useremail=user.getEmail();
        String userdis=user.getDescription();

        //String info=userId+"^"+username+"^"+userphone+"^"+useremail+"^"+userdis+"\n";
        //FileWriter writer=new FileWriter("src/main/java/com/seciii/crowdsourcing/Data/UserInformation/UserInformation.txt",true);
        //BufferedWriter bw=new BufferedWriter(writer);
        ArrayList<String> oldone=new ArrayList<>();

        Boolean succeed=false;

        String filename="src/main/java/com/seciii/crowdsourcing/Data/UserInformation/UserInformation.txt";
        File file=new File(filename);
        InputStreamReader srreader=new InputStreamReader(new FileInputStream(file));
        BufferedReader reader=new BufferedReader(srreader);
        String line=null;
        while((line=reader.readLine())!=null){
            String usern=line.split(" ")[0];
            if(usern.equals(userId)){
                String newuser=line.split(" ")[0]+" "+username+" "+userphone+" "+useremail+" "+userdis+"\n";;
                oldone.add(newuser);
                succeed=true;
            }else{
                oldone.add(line);
            }
        }

        FileWriter writer=new FileWriter("src/main/java/com/seciii/crowdsourcing/Data/UserInformation/UserInformation.txt",false);
        BufferedWriter bw=new BufferedWriter(writer);
        for(String str:oldone){
            bw.write(str+"\n");
        }
        bw.close();



        if(!succeed){
            String info=userId+" "+username+" "+userphone+" "+useremail+" "+userdis+"\n";
            FileWriter writerr=new FileWriter("src/main/java/com/seciii/crowdsourcing/Data/UserInformation/UserInformation.txt",true);
            BufferedWriter bww=new BufferedWriter(writerr);
            bww.write(info);
            System.out.println(info);
            bww.close();
        }

        return "success";
    }


    //保存个人头像
    @RequestMapping(value="/saveUserImg",method = RequestMethod.POST)
    @ResponseBody public String saveUserImg(@RequestParam("classIcon") MultipartFile file, @RequestParam("className") String username) throws IOException{
        String fileName="src/main/java/com/seciii/crowdsourcing/Data/UserImg/"+username+".txt";
        File newfile=new File(fileName);

        InputStream input=null;
        byte[] data=null;
        input=file.getInputStream();
        data=new byte[input.available()];
        input.read(data);
        input.close();

        BASE64Encoder encoder=new BASE64Encoder();
        String code= encoder.encode(data);

        FileWriter writer=new FileWriter(fileName,false);
        BufferedWriter bw=new BufferedWriter(writer);
        bw.write(code);
        bw.close();
        return "success";
//        File newfile=new File("/Users/Leonarda/Desktop/Img/"+username+".jpeg");
//        if(!newfile.exists()){
//            newfile.createNewFile();
//        }
//
//        file.transferTo(newfile);
//        return "success";
    }


    //显示个人头像
    @RequestMapping(value="/showUserImg",method=RequestMethod.POST)
    public String showUserImg(@RequestBody User user) throws IOException{
        String username=user.getUsername();
        //System.out.println(userId);

//        String filepath="/Users/Leonarda/Desktop/Img/"+userId+".jpeg";
//        String info;
//        File file=new File(filepath);
//        if(!file.exists()){
//            info="no";
//        }else{
//            InputStream input=null;
//            byte[] data=null;
//            input=new FileInputStream(filepath);
//            data=new byte[input.available()];
//            input.read(data);
//            input.close();
//
//            BASE64Encoder encoder=new BASE64Encoder();
//            return encoder.encode(data);
//        }
        String fileName="src/main/java/com/seciii/crowdsourcing/Data/UserImg/"+username+".txt";
        File file=new File(fileName);
        String info="";
        if(!file.exists()){
            info="no";
        }else{
            InputStreamReader srreader=new InputStreamReader(new FileInputStream(file));
            BufferedReader reader=new BufferedReader(srreader);
            String line;
            while ((line=reader.readLine())!=null){
                info=info+line;
            }
        }
        return info;

    }

    //显示个人信息
    @RequestMapping(value="/showUserInformation",method = RequestMethod.POST)
    public String showUserInformation(@RequestBody User user) throws IOException{
        String userId=user.getUsername();
        //System.out.println(userId);


        Boolean succeed=false;

        String filename="src/main/java/com/seciii/crowdsourcing/Data/UserInformation/UserInformation.txt";
        File file=new File(filename);
        InputStreamReader srreader=new InputStreamReader(new FileInputStream(file));
        BufferedReader reader=new BufferedReader(srreader);
        String line=null;
        while((line=reader.readLine())!=null){
            //System.out.println(line);
            String usern=line.split(" ")[0];
            //System.out.println(usern);
            if(usern.equals(userId)){
                succeed=true;
                break;
            }else{
                continue;
            }
        }
        System.out.println(line);
        if(succeed){
            return line;
        }else{
            return "no";
        }
    }


    //将注册的新用户保存
    @RequestMapping(value = "/registerr", method = RequestMethod.POST)
    public String register(@RequestBody User user) throws IOException{
        String username=user.getUsername();
        String password=user.getPassword();
        Boolean canregister=true;

        String filename="src/main/java/com/seciii/crowdsourcing/Data/UserList/UserList.txt";
        File file=new File(filename);
        InputStreamReader srreader=new InputStreamReader(new FileInputStream(file));
        BufferedReader reader=new BufferedReader(srreader);
        String line=null;
        while((line=reader.readLine())!=null){
            String usern=line.split(" ")[0];
            if(usern.equals(username)){
                canregister=false;
                break;
            }
        }

        if(canregister){
            User newuser=new User(username,password);
            String saveStr=newuser.getUsername()+" "+newuser.getPassword()+" "+newuser.getPoint()+" "+newuser.getTaskAddress()+"\n";
            FileWriter writer=new FileWriter(filename,true);
            BufferedWriter bw=new BufferedWriter(writer);
            bw.write(saveStr);
            bw.close();
            return "注册成功！";
        }else{
            return "用户名已被使用！";
        }
    }



    //登录时判断是否正确
    @RequestMapping(value = "/loginn",method = RequestMethod.POST)
    public String login(@RequestBody User user) throws IOException{
        String username=user.getUsername();
        String password=user.getPassword();
        Boolean isright=false;

        String filename="src/main/java/com/seciii/crowdsourcing/Data/UserList/UserList.txt";
        File file=new File(filename);
        InputStreamReader srreader=new InputStreamReader(new FileInputStream(file));
        BufferedReader reader=new BufferedReader(srreader);
        String line=null;
        while((line=reader.readLine())!=null){
            String usern=line.split(" ")[0];
            if(usern.equals(username)){
                String pas=line.split(" ")[1];
                if(password.equals(pas)){
                    isright=true;
                    break;
                }else{
                    isright=false;
                    break;
                }
            }
        }

        if(isright){
            UrlController.user.setUsername(username);
            return "登录成功";
        }else{
            return "密码错误";
        }
        //return line;
    }


    //修改账户密码
    @RequestMapping(value = "/polishPassword",method = RequestMethod.POST)
    public String polishPassword(@RequestBody User user) throws IOException{
        String username=user.getUsername();
        String password=user.getPassword();
        Boolean succeed=false;

        ArrayList<String> oldone=new ArrayList<>();

        String filename="src/main/java/com/seciii/crowdsourcing/Data/UserList/UserList.txt";
        File file=new File(filename);
        InputStreamReader srreader=new InputStreamReader(new FileInputStream(file));
        BufferedReader reader=new BufferedReader(srreader);
        String line=null;
        while((line=reader.readLine())!=null){
            String usern=line.split(" ")[0];
            if(usern.equals(username)){
                String newuser=line.split(" ")[0]+" "+password+" "+line.split(" ")[2]+" "+line.split(" ")[3];
                oldone.add(newuser);
                succeed=true;
            }else{
                oldone.add(line);
            }
        }

        FileWriter writer=new FileWriter("src/main/java/com/seciii/crowdsourcing/Data/UserList/UserList.txt",false);
        BufferedWriter bw=new BufferedWriter(writer);
        for(String str:oldone){
            bw.write(str+"\n");
        }
        bw.close();

        if(succeed){
            return "修改成功";
        }else{
            return "？？？？";
        }
    }

    //积分增加
    @RequestMapping(value = "/giveThePoint",method = RequestMethod.POST)
    @ResponseBody public String giveThePoint(@RequestParam("username") String username, @RequestParam("point") String point) throws IOException{

        ArrayList<String> oldone=new ArrayList<>();

        String filename="src/main/java/com/seciii/crowdsourcing/Data/UserList/UserList.txt";
        File file=new File(filename);
        InputStreamReader srreader=new InputStreamReader(new FileInputStream(file));
        BufferedReader reader=new BufferedReader(srreader);
        String line=null;
        while((line=reader.readLine())!=null){
            String usern=line.split(" ")[0];
            if(usern.equals(username)){
                String nowPoint=line.split(" ")[2];
                String newpoint=String.valueOf(Integer.parseInt(nowPoint)+Integer.parseInt(point));
                String newuser=line.split(" ")[0]+" "+line.split(" ")[1]+" "+newpoint+" "+line.split(" ")[3];
                oldone.add(newuser);
            }else{
                oldone.add(line);
            }
        }

        FileWriter writer=new FileWriter("src/main/java/com/seciii/crowdsourcing/Data/UserList/UserList.txt",false);
        BufferedWriter bw=new BufferedWriter(writer);
        for(String str:oldone){
            bw.write(str+"\n");
        }
        bw.close();

        return "修改成功";
    }



        //前端获取登录用户名
    @RequestMapping(value="/getUsername")
    public String getUsernameForHTML() throws IOException{
        return UrlController.user.getUsername();
    }

    //前端获取被查看的工人用户名
    @RequestMapping(value="/getUsernameOfWorker")
    public String getUsernameOfWorkerForHTML() throws IOException{
        return UrlController.worker.getUsername();
    }
}
