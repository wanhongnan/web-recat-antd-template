
type VoidCallback = (params?: any)=>void;
type ValueChanged<T> = (value:T, params?: any)=>void;

export class VoidListener{
    _callbacks = Array<{
      cb: VoidCallback,
      target: any,
      params: any
    }>();
    fire(){
      try {
        this._callbacks.forEach((f)=>f.cb.bind(f.target)(f.params));
        if(this._parentListener != null){
          this._parentListener.fire();
        }
      } catch (error) {
        cc.error(error);
      }
    }
    on(callback:VoidCallback, target:any, params?: any){
      this._callbacks.push({
        cb : callback,
        target : target,
        params : params
      });
    }
    off(callback: VoidCallback, target: any){
      var idx = this._callbacks.findIndex((i)=>i.cb === callback && i.target === target);
      if(idx != - 1){
        this._callbacks.splice(idx,1);
      }
    }
  
    _parentListener:VoidListener;
    setParent(parent:VoidListener){
      this._parentListener = parent;
    }
  }
  
  export class ValueChangedListener<T>{
    _callbacks = Array<{
      cb : ValueChanged<T>,
      target: any,
      params: any
    }>();
    fire(value:T){
      try {
        this._callbacks.forEach((f)=>f.cb.bind(f.target)(value,f.params));
        if(this._parentListener != null){
          this._parentListener.fire();
        }
      } catch (error) {
        cc.error(error);
      }

    }
    on(callback: ValueChanged<T>, target:any, params?: any){
      this._callbacks.push({
        cb: callback,
        target: target,
        params: params
      });

    }
    off(callback: ValueChanged<T>,target: any){
        var idx = this._callbacks.findIndex((i)=>i.cb === callback && i.target === target);
        if(idx != - 1){
          this._callbacks.splice(idx,1);
        }
    }
  
    _parentListener:VoidListener;
    setParent(parent:VoidListener){
      this._parentListener = parent;
    }
  }

