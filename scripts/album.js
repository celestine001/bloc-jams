var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14'},
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'},
     ]
 };
//Another Example Album
var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { name: 'Hello, Operator?', length: '1:01'},
         { name: 'Ring, ring, ring', length: '5:01'},
         { name: 'Fits in your pocket', length: '3:21'},
         { name: 'Can you hear me now?', length: '3:14'},
         { name: 'Wrong phone number', length: '2:15'},
         
    ]
};
//Another Example Album         
var albumDegas = {
     title: 'The Dancer',
     artist: 'Degas',
     label: 'Bronze',
     year: '1880',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { name: 'Allegro', length: '0.59'},
         { name: 'Pirouette', length: '1.30'},
         { name: 'Plie', length: '2.15'},
         { title: 'Croise', length: '1.15'},
         { title: 'Assemble', length: '1.00'},         
         
     ]
 };

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return template;
 };

// Select elements that we want to populate with text dynamically
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album){
     // Assign values to each part of the album (text, images)
      albumTitle.firstChild.nodeValue = album.title;
      albumArtist.firstChild.nodeValue = album.artist;
      albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
      albumImage.setAttribute('src', album.albumArtUrl);
 
     // Clear contents of album song list container
     albumSongList.innerHTML = '';
 
     // Build list of songs from album Javascript object
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
// Album button templates
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

 
 window.onload = function() {
     setCurrentAlbum(albumPicasso);
     
 };

   songListContainer.addEventListener('mouseover', function(event) {
         // #1
         // Only target individual song rows during event delegation
         if (event.target.parentElement.className === 'album-view-song-item') {
            event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
         }
     });

for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
            // Selects first child element, which is the song-item-number element
             this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
         });
     }
     
    var album = [albumPicasso, albumMarconi, albumDegas];  
   var index= 1;
   albumImage.addEventListener("click", function(event) {
        setCurrentAlbum(album[index]);
        index++;
        if (index == album.length) {
            index = 0;
        }
   });