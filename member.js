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
      case "option1":
        imageSrc = "./static/images/architect.jpeg";
        break;
      case "option2":
        imageSrc = "./static/images/logist.jpeg";
        break;
      case "option3":
        imageSrc = "./static/images/commander.jpeg";
        break;
      case "option4":
        imageSrc = "./static/images/debater.jpeg";
        break;
      case "option5":
        imageSrc = "./static/images/advocater.jpeg";
        break;
      case "option6":
        imageSrc = "./static/images/intermediary.jpeg";
        break;
      case "option7":
        imageSrc = "./static/images/protagonist.jpeg";
        break;
      case "option8":
        imageSrc = "./static/images/activist.jpeg";
        break;
      case "option9":
        imageSrc = "./static/images/administrator.jpeg";
        break;
      case "option10":
        imageSrc = "./static/images/defender.jpeg";
        break;
      case "option11":
        imageSrc = "./static/images/executives.jpeg";
        break;
      case "option12":
        imageSrc = "./static/images/consul.jpeg";
        break;
      case "option13":
        imageSrc = "./static/images/master.jpeg";
        break;
      case "option14":
        imageSrc = "./static/images/adventurer.jpeg";
        break;
      case "option15":
        imageSrc = "./static/images/entrepreneur.jpeg";
        break;
      case "option16":
        imageSrc = "./static/images/entertainer.jpeg";
        break;
      // 新しい選択肢が追加される場合、ここに追加
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
    pullDown.required = true;
    pullDown.addEventListener("change", function() {
      changeImage(pullDown);
    });

    // プルダウンのオプション
    let option0 = document.createElement("option");
    option0.text = "MBTIを選択";
    option0.value = "option0";
    option0.hidden = true;
    pullDown.add(option0);

    let option1 = document.createElement("option");
    option1.value = "option1";
    option1.text = "INTJ(建築家)";
    pullDown.add(option1);

    let option2 = document.createElement("option");
    option2.value = "option2";
    option2.text = "INTP(論理学者)";
    pullDown.add(option2);

    let option3 = document.createElement("option");
    option3.value = "option3";
    option3.text = "ENTJ(指揮官)";
    pullDown.add(option3);

    let option4 = document.createElement("option");
    option4.value = "option4";
    option4.text = "ENTP(討論者)";
    pullDown.add(option4);

    let option5 = document.createElement("option");
    option5.value = "option5";
    option5.text = "INFJ(提唱者)";
    pullDown.add(option5);

    let option6 = document.createElement("option");
    option6.value = "option6";
    option6.text = "INFP(仲介者)";
    pullDown.add(option6);

    let option7 = document.createElement("option");
    option7.value = "option7";
    option7.text = "ENFJ(主人公)";
    pullDown.add(option7);

    let option8 = document.createElement("option");
    option8.value = "option8";
    option8.text = "ENFP(運動家)";
    pullDown.add(option8);

    let option9 = document.createElement("option");
    option9.value = "option9";
    option9.text = "ISTJ(管理者)";
    pullDown.add(option9);

    let option10 = document.createElement("option");
    option10.value = "option10";
    option10.text = "ISFJ(擁護者)";
    pullDown.add(option10);

    let option11 = document.createElement("option");
    option11.value = "option11";
    option11.text = "ESTJ(幹部)";
    pullDown.add(option11);

    let option12 = document.createElement("option");
    option12.value = "option12";
    option12.text = "ESFJ(領事)";
    pullDown.add(option12);

    let option13 = document.createElement("option");
    option13.value = "option13";
    option13.text = "ISTP(巨匠)";
    pullDown.add(option13);

    let option14 = document.createElement("option");
    option14.value = "option14";
    option14.text = "ISFP(冒険家)";
    pullDown.add(option14);

    let option15 = document.createElement("option");
    option15.value = "option15";
    option15.text = "ESTP(起業家)";
    pullDown.add(option15);

    let option16 = document.createElement("option");
    option16.value = "option16";
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
    newTextbox.placeholder = "名前を入力";
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
  const plusButton = document.querySelector('button');

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
      count = count - 1; 
      removeMember();
      number.innerHTML = count;
  });
  //最初に一回自動おし
  const auto_button = document.getElementById('addButton');
  auto_button.click();
  //残り人数反映
  rest();

  //グループ数のプルダウン制御
  function addOption() {
    // ドロップダウンメニューの要素を取得
    let dropdown = document.getElementById("dropdown");

    // 新しいオプションを作成
    let newOption
    if(((dropdown.options.length + 1) + 1) <= 6){
          newOption = document.createElement("option");
    }
    let optionText = document.createTextNode(((dropdown.options.length + 1) + 1));
    newOption.appendChild(optionText);

    // 新しいオプションをドロップダウンに追加
    if(count >= 4 && count <= 12 && count % 2 == 0){
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
  //初期値およびメンバー削除時の変更
  function rest(){
    let ato = document.getElementById("resible_rest");
    ato.innerHTML = "あと" + (12-count) + "人";
  }
  //メンバー追加時の変更
  function rest2(){
    let ato = document.getElementById("resible_rest");
    if((12-(count+1)) < 0){
      ato.innerHTML = "あと0人";
    }else{
      ato.innerHTML = "あと" + (12-(count+1)) + "人";
    }
  }