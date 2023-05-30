import React, { useState } from 'react';
import iconArrow from "./assets/arrow.svg";
import btnClick from "./assets/button-quay-ngay.svg";
import iconSuccess from "./assets/status-success-icon.svg";
import textArrow from "./assets/text.png";
import gift from "./assets/gift.svg";
import podium from "./assets/podium.svg";
import './App.css';

function App() {
  const listGift = [
    {
      txtName: "150.000.000đ",
      description: 'Sổ tiết kiệm',
      percent: 1 / 100,
    },
    {
      txtName: "100.000.000đ",
      description: 'Sổ tiết kiệm',
      percent: 2 / 100,
    },
    {
      txtName: "20.000.000đ",
      description: 'Sổ tiết kiệm',
      percent: 3 / 100,
    },
    {
      txtName: "50.000đ",
      description: 'Voucher UrBox',
      percent: 60 / 100,
    },
    {
      txtName: "100.000đ",
      description: 'Voucher UrBox',
      percent: 10 / 100,
    },
    {
      txtName: "10.000đ",
      description: 'Vietlot',
      percent: 10 / 100,
    },
    {
      txtName: "100.000đ",
      description: 'Voucher PNJ',
      percent: 10 / 100,
    },
    {
      txtName: "Loa Bluetooth",
      description: '',
      percent: 4 / 100,
    },
  ];

  const size = listGift.length;
  const rotate = 360 / size;
  const skewY = 90 - rotate;
  let timer = 7000;

  const [isRotating, setIsRotating] = useState(false);
  const [currentRotate, setCurrentRotate] = useState(0);
  const [textMsg, setTextMsg] = useState("");

  // const ref = React.createRef<HTMLDivElement>(null);

  const rorateWheel = (currentRotate: any, index: number) => {
    const wheel = document.getElementById("wheel") as HTMLInputElement | null;
    if (wheel != null) { // 👉️ "Initial Value"
      wheel.style.transform = `rotate(${
        currentRotate - index * rotate - rotate / 2
      }deg)`;
    }
  };

  const showTxtGift = (txt: string) => {
    setTimeout(() => {
      setIsRotating(false);
      setTextMsg(`Chuc mung ban da quay vao: ${txt}`);
    }, timer);
  };

  const getGift = (randomNumber: any) => {
    let currentPercent = 0;
    let list: any = [];

    listGift.forEach((item, index) => {
      currentPercent += item.percent;
      randomNumber <= currentPercent &&
        list.push({
          ...item,
          index,
        });
    });

    return list[0];
  };

  const start = () => {
    setIsRotating(true);
    setTextMsg("");

    const random = Math.random();
    const gift = getGift(random);
    const newCurrentRotate = currentRotate + 360 * 10;

    setCurrentRotate(newCurrentRotate);
    rorateWheel(newCurrentRotate, gift.index);
    showTxtGift(gift.txtName);
  };
  
  return (
    <main>
      <div className="main-wheel">
        <div className='text-arrow'>
          <img src={textArrow}/>
        </div>
        <div className='gift-arrow'>
          <img src={gift}/>
        </div>
        <div className='podium-arrow'>
          <img src={podium}/>
        </div>
        <div className="icon-arrow">
          <img src={iconArrow} alt="arrow" />
        </div>
        <ul className="wheel" id="wheel">
          {listGift.map((item: any, index) => (
            <li
              style={{
                transform: `rotate(${rotate * index}deg)skewY(-${skewY}deg)`,
                border: '2px solid #fcb9f3'
              }}
            >
              <p
                className="text-item"
                style={{
                  transform: `skewY(${skewY}deg) rotate(${rotate / 2}deg)`,
                }}
              >
                <b>{item.txtName}</b> <br/>
                <b style={{color: '#5c69e1', fontSize:9}}>{item.description}</b> <br/>
                <img className="item-icon" src={iconSuccess} alt="iconSuccess"/>
              </p>
            </li>
          ))}
        </ul>
        <div className="btn">
        <img src={btnClick} className="btn-start rounded-full" onClick={() => !isRotating && start()} />
      </div>
      </div>
      <h1 className="msg">{textMsg}</h1>
    </main>
  );
};

export default App;
