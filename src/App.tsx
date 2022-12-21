import useStore from "appStore";
import "./App.css";
import vocabulary from "vocabulary.json";
import { useEffect, useRef } from "react";

function App() {
  const inputRef = useRef(null);
  // @ts-ignore
  const [{ position }, dispatch] = useStore();

  const onChange = (position: number) => {
    const input = inputRef.current;
    // @ts-ignore
    if (input) {
      // @ts-ignore
      input.value = position;
    }

    dispatch({
      type: "update",
      position,
    });
  };

  document.onkeydown = checkKey;

  function checkKey(e) {
    e = e || window.event;

    if (e.keyCode === 38) {
      speech(vocabulary[position || 0], () => {
        onChange(position + 1);
      });
    } else if (e.keyCode === 40) {
      onChange(position - 1);
    } else if (e.keyCode === 37) {
      onChange(position - 1);
    } else if (e.keyCode === 39) {
      speech(vocabulary[position || 0], () => {
        onChange(position + 1);
      });
    }
  }

  useEffect(() => {}, []);

  const speech = (text: string, cb?) => {
    debugger;
    var msg = new SpeechSynthesisUtterance();
    // var voices = window.speechSynthesis.getVoices();
    msg.text = text;
    // msg.voice = voices[1];
    window.speechSynthesis.speak(msg);
    msg.onend = function () {
      cb();
    };
  };

  return (
    <div className="App">
      <h2>{vocabulary[position || 0]}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = inputRef.current;
          // @ts-ignore
          onChange(+input?.value || 0);
        }}
      >
        <input
          type="text"
          name="position"
          defaultValue={position}
          ref={inputRef}
          style={{
            textAlign: "center",
            border: "none",
            fontSize: "30px",
            width: "100px",
          }}
        />
      </form>
      <div>
        <button
          onClick={() => onChange(position - 1)}
          disabled={position === 0}
        >
          ←
        </button>
        <button
          onClick={() => {
            speech(vocabulary[position || 0], () => {
              onChange(position + 1);
            });
          }}
        >
          →
        </button>
      </div>
      <div>
        <button onClick={() => speech(vocabulary[position || 0])}>🔈</button>
      </div>
    </div>
  );
}

export default App;
