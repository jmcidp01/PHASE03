import { Film} from './class1.js';

const films = [
    new Film("Inception", 8.8, 2010, "A thief who steals corporate secrets through the use of dream-sharing technology."),
    new Film("The Matrix", 8.7, 1999, "A computer hacker learns about the true nature of his reality and his role in the war against its controllers."),
    new Film("Interstellar", 8.6, 2014, "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.")
];

const T= new Film("Tenet", 7.5, 2020, "A secret agent embarks on a dangerous, time-bending mission to prevent the start of World War III.");
films.push(T);

//Lo primero que realiza cuando carga la pagina
//window.onload = function () {
   
//}   
//location.reload();

const loadFilmsbtn = document.getElementById('loadFilmsBtn');
loadFilmsbtn.addEventListener('click', () => {
    const filmsContainer = document.getElementById('filmsContainer');
    filmsContainer.replaceChildren(); // Limpia el contenedor
    const BestFilm = films.reduce((prev, current) => (prev.rating > current.rating) ? prev : current);
    films.forEach(film => {
        filmsContainer.innerHTML += film.displayFilm();
    });
    //Store a cookie whit the film with highest rating
    document.cookie = `BestFilm=${BestFilm.name}; max-age=3600; path=/`;
    //show the cookie value in a div
    const cookieDiv = document.getElementById('BestRatedFilm');
    if (!document.cookie) {
        cookieDiv.innerHTML = `<h3>NO COOKIE</h3>`;
    }else{
        cookieDiv.innerHTML = `<h3>Best Rated Film: ${BestFilm.name}</h3>`;
    }

});
 //Crea una barra de busqueda que filtre las peliculas por nombre de forma dinamica con key up event
 const searchInput = document.getElementById('searchInput');
 searchInput.addEventListener('keyup', () => {
     const searchTerm = searchInput.value.toLowerCase();
     filmsContainer.replaceChildren(); // Limpia el contenedor
     films.filter(film => film.name.toLowerCase().includes(searchTerm))
         .forEach(film => {
             filmsContainer.innerHTML += film.displayFilm();
         });
 });

//Store a cookie whit the film with highest rating
//show the cookie value in a div
//Show "NO COOKIE" if there is no cookie