var EventJson;
var objID;
var countfav=0;
function EventTable(JSONDOC){
      EventJson = JSONDOC;
    console.log("Inside events")
      var count=0;
      var obj={};
      var localDate;
      var HTMLtable = "<table class='table'><thead><tr><th>#</th><th>Date</th><th>Event</th><th>Category</th><th style='white-space:nowrap'>Venue Info</th><th>Favorite</th></tr></thead><tbody>"; 
      for(j=0;j<JSONDOC._embedded.events.length;j++){
            count=count+1;
            ID  =    JSONDOC._embedded.events[j].id; 
          document.getElementById("AgainStar").innerHTML = "<i class='material-icons' value='plain' id='star1"+ID+"'" +"style='border: 1px solid grey'>"+"star_border"+"</i>"  
          
            HTMLtable +="<tr id='row"+ID+"'>";
          
            HTMLtable +="<td>"+count+"</td>";
            if(JSONDOC._embedded.events[j].dates.start!=undefined && JSONDOC._embedded.events[j].dates!=undefined)
               { 
                        localDate =  JSONDOC._embedded.events[j].dates.start.localDate;
                        localTime =  JSONDOC._embedded.events[j].dates.start.localTime;
               }
            else{
                        localDate = undefined
                        localTime = undefined
               }
            if((localDate!=undefined || localDate !="")&&(localTime==undefined || localTime==""))
                   {
                        localTime="";    
                        HTMLtable += "<td style='white-space:nowrap'>"+"<div"+">"+"<p>"+localDate+"</p>"+"<p>"+""+"</p>"+"</div>"+"</td>";
                   }
            else if((localTime!=undefined || localTime !="") && (localDate==undefined || localDate==""))
                   {
                        localDate ="";    
                        HTMLtable += "<td style='white-space:nowrap'>"+"<div"+">"+"<p>"+localDate+"</p>"+"<p>"+""+"</p>"+"</div>"+"</td>";
                   }
            else if(localTime!=undefined && localDate !=undefined)
                    {
                        HTMLtable += "<td style='white-space:nowrap'>"+"<div"+">"+"<p>"+localDate+"</p>"+"<p>"+""+"</p>"+"</div>"+"</td>";
                    }
            if(JSONDOC._embedded.events[j]._embedded.venues!=undefined && JSONDOC._embedded.events[j]._embedded!=undefined)
                {
                        venue1 = JSONDOC._embedded.events[j]._embedded.venues[0].name;
                        venue1=venue1.replace(/ /g ,'+')
                } 
            if(JSONDOC._embedded.events[j].name !=undefined || JSONDOC._embedded.events[j].name !="")
                {
                       Events = JSONDOC._embedded.events[j].name;
                       Events2 =JSONDOC._embedded.events[j].name;
                       if(Events.length>35)
                           {  
                               Events = Events.substring(0,35)
                               var lastSpace = Events.lastIndexOf(" ");
                               var Events1 = Events.substring(0,lastSpace)
                               Events = Events1+"....."
                           }
                       ID  =    JSONDOC._embedded.events[j].id; 
                       var URLTicketmaster = JSONDOC._embedded.events[j].url;
                       HTMLtable += "<td style='white-space:nowrap' id="+ID+" "+"venue="+venue1+" URLTicketmaster="+URLTicketmaster+" Name=\""+JSONDOC._embedded.events[j].name+"\" "+" venueName=\""+JSONDOC._embedded.events[j]._embedded.venues[0].name+"\""+"onclick='angular.element(this).scope().ArtistInfo(this)"+"'>"+"<a href='#' data-toggle='tooltip'  ng-if='!ArtistDetails'  class='tooltipdis' toolid='tooltip"+ID+"' data-placement='bottom' title=\""+Events2+"\">"+Events+"</a></td>";
                }
            else{
                       HTMLtable += "<td style='white-space:nowrap'>"+"NA"+"</td><tr>"
                       obj['Events'] = "NA";
                }
            if(JSONDOC._embedded.events[j].classifications!=undefined)
                {
                    var Segment = "";
                    var genre = "";
                    if(JSONDOC._embedded.events[j].classifications[0].segment!=undefined)
                         Segment = JSONDOC._embedded.events[j].classifications[0].segment.name;   
                    if(JSONDOC._embedded.events[j].classifications[0].genre!=undefined)
                        var genre = JSONDOC._embedded.events[j].classifications[0].genre.name;
                    if(Segment!="" && genre!=""){
                        HTMLtable += "<td style='white-space:nowrap'>"+genre+" - "+Segment+"</td>"
                        obj['Segement'] = genre+" - "+Segment;
                    }
                    else if(Segment!=""&& genre==""){
                        HTMLtable += "<td style='white-space:nowrap'>"+Segment+"</td>"
                         obj['Segement'] = Segment;
                        
                    }
                    else{
                        HTMLtable += "<td style='white-space:nowrap'>"+genre+"</td>"
                        obj['Segement'] = genre;
                        
                    }
                    
                }
            else
                {
                       HTMLtable += "<td style='white-space:nowrap'>"+"NA"+"</td>"
                }
            if(JSONDOC._embedded.events[j]._embedded!=undefined && JSONDOC._embedded.events[j]._embedded.venues!=undefined)
                {
                       var venue = JSONDOC._embedded.events[j]._embedded.venues[0].name;
                    HTMLtable += "<td style='white-space:nowrap'>"+venue+"</td>";
                    obj['venue'] = venue;
                }
            else
                {
                       HTMLtable += "<td style='white-space:nowrap'>"+"NA"+"</td>"
                }
          ID  =    JSONDOC._embedded.events[j].id; 
          HTMLtable += "<td style='white-space:nowrap' id='star"+ID+"'>"+ "<div"+" value1="+ID+" onclick='changeColorandFav(this)'"+" Name=\""+JSONDOC._embedded.events[j].name+"\""+" value='plain' id='star1"+ID+"'>"+"<i class='material-icons'  id='star12"+ID+"'" +"style='border: 1px solid grey'>"+"star_border"+"</i></div><td></tr>"    
           
           }
           HTMLtable += "</tbody></table>";

    return(HTMLtable);
}

