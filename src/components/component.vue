<template>
  <div>
    <div>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <b-card title="Filtrar" class="bg-secondary">
                  <b-card-sub-title class="mb-2">Recurso:</b-card-sub-title>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input checked  type="radio" name="neovis" class="custom-control-input" id="cpu" value="cputime">
                        <label class="custom-control-label"  for="cpu">CPU</label>
                      </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" name="neovis" class="custom-control-input" id="ram" value="rss">
                        <label class="custom-control-label" for="ram">RAM</label>
                    </div>
                    <p></p>
                      <b-card-sub-title class="mb-2">Organizar por:</b-card-sub-title>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input checked  type="radio" name="orderBy" class="custom-control-input" id="instancia" value="normal">
                        <label class="custom-control-label"  for="instancia">Instância</label>
                      </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" name="orderBy" class="custom-control-input" id="process" value="process">
                        <label class="custom-control-label" for="process">Processo</label>
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
          <div class="col-md-8">
            <div id="viz"></div>
            
          </div>
          
        </div>
        <p></p>
        
   </div>
   <div class="col-md-12">
          
           <b-table small head-variant="light" bordered="bordered" sticky-header hover  :items="pods" :busy="!isBusy" :fields="fields" >
              <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong> Loading...</strong>
                </div>
              </template>
            </b-table>
            
    </div>
    <b-button v-on:click="seeMore()">Ver mais</b-button>
    
    <b-modal size="huge" v-model="showTable" Title='Tabela'>
      <b-table small head-variant="light" bordered="bordered" sticky-header hover  :items="pods" :busy="!isBusy" :fields="fields2" >
              <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong> Loading...</strong>
                </div>
              </template>
            </b-table>
    </b-modal>
  
    <b-modal size="huge" v-model="modalShow" :title="name">
      <div>
            <div class="card" >
              <div class="card-header indigo lighten-3 content-center">
                <i class="fab fa-flickr icon text-black  my-4 display-4">Informação geral</i>
              </div>
              <div class="card-body row text-center">
                  <div class="col">
                    <div class="text-value-xl">Nome do Controlador</div>
                    <div class="text-uppercase text-muted small">{{finalName}}</div>
                  </div>
                    <div class="col">
                    <div class="text-value-xl">Tipo de Controlador</div>
                    <div class="text-uppercase text-muted small">{{type}}</div>
                  </div>
                  <div class="col">
                    <div class="text-value-xl">Comm</div>
                    <div class="text-uppercase text-muted small">{{information.comm}}</div>
                  </div>
                  
                  <div class="vr"></div>
                  <div class="col">
                    <div class="text-value-xl">Cmd</div>
                    <div class="text-uppercase text-muted small">{{information.cmd}}</div>
                  </div>
                 
              </div>
            </div>
             <div class="card" >
              <div class="card-header bg-behance content-center">
                <i class="fab fa-behance icon text-black  my-4 display-4">Métricas</i>
              </div>
              <div class="card-body row text-center">
                  <div class="col">
                    <div class="text-value-xl">Pid</div>
                    <div class="text-uppercase text-muted small">{{information.pid}}</div>
                  </div>
                  <div class="col">
                    <div class="text-value-xl">PPid</div>
                    <div class="text-uppercase text-muted small">{{information.ppid}}</div>
                  </div>
                  <div class="vr"></div>
                  <div class="col">
                    <div class="text-value-xl">Host</div>
                    <div class="text-uppercase text-muted small">{{information.host}}</div>
                  </div>
                  <div class="col">
                    <div class="text-value-xl">Rss</div>
                    <div class="text-uppercase text-muted small">{{information.rss}}</div>
                  </div>
                  <div class="col">
                    <div class="text-value-xl">Cont</div>
                    <div class="text-uppercase text-muted small">{{information.cont}}</div>
                  </div>
              </div>
            </div>
              <div class="card" >
                <div class="card-header bg-behance content-center">
                  <i class="fab fa-behance icon text-black  my-4 display-4">Recursos</i>
                </div>
                <div class="card-body row text-center">
                  <div class="col">
                      <div class="text-value-xl">Número de Réplicas
                          <span class="ml-1" v-b-tooltip.hover title="A alteração deste número pode levar a sob ou sobrecargas da orquestração">
                            <b-icon-info></b-icon-info>
                          </span>
                          </div>
                      <div class="text-uppercase text-muted small">
                        <b-form-input
                                id="replicas"
                                v-model="finalInformation.replicas"
                                trim>
                        </b-form-input>
                      </div>
                  </div>
                  <div class="col">
                      <div class="text-value-xl">Limite de Cpu
                        <span class="ml-1" v-b-tooltip.hover title="Este número deve ser sempre maior ou igual ao request cpu e deve ter em conta a orquestração podendo levar a falhas ">
                          <b-icon-info></b-icon-info>
                        </span>
                          </div>
                      <div class="text-uppercase text-muted small">
                        <b-form-input
                                id="replicas"
                                v-model="finalInformation.limitcpu"
                                trim>
                        </b-form-input>
                      </div>
                  </div>
                  <div class="col">
                      <div class="text-value-xl">Limite de Memória
                        <span class="ml-1" v-b-tooltip.hover title="Este número deve ser sempre maior ou igual ao request memory e deve ter em conta a orquestração podendo levar a falhas ">
                          <b-icon-info></b-icon-info>
                        </span>
                          </div>
                      <div class="text-uppercase text-muted small">
                        <b-form-input
                                id="replicas"
                                v-model="finalInformation.limitmemory"
                                trim>
                        </b-form-input>
                      </div>
                  </div>
                  <div class="col">
                      <div class="text-value-xl">Request CPU
                        <span class="ml-1" v-b-tooltip.hover title="Este número deve ser sempre menor ou igual ao limite de cpu">
                          <b-icon-info></b-icon-info>
                        </span>
                        </div>
                      <div class="text-uppercase text-muted small">
                        <b-form-input
                                id="replicas"
                                v-model="finalInformation.requestcpu"
                                trim>
                        </b-form-input>
                      </div>
                  </div>
                  <div class="col">
                      <div class="text-value-xl">Request Memory
                        <span class="ml-1" v-b-tooltip.hover title="Este número deve ser sempre menor ou igual ao limite de memória">
                          <b-icon-info></b-icon-info>
                        </span>
                          </div>
                      <div class="text-uppercase text-muted small">
                        <b-form-input
                                id="replicas"
                                v-model="finalInformation.requestmemory"
                                trim>
                        </b-form-input>
                      </div>
                  </div>
                  

             </div>
        </div>
      </div>
      <template v-slot:modal-footer="{ cancel, ok }">
            <b-button variant="outline-secondary" v-on:click="cancel()">Cancelar</b-button>
            <span class="flex-fill"></span>
            <b-button variant="warning" v-on:click="updateAll();ok()">Gravar</b-button>
     </template>

    </b-modal>
  </div>
