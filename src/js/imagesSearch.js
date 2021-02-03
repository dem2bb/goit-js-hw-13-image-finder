import API from "./apiService.js";

const refs = {
  form: document.querySelector(".search-form"),
  loadmoreBtn: document.querySelector("[data-action='load-more']"),
  galleryCont: document.querySelector(".gallery"),
};

let inputText = "";

function searchPicture(event) {
  event.preventDefault();
  API.resetPage();
  clearListItems();
  inputText = event.target[0].value;
  API.responseApi(inputText);
  refs.loadmoreBtn.classList.remove("is-hidden");
}

function loadMoreBtnHandler(event) {
  API.responseApi(inputText);
}

function clearListItems() {
  refs.galleryCont.innerHTML = "";
}

refs.form.addEventListener("submit", searchPicture);
refs.loadmoreBtn.addEventListener("click", loadMoreBtnHandler);
