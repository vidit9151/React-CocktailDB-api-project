import React, { useRef } from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchValue = useRef("");
  return (
    <section className="section search">
      <form action="" className="search-form">
        <div className="form-control">
          <label htmlFor="name">Search your favourite cocktail</label>
          <input
            ref={searchValue}
            type="text"
            id="name"
            onChange={() => {
              setSearchTerm(searchValue.current?.value);
            }}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
