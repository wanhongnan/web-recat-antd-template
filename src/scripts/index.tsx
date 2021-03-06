import React,{ Component, Suspense } from "react";
import ReactDOM  from "react-dom";
import { DatePicker, Button, Input, Checkbox, message, Form, Row, Col } from 'antd';
import { Loading, RenderLoading } from "utils/Loading";
import { ReactNodeArray } from "prop-types";
import { Validator,Required, VComponent, IsAccount } from "utils/Validator";
import { delay } from "./utils";
import { withTranslation, Trans } from 'react-i18next';
import WebcomeLoading from "utils/WebcomeLoading";
import {i18n} from "utils/i18n";
import 'pages/'
import { HashRouter, Switch, Link, BrowserRouter } from "react-router-dom";
import { SwitchMap } from "utils/RouteMap";

class Panel extends VComponent<any,{loading:boolean}>{
  onLoadingError(err:any){
    console.log(err);
    message.error(`${err}`);
  }

  i = 0;
  @Loading()
  async onPost(){

    this.i ++;
    if(this.i % 2 == 0)
      await i18n.change("en_US");
    else
      await i18n.change("zh_CN");

    if(!this.validate())
      return;
  }

  @RenderLoading()
  render(){
    return (
      <div>
        <div>{i18n.t('description.part2')}</div>
        <Row>
          <Col>aaa:</Col>
          <Col>
            <Validator container={this} id="userName">
              <DatePicker/>
              <Required/>
            </Validator>
            <DatePicker></DatePicker>
          </Col>
        </Row>
        <Button loading={this.state.loading} onClick={this.onPost.bind(this)}>Submit</Button>
        <HashRouter>
          <SwitchMap></SwitchMap>
          <Link to="/index/abc">A1</Link>
          <Link to="/index/abc2">A2</Link>
          <Link to="/index/abc3">A3</Link>
          <Link to="/index/abc4">A4</Link>
        </HashRouter>
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

