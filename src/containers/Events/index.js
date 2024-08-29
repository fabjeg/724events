import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  //  Le code vérifiait simplement l'index pour la pagination mais ne filtrait pas par type.

  // Filtrer les événements par type sélectionné
  const filteredByType =
    data?.events.filter((event) => !type || event.type === type) || [];

  // Pagination des événements filtrés
  const filteredEvents = filteredByType.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  // const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  // Le nombre de pages était mal calculé, ce qui  donne un résultat incorrect.

  const pageNumber = Math.floor(filteredByType.length / PER_PAGE);
  // On s'assure que le nombre de pages est
  // calculé correctement en fonction du nombre total d'événements
  //  filtrés (filteredByType), divisés par le nombre d'événements par page (PER_PAGE).

  // const typeList = new Set(data?.events.map((event) => event.type));
  //  typeList était une Set, ce qui est correct pour obtenir une liste unique de types d'événements, mais
  //  cela devait être converti en tableau (Array) pour être utilisé correctement dans le composant Select.

  const typeList = Array.from(new Set(data?.events.map((event) => event.type)));
  //  J'ai enveloppé new Set() dans Array.from() pour convertir cet ensemble en tableau.

  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={typeList}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div
            id="events"
            className="ListContainer"
          >
            {filteredEvents.map((event) => (
              <Modal
                key={event.id}
                Content={<ModalEvent event={event} />}
              >
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={event.date ? new Date(event.date) : null}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              <a
                key={`page-${n + 1}`} // Utilisation d'une clé basée sur le nombre de la page
                href="#events"
                onClick={() => setCurrentPage(n + 1)}
              >
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
