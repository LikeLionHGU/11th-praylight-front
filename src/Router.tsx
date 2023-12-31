import { Helmet } from "react-helmet";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Main from "./routes/Main";
import { useRecoilValue } from "recoil";
// import exinfoimg from "./imgs/extra.svg";
import { IsLoginState } from "./store/atom";
import Login from "./routes/Login";
import styled from "styled-components";
import Room from "./routes/Room";
import Start from "./routes/Start";
import DayPray from "./routes/DayPray";
import MyPage from "./routes/MyPage";
import PrayTogether from "./routes/PrayTogether";

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  background-color: black;
`;

const Center = styled.div`
  width: 100vw;
  max-width: 400px;
  background-color: black;
  height: calc(var(--vh, 1vh) * 100);
  min-height: auto;
`;

// const ExInfo = styled.div`
//   position: fixed;
//   right: 15vw;
//   top: 20vw;
//   width: 200px;
// `;

// const Img = styled.img`
//   width: 100%;
// `;

function Router() {
  const isUserLoggedIn = useRecoilValue(IsLoginState);

  return (
    <BrowserRouter>
      <Helmet>
        <title> PRAYLIGHT </title>
      </Helmet>
      <Switch>
        <Page>
          <Center>
            <Route exact path="/">
              <Start />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            {isUserLoggedIn ? (
              <>
                <Route exact path="/home">
                  <Main />
                </Route>
                <Route exact path="/room/:roomId">
                  <Room />
                </Route>
                <Route exact path="/room/:roomId/:date">
                  <DayPray />
                </Route>
                <Route exact path="/mypage">
                  <MyPage />
                </Route>
                <Route exact path="/prayTogether">
                  <PrayTogether />
                </Route>
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Center>
          {/* <ExInfo>
            <Img src={exinfoimg} alt="exinfoimg" />
          </ExInfo> */}
        </Page>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
