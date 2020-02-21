<template>
    <div>
            <div>
                <div id="viz" style="float:left"></div>
                <div style="float:right">
                    <div>CMD <a id="cmd"></a></div>
                </div>
            </div>
                
            <div id="row buttons" style="float:left;clear:left">

                <div class="col " style="float   :left">
                    <input type="radio" name="neovis"  value="cputime"> CPU<br>
                    <input type="radio" name="neovis" value=100> RAM<br>
                </div>
                <div class="col">
                    <select id="instance1">
                        <option value="0">Todas</option>
                        <option value="1">Instância 1</option>
                        <option value="2">Instância 2</option>
                        <option value="3">Instância 3</option>
                        <option value="4">Instância 4</option>
                    </select>
                    
                    <select id="instance2">
                            <option value="0">Todas</option>
                            <option value="1">Instância 1</option>
                            <option value="2">Instância 2</option>
                            <option value="3">Instância 3</option>
                            <option value="4">Instância 4</option>
                    </select>
                    <button onClick="reDraw()">Reestruturar</button>
                </div>
                <button class="btn btn-primary">xd</button>
            </div>
        </div>
</template>
<script>
        function draw(){
            console.log("here")
            var config={
                container_id:"viz",
                server_url:"bolt://localhost:7687",
                server_user:"snow",
                server_password:"snow123",
                labels:{
                    "Process":{
                        caption:"cmd",
                        size:"cputime",  
                        community:"community",
                        clickEvent:(properties)=>{
                            var cmd= properties.properties.cmd
                            document.getElementById("cmd").innerHTML=cmd
                        }
                    },
                    
                },
                relationships:{
                        "CONNECTED_TO":{
                            caption:false,
                            thickness:"sent_bytes",
                        },
                },
                
                initial_cypher:"match p=(p1:Process)-[c1:CONNECTED_TO]->()<-[c2:CONNECTED_TO]-(p2:Process)    with sum(c1.sent_bytes+c2.sent_bytes)/1048576  as xd,p1,p2,c1,c2 match px=(p1)-[c1]->()<-[c2]-(p2) with sum(xd) as sumatorio,p1,p2,c1,c2 match pn=(p1)-[c1]->()<-[c2]-(p2) where sumatorio <> 0  return pn,p1.cmd,p2.cmd,p1.host,p2.host,sumatorio"
            }
            console.log(config)
            
            var viz = new NeoVis.default(config);
            viz.render();
        }
        function drawAgain(size,instance1,instance2){
            var conditions;
            console.log("x"+size)
            if(size==undefined){
                console.log("xd")
            }
            if(instance1!="0"){
                conditions="p1.host contains '"+instance1+"'"
            }
            else{
                conditions="p1.host contains 'inst'"
            }
            if(instance2!="0"){
                conditions+=" and p2.host contains '"+instance2+"'"
            }
            else{
                conditions+=" and p2.host contains 'inst'"
            }
            var config={
                container_id:"viz",
                server_url:"bolt://localhost:7687",
                server_user:"snow",
                server_password:"snow123",
                labels:{
                    "Process":{
                        caption:"cmd",
                        size:size,  
                        community:"community",
                    }
                },
                relationships:{
                        "CONNECTED_TO":{
                            caption:false,
                            thickness:"sent_bytes"
                        },
                },
                initial_cypher:"match p=(p1:Process)-[c1:CONNECTED_TO]->()<-[c2:CONNECTED_TO]-(p2:Process)    with sum(c1.sent_bytes+c2.sent_bytes)/1048576  as xd,p1,p2,c1,c2 match px=(p1)-[c1]->()<-[c2]-(p2) with sum(xd) as sumatorio,p1,p2,c1,c2 match pn=(p1)-[c1]->()<-[c2]-(p2) where sumatorio <> 0 and "+conditions+" return pn,p1.cmd,p2.cmd,p1.host,p2.host,sumatorio"
            }
            console.log(config.initial_cypher)
            var viz = new NeoVis.default(config);
            viz.render();
           
        }
        function reDraw(){
            var a = document.getElementById('instance1')
            var b = document.getElementById('instance2')
            var c= document.getElementsByName("neovis")
            var c_value;
            for(var i = 0; i < c.length; i++){
                if(c[i].checked){
                    c_value = c[i].value;
                    break;
                }
            }
            
            drawAgain(c_value,a.value,b.value)
        }
        
        import {Component,Vue} from 'vue-property-decorator';

        @Component()
        export default class NeoVisComponent extends Vue {
            mounted () {
                draw();
            }
        }
</script>
<style>
    html, body {
        font: 16pt arial;
    }

    #viz {
        width: 800px;
        height: 700px;
        border: 1px solid lightgray;
        font: 22pt arial;
    }
    #buttons{
        border: 1px solid black;
        width:800px;
        height:100px;
    }
</style>