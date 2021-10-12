let id = localStorage.getItem("movie-app-imdb-data");

let img = document.getElementById("img");
let title = document.getElementById("title");
let actor = document.getElementById("actor");
let country = document.getElementById("country");
let rating = document.getElementById("rating");
let genere = document.getElementById("genere");
let plot = document.getElementById("plot");

async function Fetch(id) {
  let res = await fetch(`http://www.omdbapi.com/?apikey=d26a1acc&i=${id}`);
  let data = await res.json();
  console.log(data);
  DOM(data);
}
function DOM(data) {
  if (data.Poster == "N/A" || data.Poster != null || data.Poster != undefined) {
    img.style.background = `url(../not.jfif)`;
  } else {
    img.style.background = `url(${data.Poster})`;
  }
  img.style.backgroundSize = "cover";
  title.textContent = data.Title;
  actor.textContent = "Actors:- " + data.Actors;
  country.textContent = "Country:- " + data.Country + "(" + data.Language + ")";
  let firstRating;
  if (data.Ratings.length == 0) {
    firstRating = "Rating:- N/A";
  } else {
    firstRating = "Rating:- " + data.Ratings[0].Rating;
  }
  rating.textContent = firstRating;
  genere.textContent = "Genere:- " + data.Genre;
  plot.textContent = "Plot:- " + data.Plot;
}
Fetch(id);
