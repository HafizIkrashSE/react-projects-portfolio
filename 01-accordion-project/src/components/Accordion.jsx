import { useState } from "react";
import data from "../accordionData";

export default function Accordion() {
  // Single selection
  const [selected, setSelected] = useState(null);

  // Multi selection
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(currentId) {
    setSelected(currentId === selected ? null : currentId);
  }

  function handleMultiSelection(currentId) {
    const copyMultiple = [...multiple];

    const index = copyMultiple.indexOf(currentId);

    if (index === -1) {
      copyMultiple.push(currentId);
    } else {
      copyMultiple.splice(index, 1);
    }

    setMultiple(copyMultiple);
  }

  return (
    <div className="acc-wrapper">
      <button
        onClick={() => setEnableMultiSelection(!enableMultiSelection)}
      >
        Enable Multi Selection
      </button>

      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              <div
                onClick={() =>
                  enableMultiSelection
                    ? handleMultiSelection(dataItem.id)
                    : handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>

              {enableMultiSelection
                ? multiple.includes(dataItem.id) && (
                    <div className="acc-content">
                      {dataItem.answer}
                    </div>
                  )
                : selected === dataItem.id && (
                    <div className="acc-content">
                      {dataItem.answer}
                    </div>
                  )}
            </div>
          ))
        ) : (
          <div>No data found!</div>
        )}
      </div>
    </div>
  );
}