window.onload = function(){
   
    let speed = 10;   //ルーレットの回転速度
    let divide = 5;   //ルーレットの分割数
    let timeout = 2000;   //○秒後に停止
    
    //停止位置の設定。1～360までの乱数を取得して挿入する
    let stopAngle = Math.round(Math.random () * 360 + 0.5);
    
    //ルーレットの角度の変数。停止位置の値を初期値に設定する
    let angle = stopAngle;
    
    //ルーレットの分割数から1エリア分の角度を求める。今回は5分割なので72が入ってます
    let section = 360/divide;
    
    //停止位置がどのエリアにあるか調べ、該当する番号をstopNumberに格納
    for(i=1; i<=divide; i++){
       if(section*(i-1)+1 <= stopAngle && stopAngle <= section*i) {
          stopNumber = i;
       }
    };
    
    
    //クルクル処理。5ミリ秒毎にspeedの数値分画像が回転します。
    let rotation = setInterval(function(){
       $("#mato").rotate(angle);
       angle += speed;
    }, 5);
    
    
    //timeout秒後に停止させる処理
    setTimeout(function(){
       
       //クルクル処理をしているsetIntervalをclear
       clearInterval(rotation);
       
       //setIntervalで増えた余分な数値を減らし、逆回転を防ぐためにマイナス値にする
       angle = angle%360-360;
       
       //停止位置までのアニメーション。完了するとresult()が実行される
       $("#mato").rotate({
          angle: angle, 
          animateTo: stopAngle,
          callback: result
       });
     }, timeout);
     
     
     //ルーレット停止後に実行される処理
     let result = function(){
        switch(stopNumber){
           
           //1の時の処理
           case 1:
             $("#result span").text("①でした！")
             break;
           
           //2の時の処理
           case 2:
             $("#result span").text("②でした！")
             break;
           
           //3の時の処理
           case 3:
             $("#result span").text("③でした！")
             break;
           
           //4の時の処理 
           case 4:
             $("#result span").text("④でした！")
             break;
           
           //5の時の処理
           case 5:
             $("#result span").text("⑤でした！")
             break;
        };
     };
 };