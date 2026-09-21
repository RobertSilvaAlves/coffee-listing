import "./coffeCard.style.css";

function CoffeeCard({ coffee }) {
  const hasRating = coffee.rating !== null && coffee.rating !== undefined;

  return (
    <article className="coffee-card">
      <img src={coffee.image} alt={coffee.name} />

      <div className="coffee-card_name_price">
        <h2>{coffee.name}</h2>
        <p>{coffee.price}</p>
      </div>

      <span>
        {hasRating ? `⭐ ${coffee.rating} (${coffee.votes})` : "Sem avaliações"}
      </span>
    </article>
  );
}

export default CoffeeCard;
