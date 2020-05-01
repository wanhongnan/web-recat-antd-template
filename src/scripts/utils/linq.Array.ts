/*
 * ********************************************************************************************************************************
 * 作    者   ： South
 * 版    本   :  1.0.0.0
 * 创建日期   :  2020/04/19
 * 说    明   :  linq集合操作
 * --------------------------------------------------------------------------------------------------------------------------------
 * 版本         修改日期         作者            说明         
 * 1.0.0.0      2020/04/19        South           创建
 * ********************************************************************************************************************************
 */

import { Collection } from "./linq.Collection";

Array.prototype.select = Array.prototype.map;
Array.prototype.where = Array.prototype.filter;
Array.prototype.first = function(predicate?, defaultValue?):any{
    var arr = this as Array<any>;
    if(predicate === undefined || predicate === null){
        if(arr.length === 0)return defaultValue;
        return arr[0];
    }
    var idx = arr.findIndex((value: any, index: number, objs: any[])=>predicate(value, index, objs));
    if(idx == -1)return defaultValue;
    return arr[idx];
}
Array.prototype.last = function(predicate?, defaultValue?):any{
    var arr = this as Array<any>;
    if(predicate === undefined || predicate === null){
        if(arr.length === 0)return defaultValue;
        return arr[arr.length-1];
    }
    // var idx = arr.lastIndexOf((value: any, index: number, objs: any[])=>predicate(value, index, objs));
    for (let index = arr.length-1; index >= 0; index++) {
        const value = arr[index];
        if(predicate(value, index, arr))
            return value;
    }
    return defaultValue;
}
Array.prototype.expend = function(callback): any[]{
    var arrS = this as Array<any>;
    var arrU = Array<any>();
    arrS.forEach((value: any, index: number, array: any[])=>{
        var subArrU = callback(value,index,array);
        if(!subArrU && Array.isArray(subArrU)){
            (subArrU as Array<any>).forEach(u=>{
                arrU.push(u)
            })
        }
    })
    return arrU;
}
Array.prototype.distinct = function(callback): any[]{
    var arrS = this as Array<any>;
    var map = new Map<any,any>();
    arrS.forEach((value: any, index: number, array: any[])=>{
        if(callback){
            var id = callback(value,index,array);
            map.set(id,value);
        }else{
            map.set(value,value);
        }
    })
    var ret = new Array<any>();
    map.forEach(f=>{
        ret.push(f);
    })
    return ret;
}

Array.prototype.maxBy = function(callback?,defaultValue?: any): any{
    var arrS = this as Array<any>;
    var arrU = new Array<{compareValue:any,value:any}>();
    arrS.forEach((value: any, index: number, array: any[])=>{
        var u = null;
        if(callback){
            u = callback(value,index,array);
        }else{
            u = value;
        }
        arrU.push({compareValue:u,value:value});
    })
    if(arrU.length === 0)return defaultValue;
    var ret = arrU[0];
    arrU.forEach(f=>{
        if(f.compareValue.compare){
            if(f.compareValue.compare(ret) > 0){
                ret = f;
            }
        }else{
            if(f > ret){
                ret = f;
            }
        }
    })
    return ret.value;
}

Array.prototype.minBy = function(callback?,defaultValue?: any): any{
    var arrS = this as Array<any>;
    var arrU = new Array<{compareValue:any,value:any}>();
    arrS.forEach((value: any, index: number, array: any[])=>{
        var u = null;
        if(callback){
            u = callback(value,index,array);
        }else{
            u = value;
        }
        arrU.push({compareValue:u,value:value});
    })
    if(arrU.length === 0)return defaultValue;
    var ret = arrU[0];
    arrU.forEach(f=>{
        if(f.compareValue.compare){
            if(f.compareValue.compare(ret) < 0){
                ret = f;
            }
        }else{
            if(f < ret){
                ret = f;
            }
        }
    })
    return ret.value;
}


Array.prototype.rand = function(defaultValue?): any{
    var arrS = this as Array<any>;
    if(arrS.length === 0)return defaultValue;
    var idx = Math.floor((Math.random() * arrS.length));
    var ret = arrS[idx];
    return ret;
}

Array.prototype.groupBy = function(callback: (value: any, index: number, objs: readonly any[]) => any ): Array<{key:any,value:any}>{
    var arrS = this as Array<any>;
    var map = new Map<any,any[]>();
    arrS.forEach((value: any, index: number, array: any[])=>{
        var key = callback(value,index,array);
        var items = map.get(key) || [];
        items.push(value);
        map.set(key,items);
    })
    var ret = new Array<{key:any,value:any}>();
    map.forEach((f,k)=>{
        ret.push({key:k,value:f});
    })
    return ret;
}

Array.prototype.each = function(callback?): any[]{
    var arrS = this as Array<any>;
    arrS.forEach((value: any, index: number, array: any[])=>{
        callback(value,index,array);
    })
    return arrS;
}

Array.prototype.sortByAsc = function(callback): any[]{
    var arrS = this as Array<any>;
    var ret = arrS.clone();
    ret.sort((a,b)=>compare(callback(a),callback(b)));
    return ret;
}

Array.prototype.sortByDsc = function(callback): any[]{
    var arrS = this as Array<any>;
    var ret = arrS.clone();
    ret.sort((a,b)=>-compare(callback(a),callback(b)));
    return ret;
}

Array.prototype.any = function(predicate):boolean{
    var arr = this as Array<any>;
    if(predicate === undefined || predicate === null){
        return true;
    }else if(arr.length == 0){
        return true;
    }
    var idx = arr.findIndex((value: any, index: number, objs: any[])=>predicate(value, index, objs));
    if(idx == -1)return false;
    return true;
}

Array.prototype.all = function(predicate):boolean{
    var arr = this as Array<any>;
    if(predicate === undefined || predicate === null){
        return true;
    }else if(arr.length == 0){
        return true;
    }
    var ret = true;
    arr.forEach((value,index,objs)=>{
        ret = ret && predicate(value, index, objs);
    })
    return ret;
}

Array.prototype.clone = function(): any[]{
    var arrS = this as Array<any>;
    var ret = new Array<any>();
    arrS.forEach(f=>{
        ret.push(f);
    })
    return arrS;
}

// Array.prototype.collection = function(): Collection<any>{
//     var arr = this as Array<any>;
//     return new Collection(arr.values());
// }

// Object.prototype.collection =   function():  Collection<KValue<string,any>>{
//     var This = Object.entries(this);
//     var fun = function*(arr: [string, any][]){
//         for (const item of arr) {
//             var ret = {
//                key:  item[0],
//                value: item[1]
//             } as KValue<string,any>;
//             yield ret;
//         }
//     }
//     return new Collection(fun(This));
// }


function compare(a:any, b:any):number{
    var ret:number = 0;
    var ac = a as ICompare<any>;
    var bc = b as ICompare<any>;
    if((ac == null || ac == undefined) && (bc == null || bc == undefined) ){
        return 0;
    }else if(ac == null || ac == undefined){
        return -1;
    }else if(bc == null || bc == undefined){
        return 1;
    }
    if(ac.compare && bc.compare && typeof(ac.compare) == "function" && typeof(bc.compare) == "function"){
        return ac.compare(bc);
    }else{
        if(a > b)return 1;
        else if(a < b)return -1;
        else return 0;
    }
}
export {
    compare
}


