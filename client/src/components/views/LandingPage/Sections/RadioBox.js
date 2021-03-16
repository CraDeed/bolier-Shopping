import React, { useState } from "react";
import { Radio, Collapse } from "antd";

const { Panel } = Collapse;

function RadioBox({ list, handleFilters }) {
    const [value, setValue] = useState(0);

    const renderRadioboxLists = () =>
        list &&
        list.map((value) => (
            <Radio key={value._id} value={value._id}>
                {value.name}
            </Radio>
        ));

    const handleChange = (e) => {
        setValue(e.target.value);
        handleFilters(e.target.value);
    };

    return (
        <div>
            <Collapse defaultActiveKey={["0"]}>
                <Panel header="Radio" key="1">
                    <Radio.Group onChange={handleChange} value={value}>
                        {renderRadioboxLists()}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    );
}

export default RadioBox;
