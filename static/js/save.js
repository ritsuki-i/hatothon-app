// ページ読み込み時にフォームの内容をロード
window.onload = function () {
  loadForm();
};

// フォームの内容をローカルストレージに保存
document.getElementById("G_addButton").addEventListener("click", () => {
  const form = document.getElementById("myForm");
  console.log(form.elements.length);
  for (let i = 0; i < form.elements.length; i++) {
    const element = form.elements[i];
    if (element.type !== "button") {
      if (element.type === "select-one") {
        localStorage.setItem(
          element.name,
          element.options[element.selectedIndex].value
        );
      } else {
        localStorage.setItem(element.name, element.value);
      }
    }
  }
});

// ローカルストレージからフォームの内容を読み込み
function loadForm() {
  const form = document.getElementById("myForm");
  for (let i = 0; i < form.elements.length; i++) {
    const element = form.elements[i];
    if (element.type !== "button") {
      const storedValue = localStorage.getItem(element.name);
      if (storedValue !== null) {
        if (element.type === "select-one") {
          element.value = storedValue;
        } else {
          element.value = storedValue;
        }
      }
    }
  }
}

function clearStorage() {
  localStorage.clear();
  // フォームも初期化する
  document.getElementById("myForm").reset();
}