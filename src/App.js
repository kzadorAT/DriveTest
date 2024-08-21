import React from "react";
import MultipleChoiceGame from "./components/MultipleChoiceGame";

function App() {
  return (
    <div>
      <h1>Test Drive App by Fabricio Loaiza</h1>
      <MultipleChoiceGame difficulty={2}/> {/* Comienza con 2 opciones */}
    </div>
  );
}

export default App;