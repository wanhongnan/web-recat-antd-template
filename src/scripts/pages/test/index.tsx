import { VComponent, StateLoading } from "utils/Validator";
import { message, Menu, Button } from "antd";
import React from "react";
import { RouteMap } from "utils/RouteMap";
import { i18n } from "utils/i18n";
import { delay } from "utils/index";
import { Collection } from "utils/linq.Collection";

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
      <Button onClick={this.onClick}>Test2</Button>
    );
  }

  async onClick(){
    console.log("abc")
    var range = new Collection(rangeMN(5));
    var ret;
    // ret = range.take(2).toArray();
    // console.log(ret);
    var classes = range.take(5).where(f=> f % 2 == 0).where(f=> f < 500).take(5).select((f,i)=>{
      return {
        id:f,
        name:`班级${i}`,
        students: [`班级${i}:student:${i}-1`,`班级${i}:student:${i}-2`,`班级${i}:student:${i}-3`]
      }
    });
    // ret = classes.toArray();
    // console.log(ret);
    var students = classes.expend(f=>f.students).skip(2).take(5);
    console.log(students.toArray());

    // for (let i = 0; i < 10; i++) {
    //   var pageSize = 5;
    //   var tmp = range.where(f=> f % 2 == 0).skip(i*pageSize).take(pageSize);
    //   console.log(`page:${i}`);
    //   console.log(tmp.toArray());
    // }

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


var nmCount:number = 0;
function *rangeMN(base:number){
  var n = 0;
  while(true){
    n++;
    var ret = base*n*n + 1;
    nmCount++;
    console.log(`nmCount:${nmCount} : ${ret}`)
    yield ret;
  }
}

