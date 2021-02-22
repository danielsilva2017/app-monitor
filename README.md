# app-monitor
[![CircleCI](https://img.shields.io/badge/version-1.0.2-blue)]()

App-monitor is a web server that allows you to track what is happening  in your Kubernetes infrastructure. It wss written in Vue js and uses a modify version of NeoVis to handle the connection and visualization of the neo4j database.
To use app-monitor you need to have also with the same environment:

- [x] YamlChanger - API to connect app-monitor to your Kubernetes Infrastructure
- [x] Access granted to use sysquery - agent that collects data from Kubernetes and stores it on neo4j.

Without this projects you will not see anything or be able to work in the web server 


Main features:

- [x] The user can see the information traded betweeen hosts,pods or processes;
- [x] The user can see a detail information for each  processes,hosts or pods - both on a table and on a graph;
- [x] The user can edit the recourses allocated to the controllers;

## Processes View
![Process View](https://i.imgur.com/40s5HkS.png)

## Pods View

![Pod View](https://i.imgur.com/d8HtLRM.png)

## Hosts View

![Host View](https://i.imgur.com/R2qTlDf.png)

## Recources

![Recources](https://i.imgur.com/L4ZllqI.png)
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
