import React, { useEffect, useState } from "react";
import useMasterclassFindOne from "../hooks/useMasterclassFindOne";
import useMasterclassesCours from "../hooks/useMasterclassesCours";
import useMasterclassesCoursAll from "../hooks/useMasterclassesCoursAll";
import useMasterclassQuizzAll from "../hooks/useMasterclassQuizzAll";
import useMasterclassQuizz from "../hooks/useMasterclassQuizz";
import useMasterclassQuizzQuestion from "../hooks/useMasterclassQuizzQuestion";
import { useParams, Link } from 'react-router-dom'
import useMasterclassExamsAll from "../hooks/useMasterclassExamsAll";



export default function Quizz() {

  const [dataMasterclassFindOne, setdataMasterclassFindOne] = useState({
    id:"",
    image:"",
    slug:"",
    time:"",
    title:""
  })
  
  const [dataMasterclassQuizz, setDataMasterclassQuizz] = useState({
    id:"",
    idQuizz:"",
    title:"",
    slug:"",
    masterclassID:"",
    page:""
  })

  const [dataMasterclassCoursAll, setDataMasterclassCoursAll] = useState([])

  const [dataMasterclassQuizzAll, setDataMasterclassQuizzAll] = useState([])

  const [dataMasterclassExamsAll, setDataMasterclassExamsAll] = useState([])

  const [dataMasterclassQuizzQuestion, setDataMasterclassQuizzQuestion] = useState([])

  const [dataMasterclassQuizzAnswer, setDataMasterclassQuizzAnswer] = useState({})
  
  const [infosQuizz, setInfosQuizz] = useState({});

  const [quizzMessage, setQuizzMessage] = useState("");


  const handle = useParams()

  const masterclassFindOne = useMasterclassFindOne();

  const masterclassesCoursAll = useMasterclassesCoursAll();

  const masterclassQuizzAll = useMasterclassQuizzAll()

  const masterclassExamsAll = useMasterclassExamsAll()

  const masterclassQuizz = useMasterclassQuizz()

  const masterclassQuizzQuestion = useMasterclassQuizzQuestion()


  
  const [tempProgress, setTempProgress] = useState('<div class="masterclassroom-progress-bar-group"></div>')

  let tempUnite = `<div class="masterclassroom-progress-bar-group-unite">`

  let tempBar = `<div  class="masterclassroom-progress-bar-group-bar">`


  useEffect(() => {
    masterclassFindOne(handle.slug).then(data =>{setdataMasterclassFindOne(data.result[0])})
  }, [handle.page]);

  useEffect(() => {
    if(dataMasterclassFindOne.id!=""){
      masterclassQuizz(dataMasterclassFindOne.id, handle.page).then(data=>{if(data.result[0]!=undefined)setDataMasterclassQuizz(data.result[0])})
      masterclassesCoursAll(dataMasterclassFindOne.id).then(data =>{setDataMasterclassCoursAll(data.result)})
      masterclassExamsAll(dataMasterclassFindOne.id).then(data =>{setDataMasterclassExamsAll(data.result)})
      masterclassQuizzAll(dataMasterclassFindOne.id).then(data =>{setDataMasterclassQuizzAll(data.result)})
    }
  }, [dataMasterclassFindOne]);

  useEffect(() => {
    if(dataMasterclassQuizz.id!="")masterclassQuizzQuestion(dataMasterclassQuizz.id).then(data=>{setDataMasterclassQuizzQuestion(data.result)})
  },[dataMasterclassQuizz])

  useEffect(()=>{
    if(dataMasterclassQuizzQuestion.length!=0){
      let tempAnswer = "{"
      for(let x=0; x<dataMasterclassQuizzQuestion.length; x++){
        let tempX = x + 1
        tempAnswer += '"answer' + tempX + '":"' + dataMasterclassQuizzQuestion[x].correct +'"'
        if(x != dataMasterclassQuizzQuestion.length - 1){
          tempAnswer += ","
        }
      }
      tempAnswer+="}"
      setDataMasterclassQuizzAnswer(JSON.parse(tempAnswer))
    }
  },[dataMasterclassQuizzQuestion])



  const handleChange = ({ target }) => {
    setInfosQuizz((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const [correctAnswerMessage, setCorrectAnswerMessage] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(infosQuizz.length != dataMasterclassQuizzAnswer.length){
      setQuizzMessage("Il faut répondre à toutes les questions")
    }else{
      let tempInfosQuizz = []
      let tempKeys = Object.keys(infosQuizz);
      for(let x=0; x<tempKeys.length; x++){
        let tempX = x+1
        for (const key in infosQuizz) {
          if (infosQuizz.hasOwnProperty(key)) {
            const value = infosQuizz[key];
            if(key == "answer" + tempX){
              tempInfosQuizz.push(value)
            }
          }
        }
      }

      let tempQuizzAnswer = []

      for (const key in dataMasterclassQuizzAnswer) {
        if (dataMasterclassQuizzAnswer.hasOwnProperty(key)) {
          const value = dataMasterclassQuizzAnswer[key];
          tempQuizzAnswer.push(value)
        }
      }

      let check = true

      let tempCorrectAnswerMessage = []
  
      for(let x=0; x<tempQuizzAnswer.length; x++){
        if(tempQuizzAnswer[x] != tempInfosQuizz[x]){
          check = false
          tempCorrectAnswerMessage.push("<p style='color:red'>Mauvaise réponse</p>")
        }else{
          tempCorrectAnswerMessage.push("<p style='color:green'>Bonne réponse</p>")
        }
      }

      setCorrectAnswerMessage(tempCorrectAnswerMessage)

      if(check == false){
        console.log("SALE PERDANT")
      }else{
        console.log("gagnant")
        alert("Félicitation ! Tu peux passer au chapitre suivant. Ou revoir les chapitres précédents si tu en as besoins")
      }

    }
  };
 
 
  useEffect(() => {
    let tempAllPage = []
    
    for(let x=0; x<dataMasterclassQuizzAll.length; x++){
      tempAllPage.push(dataMasterclassQuizzAll[x])
    }

    for(let x=0; x<dataMasterclassExamsAll.length; x++){
      tempAllPage.push(dataMasterclassExamsAll[x])
    }

    for(let x=0; x<dataMasterclassCoursAll.length; x++){
      tempAllPage.push(dataMasterclassCoursAll[x])
    }

    let tempAllPage2 = []

    console.log(tempAllPage)

    for(let x=1; x<=tempAllPage.length; x++){
      for(let y=0; y<tempAllPage.length; y++){
        if(tempAllPage[y].page == x && tempAllPage[y].text!="QUIZZ" && tempAllPage[y].text!="EXAMS"){
          tempAllPage2.push(tempAllPage[y])
        }
      }
    }
    for(let x=0; x<tempAllPage2.length; x++){
      if(x<handle.page -1){
        tempUnite+=`<div class="masterclassroom-progress-bar-unite-actif"></div>`
      }else{       
        tempUnite+=`<div class="masterclassroom-progress-bar-unite"></div>`
      }
      tempBar+=`<div class="masterclassroom-progress-bar-bar"></div>`

      if(tempAllPage2[x].idQuizz!=undefined){
        tempUnite+=`</div><div class="masterclassroom-progress-bar-group-unite">`
        tempBar+=`</div><div  class="masterclassroom-progress-bar-group-bar">`
      }
  
      if(x==tempAllPage2.length - 1){
        tempUnite+=`</div>`
        tempBar+=`</div>` 
      }
    }

    
    setTempProgress(`<div class="masterclassroom-progress-bar-group">`+tempUnite + tempBar + `</div>`)
  }, [dataMasterclassCoursAll]);

  




  let linkToPrecedent = "/masterclassroom/" + dataMasterclassFindOne.title + "/" + (parseInt(handle.page) - 1 )
  if(handle.page == 1){
    linkToPrecedent = "/masterclasses"
  }
  let linkToNext = "/masterclassroom/" + dataMasterclassFindOne.title + "/" + (parseInt(handle.page) + 1 )


  




    return (
      <div className="masterclassroom-container">
        <div className="masterclassroom-header-container">
          <div className="masterclassroom-header-title-container">
            <span className="masterclassroom-header-title">Cours de {dataMasterclassFindOne.title}</span>
          </div>
          <div className="masterclassroom-header-information-container">
            <div className="masterclassroom-header-information-temps-container">
              <img src="/horloge.svg" alt="Temps du cours" className="masterclassroom-header-image"/>
              <span className="masterclassroom-header-information-temps">{dataMasterclassFindOne.time}</span>
            </div>
            <div className="masterclassroom-header-information-difficulte-container">
              <img src="/difficulte.svg" alt="Difficulté"/>
              <span className="masterclassroom-header-information-difficulte">Facile</span>
            </div>
          </div>
        </div>
        <div className="masterclassroom-progress-container">
          <div className="masterclassroom-progress-date-container">
            <span  className="masterclassroom-progress-date">Mis à jour le 21/07/2023</span>
          </div>
          <div className="masterclassroom-progress-bar-container">
            <img src="/begin.svg" alt="Début de progression" className="masterclassroom-progress-image"/>
            <div className="masterclassroom-progress-bar" dangerouslySetInnerHTML={{__html: tempProgress}}>
            </div>
            <img src="/end.svg" alt="Fin de progression" className="masterclassroom-progress-image"/>
          </div>
        </div>
        <div className="masterclassroom-cours-container">
          <div>
            <img src={`/masterclasses_${dataMasterclassFindOne.title}.png`} alt={dataMasterclassFindOne.title} className="masterclassroom-cours-image"/> {/* {dataMasterclassFindOne.title} */}
          </div>
          <form noValidate onSubmit={handleSubmit} className='form-container'>
            {dataMasterclassQuizzQuestion.map(item => (
              <div key={item.id}>
                {correctAnswerMessage.length!=0 ? 
                  <span dangerouslySetInnerHTML={{__html: correctAnswerMessage[parseInt(item.id) - 1]}}></span> 
                  : 
                  <></>
                }
                <p>Question : {item.question}</p>
                <div>
                  <input type='radio' name={"answer"+item.id} value="1" onChange={handleChange}/>
                  <label htmlFor={item.answer1}>{item.answer1}</label>
                </div>
                <div>
                  <input type='radio' name={"answer"+item.id} value="2" onChange={handleChange}/>
                  <label htmlFor={item.answer2}>{item.answer2}</label>
                </div>
                <div>
                  <input type='radio' name={"answer"+item.id} value="3" onChange={handleChange}/>
                  <label htmlFor={item.answer3}>{item.answer3}</label>
                </div>
                <div>
                  <input type='radio' name={"answer"+item.id} value="4" onChange={handleChange}/>
                  <label htmlFor={item.answer4}>{item.answer4}</label>
                </div>
              </div>
            ))}
            <button className="login-button" type="Confirmer">
              Confirmer
            </button>
          </form>
        </div>
        <div className="masterclassroom-change-page-container">
          <Link to={linkToPrecedent}  className="masterclassroom-change-page-previous-container">
              <img src="/Arrow_left.svg" alt="Chapitre précédent" className="masterclassroom-change-page-image"/>
              <span className="masterclassroom-change-page-previous-text">Chapitre précédent</span>
          </Link>
          <Link to={linkToNext}className="masterclassroom-change-page-next-container">
          <span className="masterclassroom-change-page-next-text">Chapitre suivant</span>
            <img src="/Arrow_right3.svg" alt="Chapitre suivant" className="masterclassroom-change-page-image"/>
          </Link>
        </div>
        <div className="masterclassroom-contents-table-container">
          <div className="masterclassroom-contents-table-container-all">
            <div className="masterclassroom-contents-table-title-container">
              <span className="masterclassroom-contents-table-title">Table des matières</span>
            </div>
            <div className="masterclassroom-contents-table-chapter-container-all">
              <div className="masterclassroom-contents-table-chapter-container">
                <div className="masterclassroom-contents-table-chapter-icon-container">
                  <img src="/Flag.svg" alt="Aller vers la Partie 1 - Maîtrisez les bases de la guitare" className="masterclassroom-contents-table-icon"/>
                </div>
                <div className="masterclassroom-contents-table-chapter-title-container">
                  <span className="masterclassroom-contents-table-chapter-title">Partie 1 - Maîtrisez les bases de la guitare</span>
                </div>
                <img src="/Arrow_right2.svg" alt="Aller vers la Partie 1 - Maîtrisez les bases de la guitare" className="masterclassroom-contents-table-image"/>
              </div>
              <div className="masterclassroom-contents-table-chapter-container">
                <div className="masterclassroom-contents-table-chapter-icon-container">
                  <img src="/Flag.svg" alt="Aller vers la Partie 2 - Maîtrisez les bases de la guitare" className="masterclassroom-contents-table-icon"/>
                </div>
                <div className="masterclassroom-contents-table-chapter-title-container">
                  <span className="masterclassroom-contents-table-chapter-title">Partie 2 - Maîtrisez les bases de la guitare</span>                </div>
                <img src="/Arrow_right2.svg" alt="Aller vers la Partie 2 - Maîtrisez les bases de la guitare" className="masterclassroom-contents-table-image"/>
              </div>
              <div className="masterclassroom-contents-table-chapter-container">
                <div className="masterclassroom-contents-table-chapter-icon-container">
                  <img src="/Flag.svg" alt="Aller vers la Partie 3 - Maîtrisez les bases de la guitare" className="masterclassroom-contents-table-icon"/>
                </div>
                <div className="masterclassroom-contents-table-chapter-title-container">
                  <span className="masterclassroom-contents-table-chapter-title">Partie 3 - Maîtrisez les bases de la guitare</span>
                </div>
                <img src="/Arrow_right2.svg" alt="Aller vers la Partie 3 - Maîtrisez les bases de la guitare" className="masterclassroom-contents-table-image"/>
              </div>
              <div className="masterclassroom-contents-table-chapter-container">
                <div className="masterclassroom-contents-table-chapter-icon-container">
                  <img src="/Flag.svg" alt="Aller vers la Partie 4 - Maîtrisez les bases de la guitare" className="masterclassroom-contents-table-icon"/>
                </div>
                <div className="masterclassroom-contents-table-chapter-title-container">
                  <span className="masterclassroom-contents-table-chapter-title">Partie 4 - Maîtrisez les bases de la guitare</span>
                </div>
                <img src="/Arrow_right2.svg" alt="Aller vers la Partie 4 - Maîtrisez les bases de la guitare" className="masterclassroom-contents-table-image"/>
              </div>
              <div className="masterclassroom-contents-table-chapter-container">
                <div className="masterclassroom-contents-table-chapter-success-container">
                  <img src="/Success.svg" alt="Aller vers le certificat de réussite" className="masterclassroom-contents-table-success"/>
                </div>
                <div className="masterclassroom-contents-table-chapter-success-title-container">
                  <span className="masterclassroom-contents-table-chapter-success-title">Certificat de réussite (voir un exemple)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="masterclassroom-ressources-container">
          <div className="masterclassroom-ressources-container-all">
            <div className="masterclassroom-ressources-title-container">
              <span className="masterclassroom-ressources-title">Ressources</span>
            </div>
            <div className="masterclassroom-ressources-link-container-all">
              <div className="masterclassroom-ressources-link-container">
                <div className="masterclassroom-ressources-link-icon-container">
                  <img src="/Book.svg" alt="Aller vers les noms de guitaristes historiques" className="masterclassroom-ressources-icon"/>
                </div>
                <div className="masterclassroom-ressources-link-bar-container">
                  <div className="masterclassroom-ressources-link-text-container">
                    <span className="masterclassroom-ressources-link-text">Nom de guitariste historique</span>
                  </div>
                  <img src="/Arrow_right5.svg" alt="Aller vers les noms de guitaristes historiques" className="masterclassroom-ressources-image"/>
                </div>
              </div>
              <div className="masterclassroom-ressources-link-container">
                <div className="masterclassroom-ressources-link-icon-container">
                  <img src="/Book.svg" alt="Aller vers les partitions débutantes" className="masterclassroom-ressources-icon"/>
                </div>
                <div className="masterclassroom-ressources-link-bar-container">
                  <div className="masterclassroom-ressources-link-text-container">
                    <span className="masterclassroom-ressources-link-text">Partitions débutantes</span>
                  </div>
                  <img src="/Arrow_right5.svg" alt="Aller vers les Partitions débutantes" className="masterclassroom-ressources-image"/>
                </div>
              </div>
              <div className="masterclassroom-ressources-link-container">
                <div className="masterclassroom-ressources-link-icon-container">
                  <img src="/Book.svg" alt="Aller vers les Références historiques" className="masterclassroom-ressources-icon"/>
                </div>
                <div className="masterclassroom-ressources-link-bar-container">
                  <div className="masterclassroom-ressources-link-text-container">
                    <span className="masterclassroom-ressources-link-text">Références historiques</span>
                  </div>
                  <img src="/Arrow_right5.svg" alt="Aller vers les Références historiques" className="masterclassroom-ressources-image"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="masterclassroom-exercices-container">
          <div className="masterclassroom-exercices-container-all">
            <div className="masterclassroom-exercices-title-container">
              <span className="masterclassroom-exercices-title">Exercices</span>
            </div>
            <div className="masterclassroom-exercices-link-container-all">
            <div className="masterclassroom-exercices-link-container">
                <div className="masterclassroom-exercices-link-icon-container">
                  <img src="/Book_open.svg" alt="Aller vers le Quizz d’entraînement du chapitre" className="masterclassroom-exercices-icon"/>
                </div>
                <div className="masterclassroom-exercices-link-bar-container">
                  <div className="masterclassroom-exercices-link-text-container">
                    <span className="masterclassroom-exercices-link-text">Quizz d’entraînement du chapitre</span>
                  </div>
                  <img src="/Arrow_right2.svg" alt="Aller vers le Quizz d’entraînement du chapitre" className="masterclassroom-exercices-image"/>
                </div>
              </div>
              <div className="masterclassroom-exercices-link-container">
                <div className="masterclassroom-exercices-link-icon-container">
                  <img src="/Book_open.svg" alt="Aller vers le Epreuves de fin de cours" className="masterclassroom-exercices-icon"/>
                </div>
                <div className="masterclassroom-exercices-link-bar-container">
                  <div className="masterclassroom-exercices-link-text-container">
                    <span className="masterclassroom-exercices-link-text">Epreuves de fin de cours</span>
                  </div>
                  <img src="/Arrow_right2.svg" alt="Aller vers le Epreuves de fin de cours" className="masterclassroom-exercices-image"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
}
