const { createApp } = Vue;

createApp({
    data() {
        return {
            pokemons: [],
            loading: true,
            searchText: '',
            typeColors: {
                fire: '#f08030',
                water: '#6890f0',
                grass: '#78c850',
                electric: '#f8d030',
                ice: '#98d8d8',
                fighting: '#c03028',
                poison: '#a040a0',
                ground: '#e0c068',
                flying: '#a890f0',
                psychic: '#f85888',
                bug: '#a8b820',
                rock: '#b8a038',
                ghost: '#705898',
                dark: '#705848',
                dragon: '#7038f8',
                steel: '#b8b8d0',
                fairy: '#f0b6bc',
                normal: '#a8a878',
            },
        };
    },
    computed: {
        filteredPokemons() {

            return this.pokemons.filter(pokemon =>
                pokemon.name.toLowerCase().includes(this.searchText.toLowerCase())
            );
        },
    },
    methods: {
        async callAPI() {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=151`);
                const data = await response.json();

                const pokemonDetailsPromises = data.results.map(pokemon =>
                    this.fetchPokemonData(pokemon.url)
                );

                const pokemonDetails = await Promise.all(pokemonDetailsPromises);
                this.pokemons = pokemonDetails;
                this.loading = false;
            } catch (error) {
                console.error(error);
            }
        },
        async fetchPokemonData(url) {
            try {
                const response = await fetch(url);
                const data = await response.json();
                return {
                    id: data.id,
                    name: data.name,
                    types: data.types,
                    sprites: data.sprites,
                };
            } catch (error) {
                console.error(error);
            }
        },
        getTypeStyle(types) {
            if (types.length === 2) {
                const color1 = this.typeColors[types[0].type.name] || '#fff';
                const color2 = this.typeColors[types[1].type.name] || '#fff';
                return {
                    background: `linear-gradient(to right, ${color1} 50%, ${color2} 50%)`, // Transição abrupta no meio
                };
            }
            const color = this.typeColors[types[0].type.name] || '#fff';
            return {
                background: color,
            };
        }

    },
    created() {
        this.callAPI();
    },
}).mount("#app");

