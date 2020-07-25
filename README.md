# app-monitor
[![CircleCI](https://img.shields.io/badge/version-1.0.1-blue)]()

App-monitor is a web server that allows you to track what is happening  in your Kubernetes infrastructure. It wss written in Vue js and uses a modify version of NeoVis to handle the connection and visualization of the neo4j database.
To use app-monitor you need to have also with the same environment:

- [x] YamlChanger - API to connect app-monitor to your Kubernetes Infrastructure
- [x] Access granted to use sysquery - agent that collects data from Kubernetes and stores it on neo4j.

Without this projects you will not see anything or be able to work in the web server 


New Version:

- [x] Can see the information traded betweeen hosts and see twhich pods are associated to each hosts;
- [x] Can see the information about the process both on a table and on a graph;
- [x] Improved the detailed information about each process;
- [x] Pod section created;


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
