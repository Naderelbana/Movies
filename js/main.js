document.addEventListener("click", function (e) {
  const btn = e.target.closest(".scroll-btn");
  if (btn) {
    const targetId = btn.getAttribute("data-target");
    const direction = btn.getAttribute("data-scroll");
    const scrollContainer = document.getElementById(targetId);

    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  }
});

const api_key = "812d6823c11632890e0578b01bab0bb8";
const token ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTJkNjgyM2MxMTYzMjg5MGUwNTc4YjAxYmFiMGJiOCIsIm5iZiI6MTczNTc1Mzc4MC45ODEsInN1YiI6IjY3NzU4MDM0OThmMmY4MmZjNDkyYmY1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TQwDcxy6ALgKhPeQh-ZmjBnb6SRaD17QoP2sM-mQPHs";

const base_url = 'https://api.themoviedb.org/3';
const base_img = 'https://image.tmdb.org/t/p/w500';


const get_now_Playing_Movie = 'movie/now_playing';
const get_popular_Movie = 'movie/popular';
const get_top_rated_Movie = 'movie/top_rated';
const get_upcoming_Movie = 'discover/movie';
const get_trending_Movie = 'trending/movie/week';


let current_index = 0;
let genres="";

getAllMovies()

function getAllMovies(){
  get_now_playing_movies();
  get_popular_movies();
  get_trending_movies();
  get_upcoming_movies();
  get_topRated_movies();
}
//https://api.themoviedb.org/3   /movie/550   ?api_key=''




let topRated_movie = [];
async function get_topRated_movies() {
  let res = await fetch(`${base_url}/${get_top_rated_Movie}?api_key=${api_key}`);
  let result = await res.json();
  topRated_movie = result.results;
  console.log(topRated_movie);
  localStorage.setItem('id',topRated_movie[current_index].id)
  dis_topRated_movies()
  
}
async function dis_topRated_movies(){
  await get_movie_details(topRated_movie[0].id)
  console.log(genres);
  
  let topRated_con = ``;
  let topRated_card = ``;
  /* get_movie_details(); */
  topRated_con +=`
    <div class="img-con">
      <img src="${base_img}${topRated_movie[0].poster_path}" alt="${topRated_movie[0].title}">
    </div>
    <div class="img-info">
        <h3>${topRated_movie[0].title}</h3>
        <p>Released :- ${topRated_movie[0].release_date}</p>
        <pre>generc :- ${genres}</pre>
        <p><i class="fa fa-star text-warning"></i>${topRated_movie[0].vote_average.toFixed(1)}</p>
        <p>${topRated_movie[0].overview}</p>
        <div class="d-flex align-items-center gap-3">
            <button class="btn">
              <i class="fa fa-play-circle"></i>
              View Trailer</button>
              <a href="movieDetails.html">
              <button class="btn">
              <i class="fa fa-eye"></i>
              View Details</button>
              </a>
            
        </div>
    </div>
    `

  for (let i = 0; i < topRated_movie.length; i++) {
    
    topRated_card +=`
      <div class="bestmovie-card">
        <img src="${base_img}${topRated_movie[i].poster_path}" alt="${topRated_movie[i].title}">
        <span class="owl_span">${topRated_movie[i].title}</span>
    </div>
    `
  }
  document.querySelector('.best-movie .movie-con').innerHTML = topRated_con
  document.getElementById('bestMovies').innerHTML = topRated_card
  document.querySelector('.best-movie').style.backgroundImage = `url('${base_img}${topRated_movie[0].poster_path}')`


  genres=""
  // إضافة حدث النقر على بطاقات الأفلام
  const movieCards = document.querySelectorAll('.best-movie .bestmovie-card');
  movieCards.forEach((card) => {
    card.addEventListener('click', function () {
      // استخدام indexOf لتحديد الإندكس
      const cardsArray = Array.from(movieCards); // تحويل NodeList إلى Array
      const index = cardsArray.indexOf(this); // الحصول على ترتيب العنصر
      current_index = cardsArray.indexOf(this);
      localStorage.setItem('id',topRated_movie[current_index].id)
      
      if (index !== -1) {
        updateMovieDetails(index);
        console.log(current_index);
        
      } else {
        console.error("Index not found");
      }
    });
  });
}


let movie_details = [];

