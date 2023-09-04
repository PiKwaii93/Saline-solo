import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useMasterclass from "../hooks/useMasterclass";
import { useLocation } from "react-router-dom";


export default function Masterclasses() {
  
    const [allMasterclasses, setAllMasterclasses] = useState([])

    const masterclass = useMasterclass()

    useEffect(() => {
      masterclass().then(data =>{if(data.result.length!=0){setAllMasterclasses(data.result)}})
    }, []);


    useEffect(() => {
      if(allMasterclasses.length!=0)console.log(allMasterclasses)
    }, [allMasterclasses]);

    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
      setInputValue(event.target.value);
    };



    return (
      <div className="masterclasses-container">
        <div className="masterclasses-title-container">
          <span className="masterclasses-title">Masterclasses</span>
        </div>
        <input type="text" name="masterclasses-searchbar" placeholder="Recherche de cours" className="masterclasses-searchbar" value={inputValue} onChange={handleChange}/> 
        {allMasterclasses.map((cours, index) => {
          if(cours.title.includes(inputValue)) {
            return <div className="masterclasses-cours-container" key={index}>
                      <div className="masterclasses-cours-container-tab">
                        <img src={`/masterclasses_${cours.title}.png`} alt={`Masterclass ${cours.title}`} className="masterclasses-cours-image"/>
                        <Link to={`/masterclassroom/${cours.title}/1`}>
                          <button className="masterclasses-cours-button">Accéder aux cours</button>
                        </Link>
                      </div>
                      <div className="masterclasses-info-container">
                        <span className="masterclasses-info-text">Masterclasse {cours.title}</span>
                        <span className="masterclasses-info-sub-text">{cours.time} de cours avec exercice, épreuves</span>
                      </div>
                    </div>
          }
          return null;
        })}
      </div>
    );
  
}
