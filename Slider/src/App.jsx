import ImageSlider from "./ImageSlider.jsx";
const App = () => {
  const slides = [
    { url: "../public/image1.png", title: "beach" },
    { url: "../public/image2.png", title: "boat" },
    { url: "../public/image3.png", title: "forest" },
    { url: "../public/image4.png", title: "city" },
    { url: "../public/image5.png", title: "italy" },
  ];
  const containerStyles = {
    width: "90vw",
    height: "70vh",
    margin: "0 auto",
  };
  return (
    <div>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
};

export default App;