import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Login";
import QuoteList from "./QuoteList";
import CreateQuote from "./CreateQuote";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/quotes" element={<QuoteList />} />
        <Route path="/create-quote" element={<CreateQuote />} />
      </Routes>
    </Router>
  );
}

export default App;
