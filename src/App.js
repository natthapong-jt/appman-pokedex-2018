import React, { useEffect, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import axios from "axios";
import "./App.css";
import Modal from "./Modal";
import cuteImg from "./cute.png";

// const COLORS = {
//   Psychic: "#f8a5c2",
//   Fighting: "#f0932b",
//   Fairy: "#c44569",
//   Normal: "#f6e58d",
//   Grass: "#badc58",
//   Metal: "#95afc0",
//   Water: "#3dc1d3",
//   Lightning: "#f9ca24",
//   Darkness: "#574b90",
//   Colorless: "#FFF",
//   Fire: "#eb4d4b",
// };

const App = () => {
  const [data, setData] = useState([]);
  const [dataSelected, setDataSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const getData = async (name = "") => {
    await axios
      .get(`http://localhost:3030/api/cards?limit=30&name=${name}`)
      .then(({ data }) => {
        let newData = data.cards.reduce((items, item) => {
          let hp = !isNaN(item.hp)
            ? Number(item.hp) > 100
              ? 100
              : Number(item.hp)
            : 0;

          let strength = item.attacks
            ? item.attacks?.length * 50 > 100
              ? 100
              : item.attacks?.length * 50
            : 0;

          let weaknesses = item.weaknesses
            ? item.weaknesses?.length * 100 > 100
              ? 100
              : item.weaknesses?.length * 100
            : 0;

          let damage = item.attacks
            ? item.attacks?.reduce((dm, x) => {
                dm += x.damage ? Number(x.damage.match(/\d+/g).join("")) : 0;
                return dm;
              }, 0)
            : 0;

          let happiness = Math.round(
            (hp / 10 + damage / 10 + 10 - weaknesses / 100) / 5
          );

          items.push({
            ...item,
            calculate: { hp, strength, weaknesses, damage, happiness },
          });
          return items;
        }, []);

        setData(newData);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (index) => {
    let tempDataSelect = [...dataSelected];
    tempDataSelect.splice(index, 1);
    setDataSelected(tempDataSelect);
  };

  let dataFilter = data.filter(
    (item) => !dataSelected.map((x) => x.id).includes(item.id)
  );

  return (
    <div className="app">
      <div className="header">
        <h1>My Pokedex</h1>
      </div>

      <Modal
        open={openModal}
        setOpen={setOpenModal}
        data={dataFilter}
        onSelect={(value) => setDataSelected([...dataSelected, value])}
        search={getData}
      />

      <div className="container">
        {dataSelected.map((item, index) => (
          <div className="col">
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
                      <div class="progress">
                        <div
                          class="progress-bar"
                          style={{
                            width: `${item.calculate.hp}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-label">STR</div>
                    <div className="col-progress">
                      <div class="progress">
                        <div
                          class="progress-bar"
                          style={{
                            width: `${item.calculate.strength}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-label">WEAK</div>
                    <div className="col-progress">
                      <div class="progress">
                        <div
                          class="progress-bar"
                          style={{
                            width: `${item.calculate.weaknesses}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="container">
                    {Array(item.calculate.happiness)
                      .fill("")
                      .map((_, i) => (
                        <img
                          src={cuteImg}
                          style={{ width: 32, margin: 4 }}
                          alt={`cute-${i + 1}`}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="box-btn" onClick={() => handleDelete(index)}>
              <FiX />
            </div>
          </div>
        ))}
      </div>

      <div className="bar">
        <div className="bar-btn" onClick={() => setOpenModal(true)}>
          <FiPlus size={48} color="#ffffff" />
        </div>
      </div>
    </div>
  );
};

export default App;
