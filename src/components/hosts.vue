<template>
    <div>
        Hosts
    </div>
</template>

<script>
import { Component, Vue, Prop } from "vue-property-decorator";
import {nodes} from '../assets/nodes.js'
import {getArray, saveToArray} from '../../public/json'
import objectPath from 'object-path'
@Component()
export default class HostsComponent extends Vue {

}
</script>