import "./App.css";
import { InfinitePeople } from "./people/InfinitePeople";
import { InfiniteSpecies } from "./species/InfiniteSpecies";

function App() {
  return (
    <div className="App">
      <h1>Infinite SWAPI</h1>
      {/* <InfinitePeople /> */}
      {/* you can comment InfinitePeople component and uncomment InfiniteSpecies if you want see infinity scroll using btn instead of react-infinite-scroller */}
      <InfiniteSpecies />
    </div>
  );
}

export default App;