</div>
</template>
<script lang="ts">
import axios from 'axios';
import NeoVis from '../../public/neovis.js';
import  Array  from '../../public/json2';
var op:any;

async function draw(view:any) {
  op=view
  var config = {
    container_id: "viz",
    server_url: "neo4j://127.0.0.1:7687",
    server_user: "neo4j",
    server_password: "123456",
    labels: {
      Process: {
        caption: "cmd",
        size: "cputime",
        community: "host",
        DoubleClickEvent: (properties:any) => {
          var cmd = properties.properties
          if(properties.properties.fake==undefined){
             view.show(properties.properties.cont)
            view.fill(properties.properties)
          }
        }
      }
    },
    relationships: {
      NoSocket2: {
        caption: false,
        thickness: "sent_bytes"
      }
    },

    initial_cypher:
      "match p=(p1)-[n:NoSocket2]-(p2) return p"
  };

  let viz= await new NeoVis(config);
  viz.registerOnEvent( 'completed', () => {
    let a = viz._nodes
    view.fillTable(viz._nodes)
} );
  var array = getArray()
  await viz.render(array,"normal","viz");
  
}
function drawAgain(size:any, instance1:any, instance2:any,process1:any,process2:any,orderBy:any) {
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
    server_url: "neo4j://127.0.0.1:7687",
    server_user: "neo4j",
    server_password: "123456",
    labels: {
      "Process": {
        caption: "cmd",
        size: size,
        community: "host",
        clickEvent:(properties:any) =>{
            if(properties.properties.fake==undefined){
              op.show(properties.properties.cont)
              op.choosenNode=properties.properties.cmd
              op.fill(properties.properties)
          }

        }
      }
    },
    relationships: {
       NoSocket2: {
        caption: false,
        thickness: "finish"
      }
    },
    initial_cypher:
      "match p=(p1)-[n:NoSocket2]-(p2) where " +
      conditions +
      " return p"
  };
  var viz = new NeoVis(config);
  var array = getArray()
  
  viz.render(array,orderBy,"viz");
}
function reDraw() {
  var a = <HTMLInputElement>document.getElementById("instance1");
  var b = <HTMLInputElement>document.getElementById("instance2");
  var d = <HTMLInputElement>document.getElementById("process1");
  var e = <HTMLInputElement>document.getElementById("process2");
  var c= document.getElementsByName("neovis") as  NodeListOf<HTMLInputElement>
  var f= document.getElementsByName("orderBy") as  NodeListOf<HTMLInputElement>
  var c_value:any; 
  var f_value:any;
  for (var i:number = 0; i < c.length; i++) {
    if (c[i].checked ) {
      c_value = c[i].value;
      break;
    }
  }
   for (var i:number = 0; i < f.length; i++) {
    if (f[i].checked ) {
      f_value = f[i].value;
      break;
    }
  }

  drawAgain(c_value, a.value, b.value,d.value,e.value,f_value);
}


