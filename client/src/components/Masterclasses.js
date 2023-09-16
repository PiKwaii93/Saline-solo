import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useMasterclassAll from "../hooks/useMasterclassAll";
import { useLocation } from "react-router-dom";
import useGetImageByMasterclassID from "../hooks/useGetImageByMasterclassID";


export default function Masterclasses() {
  
    const [allMasterclasses, setAllMasterclasses] = useState([])

    const [allMasterclassesTemp, setAllMasterclassesTemp] = useState([])

    const masterclassAll = useMasterclassAll()

    const getImageByMasterclassID = useGetImageByMasterclassID()

    useEffect(() => {
      masterclassAll().then(data =>{if(data.result.length!=0){setAllMasterclassesTemp(data.result)}})
    }, []);


    useEffect(() => {
      if(allMasterclassesTemp.length!=0){
        
        const fetchData = async () => {
          const newArray = [];
    
          await Promise.all(
            allMasterclassesTemp.map(async (item) => {
              const data = await getImageByMasterclassID(item.id);
              const imageBlob = data;
              const imageUrl = URL.createObjectURL(imageBlob);
              item.image = imageUrl;
              newArray.push(item);
            })
          );
          setAllMasterclasses(newArray);
        };
    
        fetchData();

      }

    }, [allMasterclassesTemp]);

    useEffect(()=>{
      console.log(allMasterclasses)
    },[allMasterclasses])

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
                        <img src={cours && cours.image ? cours.image : "/random.png"} alt={`Masterclass ${cours.title}`} className="masterclasses-cours-image"/>
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
