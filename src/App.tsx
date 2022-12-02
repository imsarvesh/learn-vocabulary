import useStore from "appStore";
import "./App.css";
import vocabulary from "vocabulary.json";
import { useRef } from "react";

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

  const speech = (text: string) => {
    var msg = new SpeechSynthesisUtterance();
    msg.rate = 0.7; // From 0.1 to 10
    msg.text = text;
    window.speechSynthesis.speak(msg);
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
        <button onClick={() => onChange(position + 1)}>→</button>
      </div>
      <div>
        <button onClick={() => speech(vocabulary[position || 0])}>
        🔈
        </button>
      </div>
    </div>
  );
}

export default App;
