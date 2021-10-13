//All DOM variables
let input = document.getElementById("input");
let result = document.getElementById("result");
let main = document.querySelector("main");
let popular = document.getElementById("popular");
let recent = document.getElementById("recent");
//All normal variables
let interval;
// Functions
function Fetch(name) {
  if (name == "" || name == null) {
    return false;
  }
  clearTimeout(interval);
  interval = setTimeout(async function () {
    try {
      let res = await fetch(
        `http://www.omdbapi.com/?apikey=d26a1acc&s=${name}`
      );
      let data = await res.json();
      searchResult(data.Search);
    } catch (err) {
      console.log(err);
    }
  }, 1000);
}
function searchResult(data) {
  result.innerHTML = null;

  if (data == undefined) {
    result.innerText = "😞 Sorry No Result found";
    return false;
  }
  console.log(data);
  data.forEach((element) => {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    let img = document.createElement("div");
    img.style.background = `url(${element.Poster})`;
    img.style.backgroundSize = "cover";
    card.appendChild(img);
    let p = document.createElement("p");
    p.textContent = element.Title;
    card.appendChild(p);
    card.addEventListener("click", function () {
      NewPage(element);
    });
    result.appendChild(card);
  });
}
function NewPage(element) {
  localStorage.setItem("movie-app-imdb-data", element.imdbID);
  window.location.href = "./movie.html";
}
async function FetchTrending(url, popular, time) {
  let res = await fetch(url);
  let data = await res.json();
  let count = 0;
  popular.innerHTML = null;
  for (let j = count; j < count + 5; j++) {
    TrendingDOM(data.results[j], popular);
  }
  count++;
  if (count == data.results.length - 5) {
    count = 0;
  }
  let interval = setInterval(() => {
    popular.innerHTML = null;
    for (let j = count; j < count + 5; j++) {
      TrendingDOM(data.results[j], popular);
    }
    count++;
    if (count == data.results.length - 5) {
      count = 0;
    }
  }, time);
  console.log(data);
}
function TrendingDOM(data, parent) {
  let img = document.createElement("div");
  img.style.background = `url(https://image.tmdb.org/t/p/w500/${data.poster_path})`;
  img.style.backgroundSize = "cover";
  img.addEventListener("click", () => {
    RecomendedClick(data.id);
  });
  parent.appendChild(img);
}
function RecomendedClick(id) {
  window.localStorage.removeItem("movie-app-imdb-data");
  localStorage.setItem("movie-app-tmdb-data", id);
  window.location.href = "./movie.html";
}
//Acctual Code
input.addEventListener("input", function () {
  result.style.display = "block";
  Fetch(input.value);
});
main.addEventListener("click", function () {
  result.style.display = "none";
});
FetchTrending(
  `https://api.themoviedb.org/3/trending/movie/week?api_key=84bd2ca964c1790070846809a1b4300b`,
  popular,
  4000
);
FetchTrending(
  `https://api.themoviedb.org/3/movie/now_playing?api_key=84bd2ca964c1790070846809a1b4300b&language=en-US&page=1`,
  recent,
  5000
);
