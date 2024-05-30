import './App.css';
import {Header} from './Components/Header';
import {Footer} from './Components/Footer';
import {Sidebar} from "./Components/Sidebar";

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <Sidebar/>
            <main className="flex-grow">

            </main>
            <Footer/>
        </div>
    );
}

export default App;
