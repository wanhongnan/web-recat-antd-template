import { VComponent, StateLoading } from "utils/Validator";
import { message, Menu } from "antd";
import { RouteMap } from "utils/PageRouter";
import React from "react";

@RouteMap({path:"/index"})
export class Test extends VComponent<any,StateLoading>{
  render(){
    return (
      <div>Test</div>
    );
  }
}

@RouteMap({path:"/index"})
export class Test2 extends VComponent<any,StateLoading>{
  render(){
    return (
      <div>Test2</div>
    );
  }
}