/**

  * This a Vue js Page but has an neovis component which is a pure HTMl neo4j browser visualizer and
  thats why some functions are duplicated.
  * Imports:
  * @param  objectPath is used to recursively verify if any part of the json is undefined
*/

//xd
import { Component, Vue, Prop } from "vue-property-decorator";
import {getArray} from '../../public/json'
import objectPath from 'object-path'
@Component({})
export default class NeoVisComponent extends Vue {

  /**
   * 
   * Variable Section 
   * string[] 
   * 
   * Some of this variables might be unnecessary but due to the nature of this work which was " explore 
   * and try to see if it is possible to do rather than have a good workflow"
   * 
   */


  // function used to show or not the modal
  modalShow=false;
  labels:string[]=[];
  instance1="0";
  instance2="0";
  process1="0";
  process2="0";
  choosenNode=null;
  type="teste";
  name="teste";
  isBusy=false;
  finalName="teste"
  fields=[ { key: 'originalProperties.cmd', label: 'CMD',sortable: true },{ key: 'originalProperties.cont', label: 'Cont',sortable: true },{key: 'originalProperties.pid', label: 'Pid',sortable: true },{key: 'originalProperties.ppid', label: 'ppid',sortable: true },{key:'originalProperties.rss', label:'RAM',sortable: true}]
  fields2=[{ key: 'originalProperties.cmd', label: 'CMD',sortable: true },{ key: 'originalProperties.cont', label: 'Cont',sortable: true },{key:'originalProperties.host', label:'Host',sortable:true},{key: 'originalProperties.pid', label: 'Pid',sortable: true },{key: 'originalProperties.ppid', label: 'ppid',sortable: true },{key:'originalProperties.rss', label:'RAM',sortable: true},{key:'originalProperties.cputime', label:'CPU',sortable: true}]
  showTable=false
  isBusy2=false
  estado:any={id:"0",msg:""}
  maximo=100;
  valor=0;
  replicas=0;
  pods:string[]=[];
  //pod's atributes  when  we clicked
  originalInformation={replicas:null,limitcpu:null,limitmemory:null,requestcpu:null,requestmemory:null}
  //pod's information when we close the modal
  finalInformation={replicas:null,limitcpu:null,limitmemory:null,requestcpu:null,requestmemory:null}
  //information passed to the modal 
  information:any={cmd:null,host:null,rss:null,pid:null,cont:null,comm:null,ppid:null}
  //namespace
  namespace="teste"
  
