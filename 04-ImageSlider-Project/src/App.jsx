import ImageSlider from "./components/ImageSlider";
import "./App.css";

function App() {
  return (
    <main className="app">
      <h1>Image Slider</h1>

      <ImageSlider
        url="https://picsum.photos/v2/list"
        limit={10}
        page={1}
      />
    </main>
  );
}

export default App;