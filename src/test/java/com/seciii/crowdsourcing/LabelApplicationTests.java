package com.seciii.crowdsourcing;

import com.seciii.crowdsourcing.Controller.UserController;
import org.junit.Test;
//import org.junit.Assert.*;
//import org.junit.runner.RunWith;
import junit.framework.TestCase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.seciii.crowdsourcing.Dao.Task;
import com.seciii.crowdsourcing.Controller.TaskController;
import com.seciii.crowdsourcing.Controller.UserController;
import com.seciii.crowdsourcing.Dao.User;

import java.io.IOException;

//@RunWith(SpringRunner.class)
@SpringBootTest
public class LabelApplicationTests extends TestCase{

	@Test
	public void contextLoads() {
	}

	@Test
	public void showUserInformationTest()throws Exception {
		UserController uc = new UserController();
		User user = new User();
		user.setUsername("1234");
		assertEquals("1234 lian 18851825026 1147588658@qq.com i'm lian", uc.showUserInformation(user));

	}

	@Test
	public void loginTest() throws Exception {
		UserController uc = new UserController();
		User user = new User("", "");
		assertEquals("密码错误", uc.login(user));
	}

	@Test
	public void registerTest() throws  Exception {
		UserController uc = new UserController();
		User user = new User("1234", "");
		assertEquals("用户名已被使用", uc.register(user));
	}

	@Test
	public void saveUserInformationTest() throws  Exception {
		UserController uc = new UserController();
		User user = new User("mmm", "123", "25", "mmm", "hhbhjvh", "135454", "hhhh", "njkbcjzhv");
		assertEquals("success", uc.saveUserInformation(user));
	}


	@Test
	public void checkTaskInformationAsLookerTest() throws Exception {
		TaskController tc = new TaskController();
		Task task = new Task("0","","","","","","","","","","");
		//task.setTaskname("0");
		try{
			assertEquals("0#1234#狗的标注#狗的标注#整体标注#5#0#12#2018-05-24", tc.checkTaskInformationAsLooker(task));
		}catch(Exception e){
			e.printStackTrace();
		}

	}

//	@Test
//	public void checkAllTasksTest()throws Exception {
//		TaskController tc = new TaskController();
//		Task task = new Task("0","","","","","","","","","","");
//
//		assertEquals("0#1234#狗的标注#狗的标注#整体标注#5#0#12#2018-05-24!" +
//				"1#1234#人的标注#人的标注#方框标注#10#0#100#2018-05-21!" +
//				"2#null#我的任务#我的任务#整体标注#10#0#10#2018-05-29", tc.checkAllTasks());
//
//	}

}
