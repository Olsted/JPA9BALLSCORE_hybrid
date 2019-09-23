// This is a JavaScript file

var getFreeball = function(){
  var freeBall = document.getElementById('freeball');
  var animation = 'bounceOut';
  var lastAction = localStorage.getItem(searchKey(localStorage.length-1));
  var last2Action = localStorage.getItem(searchKey(localStorage.length-2));
  // 直前にfreeballを記録していない、かつターンが変わった直後のみ使用可
  if(lastAction.match('FREE')==null
   && (lastAction.match('[S|C]to[L|R]')!=null
   || (lastAction.match('[L|R]TO[1|2]')!=null && last2Action.match('[S|C]to[L|R]')!=null))){
    freeBall.classList.add('animated', 'slow');
    if(document.getElementById('turnL').checked==true){
      writeLog('LFREE');
      animation = animation + 'Left';
      freeBall.classList.add('animated', animation);
    }else if(document.getElementById('turnR').checked==true){
      writeLog('RFREE');
      animation = animation + 'Right';
      freeBall.classList.add('animated', animation);
    }
    // freeBall.addEventListener('animationend', function() {freeBall.classList.remove('animated', animation)});
    freeBall.addEventListener('animationend', function() {
      freeBall.classList.remove('animated', animation);
      freeBall.classList.remove('animated', 'slow');
    });
  }else{  // 操作無効のアニメーション
    freeBall.classList.add('animated', 'swing');
    freeBall.addEventListener('animationend', function() {freeBall.classList.remove('animated', 'swing')});

  }
}

