import React, { useState, useEffect } from "react";

const WaterWidget = () => {
  const [current, setCurrent] = useState(() => {
  // Odczytaj z localStorage lub zacznij od 0
  return Number(localStorage.getItem("water-current") || 0);
});

const [goal, setGoal] = useState(() => {
  // Odczytaj z localStorage lub zacznij od 2000
  return Number(localStorage.getItem("water-goal") || 2000);
});

// Zapisz current do localStorage po każdej zmianie current
useEffect(() => {
  localStorage.setItem("water-current", current);
}, [current]);

// Zapisz goal do localStorage po każdej zmianie goal
useEffect(() => {
  localStorage.setItem("water-goal", goal);
}, [goal]);

  const addWater = () => setCurrent(prev => Math.min(prev + 100, goal));
  const removeWater = () => setCurrent(prev => Math.max(prev - 100, 0));
  const handleGoalChange = e => {
    let value = parseInt(e.target.value, 10) || 0;
    setGoal(value);
    if (current > value) setCurrent(value);
  };
  const percent = Math.min(100, Math.round((current / goal) * 100));
  const handleReset = () => {
  setCurrent(0);
  // usuwamy licznik z localStorage, żeby po odświeżeniu też był 0
  localStorage.removeItem("water-current");
  // jeśli chcesz, możesz dodać także reset celu:
  // setGoal(2000);
  // localStorage.removeItem("water-goal");
  };

  return (
    <div style={{
      background: "rgba(231, 245, 255, 0)",
      borderRadius: "18px",
      padding: "5px",
      maxWidth: "180px",
      margin: "5px auto",
      boxShadow: "0 0px 0px rgba(0,50,150,0.09)",
      textAlign: "center",
      fontFamily: 'Nunito, sans-serif'
    }}>
      <h2 style={{
        color: "#228be6",
        fontWeight: 1000,
        marginBottom: 0,
        marginTop: 0,
        fontSize: 18
      }}>
        💧 Wypita Woda 💧
      </h2>
      <div style={{
        fontSize: "1.2em",
        marginBottom: "5px",
        color: "#228be6"
      }}>
        {current} / {goal} ml
      </div>
      <div style={{
        height: 15,
        background: "#d0ebff",
        borderRadius: 8,
        margin: '0px 0 10px',
        overflow: "hidden",
      }}>
        <div style={{
          width: percent + "%",
          background: "#4dabf7",
          height: "100%",
          transition: "width .3s"
        }}/>
      </div>
      <button onClick={removeWater} style={buttonStyle}>
      – 100 ml
      </button>
      <span style={{paddingLeft: '12px'}}></span>
      <button onClick={addWater} style={{...buttonStyle, marginLeft:5}}>
      + 100 ml
      </button>
      <div style={{marginTop:10, color:"#868e96", fontSize:15}}>
        Cel dzienny:&nbsp;
        <input
          type="number"
          min={100}
          step={100}
          value={goal}
          onChange={handleGoalChange}
          style={{
            width: 58,
            fontSize: 16,
            borderRadius: 5,
            border: "1px solid #badcff",
            padding: "2px 4px",
            outline: "none"
          }}
        /> ml
      
      <button onClick={handleReset} style={button1Style}>
      Zeruj
      </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  background: "#339af0",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: 15,
  padding: "5px 5px",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 0px 0px #bac8ff55",
  transition: "background 0.2s"
  };
  const button1Style = {
  background: "#f89191ff",
  color: "white",
  border: "none",
  borderRadius: "8px",
  marginTop: 10,
  fontSize: 15,
  padding: "5px 10px",
  fontWeight: 100,
  cursor: "pointer",
  boxShadow: "0 0px 0px #bac8ff55",
  transition: "background 0.2s"
  };

function App() {
  return <WaterWidget />;
}

export default App;