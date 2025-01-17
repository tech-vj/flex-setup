interface Cards2Props {
    cards: string[];
  }
  
  const Cards2: React.FC<Cards2Props> = ({ cards }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <div key={index} className="bg-white p-4 shadow-md rounded-lg border">
          <h3 className="text-lg font-bold mb-2">Card {index + 1}</h3>
          <p>{card}</p>
        </div>
      ))}
    </div>
  );
  
  export default Cards2;
  