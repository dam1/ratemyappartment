var request = require('request');
var cheerio = require('cheerio');

var fs = require('fs');


var jsonLocation;
var mDatabase =  [];
var j = 0;



var file = __dirname + '/idLocation.json';

var i = 0;


work();
writeDatabase();

var mLat
var mLng

function work(){
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      console.log('Error: ' + err);
      return;
    }
    jsonLocation = JSON.parse(data);
    console.log('writejsonlocation '+jsonLocation.length)



    var id = jsonLocation[i].id ;
    mLat  = jsonLocation[i].lat;
    mLng  = jsonLocation[i].lng;
    if(i != null){

      var url = 'http://www.padmapper.com/loadApartDescription.php?apartmentID='+id+'&workLat=0&workLong=0&am=0';
      console.log('prescrap')

      request(url, (function() { return function(err, resp, body) {
        console.log('scrap : '+ url);
        $ = cheerio.load(body);
        var urlAd = $('.aptLinkIE').attr('href');
        var imageUrl = $('.infoThumbnail').attr('src');
        var description = $('#listingSummaryDiv').text();
        var price = $('#listingSummaryDiv').text().split('-')[0];

        if(price != null){
          price = price.replace('$', '');
        }
        if(imageUrl != null){
          imageUrl = imageUrl.replace('large', 'medium');
        }
        var lng = mLng;
        var lat = mLat;


        console.log( urlAd);
        console.log( description);
        console.log( price);
        console.log( imageUrl);
        console.log( lat);
        console.log( lng);



        var jsonLoc = [{
          url : urlAd,
          description : description,
          price : price,
          addressLatitude : lat,
          addresslongitude : lng,
          imageUrl : imageUrl
        }]

        mDatabase.push(jsonLoc);
        j++
        if(i%100 == 0){
          writeDatabase();
        }

        i++
        work();

      }})());

    }

  });
}






function writeDatabase(){
  var outputFilename = 'database'+i+'.json';

  fs.writeFile(outputFilename, JSON.stringify(mDatabase, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to ");

    }


  });
}
