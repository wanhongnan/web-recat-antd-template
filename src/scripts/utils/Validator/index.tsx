import React,{ Component } from "react";
import ReactDOM  from "react-dom";
import { DatePicker, Button, Input, Checkbox, message, Form, Row, Col } from 'antd';
import { Loading, RenderLoading } from "utils/Loading";
import { ReactNodeArray, string } from "prop-types";
import Required from "./Required";
import IValidity from "./IValidity";
import "./style.css";
import IsPhone from "./IsPhone";
import IsEmail from "./IsEmail";
import IsAccount from "./IsAccount";
import IsMobile from "./IsMobile";
import IsMatch from "./IsMatch";
import IsIpAddress from "./IsIpAddress";

export type StateLoading = {loading:boolean} 

export class VComponent<PT,ST> extends Component<PT,ST>{

  validatorList : Map<string,Validator> = new Map<string,Validator>();
  validate():boolean{
    var ret = true;
    this.validatorList.forEach((v:Validator)=>{
      ret = ret && v.validate();
    });
    return ret;
  }
  regist(v:Validator){
    var key = v.props.id;
    if(key == undefined || key == null || key.trim() == ""){
      console.error("<Validate></Validate>控件的key值必填，且不能重复");
      return;
    }
    this.validatorList.set(key,v);
    //console.log(this.validatorList.keys());
  }
}

type ValidatorProps = {
  container: VComponent<any,any>;
  id: string;
}
type SValidityState = {
  error : string,
  success : boolean
}
export class Validator extends Component<ValidatorProps, SValidityState> implements IValidity {

  constructor(props: ValidatorProps){
    super(props);
    props.container.regist(this);
    this.state = {
      error : "",
      success: true
    }
  }
  render(){
      return (
      <div>
        {this.props.children}
        <span className='error-msg'>{this.state.error}</span>
      </div>
      );
  }

  isValidityControl(type:any):boolean{
    if(type == undefined || type == null)
      return false;
    if(type.prototype.validate == undefined)
      return false;
    if(type.prototype.error == undefined)
      return false;
    return true;
  }

  findInput():HTMLInputElement | undefined{
    var dom = ReactDOM.findDOMNode(this) as HTMLInputElement;
    if(dom == undefined || dom == null)
      return undefined
    if(dom.tagName != "INPUT")
      dom = dom.querySelector("input") as HTMLInputElement;
    return dom;
  }
  autoValidate:boolean = false;
  validate(args:any=null): boolean {
    var dom = this.findInput();
    if(dom == undefined || dom == null)
      return true;
    var tmpValue = dom.value;

    var arr = this.props.children as Array<any>;
    var ret = true;
    var errs = "";
    for(var p of arr){
      if(this.isValidityControl(p.type)){
        //console.log(p);
        var r = p.type.prototype.validate.bind(p)(tmpValue);
        var e = p.type.prototype.error.bind(p)(this.props.id);
        ret = ret && r;
        if(!r)errs += e;
      }
    }

    if(!ret){
      dom.classList.add("has-error");
      dom.onchange = ()=>{this.validate();}
      dom.onfocus = ()=>{this.validate();}
      dom.onpaste = ()=>{this.validate();}
      dom.oncut = ()=>{this.validate();}
      dom.oncopy = ()=>{this.validate();}
      dom.onclick = ()=>{this.validate();}
      dom.oninput = ()=>{this.validate();}
    }else{
      dom.classList.remove("has-error");
    }
    //console.log(`validate value:${tmpValue} ret:${ret} errs:${errs}`);
    this.setState({error:errs,success:ret});
    return ret;
  }

  error(): string {
    return this.state.error;
  }
}

export {
  Required,IsPhone,IsEmail,IsAccount,IsMobile,IsMatch,IsIpAddress
};


/**
 * 
import React,{ Component } from "react";
import ReactDOM  from "react-dom";
import { DatePicker, Button, Input, Checkbox, message, Form, Row, Col } from 'antd';
import { Loading, RenderLoading } from "utils/Loading";
import { ReactNodeArray } from "prop-types";
import { Validator,Required, VComponent } from "utils/Validator";

class Panel extends VComponent<any,{loading:boolean}>{

  onLoadingError(err:any){
    console.log(err);
    message.error(`${err}`);
  }

  @Loading()
  async onPost(){
      if(!this.validate())
        return;
  }

  @RenderLoading()
  render(){
    return (
      <div>
        <Row>
          <Col>aaa:</Col>
          <Col>
            <Validator container={this} id="userName">
              <DatePicker/>
              <Required msg="用户名为必填项"/>
            </Validator>
          </Col>
        </Row>
        <Button loading={this.state.loading} onClick={this.onPost.bind(this)}>Submit</Button>
      </div>
    );
  }
}

ReactDOM.render(<Panel />, document.getElementById("app"))

 */

