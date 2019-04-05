import React,{ Component } from "react";
import ReactDOM  from "react-dom";
import { DatePicker, Button, Input, Checkbox, message, Form, Row, Col } from 'antd';
import { Loading, RenderLoading } from "utils/Loading";
import { ReactNodeArray, string } from "prop-types";
import IValidity from "./IValidity";

export default class IsMatch extends Component<{exp:RegExp, msg?:string},any> implements IValidity {

  constructor(props:any){
    super(props);
  }
  
  render(){
    return (null);
  }

  validate(value: string): boolean {
    if(value == undefined || value == null || value.trim() == "")
      return true;
    
    var re= this.props.exp;
    if(re.test(value))
      return true;

    return false;
  }
  
  error(): string {

    if(this.props.msg != undefined)
      return this.props.msg as string;
    return `格式不匹配`;
  }
}

