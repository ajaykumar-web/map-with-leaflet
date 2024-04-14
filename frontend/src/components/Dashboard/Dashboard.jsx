import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import styles from "./Dashboard.module.css";

export default function Register() {
  const isLoggedIn = localStorage.getItem("token") ? true : false;
  const geo = useRef(null);
  const [iten, setIten] = useState(null);
  useEffect(() => {
    const load = async () => {
      fetch(
        "https://servicodados.ibge.gov.br/api/v2/malhas/35?view=browser&resolucao=5&formato=application/vnd.geo+json"
      )
        .then((r) => r.json())
        .then((r) => {
          setIten(r);
          console.log("ok");
        });
    };

    load();
  }, []);
  return (
    <section id="map" className={styles.gradient}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol md="12" xl="10">
            <MDBCard>
              {isLoggedIn && (
                <MDBBtn
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    zIndex: "999",
                  }}
                  color="danger"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                >
                  Logout
                </MDBBtn>
              )}
              <MDBCardBody className="p-4 text-black">
                {!isLoggedIn && (
                  <div>
                    <h2>Welcome</h2>
                    <div>
                      <a href="/login" className="btn btn-primary mx-2">
                        Login
                      </a>
                      <a href="/register" className="btn btn-secondary mx-2">
                        Sign Up
                      </a>
                    </div>
                  </div>
                )}

                {isLoggedIn && (
                  <div className="App">
                    <MapContainer zoom={0} center={[0, 0]}>
                      <TileLayer
                        attribution='Data by &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />

                      {iten && (
                        <GeoJSON
                          data={iten}
                          ref={geo}
                          pathOptions={{
                            color: "#9370DB",
                            fillColor: "lightblue",
                            fillOpacity: 0.7,
                            opacity: 1,
                            weight: 1,
                          }}
                          onEachFeature={(feature, layer) => {
                            layer.setPopupContent(<h1>teste</h1>);
                            layer.on({
                              mouseover: function (e) {
                                const auxLayer = e.target;
                                auxLayer.setStyle({
                                  weight: 4,
                                  color: "#800080",
                                });
                              },
                              mouseout: function (e) {
                                const auxLayer = e.target;
                                auxLayer.setStyle({
                                  weight: 1,
                                  color: "#9370DB",
                                  fillColor: "lightblue",
                                  dashArray: "",
                                  fillOpacity: 0.7,
                                  opacity: 1,
                                });
                              },
                            });
                          }}
                          attribution="&copy; credits due..."
                        ></GeoJSON>
                      )}
                    </MapContainer>
                  </div>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
