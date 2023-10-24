import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [chars, setChars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMe = async () => {
    try {
      const result = await axios.get(
        'https://gateway.marvel.com:443/v1/public/characters?apikey=9678bc38874939cf5e2e49ec0bc1bbdc&limit=100'
      );
      setChars(result.data.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
			const filteredChars = chars.filter((character) =>
				character.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setChars(filteredChars);
			setSearchTerm('');
	};

	const handleInputChange = (event) => {
			setSearchTerm(event.target.value);
	};

  return (
		<>
			<div>
				<input
					type="text"
					placeholder="Search Superhero Name"
					value={searchTerm}
					onChange={handleInputChange}
				/>
				<button onClick={handleSearch}>Search</button>
			</div>
			<br></br>
			<button onClick={fetchMe}>Fetch Characters</button>
			<ul>
				{chars.map((character) => (
					<li key={character.id}>{character.name}</li>
				))}
			</ul>
		</>
	);
}

export default App;
