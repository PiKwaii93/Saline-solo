import React, { useEffect, useState } from "react";
import useMasterclassFindOne from "../hooks/useMasterclassFindOne";
import useMasterclassesCours from "../hooks/useMasterclassesCours";
import useMasterclassesCoursAll from "../hooks/useMasterclassesCoursAll";
import { useParams, Link, useFetcher } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import useMasterclassQuizzAllByMasterclassID from "../hooks/useMasterclassQuizzAllByMasterclassID";
import useMasterclassExamsAll from "../hooks/useMasterclassExamsAll";
import useMasterclassConfirmModule from "../hooks/useMasterclassConfirmModule";
import useMasterclassCheckConfirmModule from "../hooks/useMasterclassCheckConfirmModule";
import { useSelector } from "react-redux";
import useGetImageByMasterclassID from "../hooks/useGetImageByMasterclassID";
import "easymde/dist/easymde.min.css";
import { SimpleMdeReact } from "react-simplemde-editor";
import {marked} from 'marked'
import ReactMarkdown from "react-markdown";



export default function Masterclassroom() {

  
  const user = useSelector((state) => state.user);

  
  const navigate = useNavigate();

  const [dataMasterclassFindOne, setdataMasterclassFindOne] = useState({
    id:"",
    image:"",
    slug:"",
    time:"",
    title:""
  })

  const [dataMasterclassCours, setDataMasterclassCours] = useState({
    id:"",
    text:"",
    page:"",
    masterclassID:""
  })
  const [dataMasterclassCoursAll, setDataMasterclassCoursAll] = useState([])

  const [dataMasterclassQuizzAll, setDataMasterclassQuizzAll] = useState([])

  const [dataMasterclassExamsAll, setDataMasterclassExamsAll] = useState([])

  const [dataConfirmModule, setDataConfirmMoudle] = useState({
    masterclassCoursID: "",
    progress: "",
    userID: ""
  })

  const handle = useParams()

  const masterclassFindOne = useMasterclassFindOne();

  const masterclassesCours = useMasterclassesCours();

  const masterclassQuizzAll = useMasterclassQuizzAllByMasterclassID()
  
  const masterclassExamsAll = useMasterclassExamsAll()

  const masterclassesCoursAll = useMasterclassesCoursAll();

  const masterclassConfirmModule = useMasterclassConfirmModule()

  const masterclassCheckConfirmModule = useMasterclassCheckConfirmModule()
  
  const getImageByMasterclassID = useGetImageByMasterclassID()

  
  const [imageURL, setImageURL] = useState("/noOne.png");

  function getImage(masterclassID){

    getImageByMasterclassID(masterclassID).then(data => {
      const imageBlob = data;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageURL(imageUrl); 
    }).catch(error => {
      setImageURL('/random.png')
      console.error('Erreur lors de la récupération de l\'image :', error);
    });
  }



  
  const [tempProgress, setTempProgress] = useState('<div class="masterclassroom-progress-bar"></div>')

  let progressBarGroup = `<div class="masterclassroom-progress-bar-group">`

  let tempUnite = `<div class="masterclassroom-progress-bar-group-unite">`

  let tempBar = `<div  class="masterclassroom-progress-bar-group-bar">`



  useEffect(() => {
    masterclassFindOne(handle.slug).then(data =>{setdataMasterclassFindOne(data.result[0])})
  }, [handle.page]);
  
  
  useEffect(() => {
    if(dataMasterclassFindOne.id!=""){
      getImage(dataMasterclassFindOne.id)
      masterclassesCours(dataMasterclassFindOne.id, handle.page).then(data =>{if(data.result.length!=0){if(data.result[0].text == "QUIZZ"){navigate("/quizz/"+handle.slug+"/"+handle.page)}else if(data.result[0].text == "EXAMS"){navigate("/exams/"+handle.slug+"/"+handle.page)}else{setDataMasterclassCours(data.result[0])}}else{setDataMasterclassCours({
        id:"",
        text:"",
        page:"",
        masterclassID:""
      })}})
      masterclassesCoursAll(dataMasterclassFindOne.id).then(data =>{setDataMasterclassCoursAll(data.result)})
      masterclassQuizzAll(dataMasterclassFindOne.id).then(data =>{setDataMasterclassQuizzAll(data.result)})
      masterclassExamsAll(dataMasterclassFindOne.id).then(data =>{setDataMasterclassExamsAll(data.result)})
      masterclassCheckConfirmModule(user.id, dataMasterclassFindOne.id, handle.page).then(data => {if(data.result[0]!=undefined)setDataConfirmMoudle(data.result[0])})
    }
  }, [dataMasterclassFindOne]);




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
        tempUnite+=`</div>`
        tempBar+=`</div>`
        progressBarGroup += tempUnite + tempBar + `</div><div class="masterclassroom-progress-bar-group">`
        tempUnite = `<div class="masterclassroom-progress-bar-group-unite">`
        tempBar = `<div  class="masterclassroom-progress-bar-group-bar">`
      }

      if(x==tempAllPage2.length - 1){
        progressBarGroup +=  tempUnite + tempBar + `</div>`
      }
    }

    
    setTempProgress(progressBarGroup)
  }, [dataMasterclassCoursAll]);



/*   useEffect(()=>{
    if(dataConfirmModule.userID!=""){
      console.log(dataConfirmModule)
    }
  },[dataConfirmModule]) */


  let confirmModule = function confirmModuleFunction() {
    masterclassConfirmModule(user.id, dataMasterclassFindOne.id, handle.page)
  }

  




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
            <img src={imageURL} alt={dataMasterclassFindOne.title} className="masterclassroom-cours-image"/> 
          </div>
          <ReactMarkdown className="topic-text" children={dataMasterclassCours.text} />
        </div>
        <div className="masterclassroom-confirm-container">
          <button className="masterclassroom-confirm-text-container" onClick={confirmModule}>Confirmer le module</button>
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