async function get_movie_details(id) {
  let res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`);
  let result = await res.json();
  movie_details = result;
  /* console.log(current_index); */
      for (let i = 0; i < movie_details.genres.length; i++) {
    genres = genres + movie_details.genres[i].name + "   ";
  }
  
  
  /* console.log(genres); */
  console.log(movie_details);
  
}




let _id;
async function updateMovieDetails(index) {

  console.log(topRated_movie[index].id);
  _id = topRated_movie[index].id
  await get_movie_details(_id)
  console.log(genres);
  
  const movie = movie_details;
  /* get_movie_details() */
  
  const topRated_con = `
    <div class="img-con">
      <img src="${base_img}${movie.poster_path}" alt="${movie.title}">
    </div>
    <div class="img-info">
        <h3>${movie.title}</h3>
        <p>Released :- ${movie.release_date}</p>
        <pre>generc :- ${genres}</pre>
        <p><i class="fa fa-star text-warning"></i>${movie.vote_average.toFixed(1)}</p>
        <p>${movie.overview}</p>
        <div class="d-flex align-items-center gap-3">
            <button class="btn">
              <i class="fa fa-play-circle"></i>
              View Trailer</button>
            <a href="movieDetails.html">
              <button class="btn">
              <i class="fa fa-eye"></i>
              View Details</button>
              </a>
        </div>
    </div>
  `;
  
  // تحديث تفاصيل الفيلم في الحاوية
  document.querySelector('.best-movie .movie-con').innerHTML = topRated_con;

  // تحديث خلفية القسم
  document.querySelector('.best-movie').style.backgroundImage = `url('${base_img}${movie.poster_path}')`;
  genres="";
}














let now_movies = [];
async function get_now_playing_movies() {
  let res = await fetch(`${base_url}/${get_now_Playing_Movie}?api_key=${api_key}`);
  let result = await res.json();
  now_movies = result.results;
  console.log(now_movies);
  dis_now_playing_movies()
}
function dis_now_playing_movies(){
  let now_Playing_Movie = ``;
  for (let i = 0; i < now_movies.length; i++) {
    now_Playing_Movie +=`

    <div class="movie-card">
      <a href="#">
        <img src="${base_img}${now_movies[i].poster_path}" alt="${now_movies[i].title}">
        <span class="owl_span">${now_movies[i].title}</span>
        <div class="vote">${now_movies[i].vote_average.toFixed(1)}</div>
      </a>
    </div>
    `
  }
  document.getElementById('now_movie').innerHTML = now_Playing_Movie
}



let trending_movie = [];
async function get_trending_movies() {
  let res = await fetch(`${base_url}/${get_trending_Movie}?api_key=${api_key}`);
  let result = await res.json();
  trending_movie = result.results;
  console.log(trending_movie);
  dis_trending_movies()
}
function dis_trending_movies(){
  let trending = ``;
  for (let i = 0; i < trending_movie.length; i++) {
    trending +=`

    <div class="movie-card">
      <a href="#">
        <img src="${base_img}${trending_movie[i].poster_path}" alt="${trending_movie[i].title}">
        <span class="owl_span">${trending_movie[i].title}</span>
        <div class="vote">${trending_movie[i].vote_average.toFixed(1)}</div>
      </a>
    </div>
    `
  }
  document.getElementById('trending_movie').innerHTML = trending
}


let popular_Movie = [];
async function get_popular_movies() {
  let res = await fetch(`${base_url}/${get_popular_Movie}?api_key=${api_key}`);
  let result = await res.json();
  popular_Movie = result.results;
  console.log(popular_Movie);
  dis_popular_movies()
}
function dis_popular_movies(){
  let popular = ``;
  for (let i = 0; i < popular_Movie.length; i++) {
    popular +=`

    <div class="movie-card">
      <a href="#">
        <img src="${base_img}${popular_Movie[i].poster_path}" alt="${popular_Movie[i].title}">
        <span class="owl_span">${popular_Movie[i].title}</span>
        <div class="vote">${popular_Movie[i].vote_average.toFixed(1)}</div>
      </a>
    </div>
    `
  }
  document.getElementById('popular_movie').innerHTML = popular
}


let upcoming_movie = [];
async function get_upcoming_movies() {
  let res = await fetch(`${base_url}/${get_upcoming_Movie}?api_key=${api_key}`);
  let result = await res.json();
  upcoming_movie = result.results;
  console.log(upcoming_movie);
  dis_upcoming_movies()
}
function dis_upcoming_movies(){
  let upcoming = ``;
  for (let i = 0; i < upcoming_movie.length; i++) {
    upcoming +=`

    <div class="movie-card">
      <a href="#">
        <img src="${base_img}${upcoming_movie[i].poster_path}" alt="${upcoming_movie[i].title}">
        <span class="owl_span">${upcoming_movie[i].title}</span>
        <div class="vote">${upcoming_movie[i].vote_average.toFixed(1)}</div>
      </a>
    </div>
    `
  }
  document.getElementById('UpComing_movie').innerHTML = upcoming
}




/* document.querySelector('.best-movie .scroll-container .movie-card').addEventListener(function(){
  console.log("nader");
}) */