# app-monitor
[![CircleCI](https://img.shields.io/badge/version-1.0.0-blue)]()

App-monitor is a web server that allows you to track what is happening  in your Kubernetes infrastructure. It wss written in Vue js and uses a modify version of NeoVis to handle the connection and visualization of the neo4j database.
To use app-monitor you need to have also with the same environment:

- [x] YamlChanger - API to connect app-monitor to your Kubernetes Infrastructure
- [x] Access granted to use sysquery - agent that collects data from Kubernetes and stores it on neo4j.

Without this projects you will not see anything or be able to work in the web server 


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
