import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState('');
    useEffect(() => {
        async function fetchAndSetUser() {
            const res = await (
                await fetch('https://api.coinpaprika.com/v1/tickers')
            ).json();

            setLoading(false);
            setCoins(res);
        }
        fetchAndSetUser();
    }, []);
    const selectChange = (event) => {
        const city = event.target;
        var selected = city.options[city.selectedIndex];
        console.log(selected);
        console.dir(selected);
        console.dir(selected.props);
    };
    return (
        <div className="App">
            <h1>The Coins! ({coins.length})</h1>
            {loading ? (
                <strong>Loading...</strong>
            ) : (
                <div>
                    <select onChange={selectChange}>
                        {coins.map((coin, index) => {
                            return (
                                <option
                                    key={index}
                                    name={coin.name}
                                    symbol={coin.symbol}
                                    price={coin.quotes.USD.price}
                                >
                                    {coin.name}({coin.symbol}) :
                                    {coin.quotes.USD.price.toFixed(8)}
                                </option>
                            );
                        })}
                    </select>
                </div>
            )}
        </div>
    );
}

export default App;
