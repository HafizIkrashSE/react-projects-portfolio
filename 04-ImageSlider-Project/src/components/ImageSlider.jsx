import { useEffect, useState } from "react";
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
} from "react-icons/bs";
import "./ImageSlider.css";

export default function ImageSlider({
  url,
  limit = 5,
  page = 1,
}) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadImages() {
      try {
        setLoading(true);
        setErrorMsg("");

        const response = await fetch(
          `${url}?page=${page}&limit=${limit}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await response.json();

        setImages(data);
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (url) {
      loadImages();
    }
  }, [url, page, limit]);

  function handlePrevious() {
    setCurrentSlide((previousSlide) =>
      previousSlide === 0
        ? images.length - 1
        : previousSlide - 1
    );
  }

  function handleNext() {
    setCurrentSlide((previousSlide) =>
      previousSlide === images.length - 1
        ? 0
        : previousSlide + 1
    );
  }

  if (loading) {
    return (
      <div className="status-message">
        Loading images...
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="status-message error">
        Error: {errorMsg}
      </div>
    );
  }

  return (
    <div className="slider-container">
      {/* Previous Button */}
      <button
        className="arrow arrow-left"
        onClick={handlePrevious}
        aria-label="Previous image"
      >
        <BsArrowLeftCircleFill />
      </button>

      {/* Images */}
      <div className="image-wrapper">
        {images.map((image, index) => (
          <img
            key={image.id}
            src={image.download_url}
            alt={`Slide ${index + 1}`}
            className={
              currentSlide === index
                ? "slide-image active"
                : "slide-image"
            }
          />
        ))}
      </div>

      {/* Next Button */}
      <button
        className="arrow arrow-right"
        onClick={handleNext}
        aria-label="Next image"
      >
        <BsArrowRightCircleFill />
      </button>

      {/* Circle Indicators */}
      <div className="indicators">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={
              currentSlide === index
                ? "indicator active-indicator"
                : "indicator"
            }
          />
        ))}
      </div>
    </div>
  );
}