import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [dollar, setDollar] = useState(0);
    const [selectedCoin, setSelectedCoin] = useState({});

    useEffect(() => {
        async function fetchAndSetUser() {
            const res = await (
                await fetch('https://api.coinpaprika.com/v1/tickers')
            ).json();

            setLoading(false);
            setCoins(res);
            setSelectedCoin({
                id: res[0].symbol,
                val: res[0].quotes.USD.price.toFixed(8),
            });
        }
        fetchAndSetUser();
    }, []);

    const selectChange = (event) => {
        const city = event.target;
        var selected = city.options[city.selectedIndex];
        console.log(selected.id);
        setDollar(0);
        setSelectedCoin({
            id: selected.id,
            val: selected.value,
        });
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
                                    id={coin.symbol}
                                    value={coin.quotes.USD.price}
                                >
                                    {coin.name}({coin.symbol}) :
                                    {coin.quotes.USD.price.toFixed(8)}
                                </option>
                            );
                        })}
                    </select>
                    <br />
                    <input
                        type="number"
                        onChange={(e) => {
                            setDollar(e.target.value);
                        }}
                        value={dollar}
                    ></input>
                    $
                    <br />
                    <input
                        type="number"
                        value={(dollar / selectedCoin.val).toFixed(8)}
                        readOnly
                    ></input>
                    {selectedCoin.id}
                </div>
            )}
        </div>
    );
}

export default App;
