/**
 * Created by Leonarda on 2018/3/22.
 */

var layer;
function setLayers(la) {
    layer=la;
}

CanvasExt={
    drawSquareLabel:function () {
        var startX, startY;
        var deX,deY;

        var bot=document.getElementById("bottom");
        var canvas = document.getElementById("myCanvas");


        var layerName;
        var layerIndex=layer;
        //alert(layer);

        canvas.onmousedown = function (e) {
            layerIndex++;
            layer++;
            layerName="layer"+layerIndex;

            //isMouseDown = true;
            deX=e.screenX;
            deY=e.screenY;
            startX = e.offsetX;
            startY = e.offsetY;

            $("#myCanvas").addLayer({
                type:'rectangle',
                fillStyle:'rgb(254,67,101,0.6)',
                name:layerName,
                fromCenter:false,
                x:startX,
                y:startY,
                width:1,
                height:1
            });

            //$("#myCanvas").drawLayers();
            $("#myCanvas").saveCanvas();
            canvas.onmousemove=function (e){
                var width=e.offsetX-startX;
                var height=e.offsetY-startY;

                $("#myCanvas").removeLayer(layerName);
                $("#myCanvas").addLayer({
                    type:'rectangle',
                    fillStyle:'rgb(254,67,101,0.6)',
                    name:layerName,
                    fromCenter:false,
                    x:startX,
                    y:startY,
                    width:width,
                    height:height
                });
                $("#myCanvas").drawLayers();
            }
        };

        canvas.onmouseup = function (e) {

            var width=e.offsetX-startX;
            var height=e.offsetY-startY;

            canvas.onmousemove=null;

            $("#myCanvas").removeLayer(layerName);
            $("#myCanvas").addLayer({
                type:'rectangle',
                fillStyle:'rgb(254,67,101,0.6)',
                name:layerName,
                fromCenter:false,
                x:startX,
                y:startY,
                width:width,
                height:height
            });

            $("#myCanvas").drawLayers();
            $("#myCanvas").saveCanvas();

            var text=document.createElement("textarea");

            //text.style.position='absolute';
            text.id=layerName;
            text.style.left=deX+'px';
            text.style.top=deY+'px';
            //text.style.background='transparent';
            text.style.height=2;
            text.style.width=10;

            //alert(text.style.top);
            //alert(text.style.left);
            bot.appendChild(text);
        };
    },


    drawCurveLabel:function () {

        var deX;
        var deY;

        var bot=document.getElementById("bottom");
        var canvas=document.getElementById("myCanvas");

        var sourceX=0;
        var sourceY=0;

        var layerIndex=layer;
        var layerName;

        canvas.onmousedown=function (e) {
            var color="#000000";
            var width=2+'px';

            deX=e.clientX;
            deY=e.clientY;
            sourceX=e.offsetX;
            sourceY=e.offsetY;

            // layerName="layer"+layerIndex;
            // $("#myCanvas").drawLine({
            //     layer:true,
            //     name:layerName,
            //     strokeStyle:color,
            //     strokeWidth:width,
            //     x1:sourceX,y1:sourceY,
            //     x2:sourceX,y2:sourceY
            // });

            canvas.onmousemove=function(e){
                layerIndex++;
                layer++;
                layerName="layer"+layerIndex;

                var moveX=e.offsetX;
                var moveY=e.offsetY;

                $("#myCanvas").drawLine({
                    layer:true,
                    name:layerName,
                    strokeStyle:color,
                    strokeWidth:width,
                    x1:sourceX,y1:sourceY,
                    x2:moveX,y2:moveY
                });

                sourceX=moveX;
                sourceY=moveY;
            }
        };

        canvas.onmouseup=function (e) {
            $("#myCanvas").drawLayers().saveCanvas();
            canvas.onmousemove=null;

            var text=document.createElement("textarea");
            text.id=layerName;
            text.left=deX;
            text.top=deY;
            text.style.background='transparent';
            text.height=2;
            text.width=10;

            bot.appendChild(text);
        };
    },

    drawWholeLabel:function (){
        $('#bottom').append('<textarea class="input_des" id="description"  placeholder=" 整体描述：" ></textarea>');
    }
};


