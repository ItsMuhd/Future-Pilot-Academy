/* =========================================================
   FUTURE PILOT ACADEMY
   Interactive Aviation Map
   Creator: It's Muh'd 👑🖥️
   Future Pilot: ZILHEART ✈️
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initAviationMap();
});


/* =========================================================
   01. AVIATION LOCATIONS
   ========================================================= */

const aviationLocations = [
    {
        name: "Lagos",
        code: "LOS",
        airport: "Murtala Muhammed International Airport",
        lat: 6.5774,
        lng: 3.3212,
        description:
            "One of Nigeria's major international aviation gateways."
    },

    {
        name: "Abuja",
        code: "ABV",
        airport: "Nnamdi Azikiwe International Airport",
        lat: 9.0068,
        lng: 7.2632,
        description:
            "Nigeria's Federal Capital Territory aviation gateway."
    },

    {
        name: "Port Harcourt",
        code: "PHC",
        airport: "Port Harcourt International Airport",
        lat: 5.0155,
        lng: 6.9496,
        description:
            "A major airport serving Rivers State and the surrounding region."
    },

    {
        name: "Kano",
        code: "KAN",
        airport: "Mallam Aminu Kano International Airport",
        lat: 12.0476,
        lng: 8.5247,
        description:
            "An important aviation gateway in northern Nigeria."
    },

    {
        name: "Enugu",
        code: "ENU",
        airport: "Akanu Ibiam International Airport",
        lat: 6.4743,
        lng: 7.5619,
        description:
            "An important airport serving southeastern Nigeria."
    },

    {
        name: "Calabar",
        code: "CBQ",
        airport: "Margaret Ekpo International Airport",
        lat: 4.9760,
        lng: 8.3472,
        description:
            "An airport serving Calabar and Cross River State."
    },

    {
        name: "Owerri",
        code: "QOW",
        airport: "Sam Mbakwe International Cargo Airport",
        lat: 5.4271,
        lng: 7.2060,
        description:
            "An airport serving Owerri and parts of southeastern Nigeria."
    },

    {
        name: "Kaduna",
        code: "KAD",
        airport: "Kaduna International Airport",
        lat: 10.6960,
        lng: 7.3201,
        description:
            "An important airport serving Kaduna and nearby areas."
    }
];


/* =========================================================
   02. INITIALIZE MAP
   ========================================================= */

function initAviationMap() {

    const mapElement =
        document.getElementById("aviationMap") ||
        document.querySelector(".map-container");

    if (!mapElement) {
        return;
    }


    /* Prevent duplicate initialization */

    if (mapElement.dataset.mapInitialized === "true") {
        return;
    }

    mapElement.dataset.mapInitialized = "true";


    /* Check that Leaflet is available */

    if (typeof L === "undefined") {

        console.warn(
            "Leaflet was not loaded. The aviation map cannot start."
        );

        mapElement.innerHTML = `
            <div style="
                min-height:300px;
                display:grid;
                place-items:center;
                padding:30px;
                text-align:center;
                background:#eaf8ff;
                color:#172b4d;
                font-family:Arial,sans-serif;
            ">
                <div>
                    <div style="font-size:45px;">🗺️</div>
                    <h3>Map unavailable</h3>
                    <p>Please check your internet connection and reload the page.</p>
                </div>
            </div>
        `;

        return;
    }


    /* Create map */

    const map = L.map(
        mapElement,
        {
            zoomControl: true,
            scrollWheelZoom: true
        }
    );


    /* Center approximately on Nigeria */

    map.setView(
        [9.0820, 8.6753],
        6
    );


    /* OpenStreetMap tiles */

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 18,
            attribution:
                '&copy; OpenStreetMap contributors'
        }
    ).addTo(map);


    /* Add aviation locations */

    aviationLocations.forEach(location => {

        createAirportMarker(
            map,
            location
        );

    });


    /* Save map globally */

    window.FuturePilotMap = map;


    /* Fix map sizing after rendering */

    setTimeout(() => {

        map.invalidateSize();

    }, 300);

}


/* =========================================================
   03. CREATE AIRPORT MARKER
   ========================================================= */

