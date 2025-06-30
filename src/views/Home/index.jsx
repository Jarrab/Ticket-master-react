import { useState, useRef, useEffect } from "react";
import ReactPaginate from "react-paginate";
//import useEventsData from "../../hooks/useEventsData.js";
import useEventsResults from "../../state/events-results.js"
import NavBar from "../../components/Navbar";
import Events from "../../components/Events";
import styles from "./Home.module.css"

const Home = () => {
  const { data, error, isLoading, FecthEvents} = useEventsResults();
  const events= data?._embedded?.events || []
  const page = data.page?.totalPages || []
  const [search, setSearch] = useState("");
  const containerRef = useRef();

  console.log(page)
  useEffect(() => {
    FecthEvents();
  }, []);

  const handleNavbarSearch = (term) => {
    console.log(containerRef.current.setSearch(""));
    setSearch(term);
    FecthEvents(`&keyword=${term}`);
  };

  const handlePageClick = ({selected}) => {
    console.log(selected)
    FecthEvents(`&keyword=${search}&page=${selected}`)
  }

  const renderEvents = () => {
    if (isLoading) {
      <div>Cargando resultado...</div>;
    }

    if (error) {
      <div>Ha ocrurrido un error</div>;
    }

    return (
      <div>
        <Events searchTerm={search} event={events}/>
        <ReactPaginate
        className={styles.pagination}
        nextClassName={styles.next}
        previousClassName={styles.previous}
        pageClassName={styles.page}
        activeClassName={styles.activeClass}
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={page}
          previousLabel="< "
          renderOnZeroPageCount={null}
        />
      </div>
    )
}

  return (
    <>
      <NavBar onSearch={handleNavbarSearch} ref={containerRef} />
      {renderEvents()}
    </>
  );
}

export default Home;
