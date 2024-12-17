import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import './App.css';

function App() {
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=67f2eeffbc3a46f49949ea62206de982"
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setRates(data.rates);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const selectedCurrencies = ["CAD", "EUR", "IDR", "JPY", "CHF", "GBP"];

    return (
        <div
            className="container d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: "100vh" }} // Ensures full viewport height for vertical centering
        >
          <h1 className="mb-3">DISPLAY RATE CURRENCY by Michael Lay</h1>
            <table className="table table-bordered border-light custom-table">
                <thead>
                    <tr>
                        <th scope="col">Currency</th>
                        <th scope="col">We Buy</th>
                        <th scope="col">Exchange Rate</th>
                        <th scope="col">We Sell</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedCurrencies.map((currency) => (
                        <tr key={currency}>
                            <td>{currency}</td>
                            <td>
                                {parseFloat(rates[currency]).toFixed(3) -
                                    parseFloat(
                                        (rates[currency] * 5) / 100
                                    ).toFixed(4)}
                            </td>
                            <td>{parseFloat(rates[currency]).toFixed(6)}</td>
                            <td>
                                {parseFloat(rates[currency]).toFixed(3) +
                                    parseFloat(
                                        (rates[currency] * 5) / 100
                                    ).toFixed(4)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h5>Rates are based from 1 USD.</h5>
            <h5>This application uses API from https://currencyfreaks.com</h5>
            {/* <h1>Currency Rates</h1>
            <ul>
                {selectedCurrencies.map((currency) => (
                    <li key={currency}>
                        {currency}: {rates[currency]}
                    </li>
                ))}
            </ul> */}
        </div>
    );
}

export default App;
