// Get all the necessary HTML elements
const audio = new Audio();
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.querySelector('.progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeSlider = document.getElementById('volume-slider');
const playlistEl = document.getElementById('playlist');

// Sample playlist data (replace with your own)
const playlist = [
    { title: 'HAPPY BIRTHDAAY', artist: 'BACKGROUNDMIUSIC', src: 'happybirthday.mp3' },
    { title: 'HappyBirthday', artist: 'YOUR BIRTHDAY', src: 'HAPPYBIRTHDAY2.mp3' },
    { title: 'Doremon', artist: 'Music', src: 'Doremon.mp3' },
    { title: 'Calm and Peaceful', artist: 'Lesfm', src: 'https://cdn.pixabay.com/audio/2023/12/03/calm-and-peaceful-171836.mp3' },
    { title: 'Relaxing Music', artist: 'Lofi_Hour', src: 'https://cdn.pixabay.com/audio/2023/09/22/relaxing-music-170428.mp3' },
    // Here is how you add a new song:
    { title: 'The World I Live', artist: 'Scott Buckley', src: 'https://cdn.pixabay.com/audio/2023/07/26/the-world-i-live-in-151025.mp3' }
];


let currentSongIndex = 0;
let isPlaying = false;

// Function to load a song
function loadSong(song) {
    audio.src = song.src;
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    // Autoplay the song if a song is already playing
    if (isPlaying) {
        audio.play();
    }
}

// Function to toggle play/pause
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}

// Function to play the next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(playlist[currentSongIndex]);
    updatePlaylistUI();
}

// Function to play the previous song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(playlist[currentSongIndex]);
    updatePlaylistUI();
}

// Function to update the progress bar and time display
function updateProgress() {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Calculate minutes and seconds
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const displayDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const displayCurrentTime = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

    // Update the UI
    if (duration) {
        durationEl.textContent = displayDuration;
    }
    currentTimeEl.textContent = displayCurrentTime;
}

// Function to set song progress by clicking on the bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Function to update the volume
function setVolume() {
    audio.volume = volumeSlider.value;
}

// Function to populate and manage the playlist UI
function updatePlaylistUI() {
    playlistEl.innerHTML = ''; // Clear the current playlist
    playlist.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        if (index === currentSongIndex) {
            li.classList.add('active'); // Add active class to the current song
        }
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(playlist[currentSongIndex]);
            audio.play();
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            updatePlaylistUI();
        });
        playlistEl.appendChild(li);
    });
}

// Event Listeners
playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong); // Autoplay the next song when current one ends
progressContainer.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', setVolume);

// Initial setup
loadSong(playlist[currentSongIndex]);
updatePlaylistUI();