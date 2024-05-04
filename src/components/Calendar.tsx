import { useEffect, useState } from "react";
import { FavoriteFacts } from "./FavoriteFacts";
import "./Calendar.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
const BASE_URL = "http://numbersapi.com";

export const Calendar = () => {
  const [data, setData] = useState<string | null>(null);

  //a function to fetch the fact from the API
  const fetchFact = async (date: Date) => {
    const response = await fetch(
      `${BASE_URL}/${date.getMonth() + 1}/${date.getDate()}`
    );
    const text = (await response.text()) as string;
    setData(text);
  };

  //run the fetchFact function after the component is rendered
  useEffect(() => {
    fetchFact(new Date());
  }, []);

  //get the fact from local storage
  const [favoriteFacts, setFavoriteFacts] = useState(() => {
    // Check if there are favorite facts stored in localStorage
    const storedFacts = localStorage.getItem("favoriteFacts");
    return storedFacts ? JSON.parse(storedFacts) : [];
  });
  //save the fact to local storage
  const handleSaveFact = (fact: string) => {
    // Add the new fact to the list of favorite facts
    const updatedFacts = [...favoriteFacts, fact];
    setFavoriteFacts(updatedFacts);

    // Save the updated list of favorite facts to localStorage
    localStorage.setItem("favoriteFacts", JSON.stringify(updatedFacts));
  };
  //delete the fact from local storage
  const handleDeleteFact = (index: number) => {
    // Create a copy of the favorite facts array without the fact at the specified index
    const updatedFacts = [
      ...favoriteFacts.slice(0, index),
      ...favoriteFacts.slice(index + 1),
    ];
    setFavoriteFacts(updatedFacts);

    // Save the updated list of favorite facts to localStorage
    localStorage.setItem("favoriteFacts", JSON.stringify(updatedFacts));
  };

  return (
    <section>
      <h1 className="title">Facts Calendar</h1>
      <div className="container">
        <div className="calendar-container">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar onChange={(val) => fetchFact(new Date(val))} />
          </LocalizationProvider>
          <div className="fact-container">
            <div className="fact">{data}</div>
            <button
              className="save-button"
              onClick={() => {
                if (data) {
                  handleSaveFact(data);
                }
              }}
            >
              save it
            </button>
          </div>
        </div>
        <div className="favoriteFacts-container">
          <FavoriteFacts
            favoriteFacts={favoriteFacts}
            onDeleteFact={handleDeleteFact}
          />
        </div>
      </div>
    </section>
  );
};
