import React,{ Component, Suspense } from "react";
import ReactDOM  from "react-dom";
import { DatePicker, Button, Input, Checkbox, message, Form, Row, Col } from 'antd';
import { Loading, RenderLoading } from "utils/Loading";
import { ReactNodeArray } from "prop-types";
import { Validator,Required, VComponent, IsAccount } from "utils/Validator";
import { delay } from "./utils";
import { withTranslation, Trans } from 'react-i18next';
import WebcomeLoading from "./sys";
import { changeLanguage, t } from "./sys/i18n";

class Panel extends VComponent<any,{loading:boolean}>{
  onLoadingError(err:any){
    console.log(err);
    message.error(`${err}`);
  }

  i = 0;
  @Loading()
  async onPost(){
    //   if(!this.validate())
    //     return;
    this.i ++;
    if(this.i % 2 == 0)
      await changeLanguage("en_US");
    else
      await changeLanguage("zh_CN");
  }

  @RenderLoading()
  render(){
    return (
      <div>
        <div>{t('description.part2')}</div>
        <Row>
          <Col>aaa:</Col>
          <Col>
            <Validator container={this} id="userName">
              <Input/>
              <Required msg="用户名为必填项"/>
              <IsAccount/>
            </Validator>
            <DatePicker></DatePicker>
          </Col>
        </Row>
        <Button loading={this.state.loading} onClick={this.onPost.bind(this)}>Submit</Button>
      </div>
    );
  }
}

function App() {
  return (
    <WebcomeLoading>
      <Panel></Panel>
    </WebcomeLoading>
  );
}

ReactDOM.render(<App />, document.getElementById("app"))

