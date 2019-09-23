// This is a JavaScript file


function openWindow(str){
  window.open(str, '_system', 'location=yes');
}

//表を画像化して保存(今はテキスト)
function saveTable(dist){
  var result;
  var tblTbody = document.getElementById('table');
  var tblTbody = document.getElementsByTagName('table').item(0);
  var pNameL = localStorage.getItem(searchKey(STRG_PNAMEL));
  var pNameR = localStorage.getItem(searchKey(STRG_PNAMER));

  result = pNameL.slice(3) + ' VS ' + pNameR.slice(3);

  // // td内のtrをループ。rowsコレクションで,行位置取得。

  var col = tblTbody.rows[0].cells.length - 1;
  for (var i=0, rowLen=tblTbody.rows.length; i<rowLen; i++) {
  // tr内のtdをループ。cellsコレクションで行内セル位置取得。
  // for (var j=0, colLen=tblTbody.rows[i].cells.length ; j<colLen; j++) {
    // var col = tblTbody.rows[i].cells.length - 1;
    console.log(col);
    //i行目のj列目のセルを取得
    var cells = tblTbody.rows[i].cells[col];
    // console.log(cells.innerText);
    result = result + '\r\n' + cells.innerText;
    
  }

  var header;
  if(dist=='line'){
    header = 'https://line.me/R/msg/text/?';
  }else if(dist=='twitter'){
    header = 'twitter://post?message=';
  }
  var str = header + encodeURIComponent(result);
  window.open(str, '_system', 'location=yes');



  // const tableElement = document.querySelector('#table');
  // const canvasElement = document.querySelector('#canvas');
  // // const linkElement = document.querySelector('#dl-link');

  // var ima = dateToFormatString(new Date(), '%YYYY%%MM%%DD%_%HH%%mm%');

  // html2canvas(document.querySelector("#table")).then(canvas => { // #tableを画像化対象に指定
  //   // canvasElement.src = canvas.toDataURL();
  //   canvasElement.href = canvas.toDataURL('image/png');
  //   // canvasElement.download = ima + '_history.png';
  //   // canvasElement.click();

  //   // linkElement.href = canvas.toDataURL('image/png'); 
  //   // linkElement.click();

      
  //   // https://blog.asial.co.jp/1313
  //   // var url = myCanvas.toDataURL("image/png");
  //   var url = canvasElement.href;
  //   var base64data = url.split(',')[1];
  //   // console.log(base64data);

  //   var array = b64utils.decode( base64data );
    
  //   // var pathExternalPublicDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
    
  //   // var pathExternalPublicDir = cordova.file.externalDataDirectory;
  //   // Downloadフォルダーのパス
  //   // var dir = pathExternalPublicDir.getPath();

  //   // console.log(dir);
  //   // console.log(cordova.file.externalDataDirectory);

  //   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {  
  //     // fs.root.getFile(cordova.file.externalDataDirectory + "myimage.png" , {create:true, exclusive:false}, 
      
  //     console.log('aaa');
  //   console.log(cordova.file.cacheDirectory);
  //     fs.root.getFile("myimage.png" , {create:true, exclusive:false}, 
  //     // fs.root.getFile("Documents/myimage.png" , {create:true, exclusive:false}, 
  //     // fs.root.getFile(cordova.file.cacheDirectory + 'myimage.png', {create:true, exclusive:false}, 
  //       function(entry) {
  //         console.log('bbb');
  //         entry.createWriter( 
  //           function(writer) {

  //             var cb = function() {
  //               console.log("write end"); alert("Save OK");

  //               //ここでなんとかできない？
  //               var header;
  //               if(dist=='line'){
  //                 // header = 'https://line.me/R/msg/image/';
  //                 header = 'line://msg/image/';
  //               }else if(dist=='twitter'){
  //                 header = 'twitter://post?message=';
  //               }
  //               var str = header + 'myimage.png';
  //               setTimeout(openWindow(str),5000);
  //                           }

  //             writer.onwrite = cb;
  //             writer.onerror = function() { console.log("write error"); }
  //             writer.write( array );

  //           } ,
  //           function() {
  //             console.log("create write error");
  //           }
  //         );
  //       } ,
  //       function(){ }
  //     );
  //   }, function() { });
  // });

}
