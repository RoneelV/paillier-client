import { generateRandomKeys } from "paillier-bigint";
import JSONbigint from "json-bigint";
import { useState, useRef, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Rectangle,
} from "react-leaflet";
import toast, { Toaster } from "react-hot-toast";

let JSONbig = JSONbigint({
  alwaysParseAsBig: true,
  useNativeBigInt: true,
});

const keyLength = 512;
const latMultiplier = 1e15;
const randMultiplier = 1e9; // used in only the server
const maxLength = Math.log10(latMultiplier) + Math.log10(randMultiplier);

/** utility function for paillier decrypted bigints
 * modulo arithmetic results in negative numbers being decrypted as large bigints
 * 25/maxLength is the maximum length an actually positive decrypted bigint can have
 * which depends on the implementation details
 * @param {bigint} x
 * @returns number
 */
const bigintSign = (x) => {
  return Math.sign(x.toString().length - maxLength);
};

/**
 * @param {object} e
 * @param {number} lat
 * @param {number} lng
 */
async function handle_submit(e, lat, lng) {
  e.preventDefault();
  toast.custom(
    <div
      className="
      block
      text-center
      text-white
      p-3
      text-base
      font-medium
      rounded-lg
      bg-blue-600
      border-black
      border border-primary
      hover:bg-blue-600
      hover:text-white
      hover:border-blue-600"
    >
      <a
        target="_blank"
        rel="noopener"
        href="https://geojson.io/#data=data:application/json,%7B%22type%22%3A%22FeatureCollection%22%2C%22features%22%3A%5B%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22name%22%3A%22Outer%20Bound%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B30.222015380859375%2C59.88032391089786%5D%2C%5B30.489807128906254%2C59.88032391089786%5D%2C%5B30.489807128906254%2C60.01237340874596%5D%2C%5B30.222015380859375%2C60.01237340874596%5D%2C%5B30.222015380859375%2C59.88032391089786%5D%5D%5D%7D%7D%2C%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22name%22%3A%22Secret%20Base%20A%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B30.436935424804688%2C59.94400716933027%5D%2C%5B30.455474853515625%2C59.94400716933027%5D%2C%5B30.455474853515625%2C59.953119365426296%5D%2C%5B30.436935424804688%2C59.953119365426296%5D%2C%5B30.436935424804688%2C59.94400716933027%5D%5D%5D%7D%7D%2C%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22name%22%3A%22Secret%20Base%20B%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B30.278663635253903%2C59.9912602198758%5D%2C%5B30.298576354980465%2C59.9912602198758%5D%2C%5B30.298576354980465%2C60.00018776524735%5D%2C%5B30.278663635253903%2C60.00018776524735%5D%2C%5B30.278663635253903%2C59.9912602198758%5D%5D%5D%7D%7D%2C%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22name%22%3A%22Secret%20Base%20C%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B30.29823303222656%2C59.90891042881661%5D%2C%5B30.31745910644531%2C59.90891042881661%5D%2C%5B30.31745910644531%2C59.91717182572497%5D%2C%5B30.29823303222656%2C59.91717182572497%5D%2C%5B30.29823303222656%2C59.90891042881661%5D%5D%5D%7D%7D%2C%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22name%22%3A%22Secret%20Base%20D%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B30.462341308593746%2C59.97923856584643%5D%2C%5B30.48122406005859%2C59.97923856584643%5D%2C%5B30.48122406005859%2C59.988169354424066%5D%2C%5B30.462341308593746%2C59.988169354424066%5D%2C%5B30.462341308593746%2C59.97923856584643%5D%5D%5D%7D%7D%2C%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22name%22%3A%22Emergency%20Base%20E%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B30.368270874023434%2C59.944523020896355%5D%2C%5B30.378570556640625%2C59.944523020896355%5D%2C%5B30.378570556640625%2C59.949681095129826%5D%2C%5B30.368270874023434%2C59.949681095129826%5D%2C%5B30.368270874023434%2C59.944523020896355%5D%5D%5D%7D%7D%2C%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22name%22%3A%22Emergency%20Base%20F%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B30.23506164550781%2C59.93300042374631%5D%2C%5B30.245018005371094%2C59.93300042374631%5D%2C%5B30.245018005371094%2C59.93798830798394%5D%2C%5B30.23506164550781%2C59.93798830798394%5D%2C%5B30.23506164550781%2C59.93300042374631%5D%5D%5D%7D%7D%5D%7D"
      >
        Click here to check the actual location of the bases
      </a>
    </div>,
    { duration: 15000 }
  );
  toast.success("Location input successful", { duration: 4000 });

  const { publicKey, privateKey } = await generateRandomKeys(keyLength);

  // convert to integers and then cipher
  const ilat = Math.ceil(lat * latMultiplier);
  const ilng = Math.ceil(lng * latMultiplier);

  const clat = publicKey.encrypt(ilat);
  const clng = publicKey.encrypt(ilng);

  toast("Location data encrypted", { duration: 4000 });

  let reqdata = JSONbig.stringify({
    lat: clat,
    lng: clng,
    n: publicKey.n,
    g: publicKey.g,
  });

  let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/locate`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ payload: reqdata }),
  });

  let data = await res.json();

  let offsets = JSONbig.parse(data.offsetStr);

  toast.success("Data sent and server response received", { duration: 4000 });

  let plainOffsets = offsets.map(({ name, lat1, lat2, lng1, lng2 }) => ({
    name,
    lat1: privateKey.decrypt(lat1),
    lat2: privateKey.decrypt(lat2),
    lng1: privateKey.decrypt(lng1),
    lng2: privateKey.decrypt(lng2),
  }));

  let isFound = false;
  plainOffsets.forEach(({ name, lat1, lat2, lng1, lng2 }) => {
    if (
      bigintSign(lat1) != bigintSign(lat2) &&
      bigintSign(lng1) != bigintSign(lng2)
    ) {
      isFound = true;
      toast.success(`You are in proximity of ${name}.`, {
        duration: 10000,
        style: { background: "rgb(163 230 53)" },
      });
      console.log(name);
      return { name };
    }
  });
  if (!isFound)
    toast("You are not in proximity of any bases", {
      duration: 10000,
      style: {
        background: "rgb(250, 204, 21)",
      },
    });
}

// Saint Petersburg
let center = {
  lng: 30.355911254882814,
  lat: 59.94634865982191,
};

let outerBounds = [
  { lat: 59.88032391089786, lng: 30.222015380859375 },
  { lat: 60.01237340874596, lng: 30.489807128906254 },
];

/**
 * @param {{lat: number, lng:number}} pos
 * @param {[{lat: number, lng:number}]} bounds
 * @returns boolean
 */
const isPosInBounds = (pos, bounds) => {
  if (
    Math.sign(pos.lat - bounds[0].lat) == Math.sign(pos.lat - bounds[1].lat) ||
    Math.sign(pos.lng - bounds[0].lng) == Math.sign(pos.lng - bounds[1].lng)
  )
    return false;
  return true;
};

function Map() {
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          let pos = marker.getLatLng();
          if (isPosInBounds(pos, outerBounds)) {
            setPosition(marker.getLatLng());
          } else {
            marker.position = center;
            setPosition(center);
            alert("set marker inside the bound rectangle");
          }
        }
      },
    }),
    []
  );
  return (
    <div>
      <Toaster position="top-right" />

      <div id="map">
        <MapContainer bounds={outerBounds} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; Mapbox | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXl0ZW1wdXNlciIsImEiOiJjbDJ2ajFkdnUwNHhpM2Rub3EyMmZnd3ZxIn0.8DPFWlLRBMbBx008IOeQwQ"
            id="mapbox/streets-v11"
          />
          <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
          >
            <Popup>Drag the marker to your position and submit.</Popup>
          </Marker>
          <Rectangle bounds={outerBounds} pathOptions={{ color: "#cccccc" }} />
        </MapContainer>
      </div>
      <div className="w-1/4 px-3 mx-auto">
        <button
          className="
        block
        text-center
        w-full
        p-3
        text-base
        font-medium
        rounded-lg
        bg-primary
        border-black
        border border-primary
        hover:bg-blue-600 hover:text-white hover:border-blue-600
        transition
        "
          type="submit"
          onClick={(e) => {
            handle_submit(e, position.lat, position.lng);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Map;
