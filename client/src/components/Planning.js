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
      };
    
      const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Déclarer currentYear
      const currentMonthNames = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
      ];
      const [selectedDay, setSelectedDay] = useState(null);
      const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    
      const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const days = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);
    
      const handleDayClick = (day) => {
        setSelectedDay(day);
        console.log("Jour sélectionné :", day);
      };
    
      const handlePrevMonth = () => {
        if (currentMonth === 0) {
          setCurrentMonth(11); // Changer à décembre si le mois actuel est janvier
          setCurrentYear(currentYear - 1); // Enlever une année
        } else {
          setCurrentMonth((prevMonth) => prevMonth - 1);
        }
      };
    
      const handleNextMonth = () => {
        if (currentMonth === 11) {
          setCurrentMonth(0); // Changer à janvier si le mois actuel est décembre
          setCurrentYear(currentYear + 1); // Ajouter une année
        } else {
          setCurrentMonth((prevMonth) => prevMonth + 1);
        }
      };

    return (
      <div className="planning-page-container">
        <div className='planning-title-container'>
            <span className='planning-title'>Planning</span>
        </div>
        <div className="planning-container">
            <div className="planning-calendar-container">
                <div className="planning-calendar-year-container">
                    <span className="planning-calendar-year">{currentYear}</span>
                </div>
                <div className="planning-calendar-months-container">
                    <button onClick={handlePrevMonth}>Mois précédent</button>
                    <span className="planning-calendar-months">{currentMonthNames[currentMonth]}</span>
                    <button onClick={handleNextMonth}>Mois suivant</button>
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
