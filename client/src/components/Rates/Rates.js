import React from 'react';
import './Rates.css';

function Rates(currencies) {
    const hasData = Object.entries(currencies.currencies).length > 0;

    const currencyList = () => Object.entries(currencies.currencies).map(([cur, val]) => {
        return (
            <div
                key={cur}
                className="listItem"
            >
                <span>{cur}</span>
                <span>{val}</span>
            </div>
        );
    });
    
    return(
        <div className="ratesBox">
            {!hasData &&
                <div>
                    Loading, please wait...
                </div>
            }
            {hasData && currencyList()}
        </div>
    );
}

export default Rates;