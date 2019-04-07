

import { Component, Suspense } from "react";
import React from "react";
import { withTranslation } from "react-i18next";
const { LocaleProvider, locales } = (window as any).antd;
import {i18n} from "../i18n";

i18n.init("zh_CN");

const Loader = () => (
  <div>
    <div>loading...</div>
  </div>
);

class Tran extends Component<any,any>{
  render(){
    return (
      this.props.children
    );
  }
}
const I18nLoader = withTranslation()(Tran);

export default class WebcomeLoading extends Component<any,any>{
  
  constructor(props:any){
    super(props);
    i18n.registChanged(this.langChanged.bind(this));
    this.state = {lng:i18n.lang()};
  }

  langChanged(){
    this.setState({lng:i18n.lang()});
  }

  render(){
    var {lng} = this.state;
    return (
      <Suspense fallback={<Loader />}>
          <I18nLoader>
            <LocaleProvider locale={locales[lng]}>
              {this.props.children}
            </LocaleProvider>
          </I18nLoader>
      </Suspense>
    );
  }
}
