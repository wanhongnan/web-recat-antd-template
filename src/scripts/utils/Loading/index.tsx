import React from "react";
import './style.less'

type onLoadingErrorCallback = (err:any) => void;

/**
 * 注意： 添加 onLoadingError(err:any){} 函数可以处理Loading的错误及异常结果
 * 例：
 *  onLoadingError(err:any){
 *    console.log(err);
 *    alert(err);
 *  }
 *  @Loading()
 *  async onDateChange(){
 *      var ret = await fetch("http://34.92.124.146:5000/provider/all");
 *      var text = await ret.json();
 *      console.log(text);
 *  }
 */
export function Loading(){
  //console.log("loading function inited.")
  return  function(target:any, name:any, descriptor:any) {
      var oldValue = descriptor.value;
      if(target.state == undefined)
        target.state = { loading: false }
      else
        target.state.loading = false;
      descriptor.value = function() {
          //console.log(`Calling "${name}" with`, arguments);
          this.setState({loading:true});
          var comp = this;
          var onLoadingError : onLoadingErrorCallback = this.onLoadingError != undefined ? (e:any)=>{try{this.onLoadingError(e)}catch{}} : ()=>{};
          var promise =  oldValue.apply(this, arguments);
          var newPromise = new Promise((reslove,reject)=>{
              promise.then((data:any)=>{
                comp.setState({loading:false});
                reslove(data);
              },(err:any)=>{
                comp.setState({loading:false});
                reslove(err);
                onLoadingError(err);
              }).catch((e:any)=>{
                comp.setState({loading:false});
                reslove(e);
                onLoadingError(e);
              });
          });
          return newPromise;
      };
       
      return descriptor;
  }
}

/**
 * 使用在render()函数上
 */
export function RenderLoading(){
  return  function(target:any, name:any, descriptor:any) {
      var oldValue = descriptor.value;
      descriptor.value = function() {
          //console.log(`Calling "${name}" with`, arguments);
          var component =  oldValue.apply(this, arguments);
          var loading = this.state.loading;
          var loadingDiv = 
          <div className='loading__show south-loading'>
            <div className="loading__show south-loading">
                <div className="south-loading-center">
                  <div className="south-loading-center-absolute">
                    <div className="object south-object_four"></div>
                    <div className="object south-object_three"></div>
                    <div className="object south-object_two"></div>
                    <div className="object south-object_one"></div>
                  </div>
                </div>
              </div>
          </div>;
          return (
              <div>
                {loading? loadingDiv:null}
                {component}
              </div>
          );
      };
       
      return descriptor;
  }
}

/**
 * 例程：
import React,{ Component } from "react";
import ReactDOM  from "react-dom";
import { DatePicker, Button } from 'antd';
import { Loading, RenderLoading } from "utils/Loading";

class Panel extends Component<{},{loading:boolean}>{
  onLoadingError(err:any){
    console.log(err);
    //alert(err);
  }

  @Loading()
  async onDateChange(){
      var ret = await fetch("http://www.baidu.com/");
      var text = await ret.json();
      console.log(text);
  }

  @RenderLoading()
  render(){
    return (
      <div>
        <Button loading={this.state.loading}>ABC</Button>
        <DatePicker onChange={this.onDateChange.bind(this)}/>
      </div>
    );
  }
}

ReactDOM.render(<Panel />, document.getElementById("app"))
 */

