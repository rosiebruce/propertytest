
    		
function doMyLocationSearch(e) {
	//TODO
	$("#userMessage").html(this.element.prop("id") + " was clicked!");
}
    		
function doFavourites(e) {
	//TODO
	$("#userMessage").html(this.element.prop("id") + " was clicked!");
}

    		
function parseResponse(results) {
    		    
var properties = [],
   	locations = [],
   	responseCode = results.response.application_response_code,
   	property, location, response;

	if (responseCode === "100" || /* one unambiguous location */
			responseCode === "101" || /* best guess location */
    		responseCode === "110" /* large location, 1000 matches max */) {

		results.response.listings.forEach(function (value) {
			property = {
					guid:value.guid,
    		        title:value.title,
    		        price:value.price_formatted.substr(0, value.price_formatted.lastIndexOf(" ")),
    		        bedrooms:value.bedroom_number,
    		        bathrooms:value.bathroom_number,
    		        propertyType:value.property_type,
    		        thumbnailUrl:value.thumb_url,
    		        imageUrl:value.img_url,
    		        summary:value.summary
			};
    		properties.push(property);
		});

		response = {
				responseCode:1,
				data:properties//,
				//totalResults:results.response.total_results,
				//pageNumber:results.response.page
		};

    } else if (responseCode === "200" || /* ambiguous location */
    		responseCode === "202"/* mis-spelled location */) {

    	results.response.locations.forEach(function (value) {
    		location = {
    				longTitle:value.long_title,
    		        placeName:value.place_name,
    		        title:value.title
    		};
    		locations.push(location);
    	});

    	response = {
    			responseCode:2,
    			data:locations
    	};
    }  else {
    	/*
   		201 - unknown location
		210 - coordinate error
		500 - internal error - still can return locations
    	 */
    		    	  
    	results.response.locations.forEach(function (value) {
    		location = {
    				longTitle:value.long_title,
        		    placeName:value.place_name,
        		    title:value.title
    		};
    		locations.push(location);
    	});

    	if(locations.length > 0){
    		response = {
    				responseCode:2,
    				data:locations
    		};
    	} else {
    		response = {
    				responseCode:3,
    				data: null
    		};
    	}
    }

    return response;
}
    		
    		
    	    