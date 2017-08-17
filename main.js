
// 1. First select and store the elements you'll be working with
let textBox = document.querySelector("#textBox");
let submitButton = document.querySelector("#submitButton");
let inputBox = document.querySelector("#inputBox");
let inputValue = inputBox.value;
let container = document.querySelector("section.results");
let musicPlayer = document.querySelector('.music-player');
let musicTitle = document.querySelector("p");

// 2. Create your `submit` event for getting the user's search term
submitButton.addEventListener("click", searchFunction);

// 3. Create your `fetch` request that is called after a submission

function convertFromJson(response) {
  return response.json();
}

let searchResults = '';
function displaySearchResults(response) {
  console.log(response);
  searchResults = '';
  for(let i = 0 ; i < response.results.length ; i++) {
    listOfResponses = `
    <div>
      <a class="albums" href="${response.results[i].previewUrl}"> <img src=${response.results[i].artworkUrl100}></a>
      <h2>${response.results[i].trackName}</h2>
      <h3>${response.results[i].artistName}</h3>
    </div>
    `
    searchResults += listOfResponses;
  }
container.innerHTML = searchResults;
}

function searchFunction(ev) {
  ev.preventDefault();
  console.log(inputBox.value);
  fetch(`https://itunes.apple.com/search?term=${inputBox.value}&limit=25`)
    .then(convertFromJson)
    .then(displaySearchResults)
    .then(function (results) {
      let albums = document.querySelectorAll(".albums");

      for (let i = 0;i < albums.length;i++) {
        albums[i].addEventListener("click", playMusic);
      }
    });
}

// 4. Create a way to listen for a click that will play the song in the audio 
function playMusic (ev) {
  console.log(ev);
  ev.preventDefault()
  musicPlayer.src = ev.target.parentElement.getAttribute('href');
  musicPlayer.play();
}


