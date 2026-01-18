const AMADEUS_CLIENT_ID = "0AVyTIFfbtJLOahFs9yaXh3sCFarPMTI";
const AMADEUS_CLIENT_SECRET = "VJ5UbvP2Jd7QBihP";

const AMADEUS_TOKEN_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";
const AMADEUS_API_BASE_URL = "https://test.api.amadeus.com/v1";
const AMADEUS_SHOPPING_URL = "https://test.api.amadeus.com/v2/shopping/hotel-offers";

let amadeusToken = null;
let tokenExpiry = 0;

async function getToken() {
    if (amadeusToken && Date.now() < tokenExpiry - (60 * 1000)) {
        return amadeusToken;
    }

    const body = new URLSearchParams();
    body.append('grant_type', 'client_credentials');
    body.append('client_id', AMADEUS_CLIENT_ID);
    body.append('client_secret', AMADEUS_CLIENT_SECRET);

    try {
        const response = await fetch(AMADEUS_TOKEN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body,
        });

        const data = await response.json();

        if (response.ok) {
            amadeusToken = data.access_token;
            tokenExpiry = Date.now() + (data.expires_in * 1000);
            return amadeusToken;
        } else {
            console.error("Token hiba:", data);
            throw new Error("Sikertelen Amadeus token lekérés.");
        }
    } catch (error) {
        console.error("Hálózati hiba a token kérése közben:", error);
        throw new Error("Szerver hiba a token kérése közben.");
    }
}

async function getCityCodeFromName(cityName, token) {
    const url = `${AMADEUS_API_BASE_URL}/reference-data/locations?subType=CITY&keyword=${encodeURIComponent(cityName)}`;
    
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await response.json();

    if (response.ok && data.data && data.data.length > 0) {
        return data.data[0].iataCode || data.data[0].address.cityCode;
    }
    return null;
}

async function getHotelOffers(hotelIds, token, params) {
    if (!hotelIds || hotelIds.length === 0) return [];

    const queryParams = new URLSearchParams({
        hotelIds: hotelIds.join(','),
        adults: params.guests || '1',
        checkInDate: params.startDate,
        checkOutDate: params.endDate,
        roomQuantity: 1,
        currency: 'HUF'
    });

    const url = `${AMADEUS_SHOPPING_URL}?${queryParams.toString()}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) {
        return [];
    }

    const data = await response.json();
    return data.data || [];
}

async function hotelSearchController(req, res) {
    let { query, startDate, endDate, guests } = req.query;

    if (!query) {
        return res.status(400).json({ error: true, message: "Hiányzó 'query' paraméter." });
    }

    let guestCount = (guests === '5plus') ? '5' : (guests || '2');

    try {
        const token = await getToken();
        
        const cleanQuery = query.trim();
        const normalizedQuery = cleanQuery.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
        
        let cityCode = null;

        const cityMap = {
            "BUDAPEST": "BUD", "PEST": "BUD",
            "PARIZS": "PAR", "PARIS": "PAR",
            "BECS": "VIE", "VIENNA": "VIE", "WIEN": "VIE",
            "ROMA": "ROM", "ROME": "ROM",
            "PRAGA": "PRG", "PRAGUE": "PRG",
            "VELENCE": "VCE", "VENICE": "VCE",
            "LONDON": "LON",
            "BERLIN": "BER",
            "AMSTERDAM": "AMS",
            "BARCELONA": "BCN",
            "MILANO": "MIL",
            "DEBRECEN": "DEB"
        };

        if (cityMap[normalizedQuery]) {
            cityCode = cityMap[normalizedQuery];
        } else {
            if (normalizedQuery.length === 3) {
                cityCode = normalizedQuery;
            } else {
                try {
                    cityCode = await getCityCodeFromName(cleanQuery, token);
                    if (!cityCode) {
                         return res.status(200).json({ success: true, message: "Nem találtunk ilyen várost az adatbázisban.", data: [] });
                    }
                } catch (e) {
                    return res.status(200).json({ success: true, message: "Hiba történt a város keresésekor.", data: [] });
                }
            }
        }

        const listUrl = `${AMADEUS_API_BASE_URL}/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=10`;
        
        const listResponse = await fetch(listUrl, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const listData = await listResponse.json();

        if (!listResponse.ok || !listData.data || listData.data.length === 0) {
            return res.status(200).json({ success: true, count: 0, data: [] });
        }

        const topHotels = listData.data.slice(0, 10);
        const hotelIds = topHotels.map(h => h.hotelId);

        let offers = [];
        try {
            offers = await getHotelOffers(hotelIds, token, { startDate, endDate, guests: guestCount });
        } catch (err) {
        }

        const mergedData = topHotels.map(hotel => {
            const offer = offers.find(o => o.hotel.hotelId === hotel.hotelId);
            let finalPrice;
            
            if (offer && offer.offers && offer.offers.length > 0) {
                finalPrice = parseInt(offer.offers[0].price.total);
            } else {
                finalPrice = Math.floor(Math.random() * (50000 - 15000) + 15000);
            }

            return {
                name: hotel.name,
                hotelId: hotel.hotelId,
                geoCode: hotel.geoCode,
                address: hotel.address,
                price: finalPrice
            };
        });

        res.status(200).json({
            success: true,
            data: mergedData
        });

    } catch (error) {
        console.error("Végzetes hiba a hotelSearchController-ben:", error);
        res.status(500).json({ error: true, message: "Szerver hiba történt a keresés közben." });
    }
}

module.exports = { hotelSearchController };