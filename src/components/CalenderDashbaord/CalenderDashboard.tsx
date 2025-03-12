import { useEffect, useState } from "react";
import styled from "styled-components";
import TickerComponent from "../TickerComponent/TickerComponent";
import Loader from "../Loader/Loader";
import { getData } from "../../services/apiClient";
import { earningsUrl } from "../../features/constants";

interface IItem {
  name: string;
  date: string;
  ticker: string;
}
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  padding: 20px;
  background-color: #d8b88d;
`;

const CalendarDashboard = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getEarnings = async () => {
      try {
        setLoading(true);
        const response = await getData(earningsUrl, { date_sort: "date" });
        console.log(response, "as main response");
        setItems(response.earnings);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getEarnings();
  }, []);

  if (loading) return <Loader />;
  return (
    <>
      <h1>Earnings Whispers</h1>
      <Container>
        {items.map((item, index) => (
          <TickerComponent key={index} item={item} />
        ))}
      </Container>
    </>
  );
};

export default CalendarDashboard;
