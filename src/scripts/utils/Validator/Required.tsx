import React,{ Component } from "react";
import ReactDOM  from "react-dom";
import { DatePicker, Button, Input, Checkbox, message, Form, Row, Col } from 'antd';
import { Loading, RenderLoading } from "utils/Loading";
import { ReactNodeArray, string } from "prop-types";
import IValidity from "./IValidity";

export default class Required extends Component<{msg?:string},any> implements IValidity {

  constructor(props:any){
    super(props);
  }
  
  render(){
    return (null);
  }

  validate(value: string): boolean {
    if(value == undefined || value == null || value.trim() == "")
      return false;
    return true;
  }
  
  error(): string {

    if(this.props.msg != undefined)
      return this.props.msg as string;
    return `必填项`;
  }
}


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
              <Input/>
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


 