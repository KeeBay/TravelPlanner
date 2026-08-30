const prisma = require('../config/db');
const Schemas = require('../validators/placeSchema');

async function placesPOSTController(req, res) {
   try{
        const value = req.body;

        const existingInCache = await prisma.places.findUnique({
            where: {ExternalID : value.externalID}
        });

        if(existingInCache){
            return res.status(200).json({
                success: true,
                status: 200,
                place: existingInCache
            });
        }

        else{

            const mapboxUrl =`https://api.mapbox.com/search/searchbox/v1/retrieve/${value.externalID}?session_token=${value.session_token}&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;

            const response = await fetch(mapboxUrl);
            const data = await response.json();

            if (!response.ok) {
            console.error("Mapbox API Error:", data);
            return res.status(response.status).json({ message: "An error occured while reaching for the map service" });
        }

        if (!data.features || data.features.length === 0) {
            return res.status(404).json({
                error: true,
                message: "Place not found in Mapbox database."
            });
        }

        const feature = data.features[0];
        const props = feature.properties;
        const coords = feature.geometry.coordinates;

        const place = {
            ExternalID: props.mapbox_id,
            Name: props.name,
            Category: props.poi_category ? props.poi_category[0] : "unknown",
            Lng: coords[0],
            Lat : coords[1],
            CachedData: data
        };

        const searchedPlace = await prisma.places.create({
                data: place
                });
                return res.status(200).json({
                    success: true,
                    status: 200,
                    place: searchedPlace
                });
        }
    }
        
    catch(error){
        return res.status(500).json({
            error: true,
            status: 500,
            message: "Server error during saving the place."
        })
    }
}

async function placesGETController(req, res) {

    try{
        const searchQuery = req.query.q;
        const sessionToken = req.query.session_token;
        

        const mapboxUrl = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${encodeURIComponent(searchQuery)}&access_token=${process.env.MAPBOX_ACCESS_TOKEN}&session_token=${sessionToken}`


        const response = await fetch(mapboxUrl);
        const data = await response.json();

        if (!response.ok) {
            console.error("Mapbox API Error:", data);
            return res.status(response.status).json({ message: "An error occured while reaching for the map service" });
        }

        const suggestions = data.suggestions.map(item => ({
            mapboxId: item.mapbox_id,
            name: item.name,
            address: item.place_formatted || item.full_address || "",
            category: item.poi_category ? item.poi_category[0] : "unknown"
        }));

        return res.status(200).json({
            success: true,
            results: suggestions
        });
    }
    
    catch(error){
console.error("Suggest API Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = {placesPOSTController, placesGETController}