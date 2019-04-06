import { Component } from "react";
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { VComponent } from "utils/Validator";
import { T } from "antd/lib/upload/utils";

export type MapRouteOption = {
  path:string, 
  component?: any,
  onEnter?: (nextState:Function, replaceState:Function)=>void,
  onLeave?: (nextState:Function, replaceState:Function)=>void,
}

var _routes = new Map<string,any>();
export function RouteMap(option:MapRouteOption){
  return  function(target:any) {
    option.component = target;
    _routes.set(option.path,option);
  }
}

export function getRenderRoutes(){
  var routes = [];
  for(var props of _routes.values()){
      routes.push(<Route key={props.path} {...props} />);
  }
  return (
    <Switch>
      {routes}
    </Switch>
  );
}

/**
使用:
<HashRouter>
  {getRenderRoutes()}
</HashRouter>
 */
