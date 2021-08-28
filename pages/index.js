import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [allCountry, setAllCountry] = useState([]);
  const [world, setWorld] = useState({});
  const [selected, setSelected] = useState("Thailand");
  const [data, setData] = useState({ country: "" });
  useEffect(() => {
    (async () => {
      const _allCountry = await (
        await fetch("https://disease.sh/v3/covid-19/countries/")
      ).json();
      const _world = await (
        await fetch("https://disease.sh/v3/covid-19/all/")
      ).json();
      setAllCountry(_allCountry);
      setWorld(_world);
      setData(_allCountry.find(({ country }) => country === "Thailand"));
    })();
  }, []);

  useEffect(() => {
    if (allCountry.map(({ country }) => country).includes(selected)) {
      setData(allCountry.find(({ country }) => country === selected));
    }
  }, [selected]);
  return (
    <div className="h-screen w-screen" style={{ backgroundColor: "#3D3D3D" }}>
      {data.country ? (
        <div className="text-white mx-auto max-w-lg w-fit pt-24">
          <div className="text-3xl text-center font-bold">
            THAILAND COVID-19 SITUATION
          </div>
          <div className="text-black rounded mt-3">
            <div className="mx-auto w-32">
              <select
                className="w-32 rounded"
                value={selected}
                onChange={({ target }) => setSelected(target.value)}
              >
                {allCountry.map(({ country }) => (
                  <option value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-5">
            <div className="bg-white col-span-2 rounded-xl p-3">
              <div className="text-gray-500 text-center text-sm font-thin">
                NEW CASES
              </div>
              <div className="text-yellow-500 text-center text-5xl mt-2 font-bold">
                +{data.todayCases.toLocaleString()}
              </div>
              <hr className="text-gray-400 my-3" />
              <div className="text-gray-500 text-center text-sm font-thin">
                TOTAL CASES
              </div>
              <div className="text-yellow-500 text-center text-5xl mt-2 font-bold">
                {data.cases.toLocaleString()}
              </div>
              <hr className="text-gray-400 my-3" />
              <div className="flex justify-center">
                <div className="w-full pt-4">
                  <div className="text-gray-500 text-center text-sm font-thin">
                    ACTIVE
                  </div>
                  <div className="text-blue-500 text-center text-3xl mt-2 font-bold">
                    {data.active.toLocaleString()}
                  </div>
                </div>
                <div className="w-0 h-24 border-l border-gray-200 mx-3"></div>
                <div className="w-full pt-4">
                  <div className="text-gray-500 text-center text-sm font-thin">
                    CRITICAL
                  </div>
                  <div className="text-red-500 text-center text-3xl mt-2 font-bold">
                    {data.critical.toLocaleString()}
                  </div>
                </div>
              </div>
              <hr className="text-gray-400 my-3" />
              <div className="flex justify-center">
                <div className="w-full pt-4">
                  <div className="text-gray-500 text-center text-sm font-thin">
                    WORLD INFECTED
                  </div>
                  <div className="text-blue-500 text-center text-3xl mt-2 font-bold">
                    {world.cases.toLocaleString()}
                  </div>
                </div>
                <div className="w-0 h-24 border-l border-gray-200 mx-3"></div>
                <div className="w-full pt-4">
                  <div className="text-gray-500 text-center text-sm font-thin">
                    WORLD DEATH
                  </div>
                  <div className="text-red-500 text-center text-3xl mt-2 font-bold">
                    {data.deaths.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-rows-2 gap-4">
              <div className="bg-white rounded-xl p-2 text-gray-500">
                <div className="text-center text-sm font-thin">NEW DEATHS</div>
                <div className="text-center text-2xl mt-2 font-bold">
                  +{data.todayDeaths.toLocaleString()}
                </div>
                <hr className="text-gray-500 my-2" />
                <div className="text-center text-sm font-thin">
                  TOTAL DEATHS
                </div>
                <div className="text-center text-2xl mt-2 font-bold">
                  +{data.deaths.toLocaleString()}
                </div>
              </div>
              <div className="bg-white rounded-xl p-2 text-gray-500">
                <div className="text-center text-sm font-thin">
                  NEW RECOVERED
                </div>
                <div className="text-green-400 text-center text-2xl mt-2 font-bold">
                  +{data.todayRecovered.toLocaleString()}
                </div>
                <hr className="text-gray-500 my-2" />
                <div className="text-center text-sm font-thin">
                  TOTAL RECOVERED
                </div>
                <div className="text-green-400 text-center text-2xl mt-2 font-bold">
                  +{data.recovered.toLocaleString()}
                </div>
              </div>
              <div className="bg-white rounded-xl p-2 text-gray-500">
                <div className="text-center text-sm font-thin">TEST</div>
                <div className="text-green-400 text-center text-2xl mt-2 font-bold">
                  {data.tests.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-3 font-bold">Data from disease.sh</div>
        </div>
      ) : (
        <div className="text-center pt-3 font-bold text-white">Loading...</div>
      )}
    </div>
  );
}
