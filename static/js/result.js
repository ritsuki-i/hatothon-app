document.getElementById("go-back").addEventListener("click", () => {
  history.back();
});

function shareResult(){
  document.getElementById('save-result').innerHTML = '共有中...';
  var groups = document.getElementById("number_of_groups").innerHTML;
  var resultPic = generatingPicture();
  //document.getElementById('testspace').innerHTML = '<img src="' + resultPic + '"/>';

  var image = new File([resultPic], "result.png", {type: "image/png"});
  if(navigator.canShare && navigator.canShare({files: [image]})) {
    navigator.share({
      title: 'n人組を共有',
      text: '作成したグループを共有',
      url: document.getElementById('toppage').href,
      files: [image],
    })
  }else{
    image = null;
    saveAs(resultPic, groups + 'groups-result.png');
  }

  document.getElementById('save-result').innerHTML = '結果を共有';
    window.alert('結果を保存しました！');
}

//@return Blob
function generatingPicture(){
  var groups = Number(document.getElementById("number_of_groups").innerHTML);

/* 入力されたグループ名を画像内で一体化させたかった
  var group_names = [];
  var input_boxes = [];
  for (var i = 0; i < groups; i++) {
    var wrapper = document.getElementById('group' + i + '_wrapper');
    var input = document.getElementById('group' + i + '_name');

    group_names[i] = document.createElement('p');
    group_names[i].className = 'white_text'
    group_names[i].innerHTML = input.value;

    input_boxes[i] = wrapper.removeChild(input);
    wrapper.appendChild(group_names[i]);
  }
  */

  var content = document.getElementById('body');
  var currentWidth = Number(getComputedStyle(document.getElementById('body')).width.replace('px',''));
  var scale = 1080 / currentWidth;

  var wrapperHeight = scale * Number(getComputedStyle(document.getElementById('group0_wrapper')).height.replace('px',''));
  var estimatedHeight = scale * Number(getComputedStyle(document.getElementById('fix_component')).height.replace('px',''));
  estimatedHeight = estimatedHeight + 20 + groups * wrapperHeight;

  domtoimage.toBlob(content, {
    width: 1080, height: estimatedHeight,
    style: {
      transform: 'scale(' + scale + ')',
      transformOrigin: 'top left'
    }
  }).then(function (blob) {
    return blob;

    /* 入力されたグループ名を画像内で一体化させたかった　の後処理
    for (var i = 0; i < groups; i++) {
      var wrapper = document.getElementById('group' + i + '_wrapper');
      wrapper.removeChild(group_names[i]);
      wrapper.insertBefore(input_boxes[i], wrapper.firstChild)
    }
    */
  }).catch(error => {
    console.error("error:", error);
  });
}
