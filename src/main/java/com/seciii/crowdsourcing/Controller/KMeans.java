package com.seciii.crowdsourcing.Controller;

import com.seciii.crowdsourcing.Dao.SquareLabel;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class KMeans {
    private int k;
    private ArrayList<SquareLabel> dataSet=new ArrayList<SquareLabel>();
    private Map<SquareLabel,ArrayList<SquareLabel>> oldCluster=new HashMap<>();
    private Map<SquareLabel,ArrayList<SquareLabel>> newCluster=new HashMap<>();

    public KMeans(){}

    //构造函数，用dataSet的前k个label作为键，初始化oldCluster，newCluster
    public KMeans(ArrayList<SquareLabel> dataSet,int k){
        this.k=k;
        for(SquareLabel label:dataSet){
            this.dataSet.add(new SquareLabel(label.getType(),label.getStartX(),label.getStartY(),label.getWidth(),label.getHeight(),label.getComment(),UrlController.task.getTaskname(),UrlController.user.getUsername()));
        }

        for(int i=0;i<k;i++){
            oldCluster.put(this.dataSet.get(i),new ArrayList<SquareLabel>());
        }
        for(int i=0;i<this.dataSet.size();i++){
            SquareLabel close=getTheMostCloseSquareLabel(this.dataSet.get(i),oldCluster);
            oldCluster.get(close).add(this.dataSet.get(i));
        }

        newCluster=oldCluster;
    }

    //获取聚类结果，当newCluster和oldCluster差距足够小时，将newCluster作为结果返回，迭代计算newCluster
    public ArrayList<SquareLabel> getResult() {
        calculateNewCluster();
        while(!isCloseEnough()){
            calculateNewCluster();
        }
        ArrayList<SquareLabel> resultList=new ArrayList<>();
        for(SquareLabel key:newCluster.keySet()){
            resultList.add(calculateSquare2(newCluster.get(key)));
        }
        return resultList;
    }
    //选取最不相似的k个点作为最初的聚类中心
    private void initializeOldCluster(){

    }

    //获取距离label最近的键
    private SquareLabel getTheMostCloseSquareLabel(SquareLabel label,Map<SquareLabel,ArrayList<SquareLabel>> map){
        ArrayList<SquareLabel> oldKeyList=new ArrayList<>();
        for(SquareLabel key:map.keySet()){
            oldKeyList.add(key);
        }
        double newX=Double.parseDouble(label.getStartX());
        double newY=Double.parseDouble(label.getStartY());
        SquareLabel result=oldKeyList.get(0);
        double oldDistance=1000000;
        for(SquareLabel key:oldKeyList){
            double oldX=Double.parseDouble(key.getStartX());
            double oldY=Double.parseDouble(key.getStartY());
            double newDistance=Math.sqrt((oldX-newX)*(oldX-newX)+(oldY-newY)*(oldY-newY));
            if(newDistance<oldDistance){
                result=key;
                oldDistance=newDistance;
            }
        }
        return result;
    }

    //迭代计算newCluster
    private void calculateNewCluster(){
        oldCluster=newCluster;
        newCluster=new HashMap<>();
        for(SquareLabel key:oldCluster.keySet()){
            double sumOfX=0;
            double sumOfY=0;
            SquareLabel newKey=new SquareLabel();
            ArrayList<SquareLabel> tmp=oldCluster.get(key);
            for(SquareLabel label:tmp){
                sumOfX+=Double.parseDouble(label.getStartX());
                sumOfY+=Double.parseDouble(label.getStartY());
            }
            newKey.setStartX(""+sumOfX/tmp.size());
            newKey.setStartY(""+sumOfY/tmp.size());
            newCluster.put(newKey,new ArrayList<SquareLabel>());
        }

        for(SquareLabel label:dataSet){
            SquareLabel close=getTheMostCloseSquareLabel(label,newCluster);
            newCluster.get(close).add(label);
        }
    }

    private boolean isCloseEnough(){
        ArrayList<SquareLabel> oldKey=new ArrayList<>();
        for(SquareLabel key:oldCluster.keySet()){
            oldKey.add(key);
        }
        ArrayList<SquareLabel> newKey=new ArrayList<>();
        for(SquareLabel key:newCluster.keySet()){
            newKey.add(key);
        }

        for(int i=0;i<oldKey.size();i++){
            double oldX=Double.parseDouble(oldKey.get(i).getStartX());
            double oldY=Double.parseDouble(oldKey.get(i).getStartY());
            double newX=Double.parseDouble(newKey.get(i).getStartX());
            double newY=Double.parseDouble(newKey.get(i).getStartY());
            double distance=Math.sqrt((oldX-newX)*(oldX-newX)+(oldY-newY)*(oldY-newY));
            if(distance>0){
                return false;
            }
        }
        return true;
    }

    //整合方框2，取中间的80%，分为8组，中央数值加权平均
    public SquareLabel calculateSquare2(ArrayList<SquareLabel> labels){
        ArrayList<Double> x=new ArrayList<Double>();
        ArrayList<Double> y=new ArrayList<Double>();
        ArrayList<Double> width=new ArrayList<Double>();
        ArrayList<Double> height=new ArrayList<Double>();

        for(SquareLabel label:labels){
            x.add(Double.parseDouble(label.getStartX()));
            y.add(Double.parseDouble(label.getStartY()));
            width.add(Double.parseDouble(label.getWidth()));
            height.add(Double.parseDouble(label.getHeight()));
        }

        return new SquareLabel(""+calculateAverage(x),""+calculateAverage(y),""+calculateAverage(width),""+calculateAverage(height),labels.get(0).getComment(),UrlController.task.getTaskname(),UrlController.user.getUsername());
    }

    private double calculateAverage(ArrayList<Double> list){
        Collections.sort(list);//将list升序排列
        int[] vote={0,0,0,0,0,0,0,0};
        int length=list.size();
        double min=list.get(length/10),//去掉最小的10%
                max=list.get(length*9/10),//去掉最大的10%
                gap=(max-min)/8;//将剩下的数据的等分为八个区间

        //遍历去掉最高最低后的list，统计八个区间的频数
        for(int i=length/10;i<length*9/10;i++){
            for(int j=1;j<9;j++){
                if(list.get(i)<=min+j*gap){
                    vote[j-1]++;
                    break;
                }
            }
        }

        //以频率为概率，计算期望。（加权平均）
        double sum=0;
        for(int i=0;i<8;i++){
            sum+=(min+gap/2+i*gap)*vote[i];
        }
        double average=sum/(length*8/10);

        return average;
    }
}
