import "./css.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Char from "./selection";
import { useNavigate } from "react-router-dom";
import { nameset } from "./store";

const App = () => {
  const [salary, setSalary] = useState("");
  const [fiexedsalary, setFiexedsalary] = useState(0);
  const [table, setTable] = useState(null);
  const [expensoves, setExpensoves] = useState([]);
  const [changemonthamount, setChangemonthamount] = useState(false);
  const userna = useSelector((state) => state.user_name.value);
  const [selectedOption, setSelectedOption] = useState("");
  const [addexpensives, setAddexpensives] = useState(false);
  const [Expreason, setExpreason] = useState("");
  const [Expamount, setExpamount] = useState(0);
  const [render, setRender] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [chart, setChart] = useState();
  const [ren1, setrend1] = useState(true);
  const fun = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("http://localhost:5000/table", {
          name: userna,
        });
        const obj = res.data;

        if (obj.length > 0) {
          setExpensoves(obj[0].expensoves);
          setFiexedsalary(obj[0].salary);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fiexedsalary, render, selectedMonth]);
  const setsal = async () => {
    setChangemonthamount(false);
    setFiexedsalary(salary);
    await axios.post("http://localhost:5000/setsal", {
      name: userna,
      salary: salary,
    });
  };
  useEffect(() => {
    if (expensoves.length > 0) {
      setTable(
        <div className="table_next">
          <ul className="ul_in_table">
            {expensoves.map((ar, index) => (
              <li
                className="permonth"
                key={index}
                style={{ display: selectedMonth == ar[0] ? "block" : "none" }}
              >
                <div className="table_in_mounth"> {ar[0]}</div>
                <div>
                  <ul>
                    {ar[1].map((a, subIndex) => (
                      <li key={subIndex}>
                        <div className="namerate">
                          <div className="namer">{a[0]}</div>
                          <div className="rate">{a[1]}rs</div>
                          <div>
                            <button onClick={() => todel(index, subIndex)}>
                              X
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      setTable(null);
    }
  }, [expensoves, render]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const addtheexpensives = async () => {
    const req = await axios.post("http://localhost:5000/setexp", {
      name: userna,
      month: selectedOption,
      reason: Expreason,
      amount: Expamount,
    });

    if (req.data) {
      setRender(!render);
    }
  };
  const handleChange = (event) => {
    const selectedMonthValue = event.target.value;
    setSelectedMonth(selectedMonthValue);
  };
  useEffect(() => {
    try {
      const exp = expensoves
        .filter((a) =>
          a[0] == undefined ? "January" : a[0] === selectedMonth
        )[0][1]
        .map((c) => c[0]);
      const am = expensoves
        .filter((a) => a[0] === selectedMonth)[0][1]
        .map((c) => c[1]);
      const ba_sal = fiexedsalary - am.reduce((d, e) => e + d);
      exp.unshift("salary");
      am.unshift(ba_sal);
      let ob = {
        reason: exp,
        amount: am,
      };

      setChart(<Char value={ob} />);
    } catch {
      const b = expensoves.filter((a) => a[0] === selectedMonth)[0];
      setChart(<div>no expensives in {b}</div>);
    }
  }, [selectedMonth, expensoves]);
  const logout = () => {
    fun(nameset(""));

    nav("/");
  };
  const todel = async (ind1, ind2) => {
    let ans = await axios.post("http://localhost:5000/todel", {
      i: ind1,
      d: ind2,
      name: userna,
    });
    if (ans.data == "ok") {
      setRender(!render);
    }
  };
  return (
    <>
      <button className="logut" onClick={logout}>
        log out
      </button>
      <div className="root">
        <div className="user">
          <div>username {userna}</div>
          <div>you monthly salary is Rs {fiexedsalary}</div>{" "}
          
          <button
            className="button_for_change_salaary"
            onClick={() => setChangemonthamount(true)}
          >
            change the salary amount
          </button>
        </div>
        
        {/* user inform */}
        <div className="char_and_table">
          <div className="tableout">
            {table && <div className="table">{table}</div>}{" "}
            {!addexpensives && (
              <button
              className="button_in_addexp"
                
                onClick={() => setAddexpensives(true)}
              >
                add expensives
              </button>
            )}
          </div>

          <div className="chartname">
            <div className="charname_in">
              <select value={selectedMonth} onChange={handleChange}>
                <option value="select"></option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
              
               {chart}
             
            </div>
          </div>
        </div>

        {addexpensives && (
          <div className="change_expens">
            <div>
              <h2>Add expensives</h2>
              <p>select month</p>
              <select value={selectedOption} onChange={handleOptionChange}>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
              <p>reason</p>
              <input
                type="text"
                value={Expreason}
                onChange={(event) => setExpreason(event.target.value)}
              />
              <p>amount</p>
              <input
                type="number"
                value={Expamount}
                onChange={(event) => setExpamount(event.target.value)}
              />
              <br />
              <div onClick={() => setAddexpensives(false)}>
                {" "}
                <button onClick={addtheexpensives}>add</button>
              </div>
              <button onClick={() => setAddexpensives(false)}>dont want</button>
            </div>
          </div>
        )}
        {changemonthamount && (
          <div className="change_salary">
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              style={{ width: "10vw" }}
            />
            <button style={{ width: "10vw" }} onClick={setsal}>
              change
            </button>
            <button
              style={{ width: "10vw" }}
              onClick={() => setChangemonthamount(false)}
            >
              close
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
