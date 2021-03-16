import React, { useState } from "react";
import { Checkbox, Collapse } from "antd";

const { Panel } = Collapse;

function CheckBox({ list, handleFilters }) {
    const [checked, setChecked] = useState([]);

    const handleToggle = (value) => {
        // 누른 것의 Index를 구하고
        const currentIndex = checked.indexOf(value);

        // 전체 Checked된 State에서 현재 누른 CheckBox가 이미 있다면
        const newChecked = [...checked];

        // state에 넣어준다
        if (currentIndex === -1) {
            newChecked.push(value);
            // 빼주고
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        handleFilters(newChecked);
    };

    const renderCheckboxLists = () =>
        list &&
        list.map((value, index) => (
            <React.Fragment key={index}>
                <Checkbox
                    onChange={() => handleToggle(value._id)}
                    checked={checked.indexOf(value._id) === -1 ? false : true}
                >
                    <span>{value.name}</span>
                </Checkbox>
            </React.Fragment>
        ));

    return (
        <div>
            <Collapse defaultActiveKey={["0"]}>
                <Panel header="Continents" key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    );
}

export default CheckBox;