function DisplayFav()
{
       if(document.getElementById("TableFavFill")){
       document.getElementById("TableFavFill").style.display = "block";
   }
    console.log("from the delete button")
    console.log(localStorage)
    var i=0
    var counter =0;
    countfav = countfav+1;
    if(localStorage.length>0){
        var HTMLFav = "<table class='table'><thead><tr><th>#</th><th>Date</th><th>Event</th><th>Category</th><th style='white-space:nowrap'>Venue Info</th><th>Favorite</th></tr></thead><tbody>"
        }
    else{
        document.getElementById("TableFavFill").innerHTML = "<table class='table table-bordered'>"+"<tbody>"+"<tr style='background:blanchedalmond'><td><p style='text-align:left'><b style='color:'brown'>"+"No records"+"</b></p></td></tr></tbody></table>";
    }
    if(countfav%2==0){
        document.getElementById("FavoritesFill").style.display="none";
    }
    else{
        document.getElementById("FavoritesFill").style.display="block";
//        if(document.getElementById("Fav10"))
//            document.getElementById("Fav10").style.display="none"
        if(document.getElementById("Fav2"))
            document.getElementById("Fav2").style.display="none"
        if(document.getElementById("Artist"))
            document.getElementById("Artist").style.display="none"
        var FavHTML = ""
     if(localStorage.length>0){
        for(i=0;i<localStorage.length;i++)
            {
                counter = counter+1;
                obj=localStorage.getItem(localStorage.key(i))
                obj = JSON.parse(obj)
                console.log(obj.dates.start.localDate)
                HTMLFav +="<tr>";
                HTMLFav +="<td>"+counter+"</td>";
                if(obj.dates.start!=undefined && obj.dates.start.localDate!=undefined){
                var localDate = obj.dates.start.localDate;
                HTMLFav += "<td style='white-space:nowrap'>"+"<div"+">"+"<p>"+localDate+"</p>"+"<p>"+""+"</p>"+"</div>"+"</td>";
                }
                else{
                HTMLFav += "<td style='white-space:nowrap'>"+"<div"+">"+"<p>"+"NA"+"</p>"+"<p>"+""+"</p>"+"</div>"+"</td>";
                }
                if(obj._embedded!=undefined && obj._embedded.venues!=undefined)
                {
                        venue1 = obj._embedded.venues[0].name;
                        venue1=venue1.replace(/ /g ,'+')
                } 
                if(obj.name !=undefined || obj.name !="")
                {
                       Events = obj.name;
                       Events2 =obj.name;
                       if(Events.length>35)
                           {  
                               Events = Events.substring(0,35)
                               var lastSpace = Events.lastIndexOf(" ");
                               var Events1 = Events.substring(0,lastSpace)
                               Events = Events1+"....."
                           }
                       ID  =    obj.id; 
                       var URLTicketmaster = obj.url;
                       HTMLFav += "<td id='"+String(ID)+"' "+"venue="+venue1+" URLTicketmaster="+URLTicketmaster+" Name=\""+obj.name+"\" "+" venueName=\""+obj.name+"\""+"onclick='angular.element(this).scope().ArtistInfo(this)"+"'>"+"<a href='#' data-toggle='tooltip' ng-if='!ArtistDetails'  class='tooltipdis' toolid='tooltip"+ID+"' data-placement='bottom' title=\""+Events2+"\">"+Events+"</a></td>";
                }
            else{
                       HTMLFav += "<td style='white-space:nowrap'>"+"NA"+"</td><tr>"
                       
                }
            if(obj.classifications!=undefined)
                {
                    var Segment = "";
                    var genre = "";
                    if(obj.classifications[0].segment!=undefined)
                         Segment = obj.classifications[0].segment.name;   
                    if(obj.classifications[0].genre!=undefined)
                        var genre = obj.classifications[0].genre.name;
                    if(Segment!="" && genre!=""){
                        HTMLFav += "<td style='white-space:nowrap'>"+genre+" - "+Segment+"</td>"
                        
                    }
                    else if(Segment!=""&& genre==""){
                        HTMLFav += "<td style='white-space:nowrap'>"+Segment+"</td>"
                         
                        
                    }
                    else{
                        HTMLFav += "<td style='white-space:nowrap'>"+genre+"</td>"
                       
                        
                    }
                    
                }
            else
                {
                       HTMLFav += "<td style='white-space:nowrap'>"+"NA"+"</td>"
                }
            if(obj._embedded!=undefined && obj._embedded.venues!=undefined)
                {
                       var venue =obj._embedded.venues[0].name;
                    HTMLFav += "<td style='white-space:nowrap'>"+venue+"</td>";
                   
                }
            else
                {
                       HTMLFav += "<td style='white-space:nowrap'>"+"NA"+"</td>"
                }
          ID  =    obj.id; 
//          HTMLFav += "<td style='white-space:nowrap' id='delete'>"
//              + "<div onclick='removefromFav1(star1"+ID+")'"+" Name=\""+obj.name+"\""+" value='plain' id='delete"+ID+"'>"+"<i class='material-icons'  id='delete"+ID+"'" +"style='border: 1px solid grey'>"+"delete"+"</i></div><td></tr>"    
                HTMLFav += "<td style='white-space:nowrap' id='delete'>"
              + "<div onclick='removefromFav1(this)'"+" Name=\""+obj.name+"\""+" value='plain' id='delete"+ID+"'>"+"<i class='material-icons'  id='delete"+ID+"'" +"style='border: 1px solid grey'>"+"delete"+"</i></div><td></tr>"    
                
            }
           HTMLFav += "</tbody></table>";
           document.getElementById("TableFavFill").innerHTML = HTMLFav;
     }
                
}
      
}

