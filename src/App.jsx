import "./App.css";
import CoffeeList from "./Components/coffeeList";
import Filter from "./Components/filter";
import { useEffect, useState } from "react";
import bannerImage from "./assets/capa_banner.jpg";

const COFFEES_URL =
  "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/simple-coffee-listing-data.json";

function App() {
  const [coffees, setCoffees] = useState([]);
  const [filter, setFilter] = useState("all");
  const [requestKey, setRequestKey] = useState(0);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();

    async function loadCoffees() {
      try {
        const response = await fetch(COFFEES_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Não foi possível carregar os cafés.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Os dados recebidos são inválidos.");
        }

        setCoffees(data);
        setStatus("success");
      } catch (error) {
        if (error.name !== "AbortError") {
          setStatus("error");
        }
      }
    }

    loadCoffees();

    return () => controller.abort();
  }, [requestKey]);

  function handleRetry() {
    setStatus("loading");
    setRequestKey((currentKey) => currentKey + 1);
  }

  const coffeesFiltrados = coffees.filter((coffee) => {
    if (filter === "available") {
      return coffee.available === true;
    }
    return true;
  });

  return (
    <main className="container">
      <div className="container_background-img">
        <img className="background-img" src={bannerImage} alt="" />
      </div>
      <div className="container_conteudo">
        <div className="apresentacao">
          <h1>Nossa Coleção</h1>
          <p>
            Apresentamos nossa Coleção de Cafés, uma seleção de cafés exclusivos
            de diferentes tipos de torra e origens, torrados habilmente em
            pequenos lotes e enviados frescos semanalmente.
          </p>
        </div>
        <div className="filtro">
          <Filter filter={filter} setFilter={setFilter} />
        </div>
        <div className="container_coffees">
          {status === "loading" && (
            <p className="status-message" role="status">
              Carregando cafés...
            </p>
          )}
          {status === "error" && (
            <div className="status-message" role="alert">
              <p>Não foi possível carregar os cafés.</p>
              <button type="button" onClick={handleRetry}>
                Tentar novamente
              </button>
            </div>
          )}
          {status === "success" && <CoffeeList coffees={coffeesFiltrados} />}
        </div>
      </div>
    </main>
  );
}

export default App;
