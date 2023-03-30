import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ready from "./page/Ready";
import Game from "./page/Game";
import Rank from "./page/Rank";
import NotFound from "./page/NotFound";
import Alert from "./manager/Alert";
import Modal from "./manager/Modal";
import "./css/Page.css";
import "./css/Common.css";

const Main = () => {
    // 새로 고침 / 페이지 나가기 확인
    // window.onbeforeunload = function (event) {
    //     event.returnValue = '';
    //     return true;
    // }

    return (
        <>
            <div>
                <Alert/>
                <Modal/>
            </div>
            <Router>
                <Routes>
                    <Route path="/"     element={<Ready />   } />
                    <Route path="/game" element={<Game />    } />
                    <Route path="/rank" element={<Rank />    } />
                    <Route path="/*"    element={<NotFound />} />
                </Routes>
            </Router>
        </>
    )
}

export default Main;