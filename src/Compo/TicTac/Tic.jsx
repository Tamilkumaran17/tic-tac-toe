import React, { useRef, useState } from "react";
import './Tic.css'

import circle_icon from '../Assets/circle.png'
import cross_icon from '../Assets/cross.png'

let data = ["", "", "", "", "", "", "", "", ""];

const Tic = () => {
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let [currentPlayer, setCurrentPlayer] = useState('X');
    let titleRef = useRef(null);
    let [username, setUsername] = useState('');
    let usernameRef = useRef(null);

    

    let box0 = useRef(null);
    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);

    let box_array = [box0, box1, box2, box3, box4, box5, box5, box6, box7, box8];


    const toggle = (e, num) => {
        if (lock) {
            return 0;
        }
        if (data[num] === "") {
            e.target.innerHTML = `<img src = '${currentPlayer === 'X' ? cross_icon : circle_icon}'>`;
            data[num] = currentPlayer;
            setCount(++count);
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
            checkWin();
        }
    }

    const checkWin = () => {

        if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
            won(data[2]);
        }
        else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
            won(data[5]);
        }
        else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
            won(data[8]);
        }


        else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
            won(data[6]);
        }
        else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
            won(data[7]);
        }
        else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
            won(data[8]);
        }


        else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
            won(data[8]);
        }
        else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
            won(data[6]);
        }
        else if (count === 9) {
            won("Draw");
        }
    }

    const won = (winner) => {
        setLock(true);
        if (winner === "X") {
            titleRef.current.innerHTML = `Winner : <img src='${cross_icon}'>`;
        }
        else if (winner === "O") {
            titleRef.current.innerHTML = `Winner : <img src='${circle_icon}'>`;
        }
        else if(winner='Draw'){
            titleRef.current.innerHTML = `It's a draw`;
            setCount(0);
        }
    }

    const reset = () => {
        setLock(false);
        setCurrentPlayer('X');
        data = ["", "", "", "", "", "", "", "", ""];
        titleRef.current.innerHTML = '<span>Tic-Tac-Toe</span>'

        box_array.map((e) => {
            e.current.innerHTML = ""
        })

       
    }

    const startGame = async(e) => {
        e.preventDefault();
        const enteredUsername = usernameRef.current.value.trim();
        if (enteredUsername) {
            alert('Data saved successfully')
            setUsername(enteredUsername);
            
        } else {
            alert('Please enter a valid username to start the game.');
        }
    }

    return (
        <>
            <div className='container'>
                <h1 className='title' ref={titleRef}><span>Tic-Tac-Toe</span></h1>
                
                {username ? (
                    <>
                    <h1 className="playerName">Welcome: <span>{username}</span></h1>
                    <div className="turn-indicator">Next Turn: {currentPlayer === 'X' ? 'Cross' : 'Circle'}</div>
                        <div className='board'>
                            <div className="row1">
                                <div className="boxes" onClick={(e) => { toggle(e, 0) }} ref={box0}></div>
                                <div className="boxes" onClick={(e) => { toggle(e, 1) }} ref={box1}></div>
                                <div className="boxes" onClick={(e) => { toggle(e, 2) }} ref={box2}></div>
                            </div>
                            <div className="row2">
                                <div className="boxes" onClick={(e) => { toggle(e, 3) }} ref={box3}></div>
                                <div className="boxes" onClick={(e) => { toggle(e, 4) }} ref={box4}></div>
                                <div className="boxes" onClick={(e) => { toggle(e, 5) }} ref={box5}></div>
                            </div>
                            <div className="row3">
                                <div className="boxes" onClick={(e) => { toggle(e, 6) }} ref={box6}></div>
                                <div className="boxes" onClick={(e) => { toggle(e, 7) }} ref={box7}></div>
                                <div className="boxes" onClick={(e) => { toggle(e, 8) }} ref={box8}></div>
                            </div>
                        </div>
                        <button className='reset' onClick={() => reset()}>Reset</button>
                    </>
                ) : (
                    
                    <div className='username-input'>
                        <input type='text' ref={usernameRef} placeholder='Enter your username' className="input" />
                        <button onClick={startGame} disabled={!usernameRef}
                         className="startbtn">Start Game</button>
                    </div>
                  
                )}

            </div>
        </>
    )
}
export default Tic