function removefromFav1(ID){
    console.log(ID)
    console.log("in the remove delete123")
    console.log(ID.id)
    var ID2=String(ID.id).replace("delete","");
    console.log(ID2)
    var ID3 = "star12"+ID2;
    var IDdelete="star1"+ID2
    document.getElementById("row"+ID2).style.background = "white"
    document.getElementById(IDdelete).innerHTML = "<i class='material-icons' value='plain' id='"+ID3+"'" +"style='border: 1px solid grey'>"+"star_border"+"</i>"  ;
     document.getElementById("AgainStar").innerHTML = "<i class='material-icons' value='plain'"+"style='border: 1px solid grey'>"+"star_border"+"</i>"  
    //Added now
//    document.getElementById(ID3).innerHTML = "<i class='material-icons' value='plain' id='star1"+ID2+"'" +"style='border: 1px solid grey'>"+"star_border"+"</i>"  ;
    console.log(ID.id)
    localStorage.removeItem(IDdelete)
    console.log(localStorage)
    console.log(localStorage.length)
    var i=0
    var counter =0;
    countfav = countfav+1;
    if(localStorage.length>0){
        console.log("in the if")
        var HTMLFav = "<table class='table'><thead><tr><th>#</th><th>Date</th><th>Event</th><th>Category</th><th style='white-space:nowrap'>Venue Info</th><th>Favorite</th></tr></thead>"
        }
    else{
        document.getElementById("TableFavFill").innerHTML = "<table class='table table-bordered'>"+"<tbody>"+"<tr style='background:blanchedalmond'><td><p style='text-align:left'><b style='color:'brown'>"+"No records"+"</b></p></td></tr></tbody></table>";
    }
   
    
        document.getElementById("FavoritesFill").style.display="block";
        if(document.getElementById("Fav10"))
            document.getElementById("Fav10").style.display="none"
        if(document.getElementById("Fav2"))
            document.getElementById("Fav2").style.display="none"
        if(document.getElementById("Artist"))
            document.getElementById("Artist").style.display="none"
     if(localStorage.length>0){
        for(i=0;i<localStorage.length;i++)
            {
                counter = counter+1;
                obj=localStorage.getItem(localStorage.key(i))
                obj = JSON.parse(obj)
                console.log(obj.dates.start.localDate)
                HTMLFav +="<tbody><tr>";
                HTMLFav +="<td>"+counter+"</td>";
                if(obj.dates.start!=undefined && obj.dates.start.localDate!=undefined){
                var localDate = obj.dates.start.localDate;
                HTMLFav += "<td style='white-space:nowrap'>"+"<div"+">"+"<p>"+localDate+"</p>"+"<p>"+""+"</p>"+"</div>"+"</td>";
                }
                else{
                HTMLFav += "<td style='white-space:nowrap'>"+"<div"+">"+"<p>"+"NA"+"</p>"+"<p>"+""+"</p>"+"</div>"+"</td>";
                }
                if(obj._embedded!=undefined && obj._embedded.venues!=undefined)
                {
                        venue1 = obj._embedded.venues[0].name;
                        venue1=venue1.replace(/ /g ,'+')
                } 
                if(obj.name !=undefined || obj.name !="")
                {
                       Events = obj.name;
                       Events2 =obj.name;
                       if(Events.length>35)
                           {  
                               Events = Events.substring(0,35)
                               var lastSpace = Events.lastIndexOf(" ");
                               var Events1 = Events.substring(0,lastSpace)
                               Events = Events1+"....."
                           }
                       ID  =    obj.id; 
                       var URLTicketmaster = obj.url;
                       HTMLFav += "<td  id='"+String(ID)+"' "+"venue="+venue1+" URLTicketmaster="+URLTicketmaster+" Name=\""+obj.name+"\" "+" venueName=\""+obj.name+"\""+"onclick='angular.element(this).scope().ArtistInfo("+ID+")"+"'>"+"<a href='#' data-toggle='tooltip' ng-if='!ArtistDetails'  class='tooltipdis' toolid='tooltip"+ID+"' data-placement='bottom' title=\""+Events2+"\">"+Events+"</a></td>";
                }
            else{
                       HTMLFav += "<td style='white-space:nowrap'>"+"NA"+"</td><tr>"
                       
                }
            if(obj.classifications!=undefined)
                {
                    var Segment = "";
                    var genre = "";
                    if(obj.classifications[0].segment!=undefined)
                         Segment = obj.classifications[0].segment.name;   
                    if(obj.classifications[0].genre!=undefined)
                        var genre = obj.classifications[0].genre.name;
                    if(Segment!="" && genre!=""){
                        HTMLFav += "<td style='white-space:nowrap'>"+genre+" - "+Segment+"</td>"
                        
                    }
                    else if(Segment!=""&& genre==""){
                        HTMLFav += "<td style='white-space:nowrap'>"+Segment+"</td>"
                         
                        
                    }
                    else{
                        HTMLFav += "<td style='white-space:nowrap'>"+genre+"</td>"
                       
                        
                    }
                    
                }
            else
                {
                       HTMLFav += "<td style='white-space:nowrap'>"+"NA"+"</td>"
                }
            if(obj._embedded!=undefined && obj._embedded.venues!=undefined)
                {
                       var venue =obj._embedded.venues[0].name;
                    HTMLFav += "<td style='white-space:nowrap'>"+venue+"</td>";
                   
                }
            else
                {
                       HTMLFav += "<td style='white-space:nowrap'>"+"NA"+"</td>"
                }
          ID  =    obj.id; 
          HTMLFav += "<td style='white-space:nowrap' id='delete'>"
              + "<div onclick='removefromFav1(this)'"+" Name=\""+obj.name+"\""+" value='plain' id='delete"+ID+"'>"+"<i class='material-icons'  id='delete"+ID+"'" +"style='border: 1px solid grey'>"+"delete"+"</i></div><td></tr>"    
            }
           HTMLFav += "</tbody></table>";
           document.getElementById("TableFavFill").innerHTML = HTMLFav;
     }
                
            
    
}



function changeColorandFav(data)         /* for the fav star color change*/
{
    
    var ID = data.id;
    var parentId = document.getElementById(ID).parentElement.id;
    var grandParentId = document.getElementById(parentId).parentElement.id;
    var IDfav = data.getAttribute("value1")
    console.log("Value of IDfav")
    console.log(IDfav)
    var image1 = document.getElementById(ID).getAttribute("value");
    if(image1=="plain"){
        $("#"+ID).attr("value","solid");
        document.getElementById(grandParentId).style.background = "gold";
        document.getElementById(ID).innerHTML = "<i class='material-icons' id='star12"+IDfav+"'" +"style='border: 1px solid grey;color:yellow'>"+"star"+"</i>"
        document.getElementById("AgainStar").innerHTML = "<i class='material-icons' id='star12"+IDfav+"'" +"style='border: 1px solid grey;color:yellow'>"+"star"+"</i>"
        for(var i=0;i<EventJson._embedded.events.length;i++){
            var idobj = EventJson._embedded.events[i].id;
            if(IDfav==idobj){
                var obj = EventJson._embedded.events[i]
                obj = JSON.stringify(obj)
             if(localStorage.getItem(ID) === null){
                 localStorage.setItem(ID,obj);
            }
            }
        }
        }

    else{
        $("#"+ID).attr("value","plain");
        document.getElementById(grandParentId).style.background = "white";
       document.getElementById(ID).innerHTML = "<i class='material-icons' value='plain' id='star1"+IDfav+"'" +"style='border: 1px solid grey'>"+"star_border"+"</i>"  
          document.getElementById("AgainStar").innerHTML = "<i class='material-icons' value='plain' id='star1"+IDfav+"'" +"style='border: 1px solid grey'>"+"star_border"+"</i>"  
      removefromFav(ID)
    }
  
}

function removefromFav(ID)
{
    console.log("in the remove delete")
    console.log(ID)
    localStorage.removeItem(ID)
    console.log(localStorage)
   
}



