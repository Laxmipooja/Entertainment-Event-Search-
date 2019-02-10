var myApp = angular.module("EventsApp",['ngMaterial','ngMessages','angular-svg-round-progressbar','ngAnimate']);
var latlng;
var venue;
var EventHTML1;
var dataUpcomingEvents;
var URLTicket;
var Name;
var venueName;
var FavEvents;
myApp.controller('EventController',function EventController($scope,$http,$compile) {
  $scope.textdisable = true;
  $scope.textdisablerequired = false;
  $scope.disableSearchButton = true;
  $scope.here123 = true;
  $scope.showorno = false;
  $scope.EventDetails = 0;
  $scope.ArtistDetails= 0;
  $scope.click = true;
  $scope.clear = 1;
  $scope.displayEnabled = true;
  $scope.sorttype = true;
  $scope.FavoritesDisplay= false;
  $http.get('http://ip-api.com/json').then(function(response) {
    latlng =response.data;
      if(response.status == 200 ){
          $scope.disableSearchButton = false;
      }
  }); 
$scope.isrequired= function(){
    $scope.textdisable = false;
    $scope.textdisablerequired = true;
    var location = $scope.user
   
}
$(document).ready(function(){
$("#Keyword").on('keyup blur',function(e){
              if( $.trim($("#Keyword").val()) == '')
                  $("#error1").show();
              else
                  $("#error1").hide();
                  
                });
             

});
$scope.clearAll=function(){
    console.log("in the clear")
    $scope.EventDetails = 0;
    $scope.ArtistDetails= 0;
    $scope.keyword = "";
    $scope.user.distanceValue =""
    $scope.user.distanceUnit="miles"
    $scope.user.genre='ALL'
    $scope.textdisable = true
    $scope.user.LocationValue = ""
    document.getElementById("gridRadios1").checked=true
    $scope.clear = 0;
    if( $.trim($("#Keyword").val()) != '')
        console.log("in clearAll")
              $("#Keyword").val('')
   localStorage.clear()
   if(document.getElementById("TableFavFill"))
       document.getElementById("TableFavFill").style.display="none"
   
}


$scope.querySearchautocomplete = function(searchText) {
            return $http
                .get('http://hw8assignment.us-east-2.elasticbeanstalk.com/Autocomplete?keyword='+searchText)
                .then(function(response) {
                    var Array=[];
                    try{
                        for(var i=0;i<response.data._embedded.attractions.length;i++)
                        {
                            Array.push(response.data._embedded.attractions[i].name);
                        }
                    }catch(e){
                    }

                    return Array;
                })};




 $('#twitterId').click(function(){
       var text1 = "CHECK OUT"+" "+Name+" "+"located at "+venueName+"."+"Website:\n"+URLTicket;
        var url = "https://twitter.com/intent/tweet";
        url += "?text=" +encodeURIComponent(text1);
        window.open(url);
 });
$scope.toenable=function(){
     user1 = $scope.user1
     if(user1.valuetype!="Default") {
        $scope.sorttype = false
          }  
     var UpcomingEvents1 = Upcomingevents(dataUpcomingEvents,$scope.user1);
     document.getElementById("UpcomingEvents").innerHTML = UpcomingEvents1;
    
}

$scope.GoBack=function(){
  
    $scope.EventDetails = 1;
    $scope.slide1 = true
    $scope.ArtistDetails= 0;
     if(document.getElementById("TableFavFill")){
       document.getElementById("TableFavFill").style.display = "block";
   }
}
$scope.GoDetails=function(){
  
    $scope.EventDetails = 0;
    $scope.ArtistDetails= 1;
   if(document.getElementById("TableFavFill")){
       document.getElementById("TableFavFill").style.display = "none";
   }
   
   
}



$scope.isrequiredhere= function(){
    $scope.textdisable = true;
    $scope.textdisablerequired = false; 
    $scope.boxvalue = "";
     
}    
$scope.ArtistInfo = function(e){
    var ID = e.id
    
    console.log("inside the click")
    console.log(e)
   if(document.getElementById("TableFavFill")){
       document.getElementById("TableFavFill").style.display = "none";
   }
  
    document.getElementById("Artist").style.display = "block";
//    if(document.getElementById("UpcomingEvents")){
//        document.getElementById("UpcomingEvents").innerHTML = "";
        
    //}
    if(document.getElementById("ArtistMenu")){
       document.getElementById("ArtistMenu").innerHTML = "" ;

    }
    $scope.displayEnabled = false;
    venue=e.getAttribute("venue");
    URLTicket = e.getAttribute("URLTicketmaster");
    Name = e.getAttribute("Name");
    venueName = e.getAttribute("venueName")
    $scope.popularity = 0;
    $scope.showorno = true;
    $("[class='tooltip-inner']").remove();
    $("[class='arrow']").remove();
    
    
    $.ajax({
                                    type: "GET",
                                    url: "http://hw8assignment.us-east-2.elasticbeanstalk.com/UpcomingEvents",
                                    cache: false,
                                    data : {VenueName:venue},
                                    dataType:'json',
                                    success: function(data){
                                        console.log("in upcoming success")
                                        console.log(typeof data)
                                        if(data!=0){
                                                var UpcomingEvents = Upcomingevents(data,$scope.user1);}
                                        if(UpcomingEvents!=0 && data!=0){
                                        document.getElementById("UpcomingEvents").innerHTML = UpcomingEvents; }
                                        else{
                                        document.getElementById("UpcomingEvents").innerHTML = "<table class='table table-bordered'>"+"<tbody>"+"<tr style='background:blanchedalmond'><td><p><b style='color:'brown'>"+"No Records"+"</b></p></td></tr></tbody></table>";
        
                                    }
                                    },
                                    error: function (error) {
                                            console.log("data for the error in spotify")
                                            console.log("error :" + error);
                                            document.getElementById("UpcomingEvents").innerHTML = "<table class='table table-bordered'>"+"<tbody>"+"<tr style='background:mistyrose'><td><p><b style='color:'red'>"+"Failed to Get results"+"</b></p></td></tr></tbody></table>";
                                    }
                            });
    $.ajax({
            type: "GET",
            url: "http://hw8assignment.us-east-2.elasticbeanstalk.com/Event",
            cache: false,
            data : {ID:ID},
            dataType:'json',
            success: function(data){
                console.log("in the EVEnt")
                console.log(data)
                var Artistdata1 = JSON.parse(JSON.stringify(data));
                if(Artistdata1.name!=undefined)
                        $scope.ArtistDetails = 1
                $scope.$apply(function() {
                    $scope.showorno = false;
                });
                $scope.$apply(function() {
                    $scope.name = Artistdata1.name;
                });
                var type1 = Artistdata1.classifications[0].segment.name;
                var HTMLArtist=ArtistTable(Artistdata1,ID)
                if(Artistdata1._embedded.attractions!=undefined)
                    var name = Artistdata1._embedded.attractions[0].name
                document.getElementById("EventTable").innerHTML = HTMLArtist.HTMLtable;
                 if(type1=="Music")
                    {
                        var artist = HTMLArtist.artist;
                        var object1 = []
                        if(artist.includes("|"))
                        {
                            artist = artist.split("|");
                        var object1spot = []
                        for(i=0;i<artist.length;i++){
                             $.ajax({
                                    type: "GET",
                                    url: "http://hw8assignment.us-east-2.elasticbeanstalk.com/spotifymusic",
                                    cache: false,
                                    data : {name:artist[i]},
                                    dataType:'json',
                                    success: function(data){
                                            object1spot.push(data)

                                    },
                                    error: function (error) {
                                            console.log("data for the error in spotify")
                                            console.log("error :" + error);
//                                          $('#progress-bar').removeClass("block").addClass("hide");
//                                           $('#failed-result').removeClass("hide").addClass("block");
                                    }
                            });
                            var object1musicimages = []
                            $.ajax({
                                    type: "GET",
                                    url: "http://hw8assignment.us-east-2.elasticbeanstalk.com/GooglePictures",
                                    cache: false,
                                    data : {Artistname: artist[i]},
                                    dataType:'json',
                                    success: function(data){
                                             
                                             object1musicimages.push(data) 
                                             
                                            if((object1musicimages.length==artist.length) && (object1spot.length==artist.length))
                                            {
                                               
                                                var MusicSpotifyHTML1=MusicSpotify1(object1spot,object1musicimages,artist);
                                                
                                            }
                                       
                                        var table = angular.element(MusicSpotifyHTML1);
                                        document.getElementById("ArtistMenu").innerHTML = table ;
                                        $('#ArtistMenu').html(table); 
                                        var $target = $('#ArtistMenu');
                                        angular.element($target).injector().invoke(function($compile) {
                                           var $scope = angular.element($target).scope();
                                           $target.append($compile(table)($scope));
                                           $scope.$apply();
                                        });
                                        
                                            
                                    },
                                    error: function (error) {
                                            console.log("data for the error in spotify")
                                            console.log("error :" + error);
//                                          $('#progress-bar').removeClass("block").addClass("hide");
//                                           $('#failed-result').removeClass("hide").addClass("block");
                                    }
                            });
                            
                            
                        }
                        }
                        else{
                           
                            $.ajax({
                                    type: "GET",
                                    url: "http://hw8assignment.us-east-2.elasticbeanstalk.com/spotifymusic",
                                    cache: false,
                                    data : {name:artist},
                                    dataType:'json',
                                    success: function(data){
                                            var MusicSpotifyHTML=MusicSpotify(data,name);
                                            $scope.popularity = MusicSpotifyHTML.popularity;
                                            $scope.$apply(function() {
                                                        $scope.name1 = data.body.artists.items[0].name;
                                                         
                                         });
                                         
                                        var table = angular.element(MusicSpotifyHTML.generateHTML);
                                        document.getElementById("ArtistMenu").innerHTML = table ;
                                        $('#ArtistMenu').html(table); 
                                        var $target = $('#ArtistMenu');
                                        angular.element($target).injector().invoke(function($compile) {
                                           var $scope = angular.element($target).scope();
                                           $target.append($compile(table)($scope));
                                           $scope.$apply();
                                        });
                                        
                                        
                                        
                                    },
                                    error: function (error) {
                                            console.log("data for the error in spotify")
                                            console.log("error :" + error);
//                                          $('#progress-bar').removeClass("block").addClass("hide");
//                                           $('#failed-result').removeClass("hide").addClass("block");
                                    }
                            });
                            var object1 = []
                            $.ajax({
                                    type: "GET",
                                    url: "http://hw8assignment.us-east-2.elasticbeanstalk.com/GooglePictures",
                                    cache: false,
                                    data : {Artistname: artist},
                                    dataType:'json',
                                    success: function(data){
                                     
                                             object1.push(data)    
                                             var SearchImagesHTML=GoogleSearchImages(object1,artist);
                                       
                                        document.getElementById("googlephotoes").innerHTML=SearchImagesHTML;
                                    },
                                    error: function (error) {
                                            console.log("data for the error in spotify")
                                            console.log("error :" + error);
//                                          $('#progress-bar').removeClass("block").addClass("hide");
//                                           $('#failed-result').removeClass("hide").addClass("block");
                                    }
                            });
                            
                            
                        }
                    }

               else{
                     
                   
                        var artist = HTMLArtist.artist;
                        var object1 = []
                        if(artist.includes("|")){
                            artist = artist.split("|");
                            for(var i=0;i<artist.length;i++)
                            {
    
                                $.ajax({
                                    type: "GET",
                                    url: "http://hw8assignment.us-east-2.elasticbeanstalk.com/GooglePictures",
                                    cache: false,
                                    data : {Artistname: artist[i]},
                                    dataType:'json',
                                    success: function(data){
                                        object1.push(data)
                                        if(object1.length==artist.length){
               
                                             var SearchImagesHTML=GoogleSearchImages(object1,artist);
                                        document.getElementById("googlephotoes").innerHTML=SearchImagesHTML;
                                       
                                        }
                                      
                                        
                                    },
                                    error: function (error) {
                                            console.log("data for the error in spotify")
                                            console.log("error :" + error);
//                                          $('#progress-bar').removeClass("block").addClass("hide");
//                                           $('#failed-result').removeClass("hide").addClass("block");
                                    }
                                    });
                            }
                            }
                
                        else{
                            var object1 = []
                            $.ajax({
                                    type: "GET",
                                    url: "http://hw8assignment.us-east-2.elasticbeanstalk.com/GooglePictures",
                                    cache: false,
                                    data : {Artistname: artist},
                                    dataType:'json',
                                    success: function(data){
                                      
                                             object1.push(data)
                                             var SearchImagesHTML=GoogleSearchImages(object1,artist);
                                        document.getElementById("googlephotoes").innerHTML=SearchImagesHTML;
                                    },
                                    error: function (error) {
                                            console.log("data for the error in spotify")
                                            console.log("error :" + error);
//                                          $('#progress-bar').removeClass("block").addClass("hide");
//                                           $('#failed-result').removeClass("hide").addClass("block");
                                    }
                            });
                    
                    
                    
                        }
                    }
                            $.ajax({
                                    type: "GET",
                                    url: "http://hw8assignment.us-east-2.elasticbeanstalk.com/Venue",
                                    cache: false,
                                    data : {Venuename:venue},
                                    dataType:'json',
                                    success: function(data){
                                            var Venuedetails = JSON.parse(JSON.stringify(data));
                                            var VenueHTML=Venue(data);
                                            $scope.$apply(function() {
                                            $scope.name2 = data._embedded.venues[0].name;        
                                            });
                                            $scope.getMaps=function(){
                                            var mapdeslat1 = data._embedded.venues[0].location.latitude;
                                            var  mapdeslng1= data._embedded.venues[0].location.longitude
                                            var uluru = {lat: mapdeslat1, lng: mapdeslng1};
                                            var directionsDisplay1 = new google.maps.DirectionsRenderer;
                                            var directionsService1 = new google.maps.DirectionsService;
                                             var map = new google.maps.Map(document.getElementById("showmapsdiv"), {
                                             zoom: 17,
                                             center: {lat: parseFloat(mapdeslat1), lng: parseFloat(mapdeslng1)}
                                             });
                                            var marker = new google.maps.Marker({position: {lat: parseFloat(mapdeslat1), lng: parseFloat(mapdeslng1)}, map: map});
                                      document.getElementById("venue1").innerHTML = VenueHTML.htmlvenue ;
                    
                                    }
                                    },
                                    error: function (error) {
                                          
                                            console.log("data for the error in spotify")
                                            console.log("error :" + error);
//                                          $('#progress-bar').removeClass("block").addClass("hide");
//                                           $('#failed-result').removeClass("hide").addClass("block");
                                    }
                            });
                
    
            },
            error: function (error) {
                console.log("error :" + error);
//                $('#progress-bar').removeClass("block").addClass("hide");
//                $('#failed-result').removeClass("hide").addClass("block");
            }
        });
    

//    
    }





$scope.displayResults = function(){
 var data = $scope.user
 
console.log("in the displauresults")
 var keyword = document.getElementById("Keyword").value;
    $scope.user.keyword = keyword;
 $scope.showorno = true;
 $scope.ArtistDetails=0;
    
 if($scope.textdisable==false)
    {                  
      $.ajax({
            type: "GET",
            url: "http://hw8assignment.us-east-2.elasticbeanstalk.com/lat",
            cache: false,
            data : data,
            dataType:'json',
            success: function(data){
                var Eventdata1 = JSON.parse(JSON.stringify(data));
               
                if(Eventdata1._embedded!=undefined && Eventdata1._embedded.events!=undefined){
                           var list = Eventdata1._embedded.events;
                           if(list && list.length){
                                    $scope.EventDetails = list.length;
                                    $scope.slide1 = true
                            }
                          $scope.EventDetails=Eventdata1._embedded.events.length;
                          var HTMLTable = EventTable(Eventdata1);
                          $scope.$apply(function() {
                          $scope.showorno = false;
                           });
                            document.getElementById("Table1").innerHTML = HTMLTable ;
                            $("#Table1").ready(function(){
                                  $('[data-toggle="tooltip"]').tooltip(); 
                            });
                 }
                else{
                    $scope.EventDetails = 1; 
                    $scope.slide1 = true
                    $scope.$apply(function() {
                    $scope.showorno = false;
                    document.getElementById("Table1").innerHTML = "<table class='table table-bordered'>"+"<tbody>"+"<tr style='background:blanchedalmond'><td><p style='text-align:left'><b style='color:'brown'>"+"No records"+"</b></p></td></tr></tbody></table>";
                           });
                    
                }
              
              
                
            },
            error: function (error) {
                console.log("error :" + error);
//                $('#progress-bar').removeClass("block").addClass("hide");
//                $('#failed-result').removeClass("hide").addClass("block");
            }
        });
    }
 else{
     $.ajax({
            type: "GET",
            url: "http://hw8assignment.us-east-2.elasticbeanstalk.com/lat1",
            cache: false,
            data : {data:data,
                    latlng :latlng
            },
            dataType:'json',
            success: function(data){
                var Eventdata1 = JSON.parse(JSON.stringify(data));
                if(Eventdata1._embedded!=undefined && Eventdata1._embedded.events!=undefined){
                     var list = Eventdata1._embedded.events;
                     if(list && list.length){
                       $scope.EventDetails = list.length;
                       $scope.slide1 = true
                      }
                          $scope.EventDetails=Eventdata1._embedded.events.length;
                          var HTMLTable = EventTable(Eventdata1);
                          EventHTML1 = HTMLTable
                          $scope.$apply(function() {
                          $scope.showorno = false;
                           });
                          document.getElementById("Table1").innerHTML = HTMLTable ;
                          $("#Table1").ready(function(){
                                $('[data-toggle="tooltip"]').tooltip(); 
                                
                           }) 
                    
                    
                } 
                else{
                    
                    $scope.EventDetails = 1; 
                     $scope.slide1 = true
                    $scope.$apply(function() {
                    $scope.showorno = false;
                    document.getElementById("Table1").innerHTML = "<table class='table table-bordered'>"+"<tbody>"+"<tr style='background:blanchedalmond'><td><p style='text-align:left'><b style='color:'brown'>"+"No records"+"</b></p></td></tr></tbody></table>";
                           });
                }
              
               
            },
            error: function (error) {
                console.log("error :" + error);
                $scope.EventDetails = 1; 
                 $scope.slide1 = true
                $scope.$apply(function() {
                $scope.showorno = false;
                document.getElementById("Table1").innerHTML = "<table class='table table-bordered'>"+"<tbody>"+"<tr style='background:blanchedalmond'><td><p style='text-align:left'><b style='color:'brown'>"+"Failed to get the results"+"</b></p></td></tr></tbody></table>";
                });
            }
        });
     
  }
                                                
}

    
});





