import './App.css'
import Nav from "./components/Nav.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {UserContextProvider} from "./utils/UserContext.jsx";
import {ThemeProvider} from "@mui/material";

import theme from "./utils/AppTheme";
import Homepage from "./pages/Homepage.jsx";
import EditPage from "./pages/EditPage.jsx";
import ViewMarks from "./pages/ViewMarks.jsx";

function App() {

    return (
        <div className='container'>
            <ThemeProvider theme={theme}>
                <UserContextProvider>
                    <Router>
                        <Nav/>
                        <section className={'content'}>
                        <Routes>
                            <Route path="/" element={<Homepage/>}/>
                            <Route path="/edit" element={<EditPage/>}/>
                            <Route path="/view" element={<ViewMarks/>}/>
                        </Routes>
                        </section>
                    </Router>
                </UserContextProvider>
            </ThemeProvider>
        </div>
    )
}

export default App
