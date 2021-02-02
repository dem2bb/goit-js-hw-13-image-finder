import pictureCreater from "../templates/pictures.hbs";

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
}
