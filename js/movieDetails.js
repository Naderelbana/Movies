const api_key = "812d6823c11632890e0578b01bab0bb8";
const token ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTJkNjgyM2MxMTYzMjg5MGUwNTc4YjAxYmFiMGJiOCIsIm5iZiI6MTczNTc1Mzc4MC45ODEsInN1YiI6IjY3NzU4MDM0OThmMmY4MmZjNDkyYmY1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TQwDcxy6ALgKhPeQh-ZmjBnb6SRaD17QoP2sM-mQPHs";

const base_url = 'https://api.themoviedb.org/3';
const base_img = 'https://image.tmdb.org/t/p/w500';


let _id = localStorage.getItem('id')
let genres=""
let production_countries=""
let movie_details = [];
async function get_movie_details(id) {
  let res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`);
  let result = await res.json();
  movie_details = result;
  /* console.log(current_index); */
      for (let i = 0; i < movie_details.genres.length; i++) {
    genres = genres + movie_details.genres[i].name + "   ";
  }
      for (let i = 0; i < movie_details.production_countries.length; i++) {
    production_countries = production_countries + movie_details.production_countries[i].name + "   ";
  }
  
  /* console.log(genres); */
  console.log(movie_details);
  disdetails();
}

function disdetails(){
    
    let details = ``;

    details =`

    <div class="details">
            <h2 class="mb-4">${movie_details.title}</h2>
            <span>Overview</span>
            <p>${movie_details.overview}</p>
            <div class="languages d-flex mb-4 align-items-center">
                <span>Languages</span>
                <p>${movie_details.original_language}</p>
            </div>
            <div class="genres d-flex mb-4 align-items-center">
                <span>Genres</span>
                <pre>${genres}</pre>
            </div>
            <div class="d-flex mb-4 gap-5 align-items-center">
              <div class="Vote d-flex align-items-center">
                <span>Vote</span>
                <p><i class="fa fa-star text-warning"></i>${movie_details.vote_average.toFixed(1)}</p>
            </div>
            <div class="relased d-flex align-items-center">
                <span>Released</span>
                <p>${movie_details.release_date}</p>
            </div>
            </div>
            <div class="production_countries mb-4">
                <span>Production_Countries</span>
                <pre>${production_countries}</pre>
            </div>
        </div>
        <div class="img-con">
            <img src="${base_img}${movie_details.poster_path}" alt="${movie_details.title}">
        </div>

    `

document.querySelector('.movieDetails .container').innerHTML = details
}

get_movie_details(_id)