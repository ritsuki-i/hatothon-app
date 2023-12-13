// 画像を変更する関数
function changeImage(selectElement) {

  // 選択された値を取得
  let selectedValue = selectElement.value;

  // 画像のソースを設定
  let imageSrc = "";

  // 選択に基づいて画像のソースを設定
  switch (selectedValue) {
    case "option0":
      imageSrc = "./static/images/default.jpeg";
      break;
    case "INTJ(建築家)":
      imageSrc = "./static/images/architect.jpeg";
      break;
    case "INTP(論理学者)":
      imageSrc = "./static/images/logist.jpeg";
      break;
    case "ENTJ(指揮官)":
      imageSrc = "./static/images/commander.jpeg";
      break;
    case "ENTP(討論者)":
      imageSrc = "./static/images/debater.jpeg";
      break;
    case "INFJ(提唱者)":
      imageSrc = "./static/images/advocater.jpeg";
      break;
    case "INFP(仲介者)":
      imageSrc = "./static/images/intermediary.jpeg";
      break;
    case "ENFJ(主人公)":
      imageSrc = "./static/images/protagonist.jpeg";
      break;
    case "ENFP(運動家)":
      imageSrc = "./static/images/activist.jpeg";
      break;
    case "ISTJ(管理者)":
      imageSrc = "./static/images/administrator.jpeg";
      break;
    case "ISFJ(擁護者)":
      imageSrc = "./static/images/defender.jpeg";
      break;
    case "ESTJ(幹部)":
      imageSrc = "./static/images/executives.jpeg";
      break;
    case "ESFJ(領事)":
      imageSrc = "./static/images/consul.jpeg";
      break;
    case "ISTP(巨匠)":
      imageSrc = "./static/images/master.jpeg";
      break;
    case "ISFP(冒険家)":
      imageSrc = "./static/images/adventurer.jpeg";
      break;
    case "ESTP(起業家)":
      imageSrc = "./static/images/entrepreneur.jpeg";
      break;
    case "ESFP(エンターテイナー)":
      imageSrc = "./static/images/entertainer.jpeg";
      break;
  }

  // 画像を表示するコンテナを取得
  let imageContainer = selectElement.nextElementSibling;

  // 画像を作成し、表示する
  let imageElement = document.createElement("img");
  imageElement.src = imageSrc;
  imageContainer.innerHTML = "";
  imageContainer.appendChild(imageElement);

}

// メンバーを追加・削除する関数
function addMember() {

  // 新しい画像選択の要素を作成
  let pullDownContainer = document.createElement("div");
  pullDownContainer.className = "image-container";

  // プルダウンリストの要素を作成
  let pullDown = document.createElement("select");
  pullDown.name = "get_input";
  pullDown.className = "dropdown"
  pullDown.required = true;
  pullDown.addEventListener("change", function() {
    changeImage(pullDown);
    checkDropdowns();
  });

  // プルダウンのオプション
  let option0 = document.createElement("option");
  option0.text = "MBTIを選択";
  option0.value = "option0";
  option0.disabled = true;
  option0.selected = true;
  pullDown.add(option0);

  let option1 = document.createElement("option");
  option1.value = "INTJ(建築家)";
  option1.text = "INTJ(建築家)";
  pullDown.add(option1);

  let option2 = document.createElement("option");
  option2.value = "INTP(論理学者)";
  option2.text = "INTP(論理学者)";
  pullDown.add(option2);

  let option3 = document.createElement("option");
  option3.value = "ENTJ(指揮官)";
  option3.text = "ENTJ(指揮官)";
  pullDown.add(option3);

  let option4 = document.createElement("option");
  option4.value = "ENTP(討論者)";
  option4.text = "ENTP(討論者)";
  pullDown.add(option4);

  let option5 = document.createElement("option");
  option5.value = "INFJ(提唱者)";
  option5.text = "INFJ(提唱者)";
  pullDown.add(option5);

  let option6 = document.createElement("option");
  option6.value = "INFP(仲介者)";
  option6.text = "INFP(仲介者)";
  pullDown.add(option6);

  let option7 = document.createElement("option");
  option7.value = "ENFJ(主人公)";
  option7.text = "ENFJ(主人公)";
  pullDown.add(option7);

  let option8 = document.createElement("option");
  option8.value = "ENFP(運動家)";
  option8.text = "ENFP(運動家)";
  pullDown.add(option8);

  let option9 = document.createElement("option");
  option9.value = "ISTJ(管理者)";
  option9.text = "ISTJ(管理者)";
  pullDown.add(option9);

  let option10 = document.createElement("option");
  option10.value = "ISFJ(擁護者)";
  option10.text = "ISFJ(擁護者)";
  pullDown.add(option10);

  let option11 = document.createElement("option");
  option11.value = "ESTJ(幹部)";
  option11.text = "ESTJ(幹部)";
  pullDown.add(option11);

  let option12 = document.createElement("option");
  option12.value = "ESFJ(領事)";
  option12.text = "ESFJ(領事)";
  pullDown.add(option12);

  let option13 = document.createElement("option");
  option13.value = "ISTP(巨匠)";
  option13.text = "ISTP(巨匠)";
  pullDown.add(option13);

  let option14 = document.createElement("option");
  option14.value = "ISFP(冒険家)";
  option14.text = "ISFP(冒険家)";
  pullDown.add(option14);

  let option15 = document.createElement("option");
  option15.value = "ESTP(起業家)";
  option15.text = "ESTP(起業家)";
  pullDown.add(option15);

  let option16 = document.createElement("option");
  option16.value = "ESFP(エンターテイナー)";
  option16.text = "ESFP(エンターテイナー)";
  pullDown.add(option16);

  // 画像を表示するコンテナを作成
  let selectedImageContainer = document.createElement("div");

  // プルダウンのコンテナにプルダウンリストを追加
  pullDownContainer.appendChild(pullDown);

  // プルダウンのコンテナに画像を表示するコンテナを追加
  pullDownContainer.appendChild(selectedImageContainer);

  // プルダウンのコンテナを取得
  let container = document.getElementById("image-container");

  //名前を入れるテキストボックス
  let newTextbox = document.createElement("input");
  newTextbox.type = "text";
  newTextbox.name = "get_input";
  newTextbox.className = "name_textbox";
  newTextbox.placeholder = "名前を入力";
  newTextbox.required = true;
  newTextbox.addEventListener("input", function() {
    checkDropdowns();
  });
  pullDownContainer.appendChild(newTextbox);

  // コンテナに新しいプルダウンを追加
  if(count < 12){
    container.appendChild(pullDownContainer);
  }

  //残り人数反映
  rest2();
}

