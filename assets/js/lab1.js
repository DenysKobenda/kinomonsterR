        let searchForm = document.getElementById('search_form');
        let searchField = document.querySelector('#search_form input[type="search"]');

        searchForm.addEventListener('submit', function (event) {
            
            event.preventDefault();

            if (searchField.value.trim() === '') {
                alert('Please enter the search words');
            } 
        });

        let loginForm = document.getElementById('login');
        let loginField = document.querySelector('#login input[name="login_field"]');
        let passwordField = document.querySelector('#login input[name="password_field"]');

function checkFields() {
    if (loginField.value.trim() === '' && passwordField.value.trim() === '') {
        loginField.classList.add('invalid');
        passwordField.classList.add('invalid');
        alert('Please enter password and login');
    } else if (loginField.value.trim() === '') {
        loginField.classList.add('invalid');
        alert('Please enter the login');
    } else if (passwordField.value.trim() === '') {
        alert('Please enter the password');
        passwordField.classList.add('invalid');
    }
}
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    checkFields();
});

const inputFields = document.querySelectorAll('input[type="text"], input[type="password"], input[type="search"]');
inputFields.forEach(function(input) {
  input.addEventListener('input', function() {
    if (input.value.trim() === '') {
      input.classList.add('invalid');
    } else {
      input.classList.remove('invalid');
    }
  });
});

const filterTitle = document.getElementById('filter-title');
const filterGenre = document.getElementById('filter-genre');
const filterYear = document.getElementById('filter-year');
const filterRating = document.getElementById('filter-rating');
const infoFilms = document.querySelectorAll('.info_film');

function filterFilms() {
    const titleFilter = filterTitle.value.toLowerCase();
    const genreFilter = filterGenre.value.toLowerCase();
    const yearFilter = filterYear.value;
    const ratingFilter = filterRating.value;

    infoFilms.forEach(function (infoFilm) {
        const filmTitle = infoFilm.textContent.toLowerCase();
        const filmGenre = infoFilm.querySelector('.genre').textContent.toLowerCase();
        const filmYear = parseInt(infoFilm.querySelector('.year').textContent);
        const filmRating = parseFloat(infoFilm.querySelector('.rating').textContent);

        const titleMatch = !titleFilter || filmTitle.includes(titleFilter);
        const genreMatch = !genreFilter || filmGenre.includes(genreFilter);
        const yearMatch = !yearFilter || filmYear === yearFilter;
        const ratingMatch = !ratingFilter || filmRating >= ratingFilter;

        if (titleMatch && genreMatch && yearMatch && ratingMatch) {
            infoFilm.style.display = 'block';
        } else {
            infoFilm.style.display = 'none';
        }
    });
}


filterTitle.addEventListener('input', filterFilms);
filterGenre.addEventListener('input', filterFilms);
filterYear.addEventListener('input', filterFilms);
filterRating.addEventListener('input', filterFilms);
        
