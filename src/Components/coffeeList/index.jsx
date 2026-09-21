import "./list.style.css";
import CoffeeCard from "../coffeeCard";

function CoffeeList({ coffees }) {
  return (
    <section className="coffee-list">
      {coffees.map((coffee) => (
        <CoffeeCard key={coffee.id} coffee={coffee} />
      ))}
    </section>
  );
}

export default CoffeeList;
