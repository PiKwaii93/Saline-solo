import React, { useState } from 'react';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export default function Planning(){

    const settings = {
        className: "center",
        infinite: false,
        slidesToShow: 5,
        swipeToSlide: true,
        afterChange: (index) => {setPreviousIndex(index);handleSlideChange(index)},
      };
    
      const currentYear = new Date().getFullYear();
      const currentMonthIndex = new Date().getMonth();
      const currentMonthNames = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
      ];
      const currentMonthName = currentMonthNames[currentMonthIndex];
      const [selectedDay, setSelectedDay] = useState(null);
      const [currentMonth, setCurrentMonth] = useState(currentMonthIndex); // Déclarer setCurrentMonth

      const [previousIndex, setPreviousIndex] = useState(0)

      
        const [tourComplet, setTourComplet] = useState(0);
        
    
      const handleSlideChange = (index) => {
        const maxIndex = days.length - 1;
        console.log(index, previousIndex)

        if(index< previousIndex && index >=0 ){
            console.log('oyiiiii')
        }
    
        if (index === maxIndex || index === 0) {
            console.log('iciic')
          // Le carrousel est revenu au début ou à la fin, changez le mois ici
          const newMonthIndex = (currentMonthIndex + (index === maxIndex ? 1 : -1)) % 12;
          setCurrentMonth(newMonthIndex);
        }
      };
    
      const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Utiliser currentMonth au lieu de currentMonthIndex
      const days = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);
    
      const handleDayClick = (day) => { // Déclarer handleDayClick
        setSelectedDay(day);
        // Vous pouvez effectuer d'autres actions avec la valeur du jour ici
        console.log("Jour sélectionné :", day);
      };
    
    

    return (
      <div className="planning-page-container">
        <div className='planning-title-container'>
            <span className='planning-title'>Planning</span>
        </div>
        <div className="planning-container">
            <div className="planning-calendar-container">
                <div className="planning-calendar-year-container">
                    <span className="planning-calendar-year">2023</span>
                </div>
                <div className="planning-calendar-months-container">
                    <span className="planning-calendar-months">{currentMonthName}</span>
                </div>
                <div>
                    <Slider {...settings}>
                        {days.map((day) => (
                        <div
                            key={day}
                            className={`planning-calendar-days-one-container ${
                            day === selectedDay ? "selected" : ""
                            }`}
                            onClick={() => handleDayClick(day)}
                        >
                            <span className="planning-calendar-one-days">{day}</span>
                        </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <div className="planning-tab-container">
                <div className="planning-tab-one-container">
                    <div className="planning-tab-one-title-container">
                        <span className="planning-tab-one-title">Task</span>
                    </div>
                    <div className="planning-tab-mission-container">
                        <div className="planning-tab-mission-one-container">
                            <div className="planning-tab-mission-one-title-container">
                                <span className="planning-tab-mission-one-title">Daily Meeting</span>
                            </div>
                            <div className="planning-tab-mission-one-time-container">
                                <span className="planning-tab-mission-one-time">10:00 AM - 10:30 AM</span>
                            </div>
                        </div>
                        <div className="planning-tab-mission-one-container">
                            <div className="planning-tab-mission-one-title-container">
                                <span className="planning-tab-mission-one-title">Watch video</span>
                            </div>
                            <div className="planning-tab-mission-one-media-container">
                                <img className="planning-tab-mission-one-media"></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="planning-tab-one-container">
                    <div className="planning-tab-one-title-container">
                        <span className="planning-tab-one-title">Event</span>
                    </div>
                    <div className="planning-tab-mission-container">
                    <div className="planning-tab-mission-one-container">
                            <div className="planning-tab-mission-one-title-container">
                                <span className="planning-tab-mission-one-title">Cours de violon</span>
                            </div>
                            <div className="planning-tab-mission-one-time-container">
                                <span className="planning-tab-mission-one-time-start">10:00 AM</span>
                                <span className="planning-tab-mission-one-time-slash">-</span>
                                <span className="planning-tab-mission-one-time-end">10:30 AM</span>
                            </div>
                        </div>
                        <div className="planning-tab-mission-one-container">
                            <div className="planning-tab-mission-one-title-container">
                                <span className="planning-tab-mission-one-title">Cours de guitare</span>
                            </div>
                            <div className="planning-tab-mission-one-time-container">
                                <span className="planning-tab-mission-one-time-start">10:00 AM</span>
                                <span className="planning-tab-mission-one-time-slash">-</span>
                                <span className="planning-tab-mission-one-time-end">10:30 AM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
}