var resume = function(){
  // Deadボタン判定のために明記
  document.getElementById('ballTable').style.backgroundColor = DEAD_OFF;

  var i;
  var skillL = document.getElementById('skillL');
  document.getElementById('skillL').value = 1;
  // for(i = localStorage.length - 1; i > -1; i--){
  //   if(localStorage.getItem(localStorage.key(i)).match('SL')!=null){
  //     skillL.value = localStorage.getItem(localStorage.key(i)).slice(-1);
  //     // console.log('skillL: ' + localStorage.getItem(localStorage.key(i)));
  //     break;
  //   }
  // }
  skillL.value = localStorage.getItem(searchKey(STRG_SKILLL)).slice(-1);

  var skillR = document.getElementById('skillR');
  document.getElementById('skillR').value = 1;
  // for(i = localStorage.length - 1; i > -1; i--){
  //   if(localStorage.getItem(localStorage.key(i)).match('SR')!=null){
  //     skillR.value = localStorage.getItem(localStorage.key(i)).slice(-1);
  //     break;
  //   }
  // }
  skillR.value = localStorage.getItem(searchKey(STRG_SKILLR)).slice(-1);
  setTO(skillL.value, skillR.value);
  // getbackTimeout(skillL.value, skillR.value);
  
  // var timeoutL1 = document.getElementById('timeoutL1');
  // var timeoutR1 = document.getElementById('timeoutR1');
  // var timeoutL2 = document.getElementById('timeoutL2');
  // var timeoutR2 = document.getElementById('timeoutR2');
  // var timeoutLImg = 'img/timeout.png';
  // var timeoutRImg = 'img/timeout.png';
  // if(calcLog('LTO2',getRackStartIndex(localStorage.length)) > 0){
  //   timeoutL2.classList.remove('led-yellow');
  //   timeoutL2.classList.add('led-yellow-off');
  // }
  // if(calcLog('LTO1',getRackStartIndex(localStorage.length)) > 0){
  // timeoutL1.classList.remove('led-yellow');
  // timeoutL1.classList.add('led-yellow-off');
  // timeoutLImg = 'img/timeout_nomore.png';
  // }
  // document.getElementById('TOL').src = timeoutLImg;

  // if(calcLog('RTO2',getRackStartIndex(localStorage.length)) > 0){
  //   timeoutR2.classList.remove('led-yellow');
  //   timeoutR2.classList.add('led-yellow-off');
  // }
  // if(calcLog('RTO1',getRackStartIndex(localStorage.length)) > 0){
  //   timeoutR1.classList.remove('led-yellow');
  //   timeoutR1.classList.add('led-yellow-off');
  //   timeoutRImg = 'img/timeout_nomore.png';
  // }
  // document.getElementById('TOR').src = timeoutRImg;


  // if(localStorage.getItem(localStorage.key(STRG_DBL)) == 'DBL'){
  if(localStorage.getItem(searchKey(STRG_DBL)) == 'DBL'){
    document.getElementById('double').checked = true;
    document.getElementById('lDouble').innerHTML = 'W';
  }else{
    document.getElementById('double').checked = false;
    document.getElementById('lDouble').innerHTML = 'S';
  }


  var pointL = document.getElementById('pointL');
  var pointR = document.getElementById('pointR');

  var scoreL = document.getElementById('scoreL');
  var scoreR = document.getElementById('scoreR');

  var newScoreL = calcLog('^L[1-9]',0) + calcLog('L9',0);
  var newScoreR = calcLog('^R[1-9]',0) + calcLog('R9',0);
  
  var goalL = POINTARRAY[skillL.value-1].length;
  var goalR = POINTARRAY[skillR.value-1].length;
  var moreL = document.getElementById('moreL');
  var moreR = document.getElementById('moreR');

  
  // var dblFlag = false;
  // for(var i = 0; i < localStorage.length; i++){
  //   if(localStorage.getItem(localStorage.key(i)) == 'DBL'){
  //     dblFlag = true;
  //     break;
  //   }
  // }
  // // if(document.getElementById('double').checked==true){
  // if(dblFlag==true){
  // // if(bDbl==true){
  //   newScoreL = newScoreL * 2;
  //   newScoreR = newScoreR * 2;
  // }

  // if(localStorage.getItem(localStorage.key(STRG_DBL)) == 'DBL'){
  if(localStorage.getItem(searchKey(STRG_DBL)) == 'DBL'){
    newScoreL = newScoreL * 2;
    newScoreR = newScoreR * 2;
  }
  
  pointL.innerHTML = POINTARRAY[skillL.value-1][newScoreL];
  pointR.innerHTML = POINTARRAY[skillR.value-1][newScoreR];

  if (newScoreL >= goalL){
    newScoreL = goalL;
  }
  if (newScoreR >= goalR){
    newScoreR = goalR;
  }

  var scoreColorL = 'rgb(248, 248, 248)';

  if (newScoreL >= goalL){
    pointL.innerHTML = 20 - pointR.innerHTML;
    // newScoreL = goalL;
    scoreColorL = 'rgb(216, 55, 239)';
    moreL.innerHTML = 'Win!';
  }else if (goalL - newScoreL == 1){
    scoreColorL = 'rgb(252, 57, 16)';
    moreL.innerHTML = 'Game ball';
  }else if (goalL - newScoreL < 6){
    moreL.innerHTML = goalL - newScoreL + ' more';
    scoreColorL = 'rgb(255, 236, 0)';
  }else{
    moreL.innerHTML = goalL - newScoreL + ' more';
  }

  var scoreColorR = 'rgb(248, 248, 248)';

  if (newScoreR >= goalR){
    // newScoreR = goalR;
    scoreColorR = 'rgb(216, 55, 239)';
    pointR.innerHTML = 20 - pointL.innerHTML;
    moreR.innerHTML = 'Win!';
  }else if (goalR - newScoreR == 1){
    scoreColorR = 'rgb(252, 57, 16)'
    moreR.innerHTML = 'Game ball';
  }else if (goalR - newScoreR < 6){
    moreR.innerHTML = goalR - newScoreR + ' more';
    scoreColorR = 'rgb(255, 236, 0)';
  }else{
    moreR.innerHTML = goalR - newScoreR + ' more';
  }

  scoreL.innerHTML = newScoreL;
  scoreL.style.color = scoreColorL;
  scoreR.innerHTML = newScoreR;
  scoreR.style.color = scoreColorR;


  var safeL = document.getElementById('safeL');
  var safeR = document.getElementById('safeR');
  safeL.innerHTML = calcLog('StoR',0);
  safeR.innerHTML = calcLog('StoL',0);

  var brL = document.getElementById('brL');
  var brR = document.getElementById('brR');
  brL.innerHTML = calcLog('LBR',0);
  brR.innerHTML = calcLog('RBR',0);

  var aceL = document.getElementById('aceL');
  var aceR = document.getElementById('aceR');
  aceL.innerHTML = calcLog('LAce',0);
  aceR.innerHTML = calcLog('RAce',0);

  var leftButton = document.getElementById('turnL');
  var rightButton = document.getElementById('turnR');
  // for(i = localStorage.length - 1; i > 0; i--){
  //   if(localStorage.getItem(localStorage.key(i)).match('[S|C]toL')!=null){
  //     leftButton.checked=true;
  //     rightButton.checked=false;
  //     break;
  //   }else if(localStorage.getItem(localStorage.key(i)).match('[S|C]toR')!=null){
  //     leftButton.checked=false;
  //     rightButton.checked=true;
  //     break;
  //   }else{
  //     leftButton.checked=false;
  //     rightButton.checked=false;
  //   }
  // }
  var order;
  for(i = localStorage.length - 1; i > -1; i--){
    if(localStorage.getItem(searchKey(i)).match('[S|C]toL')!=null){
      leftButton.checked=true;
      rightButton.checked=false;
      document.getElementById('TOL').style.visibility = 'visible';
      document.getElementById('TOR').style.visibility = 'hidden';
      break;
    }else if(localStorage.getItem(searchKey(i)).match('[S|C]toR')!=null){
      leftButton.checked=false;
      rightButton.checked=true;
      document.getElementById('TOL').style.visibility = 'hidden';
      document.getElementById('TOR').style.visibility = 'visible';
      break;
    }
    if(i == -1){
      leftButton.checked=false;
      rightButton.checked=false;
    }
  }


  var lastShotBallL1 = document.getElementById('lastShotBallL1');
  var lastShotBallR1 = document.getElementById('lastShotBallR1');
  var lastShotBallL2 = document.getElementById('lastShotBallL2');
  var lastShotBallR2 = document.getElementById('lastShotBallR2');
  var lastShotBallL3 = document.getElementById('lastShotBallL3');
  var lastShotBallR3 = document.getElementById('lastShotBallR3');
  
  var keyword;
  keyword = '^L[1-9]';
  var value = new RegExp(keyword);
  var lastIndex = [-1,-1,-1];
  // var lastShotNo = [0,0,0];
  for(i = localStorage.length - 1; i > 0; i--){
    // if(localStorage.getItem(localStorage.key(i)).match(value)!=null){
    if(localStorage.getItem(searchKey(i)).match(value)!=null){
      lastIndex[0] = i;
      // lastShotBallL1.src = 'img/no' + localStorage.getItem(localStorage.key(i)).slice(1) + 'trans.png';
      lastShotBallL1.src = 'img/no' + localStorage.getItem(searchKey(i)).slice(1) + 'trans.png';
      for(var j = i-1; j > 0; j--){
        // if(localStorage.getItem(localStorage.key(j)).match(value)!=null){
        if(localStorage.getItem(searchKey(j)).match(value)!=null){
          lastIndex[1] = j;
          // lastShotBallL2.src = 'img/no' + localStorage.getItem(localStorage.key(j)).slice(1) + 'trans.png';
          lastShotBallL2.src = 'img/no' + localStorage.getItem(searchKey(j)).slice(1) + 'trans.png';
          for(var k = j-1; k > 0; k--){
            // if(localStorage.getItem(localStorage.key(k)).match(value)!=null){
            if(localStorage.getItem(searchKey(k)).match(value)!=null){
              lastIndex[2] = k;
              // lastShotBallL3.src = 'img/no' + localStorage.getItem(localStorage.key(k)).slice(1) + 'trans.png';
              lastShotBallL3.src = 'img/no' + localStorage.getItem(searchKey(k)).slice(1) + 'trans.png';
              break;
            }
          }
          if(k==0){
            lastShotBallL3.src = '';
          }
          break;
        }
      }
      if(j==0){
        lastShotBallL2.src = '';
        lastShotBallL3.src = '';
      }
      break;
    }
  }
  if(i==0){
    lastShotBallL1.src = '';
    lastShotBallL2.src = '';
    lastShotBallL3.src = '';
  }

  keyword = '^R[1-9]';
  value = new RegExp(keyword);
  lastIndex = [-1,-1,-1];
  for(i = localStorage.length - 1; i > 0; i--){
    // if(localStorage.getItem(localStorage.key(i)).match(value)!=null){
    if(localStorage.getItem(searchKey(i)).match(value)!=null){
      lastIndex[0] = i;
      // lastShotBallR1.src = 'img/no' + localStorage.getItem(localStorage.key(i)).slice(1) + 'trans.png';
      lastShotBallR1.src = 'img/no' + localStorage.getItem(searchKey(i)).slice(1) + 'trans.png';
      for(j = i-1; j > 0; j--){
        // if(localStorage.getItem(localStorage.key(j)).match(value)!=null){
        if(localStorage.getItem(searchKey(j)).match(value)!=null){
          lastIndex[1] = j;
          // lastShotBallR2.src = 'img/no' + localStorage.getItem(localStorage.key(j)).slice(1) + 'trans.png';
          lastShotBallR2.src = 'img/no' + localStorage.getItem(searchKey(j)).slice(1) + 'trans.png';
          for(var k = j-1; k > 0; k--){
            // if(localStorage.getItem(localStorage.key(k)).match(value)!=null){
            if(localStorage.getItem(searchKey(k)).match(value)!=null){
              lastIndex[2] = k;
              // lastShotBallR3.src = 'img/no' + localStorage.getItem(localStorage.key(k)).slice(1) + 'trans.png';
              lastShotBallR3.src = 'img/no' + localStorage.getItem(searchKey(k)).slice(1) + 'trans.png';
              break;
            }
          }
          if(k==0){
            lastShotBallR3.src = '';
          }
          break;
        }
      }
      if(j==0){
        lastShotBallR2.src = '';
        lastShotBallR3.src = '';
      }
      break;
    }
  }
  if(i==0){
    lastShotBallR1.src = '';
    lastShotBallR2.src = '';
    lastShotBallR3.src = '';
  }


  var ball;
  for(i = 1; i < 9; i++){
    if(calcLog('^[L|R|D]'+i,getRackStartIndex(localStorage.length)) > 0){
      ball = document.querySelector('#no'+i);
      ball.classList.remove('animated', "bounceInUp");
      ball.classList.add('animated', "bounceOutDown");
    }
  }


  var inning = document.getElementById('inning');
  var count;
  for(var i = 0; i < localStorage.length; i++){
    // if(localStorage.getItem(localStorage.key(i)).match(new RegExp('.to[L|R]'))!=null){
    if(localStorage.getItem(searchKey(i)).match(new RegExp('.to[L|R]'))!=null){
      break;
    }
  }
  // if(localStorage.getItem(localStorage.key(i)) != null){
  if(localStorage.getItem(searchKey(i)) != null){
    // console.log('1st item last letter: '+localStorage.getItem(localStorage.key(i)).slice(-1));
    if(localStorage.getItem(searchKey(i)).slice(-1)=='L'){
      count = calcLog('.toL',0) - 1;
    }else{
      count = calcLog('.toR',0) - 1;
    }
    inning.innerHTML = count;
  }else{
    inning.innerHTML = 0;
  }

  var dead = document.getElementById( "dead" );
  dead.innerHTML = calcLog('^D[1-9]',0);

  // var timeS = document.getElementById( "timeS" );
  var timeN = document.getElementById( "timeN" );
  // var timeE = document.getElementById( "timeE" );
  
  // timeS.innerHTML = localStorage.key(0).split(' ')[1].substring(0,5);

  var d1 = new Date();
  // var d2 = new Date(localStorage.key(0));
  // var d2 = new Date(localStorage.key('Start').slice(0,-6));
  var d2 = new Date(searchKey(START).slice(0,-6));
  // console.log('time:'+ d2);
  diff = d1 - d2;
  timeN.innerHTML = ('00' + Math.floor(diff / 1000 / 60 / 60)).slice(-2) + ':' + ('00' + Math.floor((diff / 1000 / 60) % 60)).slice(-2);

  // if(localStorage.getItem(localStorage.key(localStorage.length-1)) == 'End'){
  //   timeE.innerHTML = localStorage.key(localStorage.length-1).split(' ')[1].substring(0,5);
  // }else{
  // timeE.innerHTML = '--:--';
  // }


  // document.getElementById('teamL').value = localStorage.getItem(localStorage.key(STRG_TNOL)).split(':')[1];
  // document.getElementById('teamR').value = localStorage.getItem(localStorage.key(STRG_TNOR)).split(':')[1];

  // document.getElementById('playerNoL').value = localStorage.getItem(localStorage.key(STRG_PNOL)).split(':')[1];
  // document.getElementById('playerNoR').value = localStorage.getItem(localStorage.key(STRG_PNOR)).split(':')[1];

  // if(document.getElementById('playerNameL').value != ''){
    // document.getElementById('playerNameL').value = localStorage.getItem(localStorage.key(STRG_PNAMEL)).split(':')[1];
  document.getElementById('playerNameL').value = localStorage.getItem(searchKey(STRG_PNAMEL)).split(':')[1];
  // }
  // if(document.getElementById('playerNameR').value != ''){
    // document.getElementById('playerNameR').value = localStorage.getItem(localStorage.key(STRG_PNAMER)).split(':')[1];
  document.getElementById('playerNameR').value = localStorage.getItem(searchKey(STRG_PNAMER)).split(':')[1];
  // }

}

