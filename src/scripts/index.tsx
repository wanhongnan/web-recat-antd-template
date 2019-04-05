import React,{ Component } from "react";
import ReactDOM  from "react-dom";
import { DatePicker, Button, Input, Checkbox, message, Form, Row, Col } from 'antd';
import { Loading, RenderLoading } from "utils/Loading";
import { ReactNodeArray } from "prop-types";
import { Validator,Required, VComponent, IsAccount } from "utils/Validator";
import { delay } from "./utils";

class Panel extends VComponent<any,{loading:boolean}>{

  onLoadingError(err:any){
    console.log(err);
    message.error(`${err}`);
  }

  @Loading()
  async onPost(){
      if(!this.validate())
        return;
    await delay(1000);
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
              <IsAccount/>
            </Validator>
          </Col>
        </Row>
        <Button loading={this.state.loading} onClick={this.onPost.bind(this)}>Submit</Button>
      </div>
    );
  }
}

ReactDOM.render(<Panel />, document.getElementById("app"))

