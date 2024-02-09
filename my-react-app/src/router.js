import Log from "./log";
import Chart from "./chart";
import Sign from "./signup";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Nav=()=>{
    return(
        <>
        <Router>
            <Routes>
            <Route  exact path ="/" element={<Log/>}/>
            <Route  path ="/chart" element={<Chart/>}/>
            <Route  path ="/sign" element={<Sign/>}/>
            </Routes>
        </Router>
        </>
    )
}
export default Nav;
