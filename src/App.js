import { Route, Routes } from "react-router-dom";
import Map from "./Components/Map";
import Home from "./Components/Home";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { icon, Icon, Marker } from "leaflet";
import icon1x from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";

let DefaultIcon = icon({
  ...Icon.Default.prototype.options,
  iconUrl: icon1x,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
});
Marker.prototype.options.icon = DefaultIcon;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="map" element={<Map />} />
    </Routes>
  );
}

export default App;
