import { VComponent, StateLoading } from "utils/Validator";
import { message, Menu } from "antd";
import { RouteMap } from "utils/PageRouter";
import React from "react";

@RouteMap({path:"/index/abc"})
export class Test extends VComponent<any,StateLoading>{
  render(){
    return (
      <div>Test</div>
    );
  }
}

@RouteMap({path:"/index/abc2"})
export class Test2 extends VComponent<any,StateLoading>{
  render(){
    return (
      <div>Test2</div>
    );
  }
}

@RouteMap({path:"/index/abc3",catcategory:"abc"})
export class Test3 extends VComponent<any,StateLoading>{
  render(){
    return (
      <div>Test3</div>
    );
  }
}

@RouteMap({path:"/index/abc4",catcategory:"abc"})
export class Test4 extends VComponent<any,StateLoading>{
  render(){
    return (
      <div>Tes4</div>
    );
  }
}

