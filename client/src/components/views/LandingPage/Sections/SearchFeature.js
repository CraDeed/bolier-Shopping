import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

function SearchFeature({ refreshFunction }) {
    const [searchTerm, setSearchTerm] = useState("");

    const searchHandler = (e) => {
        setSearchTerm(e.currentTarget.value);
        refreshFunction(e.currentTarget.value);
    };

    return (
        <div>
            <Search
                placeholder="input search text"
                onChange={searchHandler}
                style={{ width: 200 }}
                value={searchTerm}
            />
        </div>
    );
}

export default SearchFeature;
