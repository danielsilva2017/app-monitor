<template>
    <div>
        <div id="viza"></div>
        <p></p>
        <div v-if="clicked==true">
            <b-table small fixed head-variant="light" sticky-header hover :items="finalPods" :busy="!isBusy" :fields="fields" :tbody-tr-class="rowClass">
              <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
            </b-table>
          </div>
    </div>

    
</template>

<script lang="ts">
//Render scripts
var op;
async function draw(view:any) {
  console.log("here drawingg")
  op=view
  var config = {
    container_id: "viza",
    server_url: "neo4j://127.0.0.1:7687",
    server_user: "neo4j",
    server_password: "123456",
    labels: {
      Host: {
        caption:"name",
        size:"3",
        commmunity:"name",
        clickEvent: (properties:any) => {
            view.load(properties.properties.name)
        }
      }
    },
    relationships: {
      HostConnections: {
        caption: false,
        thickness: "sent_bytes"
      }
    },

    initial_cypher:
      "MATCH p=(p1)-[r:HostConnections]->(p2) RETURN p "
  };

  var viz =  new NeoVis(config);
  var array = getArray()
  console.log("hereee")
  viz.render(array,"normal","viza");

}


//Imports
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from 'axios';
import NeoVis from '../../public/neovis.js';
import {getArray} from '../../public/json'
import objectPath from 'object-path'
@Component({})
export default class HostsComponent extends Vue {

finalPods:any=[];
clicked=false;
instances:any[]=[];
isBusy=false;
onChange=false;


fields=[ { key: 'metadata.name', label: 'Name',sortable: true },{ key: 'metadata.ownerReferences[0].kind', label: 'Tipo',sortable: true },{ key: 'metadata.ownerReferences[0].name', label: 'Owner',sortable: true },{ key: 'status.phase', label: 'Status',sortable: true },{ key:'status.podIP', label:'Ip',sortable: true}]
async load(name:any){
  this.isBusy=false;
  this.finalPods=[];
  if(this.clicked==false){this.clicked=true;}
  var pods:any;
  await axios.get('http://localhost:3001/pods').then(response => 
    (
     
     pods=response.data[0].items
   ))
    for(let i=0;i<pods.length;i++){
        if(pods[i].spec.nodeName==name||name==undefined){
          this.finalPods.push(pods[i])
        }
    }
    this.isBusy=true;

}

rowClass(item:any,type:any) {
        if (!item || type !== 'row') return
  if(item.status.phase=="Running"){return 'table-success'}
}
onChanger(){
   this.onChange=!this.onChange
 }

async created(){
  this.$root.$on( 'onChanger',this.onChanger);
}


mounted(){
    draw(this)
}
}
</script>
<style scoped>
#viza {
  
  height: 300px;
  border: 3 solid lightgray;
  font: 22pt arial;
}
</style>