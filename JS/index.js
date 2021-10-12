//All DOM variables
let input = document.getElementById("input");
let result = document.getElementById("result");
let main = document.querySelector("main");
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
//Acctual Code
input.addEventListener("input", function () {
  result.style.display = "block";
  Fetch(input.value);
});
main.addEventListener("click", function () {
  result.style.display = "none";
});
