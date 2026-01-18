const fetch = require('node-fetch');

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