function ArtistTable(data,ID)
{
    var artist="";
    var venue ="";
    objID=ID;

    var HTMLevent1 = "<div class='container'>"+ "<table class='table table-striped'>"+"<tbody>";
    if(data._embedded.attractions!=undefined)
            {
                artist = data._embedded.attractions[0].name;
                if(data._embedded.attractions.length>1){
                for(j=1;j<data._embedded.attractions.length;j++){
                    artist+="| "+data._embedded.attractions[j].name;
                }
                }
                HTMLevent1+="<tr><td style='white-space:nowrap'><b>"+"Artist/Team"+"</b></td>"
                HTMLevent1+="<td style='white-space:nowrap'>"+artist+"</td></tr>"
            }
     if(data.venues!=undefined)
            {
                venue = data.venues[0].name;
                HTMLevent1+="<tr><td style='white-space:nowrap'><b>"+"Venue"+"</b></td>"
                HTMLevent1+="<td style='white-space:nowrap'>"+venue+"</tr></td>"
            }
     if(data.dates.start!=undefined)
            {
                HTMLevent1+="<tr><td style='white-space:nowrap'><b>"+"Time"+"</b></td>"
                var Localdate = data.dates.start.localDate;
                var date1 = new Date(Localdate.replace(/-/g, '\/')); 
                var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
               
                var LocalTime = data.dates.start.localTime;
                HTMLevent1+="<td style='white-space:nowrap'>"+months[date1.getMonth()]+" "+date1.getDate()+", "+date1.getFullYear()+" "+LocalTime+"</td></tr>";
            }
     if(data.classifications!=undefined)
            {
               HTMLevent1+="<tr><td style='white-space:nowrap'><b>"+"Category"+"</b></td>"
               var temp=""; 
               i=0
               if(data.classifications[0].subGenre!=undefined && data.classifications[0].subGenre.name!=undefined && data.classifications[0].subGenre.name!="Undefined" ){
                    var Subgenre =data.classifications[0].subGenre.name;
                    temp +=Subgenre+" "
               }
               else
                   var Subgenre = "NA"
                if(data.classifications[0].genre!=undefined && data.classifications[0].genre.name!=undefined && data.classifications[0].genre.name!="Undefined"){
                    var genre=data.classifications[0].genre.name;
                    temp+=genre
                }
                else
                    var genre = "NA"
                if(data.classifications[0].segment!=undefined && data.classifications[0].segment.name!=undefined && data.classifications[0].segment.name!="Undefined" ){
                    var segment=data.classifications[0].segment.name;
                    temp+=segment+" "
                }
                else
                    var segment = "NA"
                if(data.classifications[0].subType!=undefined && data.classifications[0].subType.name!=undefined && data.classifications[0].subType.name!="Undefined"){
                  var subtype=data.classifications[0].subType.name;
                  temp+=subtype+" "
                }
                else
                  var subtype = "NA"
                if(data.classifications[0].type!=undefined && data.classifications[0].type.name!=undefined && 
                   data.classifications[0].type.name!="Undefined"){
                    var type = data.classifications[0].type.name;
                    temp+=type+" "
                    
                }
                else
                    var type = "NA"
                temp=temp.replace(/ /g,"|"); 
                temp = temp.slice(0, -1)
                HTMLevent1+="<td>";
                HTMLevent1+=temp;
                HTMLevent1+="</td></tr>";
            }
     if(data.priceRanges!=undefined)
            {
                HTMLevent1+="<tr><td style='white-space:nowrap'><b>"+"Price Ranges"+"</b></td>"
                var pricerangemax = "NA";
                var currency = data.priceRanges[0].currency;
                if(pricerangemax!=""||pricerangemax!=undefined)
                    {
                      console.log("In the pricerangemax")
                      pricerangemax = data.priceRanges[0].max;
                    }
                var pricerangemin = "NA";
                if(pricerangemin!=""||pricerangemin!=undefined)
                    {
                        console.log("In the pricerangemin")
                        pricerangemin = data.priceRanges[0].min;
                    }
                if((pricerangemax!=""||pricerangemax!=undefined) && (pricerangemin!=""||pricerangemin!=undefined))
                        HTMLevent1+="<td style='white-space:nowrap'>"+"$"+pricerangemin+"~"+"$"+pricerangemax+" "+"</td></tr>"
                else if((pricerangemax==""||pricerangemax==undefined) && (pricerangemin!=""||pricerangemin!=undefined))
                        HTMLevent1+="<td style='white-space:nowrap'>"+"$"+pricerangemin+"~ "+"</td></tr>"
                else 
                        HTMLevent1+="<td style='white-space:nowrap'>"+"~$"+pricerangemax+" "+"</td></tr>"
                
            }
     if(data.dates!=undefined)
            {
                var status ="NA"
                HTMLevent1+="<tr><td style='white-space:nowrap'><b>"+"Ticket Status"+"</b></td>"
                if(status != ""||status!=undefined)
                    {
                        status = data.dates.status.code;
                        HTMLevent1+="<td style='white-space:nowrap'>"+status+"</td></tr>"
                    }
            }
    if(data.url!=undefined||data.url=="")
            {
        var url = "<a class='second' target='_blank'  href="+data.url+">"+"Ticketmaster"+"</a>"
        HTMLevent1+="<tr><td style='white-space:nowrap'><b>"+"Buy Tickets At"+"</b></td>"
        HTMLevent1+="<td style='white-space:nowrap'>"+url+"</td></tr>"
            }
     if(data.seatmap!=undefined)
          {
              seatURL = data.seatmap.staticUrl;
              HTMLevent1+="<tr><td style='white-space:nowrap'><b>"+"Seat Map"+"</b></td>"
            HTMLevent1+="<td style='white-space:nowrap'><a href='#' data-toggle='modal' data-target='#model12'>"+"View Seat Map Here"+"</a></td></tr>"
              var HTMLevent2 = "<tr><td style='white-space:nowrap'>"+"<a target='_blank' href='"+seatURL+"'><img src='"+seatURL+"' style='width:100%' </a></td></tr>";
          }
    HTMLevent1 += "</tbody></table></div>"
            document.getElementById("seat1").innerHTML =  HTMLevent2;
 
      var HTMLJson = {"HTMLtable":HTMLevent1,"artist":artist};
    return(HTMLJson);
}


