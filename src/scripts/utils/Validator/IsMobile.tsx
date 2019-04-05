import React,{ Component } from "react";
import ReactDOM  from "react-dom";
import { DatePicker, Button, Input, Checkbox, message, Form, Row, Col } from 'antd';
import { Loading, RenderLoading } from "utils/Loading";
import { ReactNodeArray, string } from "prop-types";
import IValidity from "./IValidity";

export default class IsMobile extends Component<{msg?:string},any> implements IValidity {

  constructor(props:any){
    super(props);
  }
  
  render(){
    return (null);
  }

  validate(value: string): boolean {
    if(value == undefined || value == null || value.trim() == "")
      return true;
    
    var re= /^1\d{10}$/
    if(re.test(value))
      return true;

    return false;
  }
  
  error(): string {

    if(this.props.msg != undefined)
      return this.props.msg as string;
    return `不是手机号码格式,11位数字，以1开头`;
  }
}