var writeTeam = function(side){
  var key;
  if(side == 'L'){
    key = STRG_TNOL;
  }else{
    key = STRG_TNOR;
  }
  // localStorage.setItem(localStorage.key(key),'TNO' + side + ':' + document.getElementById('team'+side).value);
  localStorage.setItem(searchKey(key),'TNO' + side + ':' + document.getElementById('team'+side).value);
  // console.log('team'+side+': ' + document.getElementById('team'+side).value);
}

// var writePlayerNo = function(side){
//   var key;
//   if(side == 'L'){
//     key = STRG_PNOL;
//   }else{
//     key = STRG_PNOR;
//   }
//   localStorage.setItem(localStorage.key(key),'PNO' + side + ':' + document.getElementById('playerNo'+side).value);
//   console.log('team'+side+': ' + document.getElementById('playerNo'+side).value);
// }

var writePlayerName = function(side){
  var key;
  if(side == 'L'){
    key = STRG_PNAMEL;
  }else{
    key = STRG_PNAMER;
  }
  // localStorage.setItem(localStorage.key(key),'PNA' + side + ':' + document.getElementById('playerName'+side).value);
  localStorage.setItem(searchKey(key),'PNA' + side + ':' + document.getElementById('playerName'+side).value);
  // console.log('team'+side+': ' + document.getElementById('playerName'+side).value);
}

var writeDouble = function(){
  // if(document.getElementById('double').checked == true){
  //   writeLog('DBL');
  // }else{
  //   writeLog('SGL');
    // for(var i = 0; i < localStorage.length; i++){
    //   if(localStorage.getItem(localStorage.key(i)) == 'DBL'){
    //     localStorage.removeItem(localStorage.key(i));
    //     break;
    //   }
    // }
  // }
  var result;
  var newScoreL = calcLog('^L[1-9]',0) + calcLog('L9',0);
  var newScoreR = calcLog('^R[1-9]',0) + calcLog('R9',0);

  // if (newScoreL >= goal){
  //   newScoreL = goal;
  //   if(turn=='L'){
  //     pointL.innerHTML = 20 - pointR.innerHTML;
  //   }else{
  //     // console.log('oppo: '+playerL.innerHTML);
  //     pointR.innerHTML = 20 - pointL.innerHTML;
  //   }
  // }else if(turn=='L'){
  //   // pointL.innerHTML = playerL.myPointArray[newScore];
  //   pointL.innerHTML = POINTARRAY[skillL.value-1][newScore];
  // }else{
  //   // pointR.innerHTML = playerR.myPointArray[newScore];
  //   pointR.innerHTML = POINTARRAY[skillR.value-1][newScore];
  // }

  // var skillL = document.getElementById('skillL');
  // var skillR = document.getElementById('skillR');
  // var scoreColorL = 'rgb(248, 248, 248)';
  // var scoreColorR = 'rgb(248, 248, 248)';
  if(document.getElementById('double').checked == true){
    result = 'DBL';
    document.getElementById('lDouble').innerHTML = 'W';
    // newScoreL = newScoreL * 2;
    // newScoreR = newScoreR * 2;
    
    // document.getElementById('scoreL').innerHTML = 2 * newScoreL;
    // if(POINTARRAY[skillL.value-1].length - 2 * newScoreL == 1){
    //   document.getElementById('moreL').innerHTML = 'Game ball';
    //   scoreColorL = 'rgb(252, 57, 16)';
    // }else{
    //   document.getElementById('moreL').innerHTML = POINTARRAY[skillL.value-1].length - 2 * newScoreL + ' more';
      
    //   if(POINTARRAY[skillL.value-1].length - 2 * newScoreL < 6){
    //     scoreColorL = 'rgb(255, 236, 0)';
    //   }
    // }
    // document.getElementById('pointL').innerHTML = POINTARRAY[skillL.value-1][2*newScoreL];
    // document.getElementById('scoreL').style.color = scoreColorL;

    // document.getElementById('scoreR').innerHTML = 2 * newScoreR;
    // if(POINTARRAY[skillR.value-1].length - 2 * newScoreR == 1){
    //   document.getElementById('moreR').innerHTML = 'Game ball';
    //   scoreColorR = 'rgb(252, 57, 16)';
    // }else{
    //   document.getElementById('moreR').innerHTML = POINTARRAY[skillR.value-1].length - 2 * newScoreR + ' more';
      
    //   if(POINTARRAY[skillR.value-1].length - 2 * newScoreR < 6){
    //     scoreColorR = 'rgb(255, 236, 0)';
    //   }
    // }
    // document.getElementById('pointR').innerHTML = POINTARRAY[skillR.value-1][2*newScoreR];
    // document.getElementById('scoreR').style.color = scoreColorR;
  }else{
    result = 'SGL';
    document.getElementById('lDouble').innerHTML = 'S';
  }
  // document.getElementById('scoreL').innerHTML = newScoreL;
  // if(POINTARRAY[skillL.value-1].length - newScoreL == 1){
  //   document.getElementById('moreL').innerHTML = 'Game ball';
  //   scoreColorL = 'rgb(252, 57, 16)';
  // }else{
  //   document.getElementById('moreL').innerHTML = POINTARRAY[skillL.value-1].length - newScoreL + ' more';
    
  //   if(POINTARRAY[skillL.value-1].length - newScoreL < 6){
  //     scoreColorL = 'rgb(255, 236, 0)';
  //   }
  // }
  // document.getElementById('pointL').innerHTML = POINTARRAY[skillL.value-1][newScoreL];
  // document.getElementById('scoreL').style.color = scoreColorL;

  // document.getElementById('scoreR').innerHTML = newScoreR;
  // if(POINTARRAY[skillR.value-1].length - newScoreR == 1){
  //   document.getElementById('moreR').innerHTML = 'Game ball';
  //   scoreColorR = 'rgb(252, 57, 16)';
  // }else{
  //   document.getElementById('moreR').innerHTML = POINTARRAY[skillR.value-1].length - newScoreR + ' more';
    
  //   if(POINTARRAY[skillR.value-1].length - newScoreR < 6){
  //     scoreColorR = 'rgb(255, 236, 0)';
  //   }
  // }
  // document.getElementById('pointR').innerHTML = POINTARRAY[skillR.value-1][newScoreR];
  // document.getElementById('scoreR').style.color = scoreColorR;
  // localStorage.setItem(localStorage.key(STRG_DBL),result);
  localStorage.setItem(searchKey(STRG_DBL),result);
  resume();
  return result;
}

