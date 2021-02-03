import pictureCreater from "../templates/pictures.hbs";
import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";

export default {
  page: 1,
  responseApi(searchQuery) {
    const baseUrl = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${this.page}&per_page=12&key=20124121-6ece0bc9b039a6c992b9911c7`;
    return fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => {
        createElements(data);
        this.page += 1;
        window.scrollTo({
          top: document.documentElement.offsetHeight,
          behavior: "smooth",
        });
      });
  },
  resetPage() {
    this.page = 1;
  },
};

function createElements(data) {
  const galleryCont = document.querySelector(".gallery");
  const markup = data.hits.map((picture) => pictureCreater(picture)).join("");
  galleryCont.insertAdjacentHTML("beforeend", markup);
  openModal();
}

function openModal() {
  const images = document.querySelectorAll("img");
  images.forEach((item) => {
    item.addEventListener("click", (e) => {
      const instance = basicLightbox.create(`
    <img src="${e.target.dataset.img}" width="800" height="600">
`);
      instance.show();
    });
  });
}
