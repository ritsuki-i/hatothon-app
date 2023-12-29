document.getElementById("go-back").addEventListener("click", () => {
  history.back();
});

//生成されたグループ数を取得
var number_of_groups = document.getElementById("number_of_groups").innerHTML;

document.getElementById("share-result").addEventListener("click", () => {
  //スクショ用ヘッダーの表示
  var Scsho_header_content = document.getElementById("fix_component2");
  Scsho_header_content.style.display = "block";
  var header_content = document.getElementById("fix_component");
  header_content.style.display = "none";
  //時間かかるため状態表示
  document.getElementById("share-result").innerHTML = "共有中...";
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
    document.getElementById("share-result").innerHTML = "結果を共有";
    //スクショ用ヘッダーの非表示
    var Scsho_header_content = document.getElementById("fix_component2");
    Scsho_header_content.style.display = "none";
    var header_content = document.getElementById("fix_component");
    header_content.style.display = "block";
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
  var content = document.getElementById("scshoArea");
  //スクショの解像度は横1080pxとする
  var currentWidth = Number(
    getComputedStyle(document.getElementById("scshoArea")).width.replace("px", "")
  );
  //解像度調整のための倍率算出
  var scale = 1080 / currentWidth;

  //スクショの最適な縦pxを算出
  var wrapperHeight =
    scale *
    Number(
      getComputedStyle(
        document.getElementById("group0_wrapper")
      ).height.replace("px", "")
    );
  var estimatedHeight =
    scale *
    Number(
      getComputedStyle(document.getElementById("fix_component2")).height.replace(
        "px",
        ""
      )
    );
  estimatedHeight = estimatedHeight + 20 + number_of_groups * wrapperHeight;

  //dom-to-imageでスクショ化を開始
  return domtoimage.toBlob(content, {
    width: 1080,
    height: estimatedHeight,
    style: {
      transform: "scale(" + scale + ")",
      transformOrigin: "top left",
    },
  });
}