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

let movie_trailer = [];
let key='';
async function get_movie_trailer(id) {
    let res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}`);
    let result = await res.json();
    movie_trailer = result.results;
    for (let i = 0; i < movie_trailer.length; i++) {
        if (movie_trailer[i].type.toLowerCase().includes('trailer')) {
            key = movie_trailer[i].key;
            console.log(movie_trailer[i].key);
            break
        }
    } 
    console.log(movie_trailer);
}


async function disdetails(){
    await get_movie_trailer(_id)
    let details = ``;
    let trailer = ``;

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
    trailer = `
        <h2 class="mb-4">Movie Trailer</h2>
        <iframe
        id="youtube-video"
        width="100%"
        height="500"
        src="https://www.youtube.com/embed/${key}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
        </iframe>
    `

document.querySelector('.movieDetails .container').innerHTML = details
document.querySelector('.trailer .container').innerHTML = trailer
}

get_movie_details(_id)




let movie_cast = [];
async function get_movie_cast(id) {
    let res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`);
    let result = await res.json();
    movie_cast = result.cast;
    console.log(movie_cast);
    dis_cast()
}
get_movie_cast(_id)

function dis_cast() {
  let cast = ``;
  for (let i = 0; i < movie_cast.length; i++) {
    let imgSrc = movie_cast[i].profile_path !== null ? `${base_img}${movie_cast[i].profile_path}` : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
    cast += `
    <div class="movie-card">
      <a href="#">
      <img src="${imgSrc}" alt="${movie_cast[i].name}">
      <span class="owl_span">Show Actor / Actress Info</span>
      <div class="name d-flex flex-column justify-content-lg-start align-items-lg-start">
        <h4>${movie_cast[i].name} |</h4>
        <h5>${movie_cast[i].character}</h5>
      </div>
      </a>
    </div>
    `;
  }
  document.getElementById('movie_cast').innerHTML = cast;
}
