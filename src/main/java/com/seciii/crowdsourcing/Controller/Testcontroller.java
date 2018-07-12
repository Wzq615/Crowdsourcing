package com.seciii.crowdsourcing.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.seciii.crowdsourcing.Dao.SquareLabel;

import java.util.ArrayList;
import java.util.Collections;

/**
 * @author: lian
 * @description: good good study
 * @date: create in 下午11:27 2018/3/21
 */
@Controller
public class Testcontroller {
    @RequestMapping(value = "/hello",method = RequestMethod.POST)
    public String hello(@RequestBody String a){
        return a;
    }

    //整合方框1,平均值
    public SquareLabel calculateSquare1(SquareLabel[] labels){

        double x=0,y=0,width=0,height=0;
        for(SquareLabel label:labels) {
            x += Double.parseDouble(label.getStartX());
            y += Double.parseDouble(label.getStartY());
            width += Double.parseDouble(label.getWidth());
            height += Double.parseDouble(label.getHeight());
        }
        x/=labels.length;
        y/=labels.length;
        width/=labels.length;
        height/=labels.length;

        return new SquareLabel(""+x,""+y,""+width,""+height,"","","");
    }
}