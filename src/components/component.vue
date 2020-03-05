<template>
  <div>
    <div>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <b-card title="Filtrar" class="bg-secondary">
                  <b-card-sub-title class="mb-2">Recurso</b-card-sub-title>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input checked  type="radio" name="neovis" class="custom-control-input" id="cpu" value="cputime">
                        <label class="custom-control-label"  for="cpu">CPU</label>
                      </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" name="neovis" class="custom-control-input" id="ram" value="rss">
                        <label class="custom-control-label" for="ram">RAM</label>
                    </div>
                    <p></p>
                        <b-card-sub-title class="mb-2">Primeiro Processo</b-card-sub-title>
                        <b-select v-model="process1" id="process1" >
                        <option value="0" selected>Todos</option>
                         <option v-for="item in labels" :value="item" :key="item.id">
      {{ item }}
    </option>
    
                        </b-select>
                        <p></p>
                        <b-card-sub-title class="mb-2">Segundo Processo</b-card-sub-title>
                         <b-select v-model="process2" id="process2" >
                        <option value="0" selected>Todos</option>
                         <option v-for="item in labels" :value="item" :key="item.id">
      {{ item }}
    </option>
    
                        </b-select>
                        <p></p>
                        <b-card-sub-title class="mb-2">Primeiro Host/Instância</b-card-sub-title>
                        <b-select v-model="instance1" id="instance1" >
                        <option value="0" selected>Todas</option>
                        <option value="1">Instância 1</option>
                        <option value="2">Instância 2</option>
                        <option value="3">Instância 3</option>
                        <option value="4">Instância 4</option>
                        </b-select>
                        <p></p>
                         <b-card-sub-title class="mb-2">Segundo Host/Instância</b-card-sub-title>
                        <b-select v-model="instance2" id="instance2">
                        <option value="0" selected>Todas</option>
                        <option value="1">Instância 1</option>
                        <option value="2">Instância 2</option>
                        <option value="3">Instância 3</option>
                        <option value="4">Instância 4</option>
                        </b-select>
                        <p></p>
                       <b-button type="submit" variant="outline-success float-right" class="card-link" v-on:click="reDraw" v-b-modal.privacy>Atualizar</b-button>
                       
                    
                </b-card>
            </div>
          
            <div id="viz" class="col-md-8" ></div>
              
        </div>
   </div>
    <b-modal size="huge" v-model="modalShow" :title="choosenNode">
      <div>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Informacao" active>
              <b-card-text>
                  <b-form-group>
                      <template v-slot:prepend>
                          <b-input-group-text>
                          </b-input-group-text>
                      </template>
                      <b-form-input
                              id="profSituation"
                              :placeholder="information.comm"
                              trim
                              readonly>
                      </b-form-input>
                  </b-form-group>
                  <b-form-group>
                      <template v-slot:prepend>
                          <b-input-group-text>
                          </b-input-group-text>
                      </template>
                      <b-form-input
                              id="profSituation"
                              :placeholder="information.cmd"
                              trim
                              readonly>
                      </b-form-input>
                  </b-form-group>
                  <b-form-group>
                      <template v-slot:prepend>
                          <b-input-group-text>
                          </b-input-group-text>
                      </template>
                      <b-form-input
                              id="profSituation"
                              :placeholder="information.pid"
                              trim
                              readonly>
                      </b-form-input>
                  </b-form-group>
                  <b-form-group>
                      <template v-slot:prepend>
                          <b-input-group-text>
                          </b-input-group-text>
                      </template>
                      <b-form-input
                              id="profSituation"
                              :placeholder="information.host"
                              trim
                              readonly>
                      </b-form-input>
                  </b-form-group>
                   <b-form-group>
                      <template v-slot:prepend>
                          <b-input-group-text>
                          </b-input-group-text>
                      </template>
                      <b-form-input
                              id="profSituation"
                              :placeholder="information.rss"
                              trim
                              readonly>
                      </b-form-input>
                  </b-form-group>
                  <b-form-group>
                      <template v-slot:prepend>
                          <b-input-group-text>
                          </b-input-group-text>
                      </template>
                      <b-form-input
                              id="profSituation"
                              :placeholder="information.cont"
                              trim
                              readonly>
                      </b-form-input>
                  </b-form-group>
              </b-card-text>
            </b-tab>
            <b-tab title="Ação">
              <b-card-text>Acao</b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>

    </b-modal>
  </div>
