//slider
const getSlider = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=17c8dffc0cbd61894a0460817bbba88e&language=en-US&page=1"
  );
  const responseJson = await response.json();
  const moviess = responseJson.results;
  const movies = moviess.slice(0, 5);
  renderAllSlides(movies);
};

const renderAllSlides = (slides) => {
  const slidesCom = document.querySelector(".swiper-wrapper");

  slidesCom.innerHTML = "";

  slides.forEach((sld) => {
    slidesCom.innerHTML += `
        <div class="swiper-slide">
            <div class="item">
                <img src="https://www.themoviedb.org/t/p/original/${sld.backdrop_path}" alt="slider-image" />
                <div class="slide-text">
                    <h1>${sld.title}</h1>
                    <p>Release Date: ${sld.release_date}</p>
                    
                </div>
            </div>
        </div>

      `;
  });
};

getSlider();

//card

const getCards = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=17c8dffc0cbd61894a0460817bbba88e&language=en-US&page=1"
  );
  const responseJson = await response.json();
  const movies = responseJson.results;
  renderAllMovies(movies);
};

const getSimiliar = (movid) => {
  fetch(
    `https://api.themoviedb.org/3/movie/${movid}/similar?api_key=17c8dffc0cbd61894a0460817bbba88e&language=en-US`
  )
    .then((response) => {
      return response.json();
    })
    .then((resmv) => {
      const movies = resmv.results;
      // console.log(movies);
      // console.log(movid);
      renderAllMovies(movies);
    });
};
const getCast = (movidc) => {
  fetch(
    `https://api.themoviedb.org/3/movie/${movidc}/credits?api_key=17c8dffc0cbd61894a0460817bbba88e&language=en-US`
  )
    .then((response) => {
      return response.json();
    })
    .then((rescast) => {
      const moviesCast = rescast.cast.slice(0, 4);
      // renderAllMovies(movies);
      // moviesCast.slice(0, 4);
      renderAllCast(moviesCast);
      console.log(moviesCast);
    });
};

function renderAllCast(moviesCast) {
  const divCast = document.createElement("div");
  divCast.innerHTML = `
    <h4>Cast :</h4>
  `;
  const listCast = document.createElement("div");
  listCast.innerHTML = "";

  moviesCast.forEach((moviecast) => {
    listCast.innerHTML += `
          <div class="card-avatar">
                <div class="card-avatar-img">
                  <img src="https://www.themoviedb.org/t/p/original/${moviecast.profile_path}" class="avatar" alt="profile-image" />
                </div>
                <h5 class="title-cast">${moviecast.name}</h5>

          </div>

    `;
  });

  listCast.classList.add("list-cast");
  divCast.append(listCast);

  document.querySelector(".caption-text").appendChild(divCast);
}

function showMovDetail(resmovie) {
  return `
  <div class="card-wide">
  <img src="https://www.themoviedb.org/t/p/original/${
    resmovie.backdrop_path
  }" alt="" data-id="${resmovie.id}" />
        <div class="container">
          <div class="card-content">
          
          <img src="https://www.themoviedb.org/t/p/original/${
            resmovie.poster_path
          }" alt="" data-id="${resmovie.id}" />
              <div class="caption-text">
                <h1 class="title">${resmovie.title}</h1>
                <p>${resmovie.release_date.slice(0, 4)}</p>
                <div class="genre">${resmovie.genres
                  .map((genre) => `<span>${genre.name}</span>`)
                  .join("")}</div>

                <p class="overview ellipses">${resmovie.overview}</p>
                <a class="readmore">Read More...</a>
              </div>
              
          </div>      
        </div>
  </div>      
  `;
}

const renderAllMovies = (movies) => {
  const listMovieElement = document.querySelector("#listMovie");
  listMovieElement.innerHTML = "";

  movies.forEach((movie) => {
    listMovieElement.innerHTML += `
        <div class="card">
                <img src="https://www.themoviedb.org/t/p/original/${movie.poster_path}" alt="" data-id="${movie.id}" />
                <h5 class="title">${movie.title}</h5>
                
                
        </div>
      `;
  });
  const detailMovie = document.querySelectorAll(".card img");
  detailMovie.forEach((img) => {
    img.addEventListener("click", function () {
      const movieID = this.dataset.id;
      topFunction();
      fetch(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=17c8dffc0cbd61894a0460817bbba88e&language=en-US`
      )
        .then((response) => {
          return response.json();
        })
        .then((resmovie) => {
          let nameGenre = resmovie.genres.map((genre) => {
            return genre.name;
          });
          console.log(nameGenre);
          const detailMovie = showMovDetail(resmovie);
          const secMovie = document.querySelector("#hero");
          secMovie.innerHTML = detailMovie;
          const btnReadmore = document.querySelector(".readmore");
          const pOverview = document.querySelector(".overview");
          btnReadmore.addEventListener("click", function () {
            pOverview.classList.toggle("ellipses");
            if (btnReadmore.innerText === "View Less") {
              btnReadmore.innerText = "Read More";
            } else {
              btnReadmore.innerText = "View Less";
            }
          });
        });
      getSimiliar(movieID);
      getCast(movieID);
    });
  });
};

getCards();

//change bg when scroll
let navbar = document.querySelector("header");

window.addEventListener("scroll", function () {
  let valueScroll = window.scrollY;
  if (valueScroll < 70) {
    navbar.classList.remove("bg-nav-color");
  } else {
    navbar.classList.add("bg-nav-color");
  }
});

//scroll top
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