var writeSkill = function(side){
  var skill;
  var index;
  if(side == 'L'){
    var skill = document.getElementById('skillL');
    index = STRG_SKILLL;
  }else{
    var skill = document.getElementById('skillR');
    index = STRG_SKILLR;
  }
  // localStorage.setItem(localStorage.key(index),'S' + side + skill.value);
  localStorage.setItem(searchKey(index),'S' + side + skill.value);
  // writeLog('S' + side + skill.value);

}

var writeLog = function(act){
  
  var diff;
  var length = localStorage.length;
  // var prev = localStorage.key(localStorage.length-1);
  var key;
  var i;

  // if(localStorage.getItem(localStorage.key(localStorage.length-1)) != 'End'){
  if(localStorage.getItem(searchKey(localStorage.length-1)) != 'End'){
    var ima = dateToFormatString(new Date(), '%YYYY%/%MM%/%DD% %HH%:%mm%:%ss%.%ms%') + ' ' + ('0000' + length).slice(-4);
    // if(act == 'Start'){
    //   var ima = dateToFormatString(new Date(), '%YYYY%/%MM%/%DD% %HH%:%mm%:%ss%.%ms%');
    // }else{
    //   var ima = localStorage.key(localStorage.length)+1;
    // }
    // while(ima == prev){
    //   ima = dateToFormatString(new Date(), '%YYYY%/%MM%/%DD% %HH%:%mm%:%ss%.%ms%');
    //   // ima++;
    // }
    localStorage.setItem(ima,act);
    // console.log(ima);
    // console.log(act);

    var time = document.getElementById('timeN');
    // var d1 = new Date(localStorage.key(localStorage.length-1).slice(0,-6));
    // for(i = 0;i < localStorage.length;i++){
    //   key = localStorage.key(i);
    //   if(key.slice(-4) == localStorage.length-1){
    //     break;
    //   }
    // }
    // console.log('key: ' + key);
    // var d1 = new Date(localStorage.key(key).slice(0,-6));
    var d1 = new Date(searchKey().slice(0,-6));
    // var d2 = new Date(localStorage.key(0));
    // var d2 = new Date(localStorage.key('Start').slice(0,-6));
    var d2 = new Date(searchKey(START).slice(0,-6));
    // console.log('time:'+ localStorage.key(key).slice(0,-6));
    // console.log('time:'+ localStorage.key('Start').slice(0,-6));
    diff = d1 - d2;
    // console.log('diff: '+diff);
    time.innerHTML = ('00' + Math.floor(diff / 1000 / 60 / 60)).slice(-2) + ':' + ('00' + Math.floor((diff / 1000 / 60) % 60)).slice(-2);
  }
  return diff;
}

var myPromise = function(data=0){
   return new Promise(function(resolve,reject) {
    resolve(setTimeout(data,1000));
  })
}

var startNewGame = function(flag = false){
  
  if(window.confirm("New game?") || flag){

    var skillL = document.getElementById('skillL');
    var skillR = document.getElementById('skillR');
    // playerL = new Player(skillL.value);  //グローバル変数
    // playerR = new Player(skillR.value);  //グローバル変数
    getbackTimeout(skillL.value, skillR.value);

    var scoreL = document.getElementById('scoreL');
    var scoreR = document.getElementById('scoreR');
    // scoreL.innerHTML = 0;
    // scoreR.innerHTML = 0;
    
    scoreL.innerHTML = '左';
    scoreR.innerHTML = '右';
    scoreL.style.color = 'rgb(248, 248, 248)';
    scoreR.style.color = 'rgb(248, 248, 248)';

    var moreL = document.getElementById('moreL');
    var moreR = document.getElementById('moreR');
    moreL.innerHTML = '先攻側を';
    moreR.innerHTML = 'タッチ';
    // var tL = POINTARRAY[skillL.value-1];
    // var tR = POINTARRAY[skillR.value-1];
    // console.log('skillL: ' + skillL);
    // console.log('tL: ' + POINTARRAY[1].length);
    // moreL.innerHTML = tL.length + 'more';
    // moreR.innerHTML = tR.length + 'more';
    // moreL.style.color = 'rgb(80, 80, 80)';
    // moreR.style.color = 'rgb(80, 80, 80)';

    var pointL = document.getElementById('pointL');
    var pointR = document.getElementById('pointR');
    // pointL.innerHTML = playerL.myPointArray[scoreL.innerHTML];
    // pointR.innerHTML = playerR.myPointArray[scoreR.innerHTML];
    pointL.innerHTML = 0;
    pointR.innerHTML = 0;

    var safeL = document.getElementById('safeL');
    var safeR = document.getElementById('safeR');
    safeL.innerHTML = 0;
    safeR.innerHTML = 0;

    var brL = document.getElementById('brL');
    var brR = document.getElementById('brR');
    brL.innerHTML = 0;
    brR.innerHTML = 0;

    var aceL = document.getElementById('aceL');
    var aceR = document.getElementById('aceR');
    aceL.innerHTML = 0;
    aceR.innerHTML = 0;

    var leftButton = document.getElementById( "turnL" );
    var rightButton = document.getElementById( "turnR" );
    leftButton.checked=false;
    rightButton.checked=false;

    var lastShotBallL1 = document.getElementById('lastShotBallL1');
    var lastShotBallR1 = document.getElementById('lastShotBallR1');
    lastShotBallL1.src = '';
    lastShotBallR1.src = '';
    var lastShotBallL2 = document.getElementById('lastShotBallL2');
    var lastShotBallR2 = document.getElementById('lastShotBallR2');
    lastShotBallL2.src = '';
    lastShotBallR2.src = '';
    var lastShotBallL3 = document.getElementById('lastShotBallL3');
    var lastShotBallR3 = document.getElementById('lastShotBallR3');
    lastShotBallL3.src = '';
    lastShotBallR3.src = '';



    var inning = document.getElementById('inning');
    inning.innerHTML = '0';
    // console.log('-----aaa-----');
    //deadを増やす処理が含まれてるのでdead初期化より上に置く
    nextRack();

    var dead = document.getElementById( "dead" );
    dead.innerHTML = '0';

    // var timeS = document.getElementById( "timeS" );
    var timeN = document.getElementById( "timeN" );
    // var timeE = document.getElementById( "timeE" );
    
    // var teamL = document.getElementById('teamL');
    // var teamR = document.getElementById('teamR');
    // var pNoL = document.getElementById('playerNoL');
    // var pNoR = document.getElementById('playerNoR');
    
    
    var data = '';
    var pNaL = document.getElementById('playerNameL');
    var pNaR = document.getElementById('playerNameR');

    // localStorage.clear();
    // setTimeout(writeLog('TNOL:' + 'NA'),100);
    // setTimeout(writeLog('PNOL:' + 'NA'),100);
    // if(pNaL.value == ''){
    //   data = 'PNAL:';
    // }else{
    //   data = 'PNAL:' + pNaL.value;
    // }
    // setTimeout(writeLog(data),100);
    // data = 'SL' + skillL.value;
    // setTimeout(writeLog(data),100);
    // setTimeout(writeLog('TNOR:' + 'NA'),100);
    // setTimeout(writeLog('PNOR:' + 'NA'),100);
    // if(pNaR.value == ''){
    //   data = 'PNAR:';
    // }else{
    //   data = 'PNAR:' + pNaR.value;
    // }
    // setTimeout(writeLog(data),100);
    // setTimeout(writeLog('SR' + skillR.value),100);
    // if(document.getElementById('double').checked == true){
    //   data = 'DBL';
    // }else{
    //   data = 'SGL';
    // }
    // setTimeout(writeLog(data),100);
    // setTimeout(writeLog('Start'),1000);
    // timeN.innerHTML = '00:00';


    // var promise = new Promise(function(resolve, reject) {
    //     resolve(localStorage.clear());
    // });
    myPromise('1')
    .then((result) => {
      return myPromise(localStorage.clear());
    })
    // promise
    .then((result) => {
      data = 'TNOL:' + 'NA';
      return myPromise(writeLog(data));
    })
    .then((result) => {
      data = 'PNOL:' + 'NA';
      return myPromise(writeLog(data));
    })
    .then((result) => {
      if(pNaL.value == ''){
        data = 'PNAL:';
      }else{
        data = 'PNAL:' + pNaL.value;
      }
      return myPromise(writeLog(data));
    })
    .then((result) => {
      data = 'SL' + skillL.value;
      return myPromise(writeLog(data));
    })
    .then((result) => {
      data = 'TNOR:' + 'NA';
      return myPromise(writeLog(data));
    })
    .then((result) => {
      data = 'PNOR:' + 'NA';
      return myPromise(writeLog(data));
    })
    .then((result) => {
      if(pNaR.value == ''){
        data = 'PNAR:';
      }else{
        data = 'PNAR:' + pNaR.value;
      }
      return myPromise(writeLog(data));
    })
    .then((result) => {
      data = 'SR' + skillR.value;
      return myPromise(writeLog(data));
    })
    .then((result) => {
      if(document.getElementById('double').checked == true){
        data = 'DBL';
      }else{
        data = 'SGL';
      }
      return myPromise(writeLog(data));
    })
    .then((result) => {
      data = 'Start';
      return myPromise(writeLog(data));
    })
    .then((result) => {
      timeN.innerHTML = '00:00';
    });
  }
}


