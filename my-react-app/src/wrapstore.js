import Comp from "./router"
import { Provider } from "react-redux";
import {store} from "./store";
const App=()=>{
    return(
        <Provider store={store}>
        <Comp/>
        </Provider>
        
    )
};
export default App;