</div>
</template>
<script >
var op;
async function draw(view) {
  op=view
  var config = {
    container_id: "viz",
    server_url: "bolt://localhost:7687",
    server_user: "snow",
    server_password: "snow123",
    labels: {
      Process: {
        caption: "cmd",
        size: "cputime",
        community: "host",
        clickEvent: properties => {
          
          var cmd = properties.properties
          if(properties.properties.fake==undefined){
            
             view.show(cmd)
            view.choosenNode=properties.properties.cmd
            view.fill(properties.properties)
          }
        }
      }
    },
    relationships: {
      CONNECTED_TO: {
        caption: false,
        thickness: "sent_bytes"
      }
    },

    initial_cypher:
      "match p=(p1:Process)-[c1:CONNECTED_TO]->()<-[c2:CONNECTED_TO]-(p2:Process)    with sum(c1.sent_bytes+c2.sent_bytes)/1048576  as xd,p1,p2,c1,c2 match px=(p1)-[c1]->()<-[c2]-(p2) with sum(xd) as sumatorio,p1,p2,c1,c2 match pn=(p1)-[c1]->()<-[c2]-(p2) where sumatorio <> 0  return pn,p1.cmd,p2.cmd,p1.host,p2.host,sumatorio"
  };

  var viz = await new NeoVis.default(config);
  viz.registerOnEvent( 'completed', () => {
    view.nodes(viz._nodes)
} );
  
  var array = getArray()
  await saveToArray()
  await viz.render(array);
  console.log("final")

}
function drawAgain(size, instance1, instance2,process1,process2) {
  var conditions;
  if (size == undefined) {
    size="cputime"
  }
  
  if (instance1 != "0") {
    conditions = "p1.host contains '" + instance1 + "' ";
  } else {
    conditions = "p1.host contains 'inst' ";
  }
  if (instance2 != "0") {
    conditions += " and p2.host contains '" + instance2 + "' ";
  } else {
    conditions += " and p2.host contains 'inst' ";
  }
  if (process1 != "0") {
    conditions += " and p1.cmd contains '" + process1 + "' ";
  } 
  if (process2 != "0") {
    conditions += " and p2.cmd contains '" + process2 + "' ";
  } 
  
  
  var config = {
    container_id: "viz",
    server_url: "bolt://localhost:7687",
    server_user: "snow",
    server_password: "snow123",
    labels: {
      Process: {
        caption: "cmd",
        size: size,
        community: "host",
        clickEvent:properties =>{
            console.log(properties.properties.fake)
            if(properties.properties.fake!=undefined){
              view.show(cmd)
              view.choosenNode=properties.properties.cmd
              view.fill(properties.properties)
          }

        }
      }
    },
    relationships: {
      CONNECTED_TO: {
        caption: false,
        thickness: "sent_bytes"
      }
    },
    initial_cypher:
      "match p=(p1:Process)-[c1:CONNECTED_TO]->()<-[c2:CONNECTED_TO]-(p2:Process)    with sum(c1.sent_bytes+c2.sent_bytes)/1048576  as xd,p1,p2,c1,c2 match px=(p1)-[c1]->()<-[c2]-(p2) with sum(xd) as sumatorio,p1,p2,c1,c2 match pn=(p1)-[c1]->()<-[c2]-(p2) where sumatorio <> 0 and " +
      conditions +
      " return pn,p1.cmd,p2.cmd,p1.host,p2.host,sumatorio,p1.rss,p2.rss"
  };
  var viz = new NeoVis.default(config);
  viz.render();
}
function reDraw() {
  console.log("here boys")
  var a = document.getElementById("instance1");
  var b = document.getElementById("instance2");
  var d = document.getElementById("process1");
  var e = document.getElementById("process2");
  var c = document.getElementsByName("neovis");
  var c_value;
  for (var i = 0; i < c.length; i++) {
    if (c[i].checked) {
      c_value = c[i].value;
      break;
    }
  }

  drawAgain(c_value, a.value, b.value,d.value,e.value);
}

import { Component, Vue, Prop } from "vue-property-decorator";
import {nodes} from '../assets/nodes.js'
import {getArray, saveToArray} from '../../public/json'
@Component()
export default class NeoVisComponent extends Vue {
  modalShow=false;
  information="teste"
  labels =[];
  instance1="0";
  instance2="0";
  process1="0";
  process2="0";
  choosenNode=null;
  information={cmd:null,host:null,rss:null,pid:null,cont:null,comm:null}
  
  reDraw() {
    reDraw();
  }
  drawAgain(a,b,c){
    drawAgain(a,b,c);
  }
  nodes(arr){
    
    
    for(let key in arr){
      if(!this.labels.includes(arr[key].label)  && arr[key].label!="Socket" && arr[key].label!=undefined && arr[key].originalProperties.fake!="true" ){
        this.labels.push(arr[key].label)
      }
    }
    
  }
  show(){
    this.modalShow=true
 }

  async fill(information){
    this.information.cmd=information.cmd
    this.information.host=information.host
    this.information.comm=information.comm
    this.information.rss=information.rss/1024
    this.information.rss=this.information.rss.toString()+" MB"
    this.information.pid=information.ppid
    this.information.cont=information.cont
  }
  mounted() {
    draw(this);
  }

  
}
</script>
<style>
html,
body {
  font: 12pt arial;
}

#viz {
  
  height: 500px;
  border: 1px solid lightgray;
  font: 22pt arial;
}

.modal .modal-huge {
  max-width: 80%;
  width: 80%;
}

.form{
   font-size: 40px important!
}
</style>