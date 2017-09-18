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
 
     return $(template);
 };

// Select elements that we want to populate with text dynamically
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
        
     // Assign values to each part of the album (text, images)
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     // Clear contents of album song list container
     $albumSongList.empty();
 
     // Build list of songs from album Javascript object
     for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
     }
 };
var findParentByClassName = function(element, targetClass) {
    if (element) {
        var currentParent = element.parentElement;
        while (currentParent.className !== targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }
};

    var getSongItem = function(element) {
        switch (element.className) {
            case 'album-song-button':
            case 'ion-play':
            case 'ion-pause':
                return findParentByClassName(element, 'song-item-number');
            case 'album-view-song-item':
                return element.querySelector('.song-item-number');
            case 'song-item-title':
            case 'song-item-duration':
                return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
            case 'song-item-number':
                return element;
            default:
                return;
        }  
    };

    var clickHandler = function(targetElement) {
        var songItem = getSongItem(targetElement);  
        console.log('click handler');
        if (currentlyPlayingSong === null) {
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
        }
        else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
        }
        else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
           var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
           currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
           songItem.innerHTML = pauseButtonTemplate;
           currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }

 };

    var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
    var songRows = document.getElementsByClassName('album-view-song-item');
// Album button templates
    var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
    var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
 
//Store state of playin songs//
    var currentlyPlayingSong = null;

    window.onload = function() {
     setCurrentAlbum(albumPicasso);
     

    songListContainer.addEventListener('mouseover', function(event) {
       // #1
         // Only target individual song rows during event delegation
         if (event.target.parentElement.className === 'album-view-song-item') {
            event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
            var songItem = getSongItem(event.target);

            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
           }
         }
     });
console.log("song rows" + songRows.length);
    for (var i = 0; i < songRows.length; i++) {
        
         songRows[i].addEventListener('mouseleave', function(event) {
            // #1
             var songItem = getSongItem(event.target);
             var songItemNumber = songItem.getAttribute('data-song-number');
             
             // #2
             if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }
         });
    
        songRows[i].addEventListener('click', function(event) {
             // Event handler call
            console.log("listener added");
             clickHandler(event.target);
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
    }