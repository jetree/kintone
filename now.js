(function(){
  'use strict'
  console.log('now.js')

   //発動するイベントを定義
   let Events = [
     'app.record.create.show'
   ]

   kintone.events.on(Events,function(event){
      console.log('ok')
     let startButton = document.createElement('button')
     startButton.innerHTML = '現在時刻を取得'
     startButton.style.height = '33px'
     startButton.style.marginTop = '40px'
    
     let endButton = document.createElement('button')
     endButton.innerHTML = '現在時刻を取得'
     endButton.style.height = '33px'
     endButton.style.marginTop = '40px'

     kintone.app.record.getSpaceElement('startButton').appendChild(startButton)
     kintone.app.record.getSpaceElement('endButton').appendChild(endButton)
    
     startButton.onclick = function(){
       let record = kintone.app.record.get();
       let now = new Date()
       let nowTime = now.getHours() + ":" + now.getMinutes()
       // event.record.startTime.value = nowTime
       record['record']['startTime']['value'] = nowTime
       kintone.app.record.set(record);
     }

     endButton.onclick = function(){
       let record = kintone.app.record.get();
       let now = new Date()
       let nowTime = now.getHours() + ":" + now.getMinutes()
       // event.record.startTime.value = nowTime
       record['record']['endTime']['value'] = nowTime
       kintone.app.record.set(record);
     }
     
    return event
   })

})();