function MusicSpotify(data,name1)
{
    var i =0;
    var k;
    var MusicSpotifyHTML  = "<div class='container'><div class = 'table-responsive'>"+ "<table class='table table-striped'>"+"<tbody>";
    if(data.body!=undefined && data.body.artists!=undefined && data.body.artists.items!=undefined)
    {
            var len = data.body.artists.items.length;
            for(i=0;i<len;i++)
                {
                    var name=data.body.artists.items[i].name;
                     k = i;
                    if(name==name1 )
                        {
                            break;
                        }
               }
            MusicSpotifyHTML += "<tr><td style='white-space:nowrap;'><b>"+"Name"+"</b></td>"
            MusicSpotifyHTML += "<td style='white-space:nowrap'>"+name+"</td></tr>"
    }

    if(data.body!=undefined && data.body.artists!=undefined &&  data.body.artists.items!=undefined && data.body.artists.items[k].followers!=undefined && data.body.artists.items[k].followers.total!=undefined )
        {
            var followers = data.body.artists.items[k].followers.total;
            MusicSpotifyHTML += "<tr><td style='white-space:nowrap'><b>"+"Followers"+"</b></td>"
            MusicSpotifyHTML += "<td style='white-space:nowrap'>"+followers+"</td></tr>"
        }
    if(data.body!=undefined && data.body.artists!=undefined && data.body.artists.items!=undefined && data.body.artists.items[k].popularity){
        var popularity = data.body.artists.items[k].popularity;
        MusicSpotifyHTML += "<tr><td style='white-space:nowrap'><b>"+"Popularity"+"</b></td>"
        MusicSpotifyHTML += "<td>";
        var progress = document.createElement("round-progress");
            progress.className = "roundbar";
            progress.setAttribute('max','100');
            progress.setAttribute('current',popularity);
            progress.setAttribute('color','green');
            progress.setAttribute('radius','30');
            progress.setAttribute('stroke','3');
            progress.setAttribute('rounded','true');
            progress.setAttribute('clockwise','false');
            progress.setAttribute('responsive','false');
            progress.setAttribute('animation','easeInOutQuart');
            progress.setAttribute('animation-delay','0');
            progress.setAttribute('bgcolor','gray')
        MusicSpotifyHTML+="<div style='position:absolute;margin-left:18px;margin-top:12px;height:30px;font-size:20px'>"+popularity+"</div>"
        MusicSpotifyHTML += progress.outerHTML;
        MusicSpotifyHTML += "</td></tr>";
    }
    //radius=15 stroke=4 rounded=true  clockwise=true  responsive=true currentAnimati   on='easeOutCubic' on-render='showPreciseCurrent'  duration='800'
    if(data.body!=undefined && data.body.artists!=undefined && data.body.artists.items!=undefined && data.body.artists.items[k].external_urls.spotify!=undefined){
        var CheckAt = data.body.artists.items[k].external_urls.spotify;
        MusicSpotifyHTML += "<tr><td style='white-space:nowrap'><b>"+"Check At"+"</b></td>"
        MusicSpotifyHTML += "<td style='white-space:nowrap'><a  target='_blank' style='text-decoration:underline' href="+CheckAt+">"+"Spotify"+"</a></td></tr></tbody></table></div></div>"
    }
    var spotifyObject = {"generateHTML":MusicSpotifyHTML,"popularity":popularity};
    return spotifyObject;
    
}



function Venue(data){

    var VenueHTML  = "<div class='container'>"+ "<table class='table table-striped'>"+"<tbody>";
     if(data._embedded!=undefined && data._embedded.venues!=undefined && data._embedded.venues[0].address!=undefined && data._embedded.venues[0].address.line1!=undefined)
         {   
             var address = data._embedded.venues[0].address.line1;
             VenueHTML+="<tr><td><b>"+"Address"+"</b></td>"
             VenueHTML+="<td style='white-space:nowrap'>"+address+"</td></tr>"
         }
      if(data._embedded!=undefined && data._embedded.venues!=undefined)
        {
            
     if(data._embedded!=undefined && data._embedded.venues!=undefined &&  data._embedded.venues[0].city!=undefined && data._embedded.venues[0].city.name!=undefined  && data._embedded.venues[0].state!=undefined && data._embedded.venues[0].state.name!=undefined ){
              var city = data._embedded.venues[0].city.name;
              var state = data._embedded.venues[0].state.name;
              VenueHTML+="<tr><td><b>"+"City"+"</b></td>";
              VenueHTML+="<td style='white-space:nowrap'>"+city+","+state+"</td></tr>";
        }
        
     if(data._embedded!=undefined && data._embedded.venues!=undefined &&  data._embedded.venues[0].city!=undefined && data._embedded.venues[0].city.name!=undefined && data._embedded.venues[0].state==undefined && data._embedded.venues[0].state.name==undefined )
         {
              var city = data._embedded.venues[0].city.name;
              VenueHTML+="<tr><td><b>"+"City"+"</b></td>";
              VenueHTML+="<td>"+city+"</td></tr>";
         }
     if(data._embedded!=undefined && data._embedded.venues!=undefined && data._embedded.venues[0].state!=undefined  && data._embedded.venues[0].state.name!=undefined && data._embedded.venues[0].city==undefined && data._embedded.venues[0].city.name==undefined)
         {
              var state = data._embedded.venues[0].state.name;
              VenueHTML+="<tr><td><b>"+"City"+"</b></td>";
              VenueHTML+="<td>"+state+"</td></tr>";
         }
      
        }
      if(data._embedded!=undefined && data._embedded.venues!=undefined && data._embedded.venues[0].boxOfficeInfo!=undefined  && data._embedded.venues[0].boxOfficeInfo.phoneNumberDetail!=undefined){
          var phoneNumber = data._embedded.venues[0].boxOfficeInfo.phoneNumberDetail;
          VenueHTML+="<tr><td style='white-space:nowrap'><b>"+"Phone Number"+"</b></td>";
          VenueHTML+="<td>"+phoneNumber+"</td></tr>";
          
      }
    
    
    
     if(data._embedded!=undefined && data._embedded.venues!=undefined && data._embedded.venues[0].boxOfficeInfo!=undefined  && data._embedded.venues[0].boxOfficeInfo.openHoursDetail!=undefined)
         {
             var info = data._embedded.venues[0].boxOfficeInfo.openHoursDetail;
              VenueHTML+="<tr><td style='white-space:nowrap'><b>"+"Open Hours"+"</b></td>";
              VenueHTML+="<td>"+info+"</td></tr>";
         }
    if(data._embedded!=undefined && data._embedded.venues!=undefined && data._embedded.venues[0]!=undefined && data._embedded.venues[0].generalInfo!=undefined && data._embedded.venues[0].generalInfo.generalRule!=undefined){
         var generalRule = data._embedded.venues[0].generalInfo.generalRule;
        VenueHTML+="<tr><td style='white-space:nowrap'><b>"+"General Rule"+"</b></td>";
        VenueHTML+="<td>"+generalRule+"</td></tr>";
        
        
    }
     if(data._embedded!=undefined && data._embedded.venues!=undefined && data._embedded.venues[0]!=undefined && data._embedded.venues[0].generalInfo!=undefined && data._embedded.venues[0].generalInfo.childRule!=undefined){
         var childRule = data._embedded.venues[0].generalInfo.childRule;
        VenueHTML+="<tr><td style='white-space:nowrap'><b>"+"Child Rule"+"</b></td>";
        VenueHTML+="<td>"+childRule+"</td></tr></td></tr></tbody></table></div>";
    }
   if(data._embedded!=undefined && data._embedded.venues!=undefined && data._embedded.venues[0]!=undefined && data._embedded.venues[0].location!=undefined && data._embedded.venues[0].location.latitude!=undefined && data._embedded.venues[0].location.longitude!=undefined ){
       var latitude = data._embedded.venues[0].location.latitude;
       var  longitude= data._embedded.venues[0].location.longitude;
       //VenueHTML+="<div id='map'  style='overflow:visible' latitude='"+latitude+"' longitude='"+longitude+"'>"+"</div>";  
    
       }
   var venulatlong = {"htmlvenue":VenueHTML,"lat":latitude,"long":longitude};
    return venulatlong;
    
    
}

