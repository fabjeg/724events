import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc =
    data?.focus.sort((evtA, evtB) =>
      new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
    ) || [];
  // Ajout d'un tableau vide pour éviter les
  // erreurs qui pourraient se produire si byDateDesc est undefined ou null
  // const nextCard = () => {
  //   setTimeout(
  //     () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
  //     5000
  //   );
  // };
  // useEffect(() => {
  //   nextCard();
  // });
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000); // Changer d'image toutes les 5 secondes

    return () => clearInterval(interval); // Nettoyage de l'intervalle lors de la démonstration du composant
  }, [byDateDesc.length]); // Dépendance à la longueur du tableau des événements

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.id}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img
            src={event.cover}
            alt="forum"
          />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((Data, radioIdx) => (
            <input
              key={Data.id} // key modifier (éviter répétition)
              type="radio"
              checked={index === radioIdx} // Synchronisation du point avec l'index actuel (remplacé idx par index)
              name="radio-button"
              onChange={() => setIndex(radioIdx)} // Gestionnaire d'événements ajouté
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
