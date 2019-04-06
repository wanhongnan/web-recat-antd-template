
/**
 * 使用异步延时
 * @param time 延时时间
 * 
 * 例：启动一个循环定时任务，不需要使用setTimeout，使用起来非常方便
   (async()=>{
     while(true){
        await delay(1000);
        console.log("test");
     }
   })()
 * 
 */
export async function delay(time:number):Promise<any>{
  return new Promise((reslove)=>{
    setTimeout(()=>{reslove()},time);
  });
}


