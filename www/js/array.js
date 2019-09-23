// This is a JavaScript file

const POINTARRAY = [
  [0,0,0,1,2,3,3,4,5,6,6,7,8,8],
  [0,0,0,0,1,1,2,2,3,4,4,5,5,6,6,7,7,8,8],
  [0,0,0,0,0,1,1,2,2,2,3,3,4,4,4,5,5,6,6,6,7,7,8,8,8],
  [0,0,0,0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8],
  [0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,7,7,7,7,8,8,8,8],
  [0,0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,6,6,6,6,6,7,7,7,7,8,8,8,8,8],
  [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,4,5,5,5,5,5,6,6,6,6,6,6,7,7,7,7,7,7,8,8,8,8,8],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,5,5,5,5,5,5,6,6,6,6,6,6,6,7,7,7,7,7,7,8,8,8,8,8,8],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,6,6,6,6,6,6,6,7,7,7,7,7,7,7,8,8,8,8,8,8,8]  
];

const ACTARRAY = [
  'L1', //00
  'L2',
  'L3',
  'L4',
  'L5',
  'L6',
  'L7',
  'L8',
  'L9',
  'R1', //9
  'R2',
  'R3',
  'R4',
  'R5',
  'R6',
  'R7',
  'R8',
  'R9',
  'D1', //18
  'D2',
  'D3',
  'D4',
  'D5',
  'D6',
  'D7',
  'D8',
  'StoL', //26
  'StoR',
  'CtoL',
  'CtoR',
  'LTO1', //30
  'LTO2', //30
  'RTO1',
  'RTO2',
  'LBR', //32
  'RBR',
  'LAce', //34
  'RAce',
  'Next', //35
  'Start',  //36
  'End', //37
  'SL1',
  'SL2',
  'SL3',
  'SL4',
  'SL5',
  'SL6',
  'SL7',
  'SL8',
  'SL9',
  'SR1',
  'SR2',
  'SR3',
  'SR4',
  'SR5',
  'SR6',
  'SR7',
  'SR8',
  'SR9',
  'SGL',
  'DBL',
  'TNOL',
  'TNOR',
  'PNOL',
  'PNOR',
  'PNAL',
  'PNAR',
  'LFREE',
  'RFREE'
];

const LSHOOT_HEAD = ACTARRAY.indexOf('L1');
const LSHOOT_TAIL = ACTARRAY.indexOf('L9');
const RSHOOT_HEAD = ACTARRAY.indexOf('R1');
const RSHOOT_TAIL = ACTARRAY.indexOf('R9');
const DEAD_HEAD = ACTARRAY.indexOf('D1');
const DEAD_TAIL = ACTARRAY.indexOf('D8');
const SAFETY_HEAD = ACTARRAY.indexOf('StoL');
const SAFETY_TAIL = ACTARRAY.indexOf('StoR');
const CHANGE_HEAD = ACTARRAY.indexOf('CtoL');
const CHANGE_TAIL = ACTARRAY.indexOf('CtoR');
const TIMEOUT_HEAD = ACTARRAY.indexOf('LTO1');
const TIMEOUT_TAIL = ACTARRAY.indexOf('RTO2');
const BR_HEAD = ACTARRAY.indexOf('LBR');
const BR_TAIL = ACTARRAY.indexOf('RBR');
const ACE_HEAD = ACTARRAY.indexOf('LAce');
const ACE_TAIL = ACTARRAY.indexOf('RAce');
const NEXT_HEAD = ACTARRAY.indexOf('Next');
const START_HEAD = ACTARRAY.indexOf('Start');
const END_HEAD = ACTARRAY.indexOf('End');
const SKILLL_HEAD = ACTARRAY.indexOf('SL1');
const SKILLL_TAIL = ACTARRAY.indexOf('SL9');
const SKILLR_HEAD = ACTARRAY.indexOf('SR1');
const SKILLR_TAIL = ACTARRAY.indexOf('SR9');
const SGL_HEAD = ACTARRAY.indexOf('SGL');
const DBL_HEAD = ACTARRAY.indexOf('DBL');
const TEAM_HEAD = ACTARRAY.indexOf('TNOL');
const TEAM_TAIL = ACTARRAY.indexOf('TNOL');
const PNO_HEAD = ACTARRAY.indexOf('PNOL');
const PNO_TAIL = ACTARRAY.indexOf('PNOR');
const PNA_HEAD = ACTARRAY.indexOf('PNAL');
const PNA_TAIL = ACTARRAY.indexOf('PNAR');
const FREE_HEAD = ACTARRAY.indexOf('LFREE');
const FREE_TAIL = ACTARRAY.indexOf('RFREE');

