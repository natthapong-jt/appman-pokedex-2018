import React, { useState } from "react";

import "./App.css";
import cuteImg from "./cute.png";
import searchImg from "./search.png";

const Modal = ({ open, setOpen, data, onSelect, search }) => {
  const [searchText, setSearchText] = useState("");

  return open ? (
    <div className="modal">
      <div className="modal-bg" onClick={() => setOpen(false)}></div>
      <div className="modal-inner">
        <div className="search-section">
          <input
            placeholder="Find pokemon"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              search(e.target.value);
            }}
          />
          <img src={searchImg} alt="search" className="search-btn" />
        </div>

        <div className="container">
          {data.map((item) => (
            <div className="modal-list">
              <div className="poke-box">
                <div className="container">
                  <div className="col-img">
                    <img
                      src={item.imageUrl}
                      style={{ width: "100%" }}
                      alt="pokemon"
                    />
                  </div>
                  <div className="col-content">
                    <h1 className="poke-name">{item.name.toUpperCase()}</h1>
                    <div className="container">
                      <div className="col-label">HP</div>
                      <div className="col-progress">
                        <div className="progress">
                          <div
                            className="progress-bar"
                            style={{
                              width: `${item.calculate.hp}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-label">STR</div>
                      <div className="col-progress">
                        <div className="progress">
                          <div
                            className="progress-bar"
                            style={{
                              width: `${item.calculate.strength}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-label">WEAK</div>
                      <div className="col-progress">
                        <div className="progress">
                          <div
                            className="progress-bar"
                            style={{
                              width: `${item.calculate.weaknesses}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="container" style={{ marginTop: 20 }}>
                      {Array(item.calculate.happiness)
                        .fill("")
                        .map((_, i) => (
                          <img
                            src={cuteImg}
                            style={{ width: 48, marginRight: 4 }}
                            alt={`cute-${i + 1}`}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="box-btn"
                onClick={() => {
                  if (onSelect) {
                    onSelect(item);
                  }
                }}
              >
                Add
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
