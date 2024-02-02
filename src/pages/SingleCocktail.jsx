import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import Cocktail from "../components/Cocktail";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [singleCocktail, setSingleCocktail] = useState(null);
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const resp = await fetch(url + id);
        const response = await resp.json();
        setLoading(false);
        if (!response.drinks) {
          setSingleCocktail(null);
        } else {
          const {
            drinks: [
              {
                strDrink: name,
                strDrinkThumb: image,
                strAlcoholic: info,
                strCategory: category,
                strGlass: glass,
                strInstructions: instructions,
                strIngredient1: ingredient1,
                strIngredient2: ingredient2,
                strIngredient3: ingredient3,
                strIngredient4: ingredient4,
                strIngredient5: ingredient5,
              },
            ],
          } = response;
          const ingredients = [
            ingredient1,
            ingredient2,
            ingredient3,
            ingredient4,
            ingredient5,
          ];
          const newCocktail = {
            category,
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };
          setSingleCocktail(newCocktail);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);
  if (loading) {
    return <Loading />;
  }
  if (!singleCocktail) {
    return <h2 className="section-title">No Cocktail To Display</h2>;
  }
  const { name, image, category, info, ingredients, glass, instructions } =
    singleCocktail;
  return (
    <section className="section cocktail-section">
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <section className="section cocktail-section">
          <div className="drink-info">
            <p>
              <span className="drink-data">name:</span>
              {name}
            </p>
          </div>
          <div className="drink-info">
            <p>
              <span className="drink-data">category:</span>
              {category}
            </p>
          </div>
          <div className="drink-info">
            <p>
              <span className="drink-data">info:</span>
              {info}
            </p>
          </div>
          <div className="drink-info">
            <p>
              <span className="drink-data">glass:</span>
              {glass}
            </p>
          </div>

          <div className="drink-info">
            <p>
              <span className="drink-data">instructions:</span>
              {instructions}
            </p>
            <p>
              <span className="drink-data">ingredients:</span>
              {ingredients.map((item, index) => {
                return item ? <span key={index}>{item},</span> : null;
              })}
            </p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default SingleCocktail;
