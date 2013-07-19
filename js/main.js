(function() {

// default settings for form controls at top of page
var product = 'abrasives';
var level = 'nation';
var myLayer = {}; // active layer either, nation, state, or county our boundaries will go here


// map and background layer for map with roads. We can change the color of this
var map = L.map('map').setView([37.8, -96], 4);
L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
    key: '3bd9866164b34cfbaa1ce96cf799d7c6',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    styleId: 22677
}).addTo(map);

// Load geographic boundaries and convert to geojson - topojson_nation,topojson_province and county are loaded from index.html <head> we can find a better way to do this, but this works for the demo
var geojson_nation = topojson.feature( topojson_nation, topojson_nation.objects.countries );
var geojson_state = topojson.feature( topojson_state, topojson_state.objects.provinces );
var geojson_county = topojson.feature( topojson_county, topojson_county.objects.counties );


function updateMap(){

	var url = 'js/demand-' + level + "-" + product + ".json";
	$.getJSON(url,function(data){

	    // helper function from D3 maps the data set to html colors
	    var domain = $.map( data, function( value, index ) {
				return value;
		}); 
		var quantile = d3.scale.quantile()
		  .domain(domain)
		  .range( ['#FFEDA0','#FED976','#FEB24C','#FD8D3C','#FC4E2A','#E31A1C','#BD0026','#800026'] );

		//dynamic style - depending on the demand amount... style the geographic area with an html color
		var newStyle = function (feature) {
		    return {
		        fillColor: quantile(feature.properties.demand),
		        weight: 0.5,
		        opacity: 1,
		        color: 'white',
		        fillOpacity: 0.5
		    };
		};

		// remove the previous layer
		map.removeLayer(myLayer);

		// depending on what the user has selected add the new layer
		var l = geojson_nation;
		if( level == 'state' )
			l = geojson_state;
		if( level == 'county' )
			l = geojson_county;
		
		// add the layer to the map - 
		myLayer = L.geoJson(l, {
		    onEachFeature: function(feature, layer){
		    	//data comes from the json request... this is the demand data from the server. for each Feature (geographic area on the map) set the demand value so the dynamic style can color the area based on the value of demand
		    	feature.properties.demand = data[feature.id];
		    }
		}).addTo(map);	
		myLayer.setStyle(newStyle);

	});
}


/**
 * User interaction choosing settings at the top of the page above the map
 */
$('#refresh').click(function(e){
	updateMap();
});

$("#filters :radio").click(function(e){
	if(e.target.value != product ){
		product = e.target.value;
	}
});

$("#geoLevel").change(function(e){
	if(e.target.value != level ){
		level = e.target.value;
	}
});


updateMap();


/*var county_layer = L.geoJson(null, {
        style: {
            color: '#666',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.3
        }
    }),
    state_layer = L.geoJson(null, {
        style: {
            color: '#333',
            weight: 3,
            opacity: 1,
            fillOpacity: 0
        }
    }),
    map = L.map('map');*/

}());
