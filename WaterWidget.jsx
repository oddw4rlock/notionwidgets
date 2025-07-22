import React, { useState } from "react";

const WaterWidget = () => {
  const [cel, ustawCel] = useState(2000); // dzienny cel, domyślnie 2000 ml
  const [ilosc, ustawIlosc] = useState(0); // ile wypitej wody

  const dodaj = () => ustawIlosc(prev => Math.min(prev + 100, 10000));
  const odejmij = () => ustawIlosc(prev => Math.max(prev - 100, 0));
  const zmienCel = (e) => ustawCel(Number(e.target.value));

  return (
    <div style={{border:"1px solid #8ed1fc",borderRadius:12,padding:24,width:320,textAlign:"center",background:"#eaf6fb"}}>
      <h2>💧 Dzienny licznik wody</h2>
      <button onClick={odejmij} style={{fontSize:22,marginRight:10}}>-</button>
        <span style={{fontWeight:"bold",fontSize:22}}>{ilosc} ml</span>
      <button onClick={dodaj} style={{fontSize:22,marginLeft:10}}>+</button>
      <div style={{margin:"18px 0"}}>
        <label>Dzienny cel (ml): </label>
        <input type="number" value={cel} onChange={zmienCel} min={100} step={100} style={{width:70,fontSize:18}} />
      </div>
      <div>
        Osiągnięto: {Math.round((ilosc/cel)*100)}%
      </div>
      <div style={{height:8,background:"#c4e0ef",borderRadius:4,margin:"10px 0"}}>
        <div style={{
          width: `${Math.min(100, Math.round((ilosc/cel)*100))}%`,
          height: 8,
          background: "#419fd9",
          borderRadius: 4,
          transition: "width 0.3s"
        }} />
      </div>
    </div>
  );
};

export default WaterWidget;
