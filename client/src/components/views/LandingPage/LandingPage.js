import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Row } from "antd";
import { RocketOutlined } from "@ant-design/icons";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import { continents, price } from "./Sections/Datas";
import RadioBox from "./Sections/RadioBox";
import SearchFeature from "./Sections/SearchFeature";

function LandingPage() {
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(8);
    const [postSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({
        continents: [],
        price: [],
    });
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = (body) => {
        axios.post("/api/product/products", body).then((response) => {
            if (response.data.success) {
                if (body?.loadMore) {
                    setProducts([...products, ...response.data.productInfo]);
                } else {
                    console.log(body, response.data);
                    setProducts(response.data.productInfo.slice(0, 8));
                }
                setPostSize(response.data.postSize);
            } else {
                alert("상품들을 가져오는데 실패 했습니다.");
            }
        });
    };

    const loadMoreHandler = () => {
        let Skip = skip + limit;

        let body = {
            skip: Skip,
            limit: limit,
            loadMore: true,
        };

        getProducts(body);
        setSkip(Skip);
    };

    const renderCards = products.map((product, index) => {
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <Card
                    cover={
                        <a href={`/product/${product._id}`}>
                            <ImageSlider images={product.images} />
                        </a>
                    }
                >
                    <Card.Meta
                        title={product.title}
                        description={`$${product.price}`}
                    />
                </Card>
            </Col>
        );
    });

    const showFilteredResults = (filters) => {
        let body = {
            skip: 0,
            limit: limit,
            filters: filters,
        };

        getProducts(body);
        setSkip(0);
    };

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }

        return array;
    };

    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters };

        newFilters[category] = filters;

        if (category === "price") {
            let priceValues = handlePrice(filters);
            newFilters[category] = priceValues;
        }

        showFilteredResults(newFilters);
        setFilters(newFilters);
    };

    const updateSearchTerm = (newSearchTerm) => {
        let body = {
            skip: 0,
            limit: limit,
            filters: Filters,
            searchTerm: newSearchTerm,
        };

        setSkip(0);
        setSearchTerm(newSearchTerm);
        getProducts(body);
    };

    return (
        <div style={{ width: "75%", margin: "3rem auto" }}>
            <div style={{ textAlign: "center" }}>
                <h2>
                    Let's Travel Anywhere <RocketOutlined />{" "}
                </h2>
            </div>

            {/* Filter */}

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* CheckBox */}
                    <CheckBox
                        list={continents}
                        handleFilters={(filters) =>
                            handleFilters(filters, "continents")
                        }
                    />
                </Col>
                <Col lg={12} xs={24}>
                    {/* RadioBox */}

                    <RadioBox
                        list={price}
                        handleFilters={(filters) =>
                            handleFilters(filters, "price")
                        }
                    />
                </Col>
            </Row>

            {/* Search */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "1rem auto",
                }}
            >
                <SearchFeature refreshFunction={updateSearchTerm} />
            </div>

            {/* Cards */}
            <Row gutter={[16, 16]}>{renderCards}</Row>

            <br />
            {postSize > limit && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                    }}
                >
                    <Button onClick={loadMoreHandler}>더보기</Button>
                </div>
            )}
        </div>
    );
}

export default LandingPage;
