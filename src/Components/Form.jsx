import { format } from "date-fns";
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

async function handle_submit(e, addCheckPoint, lat, lng) {
  e.preventDefault();

  // take input log 1
  addCheckPoint({
    tag: "Client",
    title: "Input",
    log: "Input location",
    time: format(new Date(), "PPPp"),
  });

  const { publicKey, privateKey } = await generateRandomKeys(keyLength);

  // convert to integers and then cipher
  const ilat = Math.ceil(lat * latMultiplier);
  const ilng = Math.ceil(lng * latMultiplier);

  const clat = publicKey.encrypt(ilat);
  const clng = publicKey.encrypt(ilng);

  // encryption log 2
  addCheckPoint({
    tag: "Client",
    title: "Encryption",
    log: "Data encrypted",
    time: format(new Date(), "PPPp"),
  });

  let reqdata = JSONbig.stringify({
    lat: clat,
    lng: clng,
    n: publicKey.n,
    g: publicKey.g,
  });

  // server log 3

  let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/locate`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ payload: reqdata }),
  });
  let data = await res.json();
  // console.log(data);
  // console.log(JSONbig.parse(data.offsetStr));
  let offsets = JSONbig.parse(data.offsetStr);
  // log 4
  addCheckPoint({
    tag: "Server",
    title: "Calculation",
    log: "Server calculation completed",
    time: format(new Date(), "PPPp"),
  });

  let plainOffsets = offsets.map(({ name, lat1, lat2, lng1, lng2 }) => ({
    name,
    lat1: privateKey.decrypt(lat1),
    lat2: privateKey.decrypt(lat2),
    lng1: privateKey.decrypt(lng1),
    lng2: privateKey.decrypt(lng2),
  }));

  plainOffsets.forEach(({ name, lat1, lat2, lng1, lng2 }) => {
    console.log(lat1, lat2, lng1, lng2);
    if (
      bigintSign(lat1) != bigintSign(lat2) &&
      bigintSign(lng1) != bigintSign(lng2)
    ) {
      alert(`You are in proximity of ${name}.`);
      console.log(name);
      return { name };
    }
  });
  console.log("none found");
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

function Form({ addCheckPoint, startTimeline }) {
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
      <div>
        <button
          type="submit"
          onClick={(e) => {
            startTimeline();
            handle_submit(e, addCheckPoint, position.lat, position.lng);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Form;
