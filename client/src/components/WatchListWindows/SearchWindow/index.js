import React from 'react'
import { BiSearchAlt2 } from 'react-icons/bi';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { StockSymbolData } from './symbl';
import './style.css';


function SearchWindow({changeSymbl}) {
    
    const handleOnSearch = () => {

    }

    const handleOnSelect = (item) => {
        changeSymbl(item)
    }

    return (
        <div className="watchList_searchWindow">
            <div className="searchwindow_input">
            <ReactSearchAutocomplete
                items={StockSymbolData}
                fuseOptions={{
                    keys: ["SYMBL","CMPNY"]
                }}
                styling={{
                    flexGrow: 1,
                    width: "100% !important",
                    borderRadius: "2px",
                    color: "black",
                    height: "44px",
                    iconColor: "black",
                    lineColor: "rgb(232, 234, 237)"
                }}
                placeholder="Search some stocks.."
                showClear={true}
                resultStringKeyName="SYMBL"
                maxResults={10}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
            />
            </div>
        </div>
    )
}

export default SearchWindow