function GoogleSearchImages(data){
    
    var i=0;
    var k=0;
    var k1=0
    var k2=0;
    var imageHTML=""
if(data!=undefined)
{
   for(k2=0;k2<data.length;k2++){  
        var name = data[k2].queries.request[0].searchTerms
        
           imageHTML+="<div class='header' style='text-align:center;white-space:nowrap'><h2>"+name+"</h2></div>";
           imageHTML+= "<div class='row' id='gridimages'><div class='column'>";
           var items = data[k2].items;
           var itemsDisplay = []
           for(i=0;i<8;i++)
               {
                 itemsDisplay.push(data[k2].items[i].link);
               }
           for(i=0;i<2;i++)
               {
                     imageHTML+="<a target='_blank' href='"+itemsDisplay[i]+"'><img src='"+itemsDisplay[i]+"' style='width:100%'"+">"+"</a>";            
               }
           imageHTML+="</div><div class='column'>";
           for(k=2;k<5;k++)
               {
                   imageHTML+="<a target='_blank' href='"+itemsDisplay[k]+"'><img src='"+itemsDisplay[k]+"' style='width:100%'"+">"+"</a>";    
               }
          imageHTML+="</div><div class='column'>";
            for(k1=5;k1<8;k1++)
                {
                    imageHTML+="<a  target='_blank'  href='"+itemsDisplay[k1]+"'><img src='"+itemsDisplay[k1]+"' style='width:100%'"+">"+"</a>";    
                }
          imageHTML+="</div></div>"
         
   }
 }
    
    return imageHTML;
}

function MusicSpotify1(dataspotify,datagoogle,artist)
{
   var i =0;
    var k;
    var HTMLmusicspotify=""
    for(i=0;i<dataspotify.length;i++){
     
         HTMLmusicspotify += "<div class='container'><div class ='table-responsive'>"+ "<table class='table table-striped'>"+"<tbody>";
        if(dataspotify[i].body!=undefined && dataspotify[i].body.artists!=undefined && dataspotify[i].body.artists.items!=undefined){
           var len = dataspotify[i].body.artists.items.length;
             for(j=0;j<len;j++)
                {
                     var name = dataspotify[i].body.artists.items[j].name
                     k = j;
                    if(name==artist[i])
                        {
                            break;
                        }
               }
            HTMLmusicspotify += "<thead><tr><div>"+"<p style='white-space:nowrap;text-align:center'><b>"+name+"</b></p></div></tr></thead>"
            HTMLmusicspotify += "<tr><td style='white-space:nowrap'><b>"+"Name"+"</b></td>"
            HTMLmusicspotify += "<td style='white-space:nowrap'>"+name+"</td></tr>"
         
            
        }
         if(dataspotify[i].body!=undefined && dataspotify[i].body.artists!=undefined &&  dataspotify[i].body.artists.items!=undefined && dataspotify[i].body.artists.items[k].followers!=undefined && dataspotify[i].body.artists.items[k].followers.total!=undefined )
        {
            var followers = dataspotify[i].body.artists.items[k].followers.total;
            HTMLmusicspotify += "<tr><td style='white-space:nowrap'><b>"+"Followers"+"</b></td>"
            HTMLmusicspotify += "<td style='white-space:nowrap'>"+followers+"</td></tr>"
        }
        if(dataspotify[i].body!=undefined && dataspotify[i].body.artists!=undefined && dataspotify[i].body.artists.items!=undefined && dataspotify[i].body.artists.items[k].popularity){
        var popularity =dataspotify[i].body.artists.items[k].popularity;
        HTMLmusicspotify += "<tr><td style='white-space:nowrap'><b>"+"Popularity"+"</b></td>"
        HTMLmusicspotify += "<td>";
        var progress = document.createElement("round-progress");
            progress.className = "roundbar";
            progress.setAttribute('max','100');
            progress.setAttribute('current',popularity);
            progress.setAttribute('color','green');
            progress.setAttribute('radius','30');
            progress.setAttribute('stroke','3');
            progress.setAttribute('rounded','true');
            progress.setAttribute('clockwise','false');
            progress.setAttribute('responsive','false');
            progress.setAttribute('animation','easeInOutQuart');
            progress.setAttribute('animation-delay','0');
            progress.setAttribute('bgcolor','gray')
        HTMLmusicspotify+="<div style='position:absolute;margin-left:19px;margin-top:9px;height:30px;font-size:19px'>"+popularity+"</div>"
        HTMLmusicspotify += progress.outerHTML;
        HTMLmusicspotify += "</td></tr>";
        }
       if(dataspotify[i].body!=undefined && dataspotify[i].body.artists!=undefined && dataspotify[i].body.artists.items!=undefined && dataspotify[i].body.artists.items[k].external_urls.spotify!=undefined){
        var CheckAt = dataspotify[i].body.artists.items[k].external_urls.spotify;
        HTMLmusicspotify += "<tr><td style='white-space:nowrap'><b>"+"Check At"+"</b></td>"
        HTMLmusicspotify += "<td style='white-space:nowrap'><a  target='_blank' style='text-decoration:underline' href="+CheckAt+">"+"Spotify"+"</a></td></tr></tbody></table></div></div>"
       }  
        if(datagoogle!=undefined){
            var i1=0;
            var k3=0;
            var k1=0
             
              HTMLmusicspotify+="<div class='container' id='google2'>"+"<div class='header'>"+"</div>";
              HTMLmusicspotify+= "<div class='row'><div class='column'>";
              var items = datagoogle[i].items;
              var itemsDisplay = []
              if(items.length>=8){
              
              for(i1=0;i1<8;i1++)
               {
                 itemsDisplay.push(datagoogle[i].items[i1].link);
               }
                 for(i1=0;i1<2;i1++)
               {
                     HTMLmusicspotify+="<a target='_blank' href='"+itemsDisplay[i1]+"'><img src='"+itemsDisplay[i1]+"' style='width:100%'"+">"+"</a>";            
               }
                HTMLmusicspotify+="</div><div class='column'>";
               for(k3=2;k3<5;k3++)
               {
                   HTMLmusicspotify+="<a target='_blank' href='"+itemsDisplay[k3]+"'><img src='"+itemsDisplay[k3]+"' style='width:100%'"+">"+"</a>";    
               }
               HTMLmusicspotify+="</div><div class='column'>";
              for(k1=5;k1<8;k1++)
                {
                    HTMLmusicspotify+="<a target='_blank' href='"+itemsDisplay[k1]+"'><img src='"+itemsDisplay[k1]+"' style='width:100%'"+">"+"</a>";    
                }
            }
            else{
                
            for(i1=0;i1<datagoogle[i].items.length;i1++)
               {
                 itemsDisplay.push(datagoogle[i].items[i1].link);
               } 
            for(i1=0;i1<itemsDisplay.length;i1++)
               {
                     HTMLmusicspotify+="<a target='_blank' href='"+itemsDisplay[i1]+"'><img src='"+itemsDisplay[i1]+"' style='width:100%'"+">"+"</a>";            
               }
                
                
            }
            HTMLmusicspotify+="</div></div></div>"
            
        
       
    }

    
}
    return HTMLmusicspotify
}

