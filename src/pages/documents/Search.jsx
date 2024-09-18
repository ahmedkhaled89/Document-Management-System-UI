import { useEffect, useState } from 'react';
import Doc from '../../Components/Doc';

const Search = () => {
  const [query, setQuery] = useState('');
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const search = async () => {
      const res = await fetch(`/api/docs/search?q=${query}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setDocs(data.result);
    };
    search();
  }, [query]);
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search');
    console.log(query);
  };
  return (
    <div className='card'>
      <h2 className='title'>Search for Document</h2>
      <form onSubmit={handleSearch}>
        <input
          className='input'
          type='search'
          placeholder='Search For Document'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className='btn'>Search</button>
      </form>
      <div className='card mt-3 bg-indigo-500'>
        {docs && docs.map((doc) => <Doc key={doc._id} doc={doc} />)}
      </div>
    </div>
  );
};
export default Search;