var addInning = function(){
  var inning = document.getElementById('inning');
  var count;
  
  // if(localStorage.getItem(localStorage.key(BANKINGRESULT)).slice(-1)=='L'){
  if(localStorage.getItem(searchKey(BANKINGRESULT)).slice(-1)=='L'){
    count = calcLog('.toL',0) - 1;
  }else{
    count = calcLog('.toR',0) - 1;
  }
  inning.innerHTML = count;
}

var changeTurn = function(side){
  var leftButton = document.getElementById( "turnL" );
  var rightButton = document.getElementById( "turnR" );
  var txtL;
  var txtR;
  if(side=="L") {
    if(leftButton.checked==true){ //すでにONだった場合、この関数の前にfalseになる。OFFだったら逆にここでtrueになっている
      writeLog('CtoL');
    }
    leftButton.checked=true;
    rightButton.checked=false;
    txtL ='入れたボールをタッチ';
    txtR = ' 交代はここ をタッチ';
    document.getElementById('TOL').style.visibility = 'visible';
    document.getElementById('TOR').style.visibility = 'hidden';
  }else{
    if(rightButton.checked==true){
      writeLog('CtoR');
    }
    leftButton.checked=false;
    rightButton.checked=true;
    txtR ='入れたボールをタッチ';
    txtL = ' 交代は逆を タッチ';
    document.getElementById('TOL').style.visibility = 'hidden';
    document.getElementById('TOR').style.visibility = 'visible';
  }
  addInning();
  
  // if(document.getElementById('btnDeadCheck').checked == true){
  if(document.getElementById('ballTable').style.backgroundColor==DEAD_ON){
    // console.log('cansel dead button');
    document.getElementById('btnDeadCheck').click();
  }
  if(document.getElementById('scoreL').innerHTML == '左'){
    document.getElementById('scoreL').innerHTML = 0;
    document.getElementById('scoreR').innerHTML = 0;
    document.getElementById('moreL').innerHTML = txtL;
    document.getElementById('moreR').innerHTML =txtR;
  }
  // 直前に無効球があった場合、フリーボールを自動的に記録
  if(localStorage.getItem(searchKey(localStorage.length-2)).match(RegExp('^D[1-9]'))!=null){
    getFreeball();
  }else{
    var lastAction = localStorage.getItem(searchKey(localStorage.length-1));
    var last2Action = localStorage.getItem(searchKey(localStorage.length-2));
    // 直前にfreeballを記録していない、かつターンが変わった直後のみならフリーボールアイコン使用可アピール
    if(lastAction.match('FREE')==null
    && (lastAction.match('[S|C]to[L|R]')!=null
    || (lastAction.match('[L|R]TO[1|2]')!=null && last2Action.match('[S|C]to[L|R]')!=null))){
      var freeBall = document.getElementById('freeball');
      // freeBall.classList.add('animated', 'delay-1s');
      freeBall.classList.add('animated', 'pulse');
      // freeBall.addEventListener('animationend', function() {freeBall.classList.remove('animated', 'delay-1s')});
      freeBall.addEventListener('animationend', function() {freeBall.classList.remove('animated', 'pulse')});
    }
  }
}

