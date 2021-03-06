
export class Collection<T> implements Iterator<T>{
    constructor(
        public  iterator: Iterator<T>,
        private offset: number = 0,
        private cache: any[] = []
    ){}
    [Symbol.iterator](): Iterator<T> {
        return this.iterator;
    }
    next(...args: [] | [any]): IteratorResult<T>{
        if(this.offset < this.cache.length){
            return this.cache[this.offset++];
        }else{
            var ret = this.iterator.next(...args);
            this.cache[this.offset++] = ret;
            return ret;
        }
    }
    return?(value?: any): IteratorResult<T>{
        if(this.iterator.return)
            return this.iterator.return(value);
        throw "no return function";
    }
    throw?(e?: any): IteratorResult<T>{
        if(this.iterator.throw)
            return this.iterator.throw(e);
        throw "no return throw";   
    }
    private _resetOffset(){
        this.offset = 0;
    }
    where(predicate: (value: T, index: number) => boolean):Collection<T>{
        var range = this;
        var coll = function*(predicate: (value: T, index: number) => boolean){
            range._resetOffset();
            while(true){
                var item = range.next();
                if(!item.done && predicate(item.value, range.offset))
                    yield item.value
                if(item.done)break;
            }
        }
        return new Collection<T>(coll(predicate));
    }
    take(count: number):Collection<T>{
        var range = this;
        var coll = function*(count:number){
            range._resetOffset();
            while(range.offset<count){
                var item = range.next();
                if(!item.done)
                    yield item.value
                else
                    break;
            }
        }
        return new Collection<T>(coll(count));
    }
    skip(count: number):Collection<T>{
        var range = this;
        var coll = function*(count:number){
            range._resetOffset();
            while(range.offset < count){
                range.next();
            }
            while(true){
                var item = range.next();
                if(!item.done)
                    yield item.value
                else
                    break;
            }
        }
        return new Collection<T>(coll(count));
    }
    toArray():Array<T>{
        var range = this;
        var ret = new Array<T>();
        range._resetOffset();
        while(true){
            var item = range.next();
            if(item.done)
                break;
            ret.push(item.value);
        }
        return ret;
    }
    select<U>(callback: (value: T, index: number) => U): Collection<U>{
        var range = this;
        var coll = function*(callback: (value: T, index: number) => U){
            range._resetOffset();
            while(true){
                var item = range.next();
                if(!item.done)
                    yield callback(item.value, range.offset);
                else
                    break;
            }
        }
        return new Collection<U>(coll(callback));
    }
    count():number{
        var range = this;
        while(true){
            var item = range.next();
            if(item.done)
                break;
        }
        return this.cache.length;
    }
    first(predicate?: (value: T, index?: number) => boolean, defaultValue?: T): T | undefined{
        var range = this;
        range._resetOffset();
        var i = 0;
        while(true){
            var item = range.next();
            if(!item.done){
                if(!predicate)
                    return item.value
                else if(predicate(item.value, i))
                    return item.value
            }
            if(item.done)break;
            i++;
        }
        return defaultValue;
    }
    last(predicate?: (value: T, index?: number) => boolean, defaultValue?: T): T | undefined{
        var range = this;
        var ret = defaultValue;
        if(predicate){
            range._resetOffset();
            while(true){
                var item = range.next();
                if(!item.done){
                    if(!predicate)
                        ret = item.value
                    else if(predicate(item.value, this.offset))
                        ret = item.value
                }
                if(item.done)break;
            }
        }else{
            while(true){
                var item = range.next();
                if(item.done)break;
            }
            if(this.cache.length>0)
                ret = this.cache[this.cache.length-1];
        }
        return ret;
    }
    expend<U extends any>(callback: (value: T, index: number) => Iterator<U> | Array<U>) : Collection<U>{
        var range = this;
        var coll = function*(callback: (value: T, index: number) => Iterator<U>| Array<U>){
            range._resetOffset();
            while(true){
                var item = range.next();
                if(!item.done){
                    var subItems = callback(item.value, range.offset);
                    var ucoll;
                    if(Array.isArray(subItems)){
                        ucoll = new Collection(subItems.values())
                    }else{
                        ucoll = new Collection(subItems)
                    }
                    while(true){
                        var uitem = ucoll.next();
                        if(!uitem.done){
                            yield uitem.value;
                        }else{
                            break;
                        }
                    }
                }
                else{
                    break;
                }
            }
        }
        return new Collection<U>(coll(callback));
    }
}


var nmCount:number = 0;
function *rangeMN(base:number){
  var n = 0;
  while(true){
    n++;
    var ret = base*n*n + 1;
    nmCount++;
    console.log(`nmCount:${nmCount} : ${ret}`)
    yield ret;
  }
}


export class CollectionTest{
    static test1(){
        console.log("abc")
        var range = new Collection(rangeMN(5));
        var ret;
        // ret = range.take(2).toArray();
        // console.log(ret);
        var classes = range.take(15)
            .where(f=> f % 2 == 0).where(f=> f < 500).take(5)
            .select((f,i)=>{
                return {
                    id:f,
                    name:`班级${i}`,
                    students: [`班级${i}:student:${f}-1`,`班级${i}:student:${f}-2`,`班级${i}:student:${f}-3`]
                }
            });
        // ret = classes.toArray();
        // console.log(ret);
        var students = classes.expend(f=>f.students).skip(2).take(2);
        console.log(students.toArray());
    
        // for (let i = 0; i < 10; i++) {
        //   var pageSize = 5;
        //   var tmp = range.where(f=> f % 2 == 0).skip(i*pageSize).take(pageSize);
        //   console.log(`page:${i}`);
        //   console.log(tmp.toArray());
        // }
    
    }
}




