function buildDataPage(properties) {
    // enter d3 code to plot graphs here, properties is the output of the users search result in json format
    console.log("buildDataPage", properties);
    var selection = d3.selectAll("tbody").selectAll("tr").data(properties);
    selection.enter()
        .append("tr")
        .html(d => `<td>${d.Mls_Number}</td><td>${d.Lat}</td><td>${d.Long}</td>
        <td>${d.Street}</td><td>${d.City}</td><td>${d.Postal_Code}</td>
        <td>${d.Walk_Score}</td><td>$${d.Price}</td>
        <td><a href="${d.Photo_url}" target="_blank"><img src="${d.Photo_url}" width="100"></a></td>`);

    var mapConfig = {
        center: [43.65, -79.38],
        zoom: 10
    }
    
        
    var tileURL = "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"
    var API_KEY = 'pk.eyJ1IjoiYW1pcjQyNSIsImEiOiJjazV4M3VpNjExOWdiM21teHY2cWhlbW9xIn0.hKGEPDgUocliJrXKCyEHTA'
      
    var tileConfig = {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: API_KEY
    }
        
    // var geoJSONurl = 'static/data/Data.geojson'
        
        
    var map = L.map("fmap", mapConfig)
    var mapLayer = L.tileLayer(tileURL, tileConfig).addTo(map)
    // d3.json(geoJSONurl, function(data) {
    //     L.geoJSON(data, {
    //         style: function(feature) {
    //             return {
    //                 color: "blue",
    //                 fillColor: "salmon",
    //                 fillOpacity: 0.5,
    //                 weight: 1.5
    //                 };
    //         }, 
    //         onEachFeature : function (feature, layer) {
    //                 layer.on({
    //                     mouseover: function(event) {
    //                         layer = event.target, 
    //                         layer.setStyle({
    //                         fillOpacity: 0.75
    //                         });
    //                     }, 
    //                     doubleclick: function(event) {
    //                         //map.fitBounds(event.target.getBounds());
    //                         map.zoomOut();
    //                     },
    //                     click: function (event) {
    //                         map.zoomIn();
    //                     },
    //                     mouseout: function(event) {
    //                         layer = event.target, 
    //                         layer.setStyle({
    //                             fillOpacity: 0.5
    //                         })
    //                     }
    //                 });
        //             layer.bindPopup("<h1>" + feature.properties.AREA_DESC + "</h1><hr><h2>" + feature.properties.AREA_TYPE + "</h2>");
        //     }
    //     // }).addTo(map);
    // });
    properties.forEach(function(unit){
        var marker = L.marker([unit.Lat, unit.Long]).bindPopup(
        "<h7> MLS_number:  " + unit.Mls_Number 
        + "</h7> <hr> <h7> Street:  " + unit.Street
        + "</h7> <hr> <h7> Price:  $" + unit.Price 
        + '</h7> <hr> <object data='+ unit.Photo_url
        + 'width="100" height="100"></object>')
        .addTo(map)
        marker.on('mouseover', function(event){
            marker.openPopup();
          });
        marker.on('mouseout', function(event){
            marker.closePopup();
          });
    })

};