var undo = function(){
  // var log = localStorage.getItem(localStorage.key(localStorage.length - 1));
  var log = localStorage.getItem(searchKey());
  var actIndex = ACTARRAY.indexOf(log);
  var ball;
  var message = log;

  // console.log('undo :' + log);
  // console.log('actIndex :' + actIndex);

  if(actIndex == START_HEAD){
    message = 'do nothing';

  }else if((actIndex >= LSHOOT_HEAD && actIndex <= LSHOOT_TAIL) || (actIndex >= RSHOOT_HEAD && actIndex <= RSHOOT_TAIL)){

    var turn;
    var head;
    if(actIndex >= LSHOOT_HEAD && actIndex <= LSHOOT_TAIL){
      turn = 'L';
      head = LSHOOT_HEAD;
    }else{
      turn = 'R';
      head = RSHOOT_HEAD;
    }
    // localStorage.removeItem(localStorage.key(localStorage.length - 1));
    localStorage.removeItem(searchKey());
    var ball = document.getElementById('no' + (actIndex - head + 1));
    backBall(ball);

    var newScore = document.getElementById('score' + turn).innerHTML = calcLog('^' + turn + '[1-9]',0) + calcLog(turn + '9',0);

    // var dblFlag = false;
    // for(i = 0; i < localStorage.length; i++){
    //   if(localStorage.getItem(localStorage.key(i)) == 'DBL'){
    //     dblFlag = true;
    //     break;
    //   }
    // }
    // // if(document.getElementById('double').checked==true){
    // if(dblFlag == true){
    // // if(bDbl==true){
    //   newScore = newScore * 2;
    // }

    // if(localStorage.getItem(localStorage.key(STRG_DBL)) == 'DBL'){
    if(localStorage.getItem(searchKey(STRG_DBL)) == 'DBL'){
      newScore = newScore * 2;
    }

    document.getElementById('score' + turn).innerHTML = newScore;
    var skill = document.getElementById('skill'+turn);
    var scoreColor = 'rgb(248, 248, 248)';
    if(POINTARRAY[skill.value-1].length - newScore == 1){
      document.getElementById('more' + turn).innerHTML = 'Game ball';
      scoreColor = 'rgb(252, 57, 16)';
    }else{
      document.getElementById('more' + turn).innerHTML = POINTARRAY[skill.value-1].length - newScore + ' more';
      
      if(POINTARRAY[skill.value-1].length - newScore < 6){
        scoreColor = 'rgb(255, 236, 0)';
      }
    }
    document.getElementById('point' + turn).innerHTML = POINTARRAY[skill.value-1][newScore];
    document.getElementById('score' + turn).style.color = scoreColor;

    var lastShotBall1 = document.getElementById('lastShotBall'+turn+'1');
    var lastShotBall2 = document.getElementById('lastShotBall'+turn+'2');
    var lastShotBall3 = document.getElementById('lastShotBall'+turn+'3');

    var keyword;
    keyword = '^' + turn + '[1-9]';
    var value = new RegExp(keyword);
    var lastIndex = [-1,-1,-1];
    // var lastShotNo = [0,0,0];
    for(var i = localStorage.length - 1; i > 0; i--){
      // if(localStorage.getItem(localStorage.key(i)).match(value)!=null){
      if(localStorage.getItem(searchKey(i)).match(value)!=null){
        lastIndex[0] = i;
        // lastShotBall1.src = 'img/no' + localStorage.getItem(localStorage.key(i)).slice(1) + 'trans.png';
        lastShotBall1.src = 'img/no' + localStorage.getItem(searchKey(i)).slice(1) + 'trans.png';
        for(var j = i-1; j > 0; j--){
          // if(localStorage.getItem(localStorage.key(j)).match(value)!=null){
          if(localStorage.getItem(searchKey(j)).match(value)!=null){
            lastIndex[1] = j;
            // lastShotBall2.src = 'img/no' + localStorage.getItem(localStorage.key(j)).slice(1) + 'trans.png';
            lastShotBall2.src = 'img/no' + localStorage.getItem(searchKey(j)).slice(1) + 'trans.png';
            for(var k = j-1; k > 0; k--){
              // if(localStorage.getItem(localStorage.key(k)).match(value)!=null){
              if(localStorage.getItem(searchKey(k)).match(value)!=null){
                lastIndex[2] = k;
                // lastShotBall3.src = 'img/no' + localStorage.getItem(localStorage.key(k)).slice(1) + 'trans.png';
                lastShotBall3.src = 'img/no' + localStorage.getItem(searchKey(k)).slice(1) + 'trans.png';
                break;
              }
            }
            if(k==0){
              lastShotBall3.src = '';
            }
            break;
          }
        }
        if(j==0){
          lastShotBall2.src = '';
          lastShotBall3.src = '';
        }
        break;
      }
    }
    if(i==0){
      lastShotBall1.src = '';
      lastShotBall2.src = '';
      lastShotBall3.src = '';
    }

    // console.log('i: ' + i + ',j; '+ j + ', k:' + k);

    message = turn + 'SHOOT' + actIndex - head + 1;

  }else if(actIndex >= DEAD_HEAD && actIndex <= DEAD_TAIL){
    // localStorage.removeItem(localStorage.key(localStorage.length - 1));
    localStorage.removeItem(searchKey());
    var ball = document.getElementById('no' + (actIndex - DEAD_HEAD + 1));
    backBall(ball);
    var dead = document.getElementById('dead');
    dead.innerHTML = calcLog('D[1-9]',0);

    message = 'Dead no' + (actIndex - DEAD_HEAD + 1);

  }else if((actIndex >= SAFETY_HEAD && actIndex <= SAFETY_TAIL) || (actIndex >= CHANGE_HEAD && actIndex <= CHANGE_TAIL)){
      // localStorage.removeItem(localStorage.key(localStorage.length - 1));
    localStorage.removeItem(searchKey());
    if(searchKey(BANKINGRESULT) != ''){
      if(actIndex == SAFETY_HEAD || actIndex == CHANGE_HEAD){
        document.getElementById('turnL').checked = false;
        document.getElementById('turnR').checked = true;
        document.getElementById('safeR').innerHTML = calcLog('StoL',0);
        document.getElementById('TOL').style.visibility = 'hidden';
        document.getElementById('TOR').style.visibility = 'visible';
      }else{
        document.getElementById('turnL').checked = true;
        document.getElementById('turnR').checked = false;
        document.getElementById('safeL').innerHTML = calcLog('StoR',0);
        document.getElementById('TOL').style.visibility = 'visible';
        document.getElementById('TOR').style.visibility = 'hidden';
      }
      
      var countInning;
      // if(localStorage.getItem(localStorage.key(1)).slice(-1)=='L'){
      if(localStorage.getItem(searchKey(BANKINGRESULT)).slice(-1)=='L'){
        countInning = calcLog('.toL',0);
      }else{
        countInning = calcLog('.toR',0);
      }
      document.getElementById('inning').innerHTML = countInning;
    }else{
      startNewGame();
    }

  }else if(actIndex >= TIMEOUT_HEAD && actIndex <= TIMEOUT_TAIL){
    // localStorage.removeItem(localStorage.key(localStorage.length - 1));
    localStorage.removeItem(searchKey());
    var timeout = document.getElementById('timeout' + log.slice(0,1) + log.slice(3));
    timeout.classList.remove('led-yellow-off');
    timeout.classList.add('led-yellow');
    document.getElementById('TO' + log.slice(0,1)).src = 'img/timeout.png';

  }else if(actIndex >= BR_HEAD && actIndex <= BR_TAIL){
    // localStorage.removeItem(localStorage.key(localStorage.length - 1));
    localStorage.removeItem(searchKey());
    document.getElementById('br'+log.slice(0,1)).innerHTML = calcLog(log.slice(0,1) + 'BR',0);
    undo();

  }else if(actIndex >= ACE_HEAD && actIndex <= ACE_TAIL){
    // localStorage.removeItem(localStorage.key(localStorage.length - 1));
    localStorage.removeItem(searchKey());
    document.getElementById('ace'+log.slice(0,1)).innerHTML = calcLog(log.slice(0,1) + 'Ace',0);

  }else if(actIndex >= FREE_HEAD && actIndex <= FREE_TAIL){
    localStorage.removeItem(searchKey());
    var freeBall = document.getElementById('freeball');
    // var animation = 'flash';
    var animation;
    if(actIndex == FREE_HEAD){
      animation = 'bounceInLeft';
    }else{
      animation = 'bounceInRight';
    }
    freeBall.classList.add('animated', animation);
    freeBall.addEventListener('animationend', function() {freeBall.classList.remove('animated', animation)});
  }else if(actIndex == NEXT_HEAD){
    // localStorage.removeItem(localStorage.key(localStorage.length - 1));
    localStorage.removeItem(searchKey());
    // console.log('result: ' + localStorage.getItem(localStorage.key(localStorage.length-1)));
    // if(localStorage.getItem(localStorage.key(localStorage.length-1)).match(new RegExp('^[L|R][B|9]'))!=null){
    if(localStorage.getItem(searchKey()).match(new RegExp('^[L|R][B|9]'))!=null){
      var ball;
      for(var i = 1; i < 9; i++){
        ball = document.querySelector('#no'+i);
        ball.classList.remove('animated', "bounceInUp");
        ball.classList.add('animated', "bounceOutDown");
      }
    }else{
      var deadBalls = [1,1,1,1,1,1,1,1,0];
      // while(localStorage.getItem(localStorage.key(localStorage.length-1)).slice(1) != 9){
      while(localStorage.getItem(searchKey()).slice(1) != 9){
        // console.log('no: ' +localStorage.getItem(localStorage.key(localStorage.length-1)).slice(1));
        // deadBalls[localStorage.getItem(localStorage.key(localStorage.length-1)).slice(1) - 1] = 0;
        deadBalls[localStorage.getItem(searchKey()).slice(1) - 1] = 0;
        // localStorage.removeItem(localStorage.key(localStorage.length - 1));
        localStorage.removeItem(searchKey());
      }
      for(i = 0; i < 9; i++){
        if(deadBalls[i] == 1){
          // console.log('deadBalls: ' + deadBalls);
          var ball = document.getElementById('no' + (i + 1));
          ball.classList.remove('animated', "bounceInUp");
          ball.classList.add('animated', "bounceOutDown");
        }
      }
      var dead = document.getElementById('dead');
      dead.innerHTML = calcLog('D[1-9]',0);
    }
    setTO(document.getElementById('skillL').value, document.getElementById('skillR').value);
    undo();

  }else if(actIndex == END_HEAD){
    // localStorage.removeItem(localStorage.key(localStorage.length - 1));
    localStorage.removeItem(searchKey());
    undo();

  // }else if(actIndex >= SKILLL_HEAD && actIndex <= SKILLR_TAIL){
  //   var turn;
  //   var value;

  //   if(document.getElementById('turnL').checked == true){
  //     turn = 'L';
  //   }else{
  //     turn = 'R';
  //   }
  //   for(var i = localStorage.length - 1; i > 0; i--){
  //     // console.log('prev skill: ' + localStorage.getItem(localStorage.key(i)).match('S' + turn));
  //     if(localStorage.getItem(localStorage.key(i)).match('S' + turn)!=null){
  //       // console.log('prev skill lv: ' + localStorage.getItem(localStorage.key(i)).slice(-1));
  //       document.getElementById('skill'+turn).value = localStorage.getItem(localStorage.key(i)).slice(-1);
  //       break;
  //     }
  //   }
  //   if(i==0){
  //     document.getElementById('skill'+turn).value = 1;
  //   }
  //   localStorage.removeItem(localStorage.key(localStorage.length - 1));
  // // }else if(actIndex == DBL_HEAD){
  // //   localStorage.removeItem(localStorage.key(localStorage.length - 1));
  // //   document.getElementById('double').checked == false;
  }
  resume();

  // console.log('undo message: ' + message);


}