function Upcomingevents(data,user1){
    
    console.log("in upcoming data")
    if(user1.valuetype!="Default"){
       var data = sortouput(data,user1);
        console.log("After sorting data")
        console.log(JSON.stringify(data));
       var HTMLevent1="";
       for(i=0;i<data.length;i++){
            var uri = data[i].uri;
           console.log("value of the uri")
             console.log(uri)
            HTMLevent1+="<table class='table table-bordered'>"+"<tbody>"+"<tr><td>";
            if(data[i].displayName!=undefined){
            HTMLevent1+= "<p style='color:blue;white-space:nowrap'>"+"<a href="+uri+">"+data[i].displayName+"</a></p>";}
            if(data[i].performance!=undefined &&  data[i].performance[0].artist!=undefined && data[i].performance[0].artist.displayName!=undefined && data[i].start!=undefined && data[i].start.date!=undefined && data[i].start.time!=undefined){
                                        
                var date1 = new Date(data[i].start.date.replace(/-/g, '\/'));
                var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                
                HTMLevent1+= "<p style='white-space:nowrap'><span style='color:darksalmon'>"+"Artist:"+data[i].performance[0].artist.displayName+"</span>" +
                                       months[date1.getMonth()]+" "+date1.getDate()+", "+date1.getFullYear()+" "+data[i].start.time+"</p>";}
           else if(data[i].performance[0].artist==undefined && data[i].start.date!=undefined  &&  data[i].start.time!=undefined){
                                        
               var date1 = new Date(data[i].start.date.replace(/-/g, '\/'));
               var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
               HTMLevent1+= "<p style='white-space:nowrap'>"+
                                        months[date1.getMonth()]+" "+date1.getDate()+", "+date1.getFullYear()+" "+data[i].start.time+"</p>"
                                    }
            else if(data[i].performance!=undefined &&  data[i].performance[0].artist!=undefined && data[i].performance[0].artist.displayName!=undefined && data[i].start!=undefined && data[i].start.date==undefined && data[i].start.time!=undefined){
                                        HTMLevent1+= "<p style='white-space:nowrap'><span style='color:darksalmon'>"+"Artist:"+data[i].performance[0].artist.displayName+"</span>"
                                       +data[i].start.time+"</p>";}
           else if(data[i].performance!=undefined &&  data[i].performance[0].artist!=undefined && data[i].performance[0].artist.displayName!=undefined && data[i].start!=undefined && data[i].start.date!=undefined && data[i].start.time==undefined){
                             
               var date1 = new Date(data[i].start.date.replace(/-/g, '\/'));
               var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
               HTMLevent1+= "<p style='white-space:nowrap'><span style='color:darksalmon'>"+"Artist:"+data[i].performance[0].artist.displayName+"</span>" +
                                   months[date1.getMonth()]+" "+date1.getDate()+", "+date1.getFullYear()+"</p>";}
            if(data[i].type!=undefined)
                                      {
                                           HTMLevent1+= "<p style='white-space:nowrap'>"+"<b>Type:"+data[i].type+"</b></p></td></tr></tbody></table>";
                                      }
       }
         HTMLevent1+= "</div>"
        
    }
    else{
    var i=0;
    var HTMLevent1="";
    
    if(data.resultsPage!=undefined && data.resultsPage.results!=undefined){
                    
                    var results = data.resultsPage.results;
                    if(results.event==undefined)
                        {
                            
                            return 0;
                        }
                    else{
                        
                        
                        if(data.resultsPage.results.event!=undefined)
                        var eventLength = data.resultsPage.results.event.length;
                        for(i=0;i<eventLength;i++){
                                    HTMLevent1+="<table class='table table-bordered'>"+"<tbody>"+"<tr><td>";
                                    if(data.resultsPage.results.event[i].uri!=undefined)
                                        {
                                          var uri= data.resultsPage.results.event[i].uri
                                        }
                                        
                                    if(data.resultsPage.results.event[i].displayName!=undefined){
                                        HTMLevent1+= "<p style='color:blue;white-space:nowrap'>"+"<a href="+uri+">"+data.resultsPage.results.event[i].displayName+"</a></p>";}
                                    if(data.resultsPage.results.event[i].performance!=undefined &&  data.resultsPage.results.event[i].performance[0].artist!=undefined && data.resultsPage.results.event[i].performance[0].artist.displayName!=undefined && data.resultsPage.results.event[i].start!=undefined && data.resultsPage.results.event[i].start.date!=undefined && data.resultsPage.results.event[i].start.time!=undefined){
                                    var date1 = new Date(data.resultsPage.results.event[i].start.date.replace(/-/g, '\/'));
                                    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];  
                                        HTMLevent1+= "<p style='white-space:nowrap'><span style='color:darksalmon'>"+"Artist:"+data.resultsPage.results.event[i].performance[0].artist.displayName+"</span>" +
                                        months[date1.getMonth()]+" "+date1.getDate()+", "+date1.getFullYear()+" "+data.resultsPage.results.event[i].start.time+"</p>";}
                                    else if(data.resultsPage.results.event[i].performance[0].artist==undefined && data.resultsPage.results.event[i].start.date!=undefined  &&  data.resultsPage.results.event[i].start.time!=undefined){
                                    var date1 = new Date(data.resultsPage.results.event[i].start.date.replace(/-/g, '\/'));
                                    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];  
                                        
                                        HTMLevent1+= "<p style='white-space:nowrap'>"+
                                        months[date1.getMonth()]+" "+date1.getDate()+", "+date1.getFullYear()+" "+data.resultsPage.results.event[i].start.time+"</p>"
                                    }
                                    else if(data.resultsPage.results.event[i].performance!=undefined &&  data.resultsPage.results.event[i].performance[0].artist!=undefined && data.resultsPage.results.event[i].performance[0].artist.displayName!=undefined && data.resultsPage.results.event[i].start!=undefined && data.resultsPage.results.event[i].start.date==undefined && data.resultsPage.results.event[i].start.time!=undefined){
                                        HTMLevent1+= "<p style='white-space:nowrap'><span style='color:darksalmon'>"+"Artist:"+data.resultsPage.results.event[i].performance[0].artist.displayName+"</span>"
                                       +data.resultsPage.results.event[i].start.time+"</p>";}
                                        
                                   else if(data.resultsPage.results.event[i].performance!=undefined &&  data.resultsPage.results.event[i].performance[0].artist!=undefined && data.resultsPage.results.event[i].performance[0].artist.displayName!=undefined && data.resultsPage.results.event[i].start!=undefined && data.resultsPage.results.event[i].start.date!=undefined && data.resultsPage.results.event[i].start.time==undefined){
                                   var date1 = new Date(data.resultsPage.results.event[i].start.date.replace(/-/g, '\/'));
                                    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];  
                                       
                                       HTMLevent1+= "<p style='white-space:nowrap'><span style='color:darksalmon'>"+"Artist:"+data.resultsPage.results.event[i].performance[0].artist.displayName+"</span>" +
                                       months[date1.getMonth()]+" "+date1.getDate()+", "+date1.getFullYear()+"</p>";}
                        
                                  if(data.resultsPage.results.event[i].type!=undefined)
                                      {
                                           HTMLevent1+= "<p style='white-space:nowrap'>"+"<b>Type:"+data.resultsPage.results.event[i].type+"</b></p></td></tr></tbody></table>";
                                      }
                                      }
                               
                        HTMLevent1+= "</div>"
                        
                            }
                    }
    }
    return  HTMLevent1;
    
}

