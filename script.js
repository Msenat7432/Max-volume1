const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music  = document .querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');



// Music
const songs = [
	{
		name: 'alicia-1',
		imgSrc: 'images/alicia-1.jpg',
		displayName: 'No one',
		artist: 'Alicia Keys',
	},
	{
		name: 'clean-1',
		imgSrc: 'images/clean-1.jpeg',
		displayName: 'Rather Be',
		artist: 'Clean Bandit feat.Jess Gylnne',
	},
	{
		name: 'beyonce-1',
		imgSrc: 'images/beyonce-1.jpeg',
		displayName: 'Dangersously In Love',
		artist: 'Beyonce',
	},
	{
		name: 'Giveon-1',
		imgSrc: 'images/Giveon-1.jpeg',
		displayName: 'Like I Want You',
		artist: 'Giveon',
	},

	{
		name: 'H.E.R.-1',
		imgSrc: 'images/H.E.R-1.jpg',
		displayName: 'Best Part',
		artist: 'Her feat. Daniel Ceasar',
	},
	{
		name: 'chris-1',
		imgSrc: 'images/chris-1.png',
		displayName: 'Indigo',
		artist: 'Chris Brown',
	},
	{
		name: 'Khalid-1',
		imgSrc: 'images/Khalid-1 .jpeg',
		displayName: 'Talk',
		artist: 'Khalid',
	},
	{
		name: 'MaryJ.Blige-1',
		imgSrc: 'images/MaryJ.Blige-1.JPG',
		displayName: 'Just Fine',
		artist: 'Mary J Blige',
	},
	{
		name: 'pink-1',
		imgSrc: 'images/pink-1.jpeg',
		displayName: 'Honesty',
		artist: 'Pink Sweat',
	},
	{
		name: 'Rihanna-1',
		imgSrc: 'images/Rihanna-1 .jpeg',
		displayName: 'Hate That I Love You',
		artist: 'Rihanna & Neyo',
	},
];


// check if playing
let  isPlaying = false

//play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'pause')
	music.play();
}

//Pause 
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
	music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong ()));


// title

function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = song.imgSrc;
}
let songIndex = 0 ;

// prev
function prevSong() {
	songIndex--;
    if (songIndex < 0 ){
        songIndex = songs.length -1;
    }
	loadSong(songs[songIndex]);
	playSong();
}


// next
function nextSong(){
    songIndex++;
    if (songIndex > songs.length -1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// load 

loadSong(songs[songIndex]);


function updatePrgressBar(e) {
    if (isPlaying){
			const { duration, currentTime } = e.srcElement;
			// update progressbar
			const progressPercent = (currentTime / duration) * 100;
			progress.style.width = `${progressPercent}%`;

			// display duration
			const durationMin = Math.floor(duration / 60);
            let durationSeconds = Math.floor(duration % 60);
            if (durationSeconds < 10){
                durationSeconds = `0${durationSeconds}`
            }
            // delay Nan
            if(durationSeconds){
             durationEl.textContent = `${durationMin}: ${durationSeconds}`;
            }
            // current time
            	const currentMin = Math.floor(currentTime / 60);
                let currentSeconds = Math.floor(currentTime % 60);
                if (currentSeconds < 10) {
                    currentSeconds = `0${currentSeconds}`;
                }
                currentTimeEl.textContent = `${currentMin}: ${currentSeconds}`
		}
}

// Progressbar
function setProgressBar(e){
    console.log(e);
    const width = this.clientWidth;
    const clickX =  e.offsetX
    const {duration}= music
    music.currentTime = (clickX / width) * duration;
}

// Listeners

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate', updatePrgressBar);
music.addEventListener('ended', nextSong)
progressContainer.addEventListener('click', setProgressBar)
