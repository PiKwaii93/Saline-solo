import React, { useEffect, useState } from 'react';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import usePlanningByDate from '../hooks/usePlanningByDate';



export default function Planning(){

    const planningByDate = usePlanningByDate()

    const settings = {
        className: "center",
        infinite: true, // Définir à true pour un défilement infini
        slidesToShow: 5,
        swipeToSlide: true,
        centerMode: true
      };
    
      const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Déclarer currentYear
      const currentMonthNames = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
      ];
      const today = new Date().getDate();

    const [selectedDay, setSelectedDay] = useState(''); 
      const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    
      const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const days = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);
    
      const handleDayClick = (day) => {
        setSelectedDay(day);
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

      const [dataEventToday, setDataEventToday] = useState([])

      useEffect(()=>{
        if(selectedDay!=''){
            console.log(selectedDay)
            let actualDate = new Date(currentYear, currentMonth, selectedDay);
            const formattedDate = `${actualDate.getFullYear()}-${(actualDate.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${actualDate.getDate().toString().padStart(2, "0")}`;

            console.log(formattedDate)

            planningByDate(formattedDate).then(data=>{setDataEventToday(data.result); console.log(data.result)})
        }
      },[selectedDay])



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
                    <Slider {...settings} initialSlide={today - 1}>
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
                {dataEventToday.map((item, index) => (
                    <div key={index} className="planning-tab-one-container">
                        <div className="planning-tab-one-title-container">
                            <span className="planning-tab-one-title">Task</span>
                        </div>
                        <div className="planning-tab-mission-container">
                            <div className="planning-tab-mission-one-container">
                                <div className="planning-tab-mission-one-title-container">
                                    <span className="planning-tab-mission-one-title">{item.title}</span>
                                </div>
                                <div className="planning-tab-mission-one-time-container">
                                    <span className="planning-tab-mission-one-time">{new Date(item.start).getHours()}:{new Date(item.start).getMinutes()}- {new Date(item.end).getHours()}:{new Date(item.end).getMinutes()}</span>
                                </div>
                            </div>
                            {item.ressource ? 
                                <div className="planning-tab-mission-one-container">
                                    <div className="planning-tab-mission-one-title-container">
                                        <span className="planning-tab-mission-one-title">Watch video</span>
                                    </div>
                                    <div className="planning-tab-mission-one-media-container">
                                        <img className="planning-tab-mission-one-media"></img>
                                    </div>
                                </div>
                                : 
                                <></>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    );
}
