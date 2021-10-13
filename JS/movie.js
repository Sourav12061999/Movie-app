let id = localStorage.getItem("movie-app-imdb-data");
let id2 = localStorage.getItem("movie-app-tmdb-data");
let videoid;

let img = document.getElementById("img");
let title = document.getElementById("title");
let actor = document.getElementById("actor");
let country = document.getElementById("country");
let rating = document.getElementById("rating");
let genere = document.getElementById("genere");
let plot = document.getElementById("plot");

async function Fetch(id, url, id2) {
  let res = await fetch(url + id);
  let data = await res.json();

  if (id2 != null) {
    let res2 = await fetch(
      `https://api.themoviedb.org/3/movie/${id2}/videos?api_key=84bd2ca964c1790070846809a1b4300b&language=en-US`
    );
    let data2 = await res2.json();
    console.log(data2);
    let videoid = null;
    data2.results.forEach((element) => {
      if (element.type == "Teaser" && element.site == "YouTube") {
        videoid = element.key;
      }
    });
    DOM(data, videoid);
  } else {
    DOM(data, null);
  }
}
function DOM(data, videoId) {
  if (data.Poster == "N/A" || data.Poster == null || data.Poster == undefined) {
    img.style.background = `url(../not.jfif)`;
  } else {
    img.style.background = `url(${data.Poster})`;
  }
  img.style.backgroundSize = "cover";
  if (videoId != null) {
    img.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }
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
if (id == null) {
  fetch(
    `https://api.themoviedb.org/3/movie/${id2}/external_ids?api_key=84bd2ca964c1790070846809a1b4300b`
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      // console.log(res);
      id = res.imdb_id;
      Fetch(id, `http://www.omdbapi.com/?apikey=d26a1acc&i=`, id2);
    });
} else {
  fetch(
    `https://api.themoviedb.org/3/find/${id}?api_key=84bd2ca964c1790070846809a1b4300b&language=en-US&external_source=imdb_id`
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      // console.log(res);
      if (res.movie_results.length > 0) {
        id2 = res.movie_results[0].id;
      } else {
        id2 = null;
      }
      Fetch(id, `http://www.omdbapi.com/?apikey=d26a1acc&i=`, id2);
    });
}
//
