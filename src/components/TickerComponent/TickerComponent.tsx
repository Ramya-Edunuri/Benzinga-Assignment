import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { lgoUrl, redirectLink } from "../../features/constants";
import { getData } from "../../services/apiClient";

interface TickerComponentProps {
  item: {
    name: string;
    date: string;

    ticker: string;
  };
}

const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  cursor: pointer;
`;

const TickerContainer = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h4 {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
  }

  p {
    font-size: 14px;
    text-align: center;
  }
`;

const TickerComponent: React.FC<TickerComponentProps> = ({ item }) => {
  const [tickerImg, setTickerImg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const loadToDetailsPage = (ticker: string) => {
    window.open(
      redirectLink.replace("replaceTicker", ticker),
      "_blank",
      "noopener,noreferrer"
    );
  };
  useEffect(() => {
    const getLogo = async (ticker: string) => {
      try {
        setLoading(true);
        const queryParams = {
          search_keys: ticker,
          fields: "mark_vector_light",
        };
        const response = await getData(lgoUrl, queryParams);
        const { data } = response;
        const image = data[0].files.mark_vector_light;
        setTickerImg(image);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getLogo(item.ticker);
  }, []);
  return (
    <TickerContainer onClick={() => loadToDetailsPage(item.ticker)}>
      <h4>{item.name}</h4>
      {!loading ? <Image src={tickerImg} /> : <></>}
      <p>Date: {item.date}</p>
    </TickerContainer>
  );
};

export default TickerComponent;