function sortouput(data,user1)
{
    var i=0
    var arrayOfObjects = [];
    if(data.resultsPage!=undefined && data.resultsPage.results!=undefined){
        
        if(data.resultsPage.results.event!=undefined){
            var eventLength = data.resultsPage.results.event.length;
            for(i=0;i<eventLength;i++){
               var object = data.resultsPage.results.event[i];
               arrayOfObjects.push(object);
            }
        }

       if(user1.typesort=="Ascending" && user1.valuetype=="Time"){
                var Timesort=arrayOfObjects.slice(0);
                Timesort.sort(function(a,b){
                 var aD = new Date(a.start.datetime).getTime();
                 var bD = new Date(b.start.datetime).getTime(); 
                return ((aD < bD) ? -1 : ((aD > bD) ? 1 : 0));
        })  

           return Timesort;
       }
       else if(user1.typesort=="Descending" && user1.valuetype=="Time"){
            var Timesort=arrayOfObjects.slice(0);
                 Timesort.sort(function(a,b){
                 var aD = new Date(a.start.datetime).getTime();
                 var bD = new Date(b.start.datetime).getTime(); 
                 return ((aD < bD) ? 1 : ((aD > bD) ? -1 : 0));
        })  

           return Timesort;
       }
        
     if(user1.typesort=="Ascending" && user1.valuetype=="Event Name") {
        var EventNameSort =arrayOfObjects.slice(0);
        EventNameSort.sort(function(a,b){
                
                var x=a.displayName.toLowerCase();
                var y = b.displayName.toLowerCase()
                return x < y ? -1 : x > y ? 1 : 0;
            
      
        })

         return EventNameSort;
     }
     else if(user1.typesort=="Descending" && user1.valuetype=="Event Name"){
         
                var EventNameSort =arrayOfObjects.slice(0);
                EventNameSort.sort(function(a,b){
                var x=a.displayName.toLowerCase();
                var y = b.displayName.toLowerCase()
                return x < y ? 1 : x > y ? -1 : 0;
      
        }) 

         return EventNameSort;
         
     }
        
    if(user1.typesort=="Ascending" && user1.valuetype=="Artist") {
        var ArtistNameSort =arrayOfObjects.slice(0);
        ArtistNameSort.sort(function(a,b){
               
                var x=a.performance[0].displayName.toLowerCase();
                var y = b.performance[0].displayName.toLowerCase()
                return x < y ? -1 : x > y ? 1 : 0;
      
        })

        return ArtistNameSort;
     }
     else if(user1.typesort=="Descending" && user1.valuetype=="Artist"){
                var ArtistNameSort =arrayOfObjects.slice(0);
                ArtistNameSort.sort(function(a,b){
               
                var x=a.performance[0].displayName.toLowerCase();
                var y = b.performance[0].displayName.toLowerCase()
                return x < y ? 1 : x > y ? -1 : 0;
      
        })

        return ArtistNameSort;
         
     }
        
        if(user1.typesort=="Ascending" && user1.valuetype=="Type") {
        var TypeNameSort =arrayOfObjects.slice(0);
        TypeNameSort.sort(function(a,b){
               
                var x=a.type.toLowerCase();
                var y = b.type.toLowerCase()
                return x < y ? -1 : x > y ? 1 : 0;
      
        })

            return TypeNameSort;
     }
     else if(user1.typesort=="Descending" && user1.valuetype=="Type"){
                var TypeNameSort =arrayOfObjects.slice(0);
                TypeNameSort.sort(function(a,b){
       
                var x=a.type.toLowerCase();
                var y = b.type.toLowerCase()
                return x < y ? 1 : x > y ? -1 : 0;
      
        })

         return TypeNameSort;
         
     }
        
            
    }
    
}

function favourite1()
{
    
    console.log("In the fav function 2nd")
    var Id1=objID
    console.log(Id1)
   var IDrow=document.getElementById("row"+Id1).id;
    var ID = "star1"+objID;
    var IDstar = "star12"+Id1
    var image1 = document.getElementById("AgainStar").getAttribute("value");
    if(image1=="plain"){
        $("#AgainStar").attr("value","solid");
       document.getElementById(IDrow).style.background = "gold"
      document.getElementById(ID).innerHTML = "<i class='material-icons' id='star12"+Id1+"'" +"style='border: 1px solid grey;color:yellow'>"+"star"+"</i>"
        document.getElementById("AgainStar").innerHTML = "<i class='material-icons'" +"style='border: 1px solid grey;color:yellow'>"+"star"+"</i>"
        
        for(var i=0;i<EventJson._embedded.events.length;i++){
            var idobj = EventJson._embedded.events[i].id;
            if(Id1==idobj){
                var obj = EventJson._embedded.events[i]
                obj = JSON.stringify(obj)
             if(localStorage.getItem(ID) === null){
                 localStorage.setItem(ID,obj);
            }
            }
        }
        }

    else{
       $("#AgainStar").attr("value","plain");
        document.getElementById(IDrow).style.background = "white"
        document.getElementById(ID).innerHTML = "<i class='material-icons' value='plain' id='star12"+Id1+"'" +"style='border: 1px solid grey'>"+"star_border"+"</i>"  
       document.getElementById("AgainStar").innerHTML = "<i class='material-icons' value='plain'"+"style='border: 1px solid grey'>"+"star_border"+"</i>"  
       removefromFav(ID)
    }

}



function GoBack1(){
    document.getElementById("FavoritesFill").style.display="none";
    if( document.getElementById("Fav10"))
        document.getElementById("Fav10").style.display="block"
    if( document.getElementById("Fav2"))
        document.getElementById("Fav2").style.display="block"
    if( document.getElementById("Artist"))
        document.getElementById("Artist").style.display="block"
    
    
}


