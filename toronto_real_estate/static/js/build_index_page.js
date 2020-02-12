function buildIndexPage(properties) {
    // enter d3 code to plot graphs here, properties is the output of the users search result in json format
    console.log("buildIndexPage", properties);
    console.log("buildIndexPage building graph to: ", d3.select("#map"));

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
    });
    
    // Initialize all of the LayerGroups we'll be using
    var layers = {
    walkScore_less25: new L.LayerGroup(),
    walkScore_less_50: new L.LayerGroup(),
    walkScore_less_75: new L.LayerGroup(),
    walkScore_above_75: new L.LayerGroup()
    };
    
    // Create the map with our layers
    var map = L.map("map", {
    center: [43.6532, -79.3832],
    zoom: 12,
    layers: [
        layers.walkScore_less25,
        layers.walkScore_less_50,
        layers.walkScore_less_75,
        layers.walkScore_above_75
    ]
    });
    
    // Add our 'lightmap' tile layer to the map
    lightmap.addTo(map);
    
    // Create an overlays object to add to the layer control
    var overlays = {
    "WalkScore < 25": layers.walkScore_less25,
    "WalkScore < 50": layers.walkScore_less_50,
    "WalkScore < 75": layers.walkScore_less_75,
    "WalkScore > 75": layers.walkScore_above_75
    };
    
    // Create a control for our layers, add our overlay layers to it
    L.control.layers(null, overlays).addTo(map);
    
    // Create a legend to display information about our map
    var info = L.control({
    position: "bottomright"
    });
    
    // When the layer control is added, insert a div with the class of "legend"
    info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
    };
    // Add the info legend to the map
    info.addTo(map);
    
    // Initialize an object containing icons for each layer group
    var icons = {
    walkScore_less25: L.ExtraMarkers.icon({
        icon: "ion-house",
        iconColor: "white",
        markerColor: "red",
        shape: "star"
    }),
    walkScore_less_50: L.ExtraMarkers.icon({
        icon: "ion-house",
        iconColor: "white",
        markerColor: "orange",
        shape: "circle"
    }),
    walkScore_less_75: L.ExtraMarkers.icon({
        icon: "ion-house",
        iconColor: "white",
        markerColor: "yellow",
        shape: "penta"
    }),
    walkScore_above_75: L.ExtraMarkers.icon({
        icon: "ion-house",
        iconColor: "white",
        markerColor: "green",
        shape: "circle"
    })
    };
    // Pull the "house" property off of response.data
    //console.log(response);
    var houses = properties;
    
    // Initialize an array to hold bike markers
    //var houseMarkers = [];
    
    // Create an object to keep of the number of markers in each layer
    var houseCount = {
        walkScore_less25: 0,
        walkScore_less_50: 0,
        walkScore_less_75: 0,
        walkScore_above_75: 0,
    };
    
    // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and house count for layer group
    var housePriceCode;
    
    // Loop through the houses array
    for (var index = 0; index < houses.length; index++) {
        var house = houses[index];
        if(parseFloat(house['Walk_Score']) < 25){
        housePriceCode = "walkScore_less25";
        }else if(parseFloat(house['Walk_Score']) < 50){
        housePriceCode = "walkScore_less_50";
        }else if(parseFloat(house['Walk_Score']) < 75){
        housePriceCode = "walkScore_less_75";
        }else if(parseFloat(house['Walk_Score']) < 100){
        housePriceCode = "walkScore_above_75";
        }
    
        houseCount[housePriceCode]++;
    
        var newMarker = L.marker([house['Lat'], house['Long']], {
        icon: icons[housePriceCode]
        });
        // var newMarker = L.marker([house['Lat'], house['Long']], {
        //   icon: icons[housePriceCode]
        // });
        // console.log(newMarker)
        // Add the new marker to the appropriate layer
        newMarker.addTo(layers[housePriceCode]);
    
        newMarker.bindPopup("Price: "+ house['Price'] + "<hr> WalkScore: " + house['Walk_Score']);
        // For each station, create a marker and bind a popup with the station's name
        //var houseMarker = L.marker([houses[index]['Lat'], houses[index]['Long']])
        //.bindPopup("<h3>" + 'Lot Size: ' + houses[index]['Lot_Size'] + "<h3><h3>Price: " + houses[index]['Price'] + "<h3>");
    
        // Add the marker to the bikeMarkers array
        //houseMarkers.push(houseMarker);
    }
    //console.log(houseMarkers)
    // Call the updateLegend function, which will... update the legend!
    updateLegend(houseCount);
    // Create a layer group made from the bike markers array, pass it into the createMap function
    //createMap(L.layerGroup(houseMarkers));

    
    // Update the legend's innerHTML with the last updated time and station count
    function updateLegend(houseCount) {
    document.querySelector(".legend").innerHTML = [
    "<p class='low'>0 <= Walk Score < 25: " + houseCount.walkScore_less25 + "</p>",
    "<p class='medium'>25<= Walk Score <50: " + houseCount.walkScore_less_50 + "</p>",
    "<p class='average'>50 <= Walk Score < 75: " + houseCount.walkScore_less_75 + "</p>",
    "<p class='high'>75 <= Walk Score < 100: " + houseCount.walkScore_above_75 + "</p>"
    ].join("");
    }


}