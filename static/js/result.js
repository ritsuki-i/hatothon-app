document.getElementById("go-back").addEventListener("click", () => {
  history.back();
});

//生成されたグループ数を取得
var number_of_groups = document.getElementById("number_of_groups").innerHTML;

document.getElementById("share-result").addEventListener("click", () => {
  //チーム名編集ボタンの非表示
  for (j = 0; j < number_of_groups; j++) {
    const gnameon0 = document.getElementById(j);
    gnameon0.style.display = "none";
    const textdis1 = document.getElementById("group" + j + "_name");
    textdis1.style.display = "inline";
  }
  //スクショ用ヘッダーの表示
  var Scsho_header_content = document.getElementById("fix_component2");
  Scsho_header_content.style.display = "block";
  //元のヘッダーの非表示
  var header_content = document.getElementById("fix_component");
  header_content.style.display = "none";

  //時間かかるため状態表示
  const nowshare = document.getElementById("share-result");
  nowshare.innerHTML = "共有中...";
  nowshare.style.background = "#323338";
  nowshare.style.color = "#929292";
  nowshare.disabled = true;

  //長いため別関数へ
  generatePicture().then(function (resultBlob) {
    //入力されたグループ名を画像内で一体化させたかった　の後処理
    /* 
    for (var i = 0; i < number_of_groups; i++) {
      var wrapper = document.getElementById('group' + i + '_wrapper');
      wrapper.removeChild(group_names[i]);
      wrapper.insertBefore(input_boxes[i], wrapper.firstChild)
    }
    */
    //デバッグ用
    //document.getElementById('testspace').innerHTML = '<img src="' + resultPic + '"/>';

    //返ってきたblobをfileに
    var image = new File([resultBlob], "result.png", { type: "image/png" });
    //共有ボタンが利用可能か確認
    if (navigator.canShare && navigator.canShare({ files: [image] })) {
      //共有
      navigator.share({
        title: "n人組を共有",
        text: "作成したグループを共有",
        url: document.getElementById("toppage").href,
        files: [image],
      });
    } else {
      //共有利用不可の場合、画像を保存させる(MacのChrome等)
      image = null;
      var filename = number_of_groups + "groups-result.png";
      saveAs(resultBlob, filename);
      window.alert("結果を保存しました！");
    }
    //ボタンを元に戻す
    // document.getElementById("share-result").innerHTML = "結果を保存";
    nowshare.innerHTML = "結果を共有";
    nowshare.style.background = "#f09937";
    nowshare.style.color = "#ffffff";
    nowshare.disabled = false;
    //スクショ用ヘッダーの非表示
    var Scsho_header_content = document.getElementById("fix_component2");
    Scsho_header_content.style.display = "none";
    //元のヘッダーの表示
    var header_content = document.getElementById("fix_component");
    header_content.style.display = "block";
    //チーム名編集ボタンの表示
    for (l = 0; l < number_of_groups; l++) {
      const gnameon = document.getElementById(l);
      const textdis2 = document.getElementById("group" + l + "_name");
      if (textdis2.value == "") {
        textdis2.style.display = "none";
        gnameon.style.display = "inline";
      } else {
        textdis2.style.display = "inline";
        gnameon.style.display = "none";
      }
    }
  });
});

//結果画面を画像化する
//@return Blob
function generatePicture() {
  //入力されたグループ名を画像内で一体化させたかった
  /*
    var group_names = [];
    var input_boxes = [];
    for (var i = 0; i < number_of_groups; i++) {
      var wrapper = document.getElementById('group' + i + '_wrapper');
      var input = document.getElementById('group' + i + '_name');

      group_names[i] = document.createElement('p');
      group_names[i].className = 'white_text'
      group_names[i].innerHTML = input.value;

      input_boxes[i] = wrapper.removeChild(input);
      wrapper.appendChild(group_names[i]);
    }
    */
  //#scshoAreaをスクショの対象
  domtoimage.toBlob(document.getElementById("scshoArea"), {});
  var content = document.getElementById("scshoArea");
  domtoimage.toBlob(document.getElementById("scshoArea"), {});
  var content = document.getElementById("scshoArea");
  // //スクショの解像度は横1080pxとする
  // var currentWidth = Number(
  //   getComputedStyle(document.getElementById("scshoArea")).width.replace("px", "")
  // );
  // //解像度調整のための倍率算出
  // var scale = 1080 / currentWidth;

  // //スクショの最適な縦pxを算出
  // var wrapperHeight =
  //   scale *
  //   Number(
  //     getComputedStyle(
  //       document.getElementById("group0_wrapper")
  //     ).height.replace("px", "")
  //   );
  // var estimatedHeight =
  //   scale *
  //   Number(
  //     getComputedStyle(document.getElementById("fix_component2")).height.replace(
  //       "px",
  //       ""
  //     )
  //   );
  // estimatedHeight = estimatedHeight + 20 + number_of_groups * wrapperHeight;

  //dom-to-imageでiosの場合に限りhtml要素の一部の画像が取得できない問題、解決策を数多のサイトから探した結果、ついに解決。
  //解決案:dom-to-imageをアホみたいに何回も呼び出す。
  //記念すべき解決日時 2023-12-30 23:39
  //解決案を見つけたページ https://github.com/tsayen/dom-to-image/issues/343
  domtoimage.toBlob(content, {});
  var content = document.getElementById("scshoArea");
  domtoimage.toBlob(content, {});
  var content = document.getElementById("scshoArea");
  //dom-to-imageでスクショ化を開始
  return domtoimage.toBlob(content, {});
}

function editpush(content) {
  const editbutton = document.getElementById(content);
  editbutton.style.display = "none";
  const textdis = document.getElementById("group" + content + "_name");
  textdis.style.display = "inline";
  textdis.focus();
}