function createAirportMarker(
    map,
    location
) {

    const marker =
        L.marker([
            location.lat,
            location.lng
        ]).addTo(map);


    const popupHTML = `
        <div style="
            min-width:210px;
            font-family:Arial,sans-serif;
        ">

            <div style="
                display:inline-block;
                padding:5px 9px;
                margin-bottom:7px;
                border-radius:999px;
                background:#d9f2ff;
                color:#07549a;
                font-size:11px;
                font-weight:800;
            ">
                ${location.code}
            </div>

            <h3 style="
                margin:0 0 5px;
                color:#062b55;
                font-size:18px;
            ">
                ${location.name}
            </h3>

            <p style="
                margin:0 0 7px;
                color:#52677f;
                font-size:13px;
                line-height:1.5;
            ">
                ${location.airport}
            </p>

            <p style="
                margin:0;
                color:#71839a;
                font-size:12px;
                line-height:1.5;
            ">
                ${location.description}
            </p>

        </div>
    `;


    marker.bindPopup(
        popupHTML
    );


    /* Store location information */

    marker.aviationData =
        location;

}


/* =========================================================
   04. FLY TO LOCATION
   ========================================================= */

function flyToAviationLocation(
    name
) {

    if (!window.FuturePilotMap) {
        return;
    }


    const location =
        aviationLocations.find(
            item =>
                item.name.toLowerCase() ===
                String(name).toLowerCase()
        );


    if (!location) {
        return;
    }


    window.FuturePilotMap.flyTo(
        [
            location.lat,
            location.lng
        ],
        10,
        {
            duration: 1.2
        }
    );


    /* Find matching marker and open popup */

    window.FuturePilotMap.eachLayer(
        layer => {

            if (
                layer.aviationData &&
                layer.aviationData.code ===
                location.code
            ) {

                setTimeout(() => {

                    layer.openPopup();

                }, 800);

            }

        }
    );

}


/* =========================================================
   05. GLOBAL MAP CONTROLS
   ========================================================= */

window.flyToAviationLocation =
    flyToAviationLocation;


/* =========================================================
   06. SHOW ALL NIGERIA
   ========================================================= */

function showNigeria() {

    if (!window.FuturePilotMap) {
        return;
    }


    window.FuturePilotMap.flyTo(
        [9.0820, 8.6753],
        6,
        {
            duration: 1
        }
    );

}


window.showNigeria =
    showNigeria;


/* =========================================================
   07. MAP SEARCH
   ========================================================= */

function searchAviationLocation(
    query
) {

    const search =
        String(query || "")
            .trim()
            .toLowerCase();


    if (!search) {
        return null;
    }


    const result =
        aviationLocations.find(
            location => {

                return (
                    location.name
                        .toLowerCase()
                        .includes(search) ||

                    location.code
                        .toLowerCase()
                        .includes(search) ||

                    location.airport
                        .toLowerCase()
                        .includes(search)
                );

            }
        );


    if (result) {

        flyToAviationLocation(
            result.name
        );

    }


    return result || null;

}


window.searchAviationLocation =
    searchAviationLocation;


/* =========================================================
   08. OPTIONAL MAP BUTTONS
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-map-location]"
            );

        if (!button) {
            return;
        }


        const location =
            button.dataset.mapLocation;


        if (
            location.toLowerCase() ===
            "nigeria"
        ) {

            showNigeria();

        } else {

            flyToAviationLocation(
                location
            );

        }

    }
);


/* =========================================================
   09. MAP SEARCH FORM
   ========================================================= */

document.addEventListener(
    "submit",
    event => {

        const form =
            event.target.closest(
                "[data-map-search]"
            );

        if (!form) {
            return;
        }


        event.preventDefault();


        const input =
            form.querySelector(
                "input"
            );

        if (!input) {
            return;
        }


        const result =
            searchAviationLocation(
                input.value
            );


        if (!result) {

            if (window.AcademyToast) {

                AcademyToast.info(
                    "Location not found. Try Lagos, Abuja, Kano or Port Harcourt."
                );

            } else {

                alert(
                    "Location not found."
                );

            }

        }

    }
);


/* =========================================================
   10. MAP READY EVENT
   ========================================================= */

window.addEventListener(
    "load",
    () => {

        if (window.FuturePilotMap) {

            setTimeout(() => {

                window.FuturePilotMap.invalidateSize();

            }, 500);

        }

    }
);


/* =========================================================
   END OF MAP.JS
   Future Pilot Academy ✈️
   ========================================================= */