     var pointsArray = document.getElementsByClassName('point');
   
     var animatePoints = function() { 
//         
//         for(var i = 0 ; i < pointsArray.length ; i++){
//             pointsArray[i].style.opacity = 1;
//             pointsArray[i].style.transform = "scaleX(1) translateY(0)";
//             pointsArray[i].style.msTransform = "scaleX(1) translateY(0)";
//             pointsArray[i].style.WebkitTransform = "scaleX(1) translateY(0)";
//         }
         myForEach(pointsArray, revealPoint);
     }
     
     var myForEach = function(collection, callback){
         for(var i = 0 ; i < collection.length  ; i++){
             callback(collection[i]);
         }
     }
     
     function revealPoint(point){
             point.style.opacity = 1;
             point.style.transform = "scaleX(1) translateY(0)";
             point.style.msTransform = "scaleX(1) translateY(0)";
             point.style.WebkitTransform = "scaleX(1) translateY(0)";
     }
     
     
 
    window.onload = function() {
        /*Automatically animate the points on a tall screen where sctolling can't trigger the animation*/
        if (window.innerHeight > 950) {
            animatePoints();
        }
        
        var sellingPoints = document.getElementsByClassName('selling-points')[0];
        var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
        window.addEventListener('scroll', function(event) {
         if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
             animatePoints();
         }
        });
    }
