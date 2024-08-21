import React, { useEffect, useState } from "react";
import TrafficSign from "./TrafficSign";
import trafficSigns from "../utils/trafficSigns";

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const MultipleChoiceGame = ({ difficulty }) => {
    const [currentSign, setCurrentSign] = useState(null);
    const [options, setOptions] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [level, setLevel] = useState(difficulty || 2); // Comienza en 2 opciones

    useEffect(() => {
        const generateOptions = () => {

            // Limitar el nivel a la cantidad de señales disponibles
            const maxOptions = Math.min(level, trafficSigns.length);

            // Mezcla todas las señales y selecciona la señal correcta
            const shuffledSigns = shuffleArray([...trafficSigns]);
            const correctSign = shuffledSigns[getRandomInt(shuffledSigns.length)];
            setCurrentSign(correctSign);            

            // Selecciona otras señales para completar las opciones
            const optionSigns = shuffledSigns
                .filter(sign => sign.id !== correctSign.id)
                .slice(0, maxOptions - 1);
            
            // Agrega la señal correcta y mezcla las opciones
            setOptions(shuffleArray([correctSign, ...optionSigns]));
        };

        generateOptions();
    }, [level]);

    const handleOptionClick = (option) => {
        if(option.name === currentSign.name){
            setFeedback('Correct!');
            setLevel(prevLevel => {
                const newLevel = prevLevel + 1;
                console.log(trafficSigns.length);
                console.log(newLevel > trafficSigns.length);
                return newLevel > trafficSigns.length ? newLevel : Math.min(newLevel, trafficSigns.length);
            });
        } else {
            setFeedback('Incorrect. Try again!');
        }
    };

    return (
        <div>
            {currentSign && <TrafficSign signImage={currentSign.image} />}
            <div>
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        style={{ marginRight: '5px' }}
                    >
                        {option.name}
                    </button>
                ))}
            </div>
            <div>
                <p>{feedback}</p>
            </div>
        </div>
    );
};

export default MultipleChoiceGame;