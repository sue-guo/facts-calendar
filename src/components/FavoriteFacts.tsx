import "./Favorite.css";
export const FavoriteFacts = ({
  favoriteFacts,
  onDeleteFact,
}: {
  favoriteFacts: string[];
  onDeleteFact: (index: number) => void;
}) => {
  return (
    <div className="facts">
      <h2>My Favorite Facts ({favoriteFacts.length})</h2>
      <ul className="factList">
        {favoriteFacts.map((fact, index) => {
          return (
            <li
              key={index}
              className="fact"
            >
              {index + 1}. {fact}
              <button
                onClick={() => onDeleteFact(index)}
                className="delBtn"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
