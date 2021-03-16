import React from "react";

function HistoryPage(props) {
    const getFormatDate = (fulldate) => {
        const date = new Date(fulldate);
        let year = date.getFullYear(); //yyyy
        let month = 1 + date.getMonth(); //M
        month = month >= 10 ? month : "0" + month; //month 두자리로 저장
        let day = date.getDate(); //d
        day = day >= 10 ? day : "0" + day; //day 두자리로 저장
        return year + "-" + month + "-" + day;
    };

    return (
        <div style={{ width: "80%", margin: "3rem auto" }}>
            <div style={{ textAlign: "center" }}>
                <h1>History</h1>
            </div>
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Product Quantity</th>
                        <th>Date of Purchase</th>
                    </tr>
                </thead>
                <tbody>
                    {props.user.userData &&
                        props.user.userData.history.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{getFormatDate(item.dateOfPurchase)}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default HistoryPage;
