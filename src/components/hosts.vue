<template>
    <div>
        <div id="viza"></div>
    </div>
</template>

<script>
//Render scripts
var op;
async function draw(view) {
  console.log("here drawingg")
  op=view
  var config = {
    container_id: "viza",
    server_url: "neo4j://127.0.0.1:7687",
    server_user: "neo4j",
    server_password: "123456",
    labels: {
      Process: {
        caption:"name",
        size:"3",
        commmunity:"name",
        clickEvent: properties => {
          
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

  var viz =  new NeoVis.default(config);
  var array = getArray()
  console.log("hereee")
  viz.render(array,"normal","viza");

}


//Imports
import { Component, Vue, Prop } from "vue-property-decorator";
import {nodes} from '../assets/nodes.js'
import {getArray, saveToArray} from '../../public/json'
import objectPath from 'object-path'
@Component()
export default class HostsComponent extends Vue {
mounted(){
    draw(this)
}
}
</script>
<style scoped>
#viza {
  
  height: 500px;
  border: 1px solid lightgray;
  font: 22pt arial;
}
</style>