  /**
   * 
   * Function Section
   * 
   */

  //Calls the built-in html function named reDraw
  reDraw() {
    reDraw();
  }

  //Calls the built-in html function named drawAgain
  drawAgain(a:any,b:any,c:any,d:any,e:any,f:any){
    drawAgain(a,b,c,d,e,f);
  }

  //Function used to  fill the table

  fillTable(arr:any){

    for(var key in arr){
      if(arr[key].originalProperties.fake==undefined){
        arr[key].originalProperties.rss=this.verify(objectPath.get( arr[key], 'originalProperties.rss' ),0)
        arr[key].originalProperties.cputime=this.verify(objectPath.get( arr[key], 'originalProperties.cputime' ),0)
        this.pods.push(arr[key])
      }
    }
    this.isBusy=true;

  }

  /*function used to open the modal that contains the bigger table*/

  seeMore(){
      this.showTable=true
  }


  //Function used to fill the box with the names of the processes (cmd atribute in SYSQUERY)

  nodes(arr:any){
    
    for(let key in arr){
      if(!this.labels.includes((arr[key] as any).label)  && arr[key].label!="Socket" && arr[key].label!=undefined && arr[key].originalProperties.fake!="true" ){
        this.labels.push(arr[key].label)
      }
    }
    
  }


  /**
   * 
   * 
   * Verifies a is undefined or not. If it is return b otherwise returns its value
   * 
   * 
   * @param {string} a object 
   * @param {Integer} b value returned if a its undefined
   */

  verify ( a:any, b:any ) { 
    return a != undefined ? a : b 
    }

  /**
   * 
   * This function is used to create a correct correlation between the process detected by sysquery and 
   * pod presented in kubernetes. After the correlation is achieved the information regarding that pod 
   * is brought and mixed with the information provided by SYSQUERY and modal shows up.
   * 
   * @param {string} cont is an atribute of SYSQUERY, one part of it matches a pod in kubernetes
   * 
   */
  async  show(cont:any){
     
    var temp=cont
    var pods:any;
    var type;
    var name;
   
    await axios.get('http://localhost:3000/pods').then(response => 
    (
     
     pods=response.data[0].items
   ))
    for(let i=0;i<pods.length;i++){
     
      if(pods[i].metadata.uid==temp){
        this.type=pods[i].metadata.ownerReferences[0].kind.toLowerCase()
        this.name= pods[i].metadata.ownerReferences[0].name
        this.namespace=pods[i].metadata.namespace;
        break;
      }
   }
    if(this.type=="replicaset"){
     var deploymentName;
        await axios.get('http://localhost:3000/replicaset/'+this.name+"/"+this.namespace).then(response => 
        (
          this.name= response.data.metadata.ownerReferences[0].name
        ))
        this.type="deployment"
        
    }
    await axios.get('http://localhost:3000/'+this.type+'/'+this.name+'/'+this.namespace).then(response => 
      {
        this.finalName=response.data.metadata.name
        this.finalInformation.replicas=this.verify(response.data.spec.replicas,0)
        this.finalInformation.limitcpu=this.verify(objectPath.get( response.data, 'spec.template.spec.containers.0.resources.limits.cpu' ),0)
        this.finalInformation.limitmemory=this.verify(objectPath.get( response.data, 'spec.template.spec.containers.0.resources.limits.memory' ),0)
        this.finalInformation.requestcpu=this.verify(objectPath.get( response.data,'spec.template.spec.containers.0.resources.requests.cpu'),0)
        this.finalInformation.requestmemory=this.verify(objectPath.get( response.data,'spec.template.spec.containers.0.resources.requests.memory'),0)
      })

    this.originalInformation.replicas=this.finalInformation.replicas
    this.originalInformation.limitcpu=this.finalInformation.limitcpu
    this.originalInformation.limitmemory=this.finalInformation.limitmemory
    this.originalInformation.requestcpu=this.finalInformation.requestcpu
    this.originalInformation.requestmemory=this.finalInformation.requestmemory
    this.modalShow=true
 }

