import styled from "styled-components";
import Header from "../components/Header";
import theme from "../theme";
import PraiseCard from "../components/PraiseCard";
import { useQuery } from "react-query";
import { getMyPray } from "../apis/apis";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserIdState, isPrayUpdatedState } from "../store/atom";
import { useEffect } from "react";
import { Iprayer } from "../types/type";

const Container = styled.div`
  width: 100%;
  background-color: black;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const HeaderBlank = styled.div`
  height: 60px;
`;

const Top = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Counts = styled.div`
  display: flex;
  flex-direction: column;
`;

const Rows = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
`;

const PrayNum = styled.div`
  font-size: 16px;
`;

const Pray = styled.div``;

const DateDivider = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  padding-left: 10%;
  color: ${theme.palette.color.gray3};
  font-size: 12px;

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 40%;
    height: 1px;
    background-color: ${theme.palette.color.gray3};
  }

  &:before {
    left: 0;
    right: calc(90% + 5px);
  }

  &:after {
    left: calc(25% + 10px);
    right: 0;
  }
`;

const Day = styled.div`
  padding: 5px 0px;
`;

export default function MyPage() {
  const userId = useRecoilValue(UserIdState);
  const [isPrayUpdated, setIsPrayUpdated] = useRecoilState(isPrayUpdatedState);

  const { data: myPray, refetch } = useQuery(["getMyPray"], () =>
    getMyPray(userId).then((response) => response.data)
  );

  useEffect(() => {
    if (isPrayUpdated) {
      refetch().then(() => {
        setIsPrayUpdated(false);
      });
    }
  }, [isPrayUpdated, refetch, setIsPrayUpdated]);

  return (
    <>
      <Header />
      <HeaderBlank />
      <Container>
        <Top>
          <div>
            <Title> 마이페이지 </Title>
          </div>
        </Top>
        <Counts>
          <Rows>
            <PrayNum>{myPray?.totalPrayers}개의 기도제목을 공유했어요</PrayNum>
          </Rows>
        </Counts>
        <Pray>
          {Object.entries(myPray?.prayers || {}).map(([date, dayPrayers]) => (
            <Day key={date}>
              <DateDivider> {date} </DateDivider>
              {Array.isArray(dayPrayers) &&
                dayPrayers.map((pray: Iprayer) => (
                  <PraiseCard key={pray.pid} pray={pray} />
                ))}
            </Day>
          ))}
        </Pray>
      </Container>
    </>
  );
}