//人数カウント
const number = document.querySelector('#memberNumber');

//人数を増やす
const plusButton = document.getElementById("addButton");

let count = 0;

plusButton.addEventListener('click', () => {
    if(count < 12){
      count ++; 
    }
    addOption();
    number.innerHTML = count;
});

//人数を減らす
const reduceButton = document.querySelector('#removeButton');

reduceButton.addEventListener('click', () => {
    if (count > 4) {
      count = count - 1;
      removeMember()
    }
    number.innerHTML = count;
});

//最初に4回自動おし
for(i=0;i<4;i++){
  const auto_button = document.getElementById('addButton');
  auto_button.click();
}

//残り人数反映
rest();

//ボタン状況記憶
let flag3 = 0;

//グループ数のプルダウン制御
function addOption() {

  // ドロップダウンメニューの要素を取得
  let dropdown = document.getElementById("group_num");

  // 新しいオプションを作成
  let newOption
  if (dropdown.options.length <= 4) {
    newOption = document.createElement("option");
    let optionText = document.createTextNode(count / 2);
    newOption.appendChild(optionText);
  }

  // 新しいオプションをドロップダウンに追加
  if (count >= 4 && dropdown.options.length <= 4 && count % 2 == 0) {
    dropdown.appendChild(newOption);
  }
}

//メンバー削除
function removeMember(){
  const removeM = document.querySelector('.image-container:last-child');
  removeM.remove();

  //グループ数オプション削除
  const removeG = document.querySelector('option:last-child');
  if(count >= 3 && count < 12 && count % 2 == 1){
    removeG.remove();
  }

  //残り人数反映
  rest();
}

//残り人数表示
//初期値およびメンバー削除時の残り人数表示の変更
function rest(){
  let ato = document.getElementById("resible_rest");
  ato.innerHTML = "あと" + (12-count) + "人";
  ato.style.color = "#f09937"
}

//メンバー追加時の残り人数表示の変更
function rest2(){
  let ato = document.getElementById("resible_rest");
  if((12-(count+1)) <= 0){
    ato.innerHTML = "あと0人";
    ato.style.color = "rgb(255, 60, 60)";
  }else{
    ato.innerHTML = "あと" + (12-(count+1)) + "人";
    ato.style.color = "#f09937";
  }
}

//要素を全て入力できたか確認
function areAllDropdownsSelected() {
  let flag1 = 1;
  let flag2 = 1;

  //プルダウンの選択変更監視
  const dropdowns = document.querySelectorAll('.dropdown');
  for (const dropdown of dropdowns) {
    if (dropdown.value === "option0") {
      flag1 = 0;
    }
  }

  //名前欄の入力監視
  const name_textboxes = document.querySelectorAll('.name_textbox');
  for (const name_textbox of name_textboxes) {
    if (name_textbox.value === '') {
      flag2 = 0;
    }
  }
  // console.log(flag1)
  // console.log(flag2)

  //どちらも全て入力されていたらボタンを有効化
  if(flag1 == 1 && flag2 == 1){
    if (flag3 == 0){
      const submitButton_on = document.getElementById("G_addButton");
      submitButton_on.id = "ButtonValid";
      flag3 = 1;
    }
    return false;
  }else{
    if (flag3 == 1){
      const submitButton_off = document.getElementById("ButtonValid");
      submitButton_off.id = "G_addButton";
      flag3 = 0;
    }
    return true;
  }
}

//ボタンを有効化
function checkDropdowns() {
  if(flag3 == 0){
    const submitButton0 = document.getElementById("G_addButton");
    submitButton0.disabled = areAllDropdownsSelected();
  }else{
    const submitButton1 = document.getElementById("ButtonValid");
    submitButton1.disabled = areAllDropdownsSelected();
  }
  const error_message = document.getElementById("error_message");
  error_message.hidden = !(areAllDropdownsSelected());
}

