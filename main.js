const url = 'https://api.soundcloud.com/tracks?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f';

let audio = document.getElementById('myAudio');
let searchInput = document.getElementById('search-input');
let searchButton = document.getElementById('search-button');
let results = document.getElementById('results');

function playSong(src) {
  fetch(src).then(function(result) {
    audio.src = result.url;
    audio.play();
  });
}

searchButton.addEventListener('click', function(event) {
  event.preventDefault();

  let trackURL = url + '&q= ' + searchInput.value;
  console.log(trackURL);
  fetch(trackURL).then(function(response) {
    response.json().then(function(data) {

    let trackList = document.getElementById('results');

    for (var i = 0; i < data.length; i++) {
      console.log('results');
      let track = document.createElement('li');
      track.className = 'column is-2';

      let trackImg = document.createElement('img');
      trackImg.setAttribute('id', data[i].stream_url + '?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f');

      trackImg.addEventListener('click', function(event) {
        event.preventDefault();
        playSong(event.target.id);
      });

      trackImg.className = 'thumbnail';
      let trackTitle = document.createElement('p');
      trackTitle.textContent = data[i].title;
      let trackArtist = document.createElement('p');
      trackArtist.textContent = data[i].user.username;

      console.log(data[i]);
      trackImg.src = data[i].artwork_url;
      track.appendChild(trackImg);
      track.appendChild(trackTitle);
      track.appendChild(trackArtist);

      trackList.appendChild(track);
    };
    
    searchInput.value = '';
  });
});
})
