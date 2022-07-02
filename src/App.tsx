import React, { useState }  from 'react';
import logo from './logo.svg';
import './App.css';
import dayjs from 'dayjs';

const nasa_apod_url = "https://api.nasa.gov/planetary/apod";
const nasa_api_key = "AJS9iXajqgCTgo96AbxwotypteOL083FAJitPekb";

export function PickADate(): JSX.Element {
  const [date, setDate] = React.useState(dayjs('2022-07-01'));
  const [explanation, setExplanation] = React.useState('');

  const onChangeDate = React.useCallback(
   (e: React.ChangeEvent<HTMLInputElement>) => { 
     setDate(dayjs(e.target.value)); },
     [setDate]
  );
  let apod_response = {url: "", explanation: ""};
  let apod_url = "";
  let apod_explanation = "";

  let xhr = new XMLHttpRequest();
  xhr.open("GET", nasa_apod_url+"?api_key="+nasa_api_key+"&date="+date.format("YYYY-MM-DD"));
  xhr.send();
  xhr.onload = () => { 
    apod_response = JSON.parse(xhr.responseText);
    apod_url = apod_response.url;
    setExplanation(apod_response.explanation);
    window.open(apod_url, '_blank');
  };
  console.log(apod_explanation);
  return (
    <div className="app__container">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-explanation"> Explanation: </h1>
      <h1 className="App-explanationBody"> { explanation } </h1>
      <h4 className="app__title">
	Picked Date: {date.format("DD - MMMM - YYYY")}
      </h4>
      <input type="date" onChange={onChangeDate}
      ></input>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        OnARoll frontend exercise
      	<PickADate/>
      </header>
    </div>
  );
}

export default App;
