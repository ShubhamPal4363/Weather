import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Search() {

    // fetching country name
    const [CountryName, setCountryName] = useState([]);
    useEffect(() => {

        const fetchCountry = async () => {
            try{
                const countryValue = await axios.get('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20');

                setCountryName(countryValue.data.results);
                // console.log(countryValue.data.results);
            }
            catch(err){
                console.log(err.message)
            }
        }

        fetchCountry();

    }, [])

    // for input value
    const [InputValue, setInputValue] = useState('');
    const handleInput = (e) => {
        setInputValue(e.target.value);
    }

    // for search country display
    const [SearchCountry, setSearchCountry] = useState([]);
    useEffect(() => {
        try{
            const cvalue = CountryName.filter((cfilter) => (cfilter.name.toLowerCase().includes(InputValue.toLowerCase())));

            setSearchCountry(cvalue);
        }
        catch(err){
            console.log(err.message);
        }
    }, [CountryName, InputValue])

  return (
    <>
    <div className="relative overflow-x-auto container mx-auto my-20">
        <input type="text" name="" id="" className='my-7 mx-4 border-black border-2 px-7 py-2 rounded-lg w-1/2' placeholder='Search Cities' value={InputValue} onChange={handleInput} />
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-md sm:rounded-lg">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                <th scope="col" className="px-6 py-3 uppercase text-lg font-semibold">
                    City
                </th>
                <th scope="col" className="px-6 py-3 uppercase text-lg font-semibold">
                    Country
                </th>
                <th scope="col" className="px-6 py-3 uppercase text-lg font-semibold hidden md:block">
                    Timezone
                </th>
                </tr>
            </thead>
            <tbody>

                {
                    SearchCountry.map((cele) => (
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={cele.geoname_id}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <Link to={`/Weather/${cele.ascii_name}`}>{cele.ascii_name}</Link>
                            </th>
                            <td className="px-6 py-4">{cele.cou_name_en}</td>
                            <td className="px-6 py-4 hidden md:block">{cele.timezone}</td>
                        </tr>
                    ))
                }
                
            </tbody>
        </table>
    </div>
    </>
  );
}

export default Search;