 /**
 * 
 * Function that verifies which fields were changed. if they were changed it calls the respective function,
 * that will call the API yaml Changer and change
 * 
 */


  async updateAll(){
    if(this.originalInformation.replicas!=this.finalInformation.replicas) await this.updateReplicas()
    if(this.originalInformation.limitcpu!=this.finalInformation.limitcpu) await this.updateLimitCpu()
    if(this.originalInformation.limitmemory!=this.finalInformation.limitmemory) await this.updateLimitMemory()
    if(this.originalInformation.requestcpu!=this.finalInformation.requestcpu) await this.updateRequestCpu()
    if(this.originalInformation.requestmemory!=this.finalInformation.requestmemory) await this.updateRequestMemory()
    
    
  }

  
 async updateReplicas(){
     
  this.$root.$emit('updateReplicas',this.type,this.namespace,this.name,this.finalInformation.replicas)
  
}


/**
 * 
 * Function that calls the api yamlChanger in order to change the cpu limit of one service 
 * (deployment or statefulsets)
 * 
 */

 async updateLimitCpu(){
    this.$root.$emit('updateLimitCpu',this.type,this.namespace,this.name,this.finalInformation.limitcpu)
  }

  /**
 * 
 * Function that calls the api yamlChanger in order to change the memory limit of one service 
 * (deployment or statefulsets)
 * 
 */
  async updateLimitMemory(){
    
      this.$root.$emit('updateLimitMemory',this.type,this.namespace,this.name,this.finalInformation.limitmemory)
    
  }

/**
 * 
 * Function that calls the api yamlChanger in order to change the request cpu of one service 
 * (deployment or statefulsets)
 * 
 */

  async updateRequestCpu(){
    this.$root.$emit('updateRequestCpu',this.type,this.namespace,this.name,this.finalInformation.requestcpu)
    
  }

/**
 * 
 * Function that calls the api yamlChanger in order to change the request memory of one service 
 * (deployment or statefulsets)
 * 
 */

  async updateRequestMemory(){
    this.$root.$emit('updateRequestMemory',this.type,this.namespace,this.name,this.finalInformation.requestmemory)
    
  }


  
  /**
 * 
 * Updates the information that will be displayed in modal when the user double clicks in a pod
 * @param {JSON} information json object that has the data that will be used to update the modal
 * 
 */

  async fill(information:any){
    this.information.cmd=information.cmd
    this.information.host=information.host
    this.information.comm=information.comm
    this.information.rss=information.rss/1024
    this.information.rss=this.information.rss.toFixed(4).toString()+" MB"
    this.information.pid=information.pid
    this.information.ppid=information.ppid
    this.information.cont=information.cont
  }
  

  /**
 * 
 * Function that is called in the creation of the page.
 * Atm this function is calling the following functions:
 *      * draw -  do draw the pod network
 * 
 */

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
  min-width: 100%;
  min-height: 200%;
  padding: 1rem;
}

.b-table-sticky-header{
  max-height:500px !important
}
.form{
   font-size: 40px important!
}
.syntax--comment.syntax--block {
  color: cadetblue;
}

.card-header{
    padding: 0.5rem 1.25rem;
}

.card-body{
    padding: 0.5rem 1.25rem;
}
.bg-tumblr {
    background-color: #32506d !important;
}
</style>