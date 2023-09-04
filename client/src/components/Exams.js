import React, { useEffect, useState } from "react";
import useMasterclassFindOne from "../hooks/useMasterclassFindOne";
import useMasterclassesCours from "../hooks/useMasterclassesCours";
import useMasterclassesCoursAll from "../hooks/useMasterclassesCoursAll";
import useMasterclassQuizzAll from "../hooks/useMasterclassQuizzAll";
import useMasterclassExamsAll from "../hooks/useMasterclassExamsAll";
import useMasterclassExams from "../hooks/useMasterclassExams";
import useMasterclassExamsQuestion from "../hooks/useMasterclassExamsQuestion";
import { useParams, Link } from 'react-router-dom'
import useCertificatesFindOneByMasterclassID from "../hooks/useCertificatesFindOneByMasterclassID";
import { useSelector } from 'react-redux';
import useCheckUsersCertificates from "../hooks/useCheckUsersCertificates";
import useNewUsersCertificates from "../hooks/useNewUsersCertificates";



export default function Exams() {
  
  const user = useSelector((state) => state.user);

  const [dataMasterclassFindOne, setdataMasterclassFindOne] = useState({
    id:"",
    image:"",
    slug:"",
    time:"",
    title:""
  })
  
  const [dataMasterclassExams, setDataMasterclassExams] = useState({
    id:"",
    idExams:"",
    title:"",
    slug:"",
    masterclassID:"",
    page:""
  })

  const [dataCertificatesFindOneByMasterclassID, setDataCertificatesFindOneByMasterclassID] = useState({
    id:"",
    masterclassID:"",
    title:""
  })

  const [dataMasterclassCoursAll, setDataMasterclassCoursAll] = useState([])

  const [dataMasterclassQuizzAll, setDataMasterclassQuizzAll] = useState([])

  const [dataMasterclassExamsAll, setDataMasterclassExamsAll] = useState([])

  const [dataMasterclassExamsQuestion, setDataMasterclassExamsQuestion] = useState([])

  const [dataMasterclassExamsAnswer, setDataMasterclassExamsAnswer] = useState({})
  
  const [infosExams, setInfosExams] = useState({});

  const [examsMessage, setExamsMessage] = useState("");

  const [checkerCertificates, setCheckerCertificates] = useState([])

  const [checkerRequestCertificates, setCheckerRequestCertificates] = useState(false)


  const handle = useParams()

  const masterclassFindOne = useMasterclassFindOne();

  const masterclassesCoursAll = useMasterclassesCoursAll();

  const masterclassQuizzAll = useMasterclassQuizzAll()

  const masterclassExamsAll = useMasterclassExamsAll()

  const masterclassExams = useMasterclassExams()

  const masterclassExamsQuestion = useMasterclassExamsQuestion()

  const certificatesFindOneByMasterclassID = useCertificatesFindOneByMasterclassID()

  const newUsersCertificates = useNewUsersCertificates()

  const checkUsersCertificates = useCheckUsersCertificates()


  
  const [tempProgress, setTempProgress] = useState('<div class="masterclassroom-progress-bar-group"></div>')

  let tempUnite = `<div class="masterclassroom-progress-bar-group-unite">`

  let tempBar = `<div  class="masterclassroom-progress-bar-group-bar">`


  useEffect(() => {
    setCheckerRequestCertificates(false)
    masterclassFindOne(handle.slug).then(data =>{setdataMasterclassFindOne(data.result[0])})
  }, [handle.page]);

  useEffect(() => {
    if(dataMasterclassFindOne.id!=""){
      masterclassExams(dataMasterclassFindOne.id, handle.page).then(data=>{if(data.result[0]!=undefined)setDataMasterclassExams(data.result[0])})
      masterclassesCoursAll(dataMasterclassFindOne.id).then(data =>{setDataMasterclassCoursAll(data.result)})
      masterclassExamsAll(dataMasterclassFindOne.id).then(data =>{setDataMasterclassExamsAll(data.result)})
      masterclassQuizzAll(dataMasterclassFindOne.id).then(data =>{setDataMasterclassQuizzAll(data.result)})
      certificatesFindOneByMasterclassID(dataMasterclassFindOne.id).then(data=>{if(data.result[0]!=undefined)setDataCertificatesFindOneByMasterclassID(data.result[0])})
    }
  }, [dataMasterclassFindOne]);


  useEffect(() => {
    if(dataMasterclassExams.id!="")masterclassExamsQuestion(dataMasterclassExams.id).then(data=>{setDataMasterclassExamsQuestion(data.result)})
  },[dataMasterclassExams])

  useEffect(()=>{
    if(dataMasterclassExamsQuestion.length!=0){
      let tempAnswer = "{"
      for(let x=0; x<dataMasterclassExamsQuestion.length; x++){
        let tempX = x + 1
        tempAnswer += '"answer' + tempX + '":"' + dataMasterclassExamsQuestion[x].correct +'"'
        if(x != dataMasterclassExamsQuestion.length - 1){
          tempAnswer += ","
        }
      }
      tempAnswer+="}"
      setDataMasterclassExamsAnswer(JSON.parse(tempAnswer))
    }
  },[dataMasterclassExamsQuestion])


  const handleChange = ({ target }) => {
    setInfosExams((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const [correctAnswerMessage, setCorrectAnswerMessage] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    setCheckerRequestCertificates(false)
    if(infosExams.length != dataMasterclassExamsAnswer.length){
      setExamsMessage("Il faut répondre à toutes les questions")
    }else{
      let tempInfosExams = []
      let tempKeys = Object.keys(infosExams);
      for(let x=0; x<tempKeys.length; x++){
        let tempX = x+1
        for (const key in infosExams) {
          if (infosExams.hasOwnProperty(key)) {
            const value = infosExams[key];
            if(key == "answer" + tempX){
              tempInfosExams.push(value)
            }
          }
        }
      }

      let tempExamsAnswer = []

      for (const key in dataMasterclassExamsAnswer) {
        if (dataMasterclassExamsAnswer.hasOwnProperty(key)) {
          const value = dataMasterclassExamsAnswer[key];
          tempExamsAnswer.push(value)
        }
      }

      let check = true

      let tempCorrectAnswerMessage = []
  
      for(let x=0; x<tempExamsAnswer.length; x++){
        if(tempExamsAnswer[x] != tempInfosExams[x]){
          check = false
          tempCorrectAnswerMessage.push("<p style='color:red'>Mauvaise réponse</p>")
        }else{
          tempCorrectAnswerMessage.push("<p style='color:green'>Bonne réponse</p>")
        }
      }

      setCorrectAnswerMessage(tempCorrectAnswerMessage)

      if(check == false){
        console.log("perdu")
      }else{
        console.log("gagnant")
        checkUsersCertificates(user.id, dataCertificatesFindOneByMasterclassID.id).then(data => {setCheckerRequestCertificates(true); setCheckerCertificates(data.result)})
      }
    }
  };
  

  useEffect(() => {
    if(checkerCertificates.length==0 && checkerRequestCertificates==true){
      newUsersCertificates(user.id, dataCertificatesFindOneByMasterclassID.id).then(data => {console.log(data)})
    }else if(checkerRequestCertificates==true){
      alert("Vous avez déjà obtenu ce certificat")
    }
  }, [checkerRequestCertificates])
 
 
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

      if(tempAllPage2[x].idQuizz!=undefined || tempAllPage2[x].idExams!=undefined){
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
            {dataMasterclassExamsQuestion.map(item => (
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
                  <img src="/Book_open.svg" alt="Aller vers le Exams d’entraînement du chapitre" className="masterclassroom-exercices-icon"/>
                </div>
                <div className="masterclassroom-exercices-link-bar-container">
                  <div className="masterclassroom-exercices-link-text-container">
                    <span className="masterclassroom-exercices-link-text">Exams d’entraînement du chapitre</span>
                  </div>
                  <img src="/Arrow_right2.svg" alt="Aller vers le Exams d’entraînement du chapitre" className="masterclassroom-exercices-image"/>
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