const LOG_RACKROW = 0;
const LOG_LEFTROW = 1;
const LOG_RIGHTROW = 2;
const LOG_INNINGROW = 3;
const LOG_DEADROW = 4;

const STRG_TNOL = 0;
const STRG_PNOL = 1;
const STRG_PNAMEL = 2;
const STRG_SKILLL = 3;
const STRG_TNOR = 4;
const STRG_PNOR = 5;
const STRG_PNAMER = 6;
const STRG_SKILLR = 7;
const STRG_DBL = 8;

const START = 9;
const BANKINGRESULT = 10;
// const STRG_SKILLL = 0;
// const STRG_SKILLR = 1;
// const STRG_DBL = 2;

const DEAD_ON = 'rgb(192, 107, 28)';
const DEAD_OFF = 'rgb(51, 51, 51)';

var calcLog = function(keyword,start,end = localStorage.length){
  var count = 0;
  // console.log('start: '+start);
  // console.log('end: '+end);
  // console.log('keyword: '+keyword);
  var value = new RegExp(keyword);
  // for(var i = start; i < end; i++){
  //   if(localStorage.getItem(localStorage.key(i)).match(value)!=null){
  //     count++;
  //   }
  // }
  var key;
  for(var i = 0; i < localStorage.length; i++){
  // for(var i = localStorage.length-1; i > -1; i--){
    // var order = searchKey(i);
    // var order = 'dummy';
    // console.log('key: ' + i);
    // if(order.slice(-4) >= start && order.slice(-4) < end){
    key = localStorage.key(i);
    if(key.slice(-4) >= start && key.slice(-4) < end){
      // if(localStorage.getItem(order).match(value)!=null){
      if(localStorage.getItem(key).match(value)!=null){
        count++;
      }
    }
  }
  // console.log('count: '+count);
  return count;
}

var searchKey = function(order = localStorage.length-1){
  var i;
  var key;
  var flg = false;
  for(i = 0;i < localStorage.length; i++){
    key = localStorage.key(i);
    if(key.slice(-4) == order){
      flg = true;
      break;
    }
  }
  if(flg == false){
    key = '';
  }
  return key;
}

var getRackStartIndex = function(start = localStorage.length){
  var order;
  var i;
  var flgSearch = false;
  // for(var i = start-1; i > 0; i--){
  //   console.log('result: '+localStorage.getItem(localStorage.key(i)).match(new RegExp('Next')));
  //   if(localStorage.getItem(localStorage.key(i)).match(new RegExp('Next'))!=null){
  //     break;
  //   }
  // }
  // if (i!=0){
  //   i++;
  // }
  // console.log('from: '+i);
  // return i;

  for(order = start-1;order > -1; order--){
    // console.log(order);
    // console.log('key: ' + searchKey(order));
    // console.log('order: ' + order);
    if(localStorage.getItem(searchKey(order)).match(new RegExp('Next'))!=null){
      flgSearch = true;
      break;
    }
    
    // for(i = 0; i < localStorage.length; i++){
    //   console.log('key: ' + searchKey(i));
    //   // console.log('order: ' + order);
    //   if(searchKey(i).slice(-4) == order){
    //     if(localStorage.getItem(searchKey(i)).match(new RegExp('Next'))!=null){
    //       flgSearch = true;
    //       break;
    //     }
    //   }
    // }
    // console.log('key: ' + searchKey(i));
    if(flgSearch == true){
      break;
    }
  }
  if (order!=0){
    order++;
  }
  // console.log('from: ' + order);
  return order;
}
