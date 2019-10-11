(function(){
  'use strict'
  
  // 作業時間の欄は自動計算にするため、手入力不可
  kintone.events.on(['app.record.create.show','app.record.edit.show'],function(event){
      event.record.workTime.disabled = true
      return event
  })
  
  //発動するイベントを定義
  let Events = [
       'app.record.create.change.startTime',
       'app.record.edit.change.startTime',
       'app.record.create.change.endTime',
       'app.record.edit.change.endTime'
   ]
  
   //休憩時間を定義
  const lunchTime = new BreakTime("12:00","12:45")
  const breakTimeA = new BreakTime("10:30","10:35")
  console.log(lunchTime)
  

  kintone.events.on(Events,function(event){
       let record = event.record
       let startTime = record.startTime.value
       let endTime = record.endTime.value
       let workTime 
       
       //スタート時間・エンド時間がそれどれ入力された時のみ発動
       if(typeof startTime !== "undefined" && typeof endTime !== "undefined"){
           let startTime_s = getSeconds(startTime)
           let endTime_s =  getSeconds(endTime)

           let cheakLunchTime = cheakTime(startTime_s,endTime_s,lunchTime)
           let cheakBreakTimeA = cheakTime(startTime_s,endTime_s,breakTimeA)
           let allBreakTime = cheakLunchTime + cheakBreakTimeA

           workTime = ( endTime_s - startTime_s - allBreakTime) / 60
           record.workTime.value = workTime
       }
       
       return event
  })
   
  //ex 9:00を秒に直す
  function getSeconds (time){
    let splitTime = time.split(":")
    let seconds = splitTime[0] * 3600 + splitTime[1] * 60 
    return seconds
  }

//休憩時間オブジェクトを生成
  function BreakTime(start,end){
      let start_s = getSeconds(start)
      let end_s = getSeconds(end)
      let obj_breakTime = {
          start : start_s,
          end : end_s,
          time : end_s - start_s
      }
      return obj_breakTime
  }

  //休憩時間を含むかどうかチェックする
  function cheakTime(start,end,obj_time){
    if(start <  obj_time.start && obj_time.end < end){
      return obj_time.time
    }else{
      return 0
    }
  }


})();