import { VComponent, StateLoading } from "utils/Validator";
import { message, Menu } from "antd";
import React from "react";
import { RouteMap } from "utils/RouteMap";
import { i18n } from "utils/i18n";

@RouteMap("/index/abc")
export class Test extends VComponent<any, StateLoading>{
  render(){
    return (
      <div>Test</div>
    );
  }
}

@RouteMap("/index/abc2")
export class Test2 extends VComponent<any, StateLoading>{
  render(){
    return (
      <div>Test2</div>
    );
  }
}

@RouteMap("/index/abc3")
export class Test3 extends VComponent<any, StateLoading>{
  render(){
    return (
      <div>Test3</div>
    );
  }
}

@RouteMap("/index/abc4")
export class Test4 extends VComponent<any, StateLoading>{
  render(){
    return (
      <div>{i18n.t('description.part1')}</div>
    );
  }
}

