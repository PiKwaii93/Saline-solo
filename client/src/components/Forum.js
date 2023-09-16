import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import useTopicAll from "../hooks/useTopicAll";
import useMessageAllByTopic from "../hooks/useMessageAllByTopic";
import useFindUserByID from "../hooks/useFindUserByID";


export default function Forum(){


    const [allTopic, setAllTopic] = useState([]);
    const [allDataTopic, setAllDataTopic] = useState([]);
    const topicAll = useTopicAll();
    const messageAllByTopic = useMessageAllByTopic();
    const findUserByID = useFindUserByID();
  
    useEffect(() => {
      topicAll().then(data => setAllTopic(data.result));
    }, []);
  
    useEffect(() => {
      if (allTopic.length !== 0) {
        let tempArray = [];
        let promises = [];
  
        for (let x = 0; x < allTopic.length; x++) {
          let tempObjet = allTopic[x];
          
          // Collect all promises in an array
          promises.push(
            messageAllByTopic(allTopic[x].id).then(data => {
              tempObjet.messages = data.result.length;
            }),
            findUserByID(allTopic[x].userID).then(data => {
              tempObjet.userName = data.result[0].firstname + " " + data.result[0].lastname;
            })
          );
          tempArray.push(tempObjet);
        }
        
        // Wait for all promises to resolve
        Promise.all(promises).then(() => {
          setAllDataTopic(tempArray); // Update the state once all promises are resolved
        });
      }
    }, [allTopic]);
  
    useEffect(() => {
      if (allDataTopic.length !== 0) {
        console.log(allDataTopic);
      }
    }, [allDataTopic]);

  

  

    return (
        <div className="forum-container-page">
            <div className="forum-title-container">
                <span className="forum-title">Forum</span>
            </div>
            <div className="forum-container-all">
                <div className="forum-navigate-container">
                    <div className="forum-navigate-previous-container-all">
                        <div className="forum-navigate-previous-begin-container">
                            <img src="/Arrow_left2.svg" alt="Revenir au début" className="forum-arrow-picture"></img>
                            <img src="/Arrow_left2.svg" alt="Revenir au début" className="forum-arrow-picture"></img>
                        </div>
                        <div className="forum-navigate-previous-one-container">
                            <img src="/Arrow_left2.svg" alt="Précédent" className="forum-arrow-picture"></img>
                        </div>
                    </div>
                    <div className="forum-navigate-next-one-container">
                        <img src="/Arrow_right6.svg" alt="Suivant" className="forum-arrow-picture"></img>
                    </div>
                </div>
                <div className="forum-manage-container">
                    <Link to="/create-topic" className="menu-burger-link-prevent-style">
                        <div className="forum-manage-create-container">
                            <img src="/Plus.svg" alt="Créer un nouveau topic" className="forum-create-picture"></img>
                            <div className="forum-manage-create-text-container">
                                <span className="forum-manage-create-text">Créer un nouveau topic</span>
                            </div>
                        </div>
                    </Link>
                    <div className="forum-manage-yours-container">
                        <span className="forum-manage-yours-text">Vos sujets</span>
                    </div>
                </div>
                <div className="forum-bar-subject-container">
                    <div className="forum-bar-container">
                        <div className="forum-bar-first-container">
                            <span className="forum-bar-first-text">Sujet</span>
                        </div>
                        <div className="forum-bar-second-container-all">
                            <div className="forum-bar-second-text-container">
                                <span className="forum-bar-second-text">Date</span>
                            </div>
                            <div className="forum-bar-second-picture-container">
                                <img src="/Arrow_down4.svg" alt="Changer le tri par date" className="forum-sort-by-date-picture"></img>
                            </div>
                        </div>
                    </div>
                    <div className="forum-subject-container">
                        {allDataTopic.map(item => (
                            <Link to={"/topic/"+item.id} key={item.id} style={{    width:" 100%"}}>
                                {item.id % 2 === 0 ? 
                                <div key={item.id} className="forum-subject-container-second">
                                    <div className="forum-subject-pins-container">
                                        <img src="/Pins.svg" alt="Etat du sujet" className="forum-pins-picture"></img>
                                    </div>
                                    <div className="forum-subject-information-container">
                                        <div className="forum-subject-title-container">
                                            <span className="forum-subject-title">{item.title}</span>
                                        </div>
                                        <div className="forum-subject-number-message-container">
                                            <span className="forum-subject-number-message">({item.messages})</span>
                                        </div>
                                        <div className="forum-subject-author-container">
                                            <span className="forum-subject-author">{item.userName}</span>
                                        </div>
                                    </div>
                                    <div className="forum-subject-date-container">
                                        <span className="forum-subject-date">01/03/2023</span>
                                    </div>
                                </div>
                                : 
                                <div key={item.id} className="forum-subject-container-one">
                                    <div className="forum-subject-pins-container">
                                        <img src="/Pins.svg" alt="Etat du sujet" className="forum-pins-picture"></img>
                                    </div>
                                    <div className="forum-subject-information-container">
                                        <div className="forum-subject-title-container">
                                            <span className="forum-subject-title">{item.title}</span>
                                        </div>
                                        <div className="forum-subject-number-message-container">
                                            <span className="forum-subject-number-message">({item.messages})</span>
                                        </div>
                                        <div className="forum-subject-author-container">
                                            <span className="forum-subject-author">{item.userName}</span>
                                        </div>
                                    </div>
                                    <div className="forum-subject-date-container">
                                        <span className="forum-subject-date">01/03/2023</span>
                                    </div>
                                </div>
                            }</Link>
                            
                            
                        ))}
                    </div>
                </div>
                <div className="forum-navigate-container">
                    <div className="forum-navigate-previous-container-all">
                        <div className="forum-navigate-previous-begin-container">
                            <img src="/Arrow_left2.svg" alt="Revenir au début" className="forum-arrow-picture"></img>
                            <img src="/Arrow_left2.svg" alt="Revenir au début" className="forum-arrow-picture"></img>
                        </div>
                        <div className="forum-navigate-previous-one-container">
                            <img src="/Arrow_left2.svg" alt="Précédent" className="forum-arrow-picture"></img>
                        </div>
                    </div>
                    <div className="forum-navigate-next-one-container">
                        <img src="/Arrow_right6.svg" alt="Suivant" className="forum-arrow-picture"></img>
                    </div>
                </div>
            </div>
        </div>
    );
}
