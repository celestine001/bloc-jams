var collectionItemTemplate = 
    '<div class= "collection-album-container column fourth">'
    + '<img src="assets/images/album_covers/01.png"/>'
    + '<div class="collection-album-info caption">'
    + '<p>'
    +   '<a class="album-name" href="/album.html">The Colors</a>'
    +   '<br/>'
    +   '<a href="/album.html">Pablo Picasso</a>'
    +   '<br/>'
    +   'X songs'
    +   '</br>'
    +  '</p>'
    + '</div>'
    + '</div>';
window.onload = function() {
    //The collection of albums is contained within the "album-covers" class element//
    var collectionContainer = document.getElementsByClassName('album-covers')[0];
    
    //clear the contents of the HTML just in case something else has been dynamically inserted//
    collectionContainer.innerHTML = '';
    
    //Insert N number of the album into the collectionContainer//
    for (var i = 0; i < 12; i++) {
        collectionContainer.innerHTML =+ collectionItemTemplate;
    
   }
}      