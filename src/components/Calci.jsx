import React, { useState } from 'react'
import './Calci.css';
const Calci = () => {

    const[display,setdisplay]=useState('0');
    const[currentinput,setcurrentinput]=useState('');
    const[prevres,setprevres]=useState('');
    const[oper,setoper]=useState(null);

    const handleButtonClick=(value)=>{
        if(value==='C'){
            clearDisplay();
        }
        else if(value==='='){
            calculateresult();
        }
        else if('0123456789'.includes(value)){
            handlenumber(value);
        }
        else if(value==='delete'){
            handleBackspace();
        }
        else{
            handleoper(value);
        }
    }

    const clearDisplay=()=>{
        setdisplay('0');
        setcurrentinput('');
        setoper(null);
        setprevres('');
    }

    const handleBackspace = () => {
        setcurrentinput((prevDisplay) =>prevDisplay.length > 1 ? prevDisplay.slice(0, -1) : '0');
        setdisplay((prevDisplay) =>prevDisplay.length > 1 ? prevDisplay.slice(0, -1) : '0');
    };

    const calculateresult=()=>{
            if(currentinput && prevres && oper){
                try{
                    const result = eval(`${prevres} ${oper} ${currentinput}`);
                    setdisplay(result.toString());
                    setcurrentinput(result.toString());
                    setprevres('');
                    setoper(null);
                }

                catch(error){
                    setdisplay('Error');
                }
            }
        
        
    }

    const handlenumber = (number) => {
        setcurrentinput((prevres) => (prevres === '0' ? number : prevres + number));
        setdisplay((prevDisplay) => (prevDisplay === '0' ? number : prevDisplay + number));
    };

    const handleoper = (newOperator) => {
        if (prevres && currentinput) {
            calculateresult();
        }
        setdisplay((prevDisplay) => prevDisplay + ' ' + newOperator + ' ');
        setprevres(currentinput);
        setcurrentinput('');
        setoper(newOperator);
    };

    return (
        <div id='cal'>
            <div className="screen" style={{ 
                backgroundColor:'#172D67',
                height:'10rem',
                width:'20rem',
            }}><p>{display}</p></div>
            <div className="calci" style={{backgroundColor:'#070B26',height:'20rem',width:'20rem'}}>
                <div>
                    <button className='clear' onClick={()=>handleButtonClick('C')}>C</button>
                    <button className='op' onClick={()=>handleButtonClick('%')}>%</button>
                    <button className='erase' onClick={()=>handleButtonClick('delete')}>Del</button>
                </div>
                <div>
                    <button className='number' onClick={()=>handleButtonClick('7')}>7</button>
                    <button className="number" onClick={()=>handleButtonClick('8')}>8</button>
                    <button className="number" onClick={()=>handleButtonClick('9')}>9</button>
                    <button className="op" onClick={()=>handleButtonClick('*')}>*</button>
                </div>
                <div>
                    <button className='number' onClick={()=>handleButtonClick('4')}>4</button>
                    <button className="number" onClick={()=>handleButtonClick('5')}>5</button>
                    <button className="number" onClick={()=>handleButtonClick('6')}>6</button>
                    <button className="op" onClick={()=>handleButtonClick('+')}>+</button>
                </div>
                <div>
                    <button className='number' onClick={()=>handleButtonClick('1')}>1</button>
                    <button className="number" onClick={()=>handleButtonClick('2')}>2</button>
                    <button className="number" onClick={()=>handleButtonClick('3')}>3</button>
                    <button className="op" onClick={()=>handleButtonClick('-')}>-</button>
                </div>
                <div>
                    <button className="number" onClick={()=>handleButtonClick('0')}>0</button>
                    <button className="number" onClick={()=>handleButtonClick('.')}>.</button>
                    <button className="op" onClick={()=>handleButtonClick('=')}>=</button>
                    <button className='op' onClick={()=>handleButtonClick('/')}>/</button>
                </div>
            </div>
        </div>
    )
}

export default Calci