var addAce = function(){
  var leftButton = document.getElementById( "turnL" );
  var rightButton = document.getElementById( "turnR" );
  var turn;
  
  if(leftButton.checked==true){
    turn = ('L');
  }else{
    turn = ('R');
  }
  
    writeLog(turn + 'Ace');
    document.getElementById( "ace" + turn ).innerHTML = calcLog(turn + 'Ace',0);

}

var addSafety = function(){
  var leftButton = document.getElementById( "turnL" );
  var rightButton = document.getElementById( "turnR" );
  var safe;
  
  if(leftButton.checked==true){
    writeLog('StoR');
    document.getElementById( "safeL" ).innerHTML = calcLog('StoR',0);

    leftButton.checked=false;
    rightButton.checked=true;
    document.getElementById('TOL').style.visibility = 'hidden';
    document.getElementById('TOR').style.visibility = 'visible';
  }else{
    writeLog('StoL');
    document.getElementById( "safeR" ).innerHTML = calcLog('StoL',0);
    
    rightButton.checked=false;
    leftButton.checked=true;
    document.getElementById('TOL').style.visibility = 'visible';
    document.getElementById('TOR').style.visibility = 'hidden';
    
  }

  addInning();

}

var addDead = function(ballNo){
  writeLog('D'+ballNo);
  var dead = document.getElementById('dead');
  dead.innerHTML = calcLog('D[1-9]',0);
}

var countUp = function(ballNo){

  if(chkDoubleCount(ballNo)){
  }else{
      
    var turn;
    var score;
    var goal;

    var skillL = document.getElementById('skillL');
    var skillR = document.getElementById('skillR');

    var playerL = document.getElementById('playerL');
    var playerR = document.getElementById('playerR');

    var leftButton = document.getElementById( "turnL" );
    if(leftButton.checked==true){
      turn = 'L';
      // goal = playerL.myGoal;
      goal = POINTARRAY[skillL.value-1].length;
    }else{
      turn = 'R';
      // goal = playerR.myGoal;
      goal = POINTARRAY[skillR.value-1].length;
    }
    writeLog(turn + ballNo);
    
    var newScore = calcLog('^' + turn + '[1-9]',0) + calcLog(turn + '9',0);

    // var dblFlag = false;
    // for(var i = 0; i < localStorage.length; i++){
    //   if(localStorage.getItem(localStorage.key(i)) == 'DBL'){
    //     dblFlag = true;
    //     break;
    //   }
    // }
    // // if(document.getElementById('double').checked==true){
    // if(dblFlag==true){
    // // if(bDbl==true){
    //   newScore = newScore * 2;
    // }

    // if(localStorage.getItem(localStorage.key(STRG_DBL)) == 'DBL'){
    if(localStorage.getItem(searchKey(STRG_DBL)) == 'DBL'){
      newScore = newScore * 2;
    }

    if (newScore >= goal){
      newScore = goal;
      if(turn=='L'){
        pointL.innerHTML = 20 - pointR.innerHTML;
      }else{
        // console.log('oppo: '+playerL.innerHTML);
        pointR.innerHTML = 20 - pointL.innerHTML;
      }
    }else if(turn=='L'){
      // pointL.innerHTML = playerL.myPointArray[newScore];
      pointL.innerHTML = POINTARRAY[skillL.value-1][newScore];
    }else{
      // pointR.innerHTML = playerR.myPointArray[newScore];
      pointR.innerHTML = POINTARRAY[skillR.value-1][newScore];
    }
    
    var more = document.getElementById('more' + turn);
    var newMore = goal - newScore;
    var scoreColor = 'rgb(248, 248, 248)';
    var moreColor;
    switch(newMore){
      case 5:
      case 4:
      case 3:
      case 2:
        // moreColor = 'rgb(247, 193, 46)';
        scoreColor = 'rgb(255, 236, 0)';
        newMore = newMore + ' more';
        break;
      case 1:
        // moreColor = 'rgb(219, 0, 0)';
        scoreColor = 'rgb(252, 57, 16)';
        newMore = 'Game ball'
        break;
      case 0:
        // moreColor = 'rgb(219, 0, 0)';
        scoreColor = 'rgb(216, 55, 239)';
        newMore = 'Win!';
        // var time = document.getElementById('timeE');
        // time.innerHTML = localStorage.key(localStorage.length-1).split(' ')[1].substring(0,5);
        writeLog('End');
        break;
      default:
        // moreColor = 'rgb(248, 248, 248)';
        // scoreColor = 'rgb(248, 248, 248)';
        newMore = newMore + ' more';

    }
    // more.style.color = moreColor;
    more.innerHTML = newMore;
    score = document.getElementById('score' + turn);
    score.style.color = scoreColor;
    score.innerHTML = newScore;

    var lastShotBall1 = document.getElementById('lastShotBall'+turn+'1');
    var lastShotBall2 = document.getElementById('lastShotBall'+turn+'2');
    var lastShotBall3 = document.getElementById('lastShotBall'+turn+'3');

    var imgsrc1 = lastShotBall1.src.split('/');
    var imgsrc2 = lastShotBall2.src.split('/');

    if(imgsrc2[imgsrc2.length-1].match(new RegExp('no.trans')) != null){
      lastShotBall3.src = lastShotBall2.src;
    }
    if(imgsrc1[imgsrc1.length-1].match(new RegExp('no.trans')) != null){
      lastShotBall2.src = lastShotBall1.src;
    }
    lastShotBall1.src = 'img/no' + ballNo + 'trans.png';

  }
}



