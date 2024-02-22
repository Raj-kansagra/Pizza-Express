import { useState } from 'react';

let nextId = 0;

export default function Navbar({num}) {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>Inspiring sculptors: {num}</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={name !=="" ? () => {
        setArtists([
          ...artists,
          { id: nextId++, name: name }
        ]);
      }:console.log("empty....")}>Add</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
