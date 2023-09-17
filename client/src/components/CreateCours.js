import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import useMasterclassesCoursAll from "../hooks/useMasterclassesCoursAll";
import useMasterclassAll from '../hooks/useMasterclassAll'
import useCreateMasterclassCours from "../hooks/useCreateMasterclassCours";
import useUpdateMasterclassCours from '../hooks/useUpdateMasterclassCours'
import "easymde/dist/easymde.min.css";
import { SimpleMdeReact } from "react-simplemde-editor";
import {marked} from 'marked'
import ReactMarkdown from "react-markdown";

export default function CreateCours(){

    const user = useSelector((state) => state.user);
  
    const [createCoursInfo, setCreateCoursInfo] = useState({
      text: '',
      page: '',
      masterclassID: '',
      role: user.role
    });

    const [textAreaValue, setTextAreaValue] = useState('')

    const [allMasterclassTemp, setAllMasterclassTemp] = useState([])

    const [allMasterclassCours, setAllMasterclassCours] = useState([])

    const [allMasterclassCoursTemp, setAllMasterclassCoursTemp] = useState([])

    const [checkSuccess, setCheckSuccess] = useState(false)

    const masterclassesCoursAll = useMasterclassesCoursAll()

    const masterclassAll = useMasterclassAll()

    const createMasterclassCours = useCreateMasterclassCours();

    const updateMasterclassCours = useUpdateMasterclassCours()
  
    useEffect(()=>{
        setCheckSuccess(false)
        masterclassAll().then(data => {setAllMasterclassTemp(data.result);})
    },[checkSuccess])


    useEffect(()=>{
        if(createCoursInfo.masterclassID!=""){
            masterclassesCoursAll(createCoursInfo.masterclassID).then(data=>{
                if(data.result.length!=0){
                    setAllMasterclassCoursTemp(data.result)
                    let newArrayTemp = []
                    for(let x=0; x<data.result.length; x++){
                        newArrayTemp.push(data.result[x])
                        if(x==data.result.length - 1){
                            newArrayTemp.push({id : "", masterclassID : newArrayTemp[newArrayTemp.length - 1].masterclassID, page : parseInt(newArrayTemp[newArrayTemp.length - 1].page) + 1, text : "> Il s'agit d'une nouvelle page, si vous la validez, elle sera crée et ajoutée à cette masterclass. Pensez à effacer ce texte."})
                        }
                    }
                    let newArray=[]
                        for(let x=1; x<=newArrayTemp.length; x++){
                            for(let y=0; y<newArrayTemp.length; y++){
                                if(newArrayTemp[y].page == x ){
                                    newArray.push(newArrayTemp[y])
                                }
                            }
                        }
                    setAllMasterclassCours(newArray)
                }else{
                    let newArrayTemp = []
                    newArrayTemp.push({id : "", masterclassID : createCoursInfo.masterclassID, page : 1, text : "> Il s'agit d'une nouvelle page, si vous la validez, elle sera crée et ajoutée à cette masterclass. Pensez à effacer ce texte."})
                    setAllMasterclassCours(newArrayTemp)
                }
            })
        }
    },[createCoursInfo.masterclassID, checkSuccess])

    useEffect(()=>{
        if(allMasterclassCours.length!=0 && createCoursInfo.page!=""){
            for(let x=0; x<allMasterclassCours.length; x++){
                if(allMasterclassCours[x].page == createCoursInfo.page){
                    setTextAreaValue(allMasterclassCours[x].text)
                }
            }
        }
    },[allMasterclassCours])

    useEffect(()=>{
        if(createCoursInfo.page!=""){
            for(let x=0; x<allMasterclassCours.length; x++){
                if(allMasterclassCours[x].page == createCoursInfo.page){
                    setTextAreaValue(allMasterclassCours[x].text)

                }
            }
        }
    },[createCoursInfo.page])
  
    
    const handleChange = ({ target }) => {
        if (target.name === 'page') {
            // Find the corresponding text for the selected page and update the textAreaValue
            const selectedPage = parseInt(target.value);
            const selectedCours = allMasterclassCours.find((cours) => cours.page === selectedPage);
            if (selectedCours) {
                setTextAreaValue(selectedCours.text);
            } else {
                // Handle the case where the page doesn't exist
                setTextAreaValue('');
            }
        }
    
        setCreateCoursInfo((prev) => ({
            ...prev,
            [target.name]: target.value,
        }));
    };
    

    const handleEditorChange = (name, value) => {
        setCreateCoursInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const options = useMemo(
        () => ({
        previewRender: (plainText) =>
            plainText // Cette fonction renvoie le texte brut, vous pouvez personnaliser la prévisualisation ici
            ? marked(plainText)
            : "", // Si plainText est vide, retournez une chaîne vide
        spellChecker: false, // Désactivez la vérification orthographique si nécessaire
        }),
        []
    );
    
    const handleSubmit = (e) => {
      e.preventDefault();
      let checkPageExistente = false
      let coursIDTemp;
      for(let x=0; x<allMasterclassCoursTemp.length; x++){
        if(checkPageExistente==false){
            if(allMasterclassCoursTemp[x].page == createCoursInfo.page){
                coursIDTemp = allMasterclassCoursTemp[x].id
                checkPageExistente=true
            }
        }
      }
      if(checkPageExistente==true){
        //Update
        updateMasterclassCours(createCoursInfo, coursIDTemp).then(data=>{if(data.status=="Success"){setCheckSuccess(true)}})
      }else{
        //Create
        createMasterclassCours(createCoursInfo).then(data=>{if(data.status=="Success"){setCheckSuccess(true)}})
      }
      
    };
    


    return (
        <>
            <div className="create-topic-container-all">
            <div className="create-topic-title-container">
                <span className="create-topic-title">Création du topic</span>
            </div>
            <form
                noValidate
                onSubmit={handleSubmit}
                className="create-topic-form-container"
            >
                <div className="create-topic-input-container-all">
                <select 
                    list="create-topic-category-datalist"
                    name="masterclassID"
                    onChange={handleChange}
                    className="create-topic-input"
                >
                    <option value="">--Choisissez la masterclass--</option>
                    {allMasterclassTemp.map(item => (
                        <option key={item.id} value={item.id}>{item.title}</option>
                    ))}
                </select>
                <select 
                    list="create-topic-category-datalist"
                    name="page"
                    onChange={handleChange}
                    className="create-topic-input"
                >
                    <option value="">--A quelle page correspond ce cours --</option>
                    {allMasterclassCours.map(item => (
                        <option key={item.page} value={item.page}>{item.page}</option>
                    ))}
                </select>
                <div className="create-topic-input-container-all">
                    <SimpleMdeReact
                        type="text"
                        name="text"
                        value={textAreaValue}
                        onChange={(value) => handleEditorChange("text", value)}
                        placeholder="Text"
                        required
                        minLength={1}
                        className="create-topic-input-textarea"
                        options={options} // Utilisez les options ici
                    />
                </div>
                </div>
                <button className="login-button" type="submit">
                    Confirmer
                </button>
            </form>
            </div>
            <div className="back-container">
                <Link to="/forum" className="menu-burger-link-prevent-style">
                    <span className="back-text">Back</span>
                </Link>
            </div>
        </>
    );
}