var chkDoubleCount = function(ballNo){
  var result;
  if (calcLog(new RegExp('^[LR]'+ballNo), getRackStartIndex()) == 0){
    result = false;
  }else{
    result = true;
  }
  // console.log('chk: '+ result);
  return result;
}

var backBall = function(ball)  {
  ball.classList.remove('animated', "bounceOutDown");
  ball.classList.add('animated', "bounceInUp");
  ball.removeEventListener('animationend', backBall);
  if (typeof callback === 'function') callback();
}

var nextRack = function(turn='N'){
  var allBalls = document.querySelectorAll("[id^=no]");
  for(var i=0;i<9;i++){
    if(allBalls[i].classList.contains("bounceInUp")){
      addDead(i+1);
    }
    allBalls[i].addEventListener('animationend', backBall(allBalls[i]));
  };
  
  
  var skillL = document.getElementById('skillL');
  var skillR = document.getElementById('skillR');
  // console.log('L:'+skillL.value+'R:'+skillR.value+'turn:'+turn );
  getbackTimeout(skillL.value, skillR.value);
  if(turn != 'N'){
    document.getElementById('TO' + turn).src = 'img/timeout.png';
  }else{
    document.getElementById('TOL').src = 'img/timeout.png';
    document.getElementById('TOR').src = 'img/timeout.png';
  }
  writeLog('Next');
}

var takeTimeout = function(){
  var turn;
  if(document.getElementById( "turnL" ).checked==true){
    turn = 'L';
  }else{
    turn = 'R';
  }

  var timeout1 = document.getElementById('timeout' + turn + '1');
  var timeout2 = document.getElementById('timeout' + turn + '2');

  if(timeout2.classList.contains('led-yellow')){
    timeout2.classList.remove('led-yellow');
    timeout2.classList.add('led-yellow-off');
    writeLog(turn + 'TO2');
    window.location.href='timer.html';
  }else if(timeout1.classList.contains('led-yellow')){
    timeout1.classList.remove('led-yellow');
    timeout1.classList.add('led-yellow-off');
    writeLog(turn + 'TO1');
    window.location.href='timer.html';
  }else{
    window.alert('NO MORE TIMEOUT in this set for \n' + 'Player ' + turn + ':' + document.getElementById('playerName' + turn).value + '!');
  }
}

var shoot = function(ballNo){
  // if(((ballNo == 9) && (document.getElementById('btnDeadCheck').checked)) || 
  if(((ballNo == 9) && (document.getElementById('ballTable').style.backgroundColor==DEAD_ON)) || (document.getElementById('turnL').checked == false && document.getElementById('turnR').checked == false) || localStorage.getItem(searchKey()) == 'End'){
  }else{

    var ball = document.querySelector('#no'+ballNo);
    ball.classList.remove('animated', "bounceInUp");
    ball.classList.add('animated', "bounceOutDown");

    // if(btnDeadCheck.checked==true){
    if(document.getElementById('ballTable').style.backgroundColor==DEAD_ON){
      // console.log('dead');
      addDead(ballNo); 
    }else{
      // console.log('countUp');
      countUp(ballNo);
    }

    // var promise = new Promise(function(resolve, reject) {
    //   setTimeout(function() {
    //     resolve('OK');
    //   }, 100);
    // });
    // promise.then(function(data){
      if(ballNo==9){
        var rackStart = getRackStartIndex();
        var leftButton = document.getElementById( "turnL" );
        var turn;
        if(leftButton.checked==true){
          turn = 'L';
        }else{
          turn = 'R';
        }
        var nBrflag = false;
        for(var i = 1; i < 10 && nBrflag == false;i++){
          if(calcLog(turn + i, rackStart) == 0){
            nBrflag = true;
          }
        }
        // console.log(calcLog('.to.',rackStart));
        if(i==10 && calcLog('.to.',rackStart) < 2){
          writeLog(turn + 'BR');
          document.getElementById('br'+turn).innerHTML = calcLog(turn + 'BR',0);
        }
        nextRack(turn);
        // nextRack();
      }
    // });
  }
}

var changeBallBG = function(){
  // if(btnDeadCheck.checked==true){
  if(document.getElementById('ballTable').style.backgroundColor==DEAD_OFF){
    document.getElementById('ballTable').style.backgroundColor = DEAD_ON;
    document.getElementById('btnDeadCheck').src = 'img/Dead_On.png';
  }else{
    document.getElementById('ballTable').style.backgroundColor = DEAD_OFF;
    document.getElementById('btnDeadCheck').src = 'img/Dead_Off.png';
  }
}

var checkData = function(){
  // if(localStorage.getItem(localStorage.key(0))==null){
  if(localStorage.getItem(searchKey(0))==null){
    startNewGame(true);
  }else{
    resume();
  }
}


var getbackTimeout = function(skillL,skillR){
  var timeoutL1 = document.getElementById('timeoutL1');
  var timeoutR1 = document.getElementById('timeoutR1');
  var timeoutL2 = document.getElementById('timeoutL2');
  var timeoutR2 = document.getElementById('timeoutR2');
  // console.log(timeoutR1.classList.contains('led-yellow-off'));
  timeoutL1.classList.remove('led-yellow-off');
  timeoutL1.classList.add('led-yellow');
  timeoutR1.classList.remove('led-yellow-off');
  timeoutR1.classList.add('led-yellow');

  if(skillL > 3){
    timeoutL2.classList.remove('led-yellow');
    timeoutL2.classList.add('led-yellow-off');
  }else{
    timeoutL2.classList.remove('led-yellow-off');
    timeoutL2.classList.add('led-yellow');
  }

  if(skillR > 3){
    timeoutR2.classList.remove('led-yellow');
    timeoutR2.classList.add('led-yellow-off');
  }else{
    timeoutR2.classList.remove('led-yellow-off');
    timeoutR2.classList.add('led-yellow');
  }

}


var setTO = function(skillL=1, skillR=1){
  // console.log('L:' + skillL + ',R:' + skillR);
  getbackTimeout(skillL, skillR);
  // getbackTimeout(3, 4);
  
  var timeoutL1 = document.getElementById('timeoutL1');
  var timeoutR1 = document.getElementById('timeoutR1');
  var timeoutL2 = document.getElementById('timeoutL2');
  var timeoutR2 = document.getElementById('timeoutR2');
  var timeoutLImg = 'img/timeout.png';
  var timeoutRImg = 'img/timeout.png';

  if(calcLog('LTO2',getRackStartIndex(localStorage.length)) > 0){
    timeoutL2.classList.remove('led-yellow');
    timeoutL2.classList.add('led-yellow-off');
  }
  if(calcLog('LTO1',getRackStartIndex(localStorage.length)) > 0){
    timeoutL1.classList.remove('led-yellow');
    timeoutL1.classList.add('led-yellow-off');
    timeoutLImg = 'img/timeout_nomore.png';
  }
  document.getElementById('TOL').src = timeoutLImg;

  if(calcLog('RTO2',getRackStartIndex(localStorage.length)) > 0){
    timeoutR2.classList.remove('led-yellow');
    timeoutR2.classList.add('led-yellow-off');
  }
  if(calcLog('RTO1',getRackStartIndex(localStorage.length)) > 0){
    timeoutR1.classList.remove('led-yellow');
    timeoutR1.classList.add('led-yellow-off');
    timeoutRImg = 'img/timeout_nomore.png';
  }
  document.getElementById('TOR').src = timeoutRImg;

}