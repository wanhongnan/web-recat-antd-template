import React,{ Component } from "react";
import ReactDOM  from "react-dom";
import { DatePicker, Button, Input, Checkbox, message, Form, Row, Col } from 'antd';
import { Loading, RenderLoading } from "utils/Loading";
import { ReactNodeArray, string } from "prop-types";
import IValidity from "./IValidity";

export default class IsAccount extends Component<{msg?:string},any> implements IValidity {

  constructor(props:any){
    super(props);
  }
  
  render(){
    return (null);
  }

  validate(value: string): boolean {
    if(value == undefined || value == null || value.trim() == "")
      return true;
    
    //console.log(`IsAccount:${value}`);

    var re= /^[a-zA-z]\w{3,15}$/
    if(re.test(value))
      return true;

    return false;
  }
  
  error(): string {

    if(this.props.msg != undefined)
      return this.props.msg as string;
    return `账号必须由字母、数字、下划线组成，字母开头，4-16位`;
  }
}


