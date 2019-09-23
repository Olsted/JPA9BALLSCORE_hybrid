//history.html用js

function makeTable(tableId,detailFlg){
  
    // document.getElementById('loading').innerHTML = 'Now loading...';

    // 表の作成開始
    var rows=[];
    var table = document.createElement("table");
    var img;
    var txt;
    var inning = 0;
    var dead = 0;
    var rack = 0;
    var oddSet = 0;
    var scoreL = 0;
    var scoreR = 0;
    var goalL = 0;
    var goalR = 0;
    // console.log('banking: ' + localStorage.getItem(localStorage.key(BANKINGRESULT)));

    var pNameL = localStorage.getItem(searchKey(STRG_PNAMEL));
    var pNameR = localStorage.getItem(searchKey(STRG_PNAMER));
    
    var bankingWinner;
    for(var key = 0; key < localStorage.length; key++){
      bankingWinner = localStorage.getItem(searchKey(key));
      if(bankingWinner.match(new RegExp('.to[L|R]'))!=null){
        break;
      }
    }

    var skillL = localStorage.getItem(searchKey(STRG_SKILLL));
    var skillR = localStorage.getItem(searchKey(STRG_SKILLR));

    var rule = localStorage.getItem(searchKey(STRG_DBL));


    // 表に2次元配列の要素を格納
    for(i = 0; i < LOG_DEADROW+1; i++){
      rows.push(table.insertRow(-1));  // 行の追加
      oddSet = 0; // 奇数行かどうかの判別

      // これまでの操作分履歴作成
      for(j = START; j < localStorage.length; j++){

        if(j >= BANKINGRESULT-1 && j != BANKINGRESULT){ // 冒頭の設定と初回の手番交代は描画しない
          var leftFlag = true;  // 
          cell=rows[i].insertCell(-1);  // 最後尾(右)にセル追加
          // console.log('act: ' + localStorage.getItem( localStorage.key(j)));

          var log = localStorage.getItem(searchKey(j));  // 操作履歴取得
          var actIndex = ACTARRAY.indexOf(log); // 操作種別判定
          var rackIndex = getRackStartIndex(j);

          // var inningFromL = calcLog('.toL',rackIndex,j+1);
          // var inningFromR = calcLog('.toR',rackIndex,j+1);
          // console.log('inningL: ' + inningFromL);
          // console.log('inningR: ' + inningFromR);

          img = document.createElement('img');
          img.style.width = '5vw';

          if(detailFlg == true || actIndex == START_HEAD ||actIndex == NEXT_HEAD || actIndex == END_HEAD){  // Detail画面でない場合はセットの区切りのみ描画
            // console.log('detail');
            // ここから記録内容を判定して分類
            // 試合開始時最初の列
            if(actIndex == START_HEAD){
              inning = 0;
              dead = 0;

              cell.style.textAlign = 'left';
              cell.style.color = 'rgb(255,255,255)';
              cell.style.backgroundColor = 'rgb(3, 3, 3)';
              // セットの行
              if(i == LOG_RACKROW){
                rack++; // セットカウントアップ
                txt = document.createTextNode('S: Set');
                // cell.style.fontSize = '1.2em';
                // fragment.appendChild(txt);
              // 左プレイヤーの行
              }else if(i == LOG_LEFTROW){
                // txt = document.createTextNode('L: ' + localStorage.getItem(localStorage.key(STRG_PNAMEL)).split(':')[1].substr(0,5));
                // txt = document.createTextNode('L: ' + localStorage.getItem(searchKey(STRG_PNAMEL)).split(':')[1].substr(0,5));
                txt = document.createTextNode('L: ' + pNameL.split(':')[1].substr(0,5));
                // cell.style.fontSize = '1.2em';
                cell.style.textAlign = 'left';
              // 右プレイヤーの行
              }else if(i == LOG_RIGHTROW){
                // txt = document.createTextNode('R: ' + localStorage.getItem(searchKey(STRG_PNAMER)).split(':')[1].substr(0,5));
                txt = document.createTextNode('R: ' + pNameR.split(':')[1].substr(0,5));
                // cell.style.fontSize = '1.2em';
                cell.style.textAlign = 'left';
              // イニングの行
              }else if(i == LOG_INNINGROW){
                txt = document.createTextNode('I: Inning');
                // cell.style.fontSize = '1.2em';
              // 無効球の行
              }else if(i == LOG_DEADROW){
                txt = document.createTextNode('D: Dead');
                // cell.style.fontSize = '1.2em';
              }
              cell.appendChild(txt);  // ここで実際に描画

            // どちらかのプレイヤーが球を落とした列
            }else if((actIndex >= LSHOOT_HEAD && actIndex <= LSHOOT_TAIL) || (actIndex >= RSHOOT_HEAD && actIndex <= RSHOOT_TAIL)){

              var turn;
              var head;
              // 左プレイヤーが球を落とした
              if(actIndex >= LSHOOT_HEAD && actIndex <= LSHOOT_TAIL){
                if (i == LOG_LEFTROW){  // 左プレイヤーの行でのみ描画
                  img.src = 'img/no' + (actIndex - LSHOOT_HEAD + 1) + 'trans.png';
                  cell.appendChild(img);
                  // fragment.appendChild(img);
                }
              // 右プレイヤーが球を落とした
              }else{
                if(i == LOG_RIGHTROW){  // 右プレイヤーの行でのみ描画
                  img.src = 'img/no' + (actIndex - RSHOOT_HEAD + 1) + 'trans.png';
                  cell.appendChild(img);
                  // fragment.appendChild(img);
                }
              }

            // 無効球の列
            }else if(actIndex >= DEAD_HEAD && actIndex <= DEAD_TAIL){
              if(i == LOG_DEADROW){ // 無効球列のみ
                img.src = 'img/no' + (actIndex - DEAD_HEAD + 1) + 'trans.png';
                cell.appendChild(img);
                // fragment.appendChild(img);
              }

            // 手番交代の列
            }else if((actIndex >= SAFETY_HEAD && actIndex <= SAFETY_TAIL) || (actIndex >= CHANGE_HEAD && actIndex <= CHANGE_TAIL)){
              inning++;
              
              // 右プレイヤーがセーフティ
              if(actIndex == SAFETY_HEAD){
                if(i == LOG_RIGHTROW){  // 右プレイヤーの行のみ
                  img.src = 'img/Safety.png';
                  cell.appendChild(img);
                  // fragment.appendChild(img);
                }
              // 右プレイヤーからの手番交代
              }else if(actIndex == CHANGE_HEAD){
                // if(i == LOG_RIGHTROW && j != 1){  // 右プレイヤーの行のみ。後半のはもういらない？
                if(i == LOG_RIGHTROW){  // 右プレイヤーの行のみ。後半の条件を試しに削除
                  img.src = 'img/Change.png';
                  cell.appendChild(img);
                  // fragment.appendChild(img);
                }
              // 左プレイヤーがセーフティ
              }else if(actIndex == SAFETY_TAIL){
                if(i == LOG_LEFTROW){ // 左プレイヤーの行のみ
                  img.src = 'img/Safety.png';
                  cell.appendChild(img);
                  // fragment.appendChild(img);
                }
              // 左プレイヤーからの手番交代
              }else if(actIndex == CHANGE_TAIL){
                // if(i == LOG_LEFTROW && j != 1){  // 同じく後半の判定はもういらない？
                if(i == LOG_LEFTROW){ // 左プレイヤーの行のみ。後半の判定試しに削除
                  img.src = 'img/Change.png';
                  cell.appendChild(img);
                  // fragment.appendChild(img);
                }
              }

              // イニングの行は毎回判定
              if(i == LOG_INNINGROW){
                // まずどちらがバンキング勝ったか(最初の手番交代かセーフティを取得)
                // for(var key = 0; key < localStorage.length; key++){
                //   if(localStorage.getItem(searchKey(key)).match(new RegExp('.to[L|R]'))!=null){
                //     break;
                //   }
                // }
                //ここから関数化できそう
                // toLだったら
                // if(localStorage.getItem(searchKey(key)).slice(-1)=='L'){
                if(bankingWinner.slice(-1)=='L'){
                  // 右プレイヤーがセーフティか手番交代するとき
                  if(actIndex == SAFETY_HEAD || actIndex == CHANGE_HEAD){
                    inning = calcLog('.toL',rackIndex,j+1);  // そのタイミングまでのイニングの数をカウント
                    // inning = inningFromL;  // そのタイミングまでのイニングの数をカウント
                    if(rackIndex == 0){  // 最初のセットでは
                      inning--; // 最初の一回(バンキングの結果)はイニングにカウントしないので引いておく
                    }
                    // イニングが増えたら
                    if(inning > 0){
                      txt = document.createTextNode(inning);
                      cell.style.fontSize = '4vw';
                      cell.appendChild(txt);
                      // fragment.appendChild(txt);
                    // }else{
                    //   console.log('key: ' + key);
                    //   console.log('j: ' + j);
                    }
                  }
                // 右プレイヤーで同様にイニング計算、描画
                }else{
                  if(actIndex == SAFETY_TAIL || actIndex == CHANGE_TAIL){
                    inning = calcLog('.toR',rackIndex,j+1);
                    // inning = inningFromR;
                    if(rackIndex == 0){
                      inning--;
                    }
                    txt = document.createTextNode(inning);
                    cell.appendChild(txt);
                    // fragment.appendChild(txt);
                  }
                }
                // 関数化候補ここまで
              }
              
            // タイムアウトの時
            }else if(actIndex >= TIMEOUT_HEAD && actIndex <= TIMEOUT_TAIL){
              if(actIndex == TIMEOUT_HEAD || actIndex == (TIMEOUT_HEAD + 1)){
                if(i == LOG_LEFTROW){
                  txt = document.createTextNode('T');
                  cell.appendChild(txt);
                }
              }else{
                if(i == LOG_RIGHTROW){
                  txt = document.createTextNode('T');
                  cell.appendChild(txt);
                }
              }

            }else if(actIndex >= BR_HEAD && actIndex <= BR_TAIL){

            }else if(actIndex >= ACE_HEAD && actIndex <= ACE_TAIL){

            }else if(actIndex >= FREE_HEAD && actIndex <= FREE_TAIL){
              if(i == LOG_LEFTROW && actIndex == FREE_HEAD){
                  img.src = 'img/freeball.png';
                  cell.appendChild(img);
              }else if(i == LOG_RIGHTROW && actIndex == FREE_TAIL){
                  img.src = 'img/freeball.png';
                  cell.appendChild(img);
              }
            }else if(actIndex == NEXT_HEAD){
              oddSet++;
              // cell.style.fontSize='1.5em';
              // cell.style.fontSize='3vw';
              cell.style.textAlign = 'center';
              // cell.style.textAlign = 'right';
              // cell.style.backgroundColor = 'rgb(16, 168, 16)';
              cell.style.backgroundColor = 'rgb(3, 3, 3)';
              if(oddSet%2 == 1){
                cell.style.backgroundColor = 'rgb(63, 63, 63)';
              }else{
                cell.style.backgroundColor = 'rgb(93, 93, 93)';
              }
              cell.style.color = 'rgb(255,255,255)';
              if(i == LOG_RACKROW){
                rack++;
                if(detailFlg == true){
                  txt = document.createTextNode('S: ' + (rack - 1));
                }else{
                  txt = document.createTextNode(rack - 1);
                }
                // cell.appendChild(txt);
                // fragment.appendChild(txt);
              }else if(i == LOG_LEFTROW){
                scoreL = calcLog('^L[1-9]',0,j) + calcLog('L9',0,j);
                goalL = POINTARRAY[skillL.slice(2)-1].length;
                // console.log('ScoreL: ' + scoreL);
                // console.log('GoalL: ' + goalL);
                if(rule == 'DBL'){
                  scoreL = scoreL * 2;
                }
                if(goalL < scoreL){
                  scoreL = goalL;
                }

                if(calcLog('LTO1',rackIndex,j+1)){
                  scoreL = 'T ' + scoreL;
                }
                if(calcLog('LTO2',rackIndex,j+1)){
                  scoreL = 'T ' + scoreL;
                }
                if(detailFlg == true){
                  // txt = document.createTextNode('L: ' + scoreL);
                  scoreL = 'L: ' + scoreL;
                // }else{
                  // txt = document.createTextNode(scoreL);
                }
                txt = document.createTextNode(scoreL);
                // txt = document.createTextNode('L: ' + scoreL);
                // cell.appendChild(txt);
                // fragment.appendChild(txt);
              }else if(i == LOG_RIGHTROW){
                scoreR = calcLog('^R[1-9]',0,j) + calcLog('R9',0,j);
                goalR = POINTARRAY[skillR.slice(2)-1].length;
                if(rule == 'DBL'){
                  scoreR = scoreR * 2;
                }
                if(goalR < scoreR){
                  scoreR = goalR;
                }
                if(calcLog('RTO1',rackIndex,j+1)){
                  scoreR = 'T ' + scoreR;
                }
                if(calcLog('RTO2',rackIndex,j+1)){
                  scoreR = 'T ' + scoreR;
                }
                if(detailFlg == true){
                  scoreR = 'R: ' + scoreR;
                // }else{
                //   txt = document.createTextNode(scoreR);
                }
                txt = document.createTextNode(scoreR);
                // txt = document.createTextNode('R: ' + scoreR);
                // txt = document.createTextNode('R: ' + (calcLog('^R[1-9]',0,j) + calcLog('R9',0,j)));
                // cell.appendChild(txt);
                // fragment.appendChild(txt);
              }else if(i == LOG_INNINGROW){
                // console.log('inning calc');
                if(bankingWinner.slice(-1)=='L'){
                  inning = calcLog('.toL',rackIndex,j+1);
                  // inning = inningFromL;
                }else{
                  inning = calcLog('.toR',rackIndex,j+1);
                  // inning = inningFromR;
                }
                if(rackIndex == 0){
                  inning--;
                }
                if(detailFlg == true){
                  txt = document.createTextNode('I: ' + inning);
                }else{
                  txt = document.createTextNode(inning);
                }
                // txt = document.createTextNode('I: ' + inning);
                // cell.appendChild(txt);
                // fragment.appendChild(txt);
                // if(localStorage.getItem(localStorage.key(1)).slice(-1)=='L'){
                //   inning = calcLog('.toL',getRackStartIndex(j),j) - 1;
                // }else{
                //   inning = calcLog('.toR',getRackStartIndex(j),j) - 1;
                // }
                // txt = document.createTextNode(inning);
                // cell.appendChild(txt);
                // txt = document.createTextNode(Math.floor((inning-1)/2));
                // cell.appendChild(txt);
              }else if(i == LOG_DEADROW){
                if(detailFlg == true){
                  txt = document.createTextNode('D: ' + calcLog('^D[1-9]',rackIndex,j));
                }else{
                  txt = document.createTextNode(calcLog('^D[1-9]',rackIndex,j));
                }
                // txt = document.createTextNode('D: ' + calcLog('^D',getRackStartIndex(j),j));
                // cell.appendChild(txt);
                // fragment.appendChild(txt);
              }
              cell.style.width = '6vw';
              cell.appendChild(txt);
              inning = 0;

            }else if(actIndex == END_HEAD){
                // if(detailFlg == true){
                  oddSet++;
                  if(i == LOG_RACKROW){
                    // rack++;
                    var winner;
                    if(localStorage.getItem(searchKey(localStorage.length-2)).substr(0,1)=='L'){
                      winner = 'L';
                    }else{
                      winner = 'R';
                    }

                    txt = document.createTextNode(winner + ' won!');
                    cell.style.width = '7vw';
                    cell.appendChild(txt);
                  }else if(i == LOG_LEFTROW){
                    var scoreL = calcLog('^L[1-9]',0) + calcLog('L9',0);
                    goalL = POINTARRAY[skillL.slice(2)-1].length;
                    // console.log('ScoreL: ' + scoreL);
                    // console.log('GoalL: ' + goalL);
                    if(rule == 'DBL'){
                      scoreL = scoreL * 2;
                    }
                    if(goalL < scoreL){
                      scoreL = goalL;
                    }
                    if(calcLog('LTO1',rackIndex,j+1)){
                      scoreL = 'T ' + scoreL;
                    }
                    if(calcLog('LTO2',rackIndex,j+1)){
                      scoreL = 'T ' + scoreL;
                    }
                    if(detailFlg == true){
                      // txt = document.createTextNode('L: ' + scoreL);
                      scoreL = 'L: ' + scoreL;
                    // }else{
                      // txt = document.createTextNode(scoreL);
                    }
                    txt = document.createTextNode(scoreL);
                    // if(detailFlg == true){
                    //   txt = document.createTextNode('L: ' + scoreL);
                    // }else{
                    //   txt = document.createTextNode(scoreL);
                    // }
                    // txt = document.createTextNode('L: ' + scoreL);
                    // txt = document.createTextNode(calcLog('^L',0,j) + calcLog('L9',0,j));
                    cell.appendChild(txt);
                    // fragment.appendChild(txt);
                  }else if(i == LOG_RIGHTROW){
                    scoreR = calcLog('^R[1-9]',0) + calcLog('R9',0);
                    goalR = POINTARRAY[skillR.slice(2)-1].length;
                    if(rule == 'DBL'){
                      scoreR = scoreR * 2;
                    }
                    if(goalR < scoreR){
                      scoreR = goalR;
                    }
                    if(calcLog('RTO1',rackIndex,j+1)){
                      scoreR = 'T ' + scoreR;
                    }
                    if(calcLog('RTO2',rackIndex,j+1)){
                      scoreR = 'T ' + scoreR;
                    }
                    if(detailFlg == true){
                      scoreR = 'R: ' + scoreR;
                    // }else{
                    //   txt = document.createTextNode(scoreR);
                    }
                    txt = document.createTextNode(scoreR);
                    // if(detailFlg == true){
                    //   txt = document.createTextNode('R: ' + scoreR);
                    // }else{
                    //   txt = document.createTextNode(scoreR);
                    // }
                    // txt = document.createTextNode('R: ' + scoreR);
                    // txt = document.createTextNode(calcLog('^R',0,j) + calcLog('R9',0,j));
                    cell.appendChild(txt);
                    // fragment.appendChild(txt);
                  }else if(i == LOG_INNINGROW){
                    if(bankingWinner.slice(-1)=='L'){
                      inning = calcLog('.toL',rackIndex);
                      // inning = inningFromL;
                    }else{
                      inning = calcLog('.toR',rackIndex);
                      // inning = inningFromR;
                    }
                    if(rackIndex == 0){
                      inning--;
                    }
                    if(detailFlg == true){
                      txt = document.createTextNode('I: ' + inning);
                    }else{
                      txt = document.createTextNode(inning);
                    }
                    // txt = document.createTextNode('I: ' + inning);
                    cell.appendChild(txt);
                    // fragment.appendChild(txt);
                    // txt = document.createTextNode(Math.floor((inning-1)/2));
                    // cell.appendChild(txt);
                  }else if(i == LOG_DEADROW){
                    
                    if(detailFlg == true){
                      txt = document.createTextNode('D: ' + calcLog('^D[1-9]',rackIndex,j));
                    }else{
                      txt = document.createTextNode(calcLog('^D[1-9]',rackIndex,j));
                    }
                    // txt = document.createTextNode('D: ' + calcLog('^D',getRackStartIndex(j),j));
                    cell.appendChild(txt);
                    // fragment.appendChild(txt);
                  }
                  // cell.style.fontSize = '1.5em';
                  cell.style.color = 'rgb(255,255,255)';
                  cell.style.textAlign = 'center';
                  // cell.style.textAlign = 'right';
                  cell.style.backgroundColor = 'rgb(3, 3, 3)';
                  if(oddSet%2 == 1){
                    cell.style.backgroundColor = 'rgb(63, 63, 63)';
                  }else{
                    cell.style.backgroundColor = 'rgb(93, 93, 93)';
                  }
                // }

            }
          }
        }
      }
    }

    
    // rows.push(table.insertRow(-1));  // 行の追加
    for(i = 0; i < LOG_DEADROW+1; i++){
      cell=rows[i].insertCell(-1);
      scoreL = calcLog('^L[1-9]',0) + calcLog('L9',0);
      // goalL = POINTARRAY[localStorage.getItem(localStorage.key(STRG_SKILLL)).slice(2)-1].length;
      goalL = POINTARRAY[skillL.slice(2)-1].length;
      // if(localStorage.getItem(localStorage.key(STRG_DBL)) == 'DBL'){
      if(rule == 'DBL'){
        scoreL = scoreL * 2;
      }
      if(goalL < scoreL){
        scoreL = goalL;
      }
      
      scoreR = calcLog('^R[1-9]',0) + calcLog('R9',0);
      // goalR = POINTARRAY[localStorage.getItem(localStorage.key(STRG_SKILLR)).slice(2)-1].length;
      goalR = POINTARRAY[skillR.slice(2)-1].length;
      // if(localStorage.getItem(localStorage.key(STRG_DBL)) == 'DBL'){
      if(rule == 'DBL'){
        scoreR = scoreR * 2;
      }
      if(goalR < scoreR){
        scoreR = goalR;
      }

      if(i == LOG_RACKROW){
        if(winner == 'L'){
          var rPoint;
          rPoint = POINTARRAY[skillR.slice(2)-1][scoreR];
          txt = document.createTextNode('P: ' + (20 - rPoint) + ' - ' + rPoint);
        }else if(winner =='R'){
          var lPoint;
          lPoint = POINTARRAY[skillL.slice(2)-1][scoreL];
          txt = document.createTextNode('P: ' + lPoint + ' - ' + (20 - lPoint));
        }else{
          
          var rPoint;
          rPoint = POINTARRAY[skillR.slice(2)-1][scoreR];
          var lPoint;
          lPoint = POINTARRAY[skillL.slice(2)-1][scoreL];
          txt = document.createTextNode('P: ' + lPoint + ' & ' + rPoint);
        }
        
        cell.appendChild(txt);
      }else if(i == LOG_LEFTROW){
        txt = document.createTextNode('L: ' + scoreL + '/' + goalL + '(S' + skillL.slice(2) + ')');
        cell.appendChild(txt);
      }else if(i == LOG_RIGHTROW){
        txt = document.createTextNode('R: ' + scoreR + '/' + goalR + '(S' + skillR.slice(2) + ')');
        cell.appendChild(txt);
      }else if(i == LOG_INNINGROW){
        if(bankingWinner.slice(-1)=='L'){
          inning = calcLog('.toL',0);
          // inning = inningFromL;
        }else{
          inning = calcLog('.toR',0);
          // inning = inningFromR;
        }
        inning--;

        txt = document.createTextNode('I: ' + inning);
        cell.appendChild(txt);
      }else if(i == LOG_DEADROW){
        txt = document.createTextNode('D: ' + calcLog('^D[1-9]',0));
        cell.appendChild(txt);
      }
      // cell.style.fontSize = '1.5em';
      cell.style.color = 'rgb(255,255,255)';
      cell.style.textAlign = 'center';
      // cell.style.textAlign = 'right';
      cell.style.width = '15vw';
      cell.style.backgroundColor = 'rgb(3, 3, 3)';
    }

    // freeball数描画
    imgL = document.createElement('img');
    imgL.style.width = '5vw';
    imgR = document.createElement('img');
    imgR.style.width = '5vw';  
    for(i = 0; i < LOG_DEADROW+1; i++){
      cell=rows[i].insertCell(-1);
      cell.style.color = 'rgb(255,255,255)';
      cell.style.textAlign = 'center';
      cell.style.backgroundColor = '#333333';
      if(i == LOG_RACKROW){
        var d1 = new Date(searchKey().slice(0,-6));
        var d2 = new Date(searchKey(START).slice(0,-6));
        // console.log('d1:' + d1 + ', d2:' + d2);
        var diff = d1 - d2;
        // console.log('diff:' + diff);
        txt = document.createTextNode(('00' + Math.floor(diff / 1000 / 60 / 60)).slice(-2) + ':');
        cell.appendChild(txt);
        cell.style.textAlign = 'left';
      }else if(i == LOG_LEFTROW){
        imgL.src = 'img/freeball.png';
        cell.appendChild(imgL);
      }else if(i == LOG_RIGHTROW){
        imgR.src = 'img/freeball.png';
        cell.appendChild(imgR);
      }
    }
    for(i = 0; i < LOG_DEADROW+1; i++){
      cell=rows[i].insertCell(-1);
      cell.style.color = 'rgb(255,255,255)';
      cell.style.textAlign = 'center';
      cell.style.backgroundColor = '#333333';
      if(i == LOG_RACKROW){
        var d1 = new Date(searchKey().slice(0,-6));
        var d2 = new Date(searchKey(START).slice(0,-6));
        console.log('d1:' + d1 + ', d2:' + d2);
        var diff = d1 - d2;
        console.log('diff:' + diff);
        txt = document.createTextNode(('00' + Math.floor((diff / 1000 / 60) % 60)).slice(-2));
        cell.appendChild(txt);
      }else if(i == LOG_LEFTROW){
        txt = document.createTextNode(calcLog('LFREE',0));
        cell.appendChild(txt);
      }else if(i == LOG_RIGHTROW){
        txt = document.createTextNode(calcLog('RFREE',0));
        cell.appendChild(txt);
      }
    }

    // cell.appendChild(fragment);
    // 指定したdiv要素に表を加える
    
    document.getElementById('loading').innerHTML = '';

    document.getElementById(tableId).appendChild(table);
}
