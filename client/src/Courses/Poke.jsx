import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

const PokemonList = ({ onSelectPokemon }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const data = await response.json();
      setPokemonList(data.results);
      setLoading(false);
    };

    fetchPokemonData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-list pokemon-grid">
      {pokemonList.map((pokemon, index) => (
        <PokemonCard
          key={index}
          name={pokemon.name}
          url={pokemon.url}
          onSelect={onSelectPokemon}
        />
      ))}
    </div>
  );
};

export default PokemonList;