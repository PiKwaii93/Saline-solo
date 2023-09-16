import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import useMasterclassesCoursAll from "../hooks/useMasterclassesCoursAll";
import useMasterclassAll from "../hooks/useMasterclassAll";
import useMasterclassQuizzAllByID from "../hooks/useMasterclassQuizzAllByMasterclassID";
import useCreateMasterclassQuizz from "../hooks/useCreateMasterclassQuizz";
import useCreateMasterclassQuizzQuestions from "../hooks/useCreateMasterclassQuizzQuestions";
import useUpdateMasterclassQuizz from "../hooks/useUpdateMasterclassQuizz";
import useUpdateMasterclassQuizzQuestions from "../hooks/useUpdateMasterclassQuizzQuestions";
import useMasterclassQuizz from "../hooks/useMasterclassQuizz";
import useMasterclassQuizzQuestion from "../hooks/useMasterclassQuizzQuestion";

import CreateQuizzGenerator from "./CreateQuizzGenerator";
import useCreateMasterclassCours from "../hooks/useCreateMasterclassCours";

export default function CreateQuizz(){

    const user = useSelector((state) => state.user);

    const [allQuestionsGenerator, setAllQuestionsGenerator] = useState([])
  
    const [createQuizzInfo, setCreateQuizzInfo] = useState({
        masterclassID: '',
        quizzId: '',
        idQuizz: '',
        title: '',
        page: '',
        role: user.role
    });


    const [titleValue, setTitleValue] = useState('')

    const [idQuizzValue, setIdQuizzValue] = useState('')

    const [createQuizzQuestionInfoAll, setCreateQuizzQuestionInfoAll] = useState([])

    const [allMasterclassTemp, setAllMasterclassTemp] = useState([])

    const [allMasterclassQuizzTemp, setAllMasterclassQuizzTemp] = useState([])

    const [allMasterclassQuizz, setAllMasterclassQuizz] = useState([])

    const [allMasterclassCours, setAllMasterclassCours] = useState([])

    const [allQuestions, setAllQuestions] = useState([])

    const [allQuestionsCheck, setAllQuestionsCheck] = useState([])

    const [checkSuccess, setCheckSuccess] = useState(false)

    const [allQuestionsToSend, setAllQuestionsToSend] = useState([])

    const [checkQuestionsSend,setCheckQuestionsSend] = useState(false)

    

    const masterclassesCoursAll = useMasterclassesCoursAll()
    
    const masterclassAll = useMasterclassAll()

    const masterclassQuizzAllByID = useMasterclassQuizzAllByID()

    const masterclassQuizz = useMasterclassQuizz()

    const createMasterclassQuizz = useCreateMasterclassQuizz()

    const masterclassQuizzQuestion = useMasterclassQuizzQuestion()
  
    const createMasterclassQuizzQuestions = useCreateMasterclassQuizzQuestions()

    const updateMasterclassQuizz = useUpdateMasterclassQuizz()

    const updateMasterclassQuizzQuestions = useUpdateMasterclassQuizzQuestions()
    
    const createMasterclassCours = useCreateMasterclassCours();

    /* 

    const createCertificates=useCreateCertificates()

    const certificatesFindOneByMasterclassID = useCertificatesFindOneByMasterclassID() */

    useEffect(()=>{
        setCheckSuccess(false)
        setCheckQuestionsSend(false)
        setAllMasterclassQuizz([])
        masterclassAll().then(data => {setAllMasterclassTemp(data.result)})
    },[checkSuccess])

    useEffect(()=>{
        if(createQuizzInfo.masterclassID!=""){
            setAllQuestions([])
            setAllQuestionsCheck([])
            setCreateQuizzInfo({ ...createQuizzInfo, page: '' })
            /* certificatesFindOneByMasterclassID(createExamsInfo.masterclassID).then(data=>{setCertificates(data.result[0])}) */
            masterclassesCoursAll(createQuizzInfo.masterclassID).then(data=>{
                let newArrayQuizzTemp = []
                let newArrayTemp = []
                for(let x=0; x<data.result.length; x++){
                    newArrayTemp.push(data.result[x])
                    if(data.result[x].text == "QUIZZ"){
                        newArrayQuizzTemp.push(data.result[x])
                    }
                    if(x==data.result.length - 1){
                        newArrayQuizzTemp.push({id:"",masterclassID:newArrayTemp[newArrayTemp.length - 1].masterclassID ,page:parseInt(newArrayTemp[newArrayTemp.length - 1].page) + 1,text:"QUIZZ"})
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
                setAllMasterclassQuizzTemp(newArrayQuizzTemp)
                setAllMasterclassCours(newArray)
            })
        }
    },[createQuizzInfo.masterclassID, checkSuccess])

    useEffect(()=>{
        console.log(allMasterclassQuizzTemp)
    },[allMasterclassQuizzTemp])

    useEffect(()=>{
        if(allMasterclassQuizzTemp.length!=0){
            masterclassQuizzAllByID(createQuizzInfo.masterclassID).then(data=>{
                let newArrayTemp = []
                for(let x=0; x<data.result.length; x++){
                    newArrayTemp.push(data.result[x])
                    if(x==data.result.length-1){
                        newArrayTemp.push({id : "", idQuizz : "", masterclassID : newArrayTemp[newArrayTemp.length - 1].masterclassID, page : allMasterclassQuizzTemp[allMasterclassQuizzTemp.length -1].page, slug : "", title : ""})
                    }
                }
                setAllMasterclassQuizz(newArrayTemp)
            })
        }
    },[allMasterclassQuizzTemp, checkSuccess])


    useEffect(()=>{
        if(createQuizzInfo.page!=""){
            setAllQuestions([])
            setAllQuestionsCheck([])
            for(let x=0; x<allMasterclassQuizz.length; x++){
                if(allMasterclassQuizz[x].page == createQuizzInfo.page){
                    setTitleValue(allMasterclassQuizz[x].title)
                    setIdQuizzValue(allMasterclassQuizz[x].idQuizz)
                    setCreateQuizzInfo((prev)=>({...prev, title: allMasterclassQuizz[x].title}))
                    setCreateQuizzInfo((prev)=>({...prev, idQuizz: allMasterclassQuizz[x].idQuizz}))
                    setCreateQuizzInfo((prev)=>({...prev, quizzId: allMasterclassQuizz[x].id}))
                    masterclassQuizzQuestion(allMasterclassQuizz[x].id).then(data=>{
                        if(data.status!="Failed"){
                            setAllQuestions(data.result); 
                            setAllQuestionsCheck(data.result)
                        }
                    })
                }
            }
        }
    },[createQuizzInfo.page, checkSuccess])

/*     useEffect(()=>{
        if(allQuestions.length!=0){
            console.log(allQuestions)
        }
    },[allQuestions]) */

    
    const handleChangeQuizz = ({ target }) => {
        if(target.name==="title"){
            setTitleValue(target.value)
        }
        if(target.name==="idQuizz"){
            setIdQuizzValue(target.value)
        }
        setCreateQuizzInfo((prev) => ({
            ...prev,
            [target.name]: target.value,
        }));
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(createQuizzInfo.quizzId!=""){
            updateMasterclassQuizz(createQuizzInfo).then(data=>{console.log(data)})
            for(let x=0;x<allQuestions.length; x++){
                if(allQuestionsCheck[x]!=undefined){
                    if(allQuestions[x].id == allQuestionsCheck[x].id){
                        //UPDATE
                        updateMasterclassQuizzQuestions(allQuestions[x], user.role).then(data=>{console.log(data)})
                    }
                }else{
                    console.log("existe pas")
                    createMasterclassQuizzQuestions(allQuestions[x], user.role).then(data=>{console.log(data)})
                    //CREATE
                }
                setCheckSuccess(true)
                
            }
        }else{
            //CREATE
            let createCoursInfo={
                text:"QUIZZ", 
                page:createQuizzInfo.page, 
                masterclassID:createQuizzInfo.masterclassID,
                role:user.role
            }
            createMasterclassCours(createCoursInfo).then(data=>{console.log(data)})
            createMasterclassQuizz(createQuizzInfo, user.role).then(data=>{
                let newAllQuestionsArray = []
                for(let x=0; x<allQuestions.length; x++){
                    let tempObject = allQuestions[x]
                    tempObject.masterclassQuizzID = data.insertedId
                    newAllQuestionsArray.push(tempObject)
                }
                setAllQuestionsToSend(newAllQuestionsArray)
                setCheckQuestionsSend(true)
            })
            setCheckSuccess(true)
        }
    };

    useEffect(()=>{
        if(allQuestionsToSend.length!=0 && checkQuestionsSend==true){
            for(let x=0;x<allQuestionsToSend.length; x++){
                createMasterclassQuizzQuestions(allQuestionsToSend[x], user.role).then(data=>{console.log(data)})
            }
        }
    }, [allQuestionsToSend])

    const addQuestions = (e) => {
        e.preventDefault();
        let tempQuestion = {
            idQuestion: "",
            masterclassQuizzID:"",
            question: '',
            answer1:'',
            answer2:'',
            answer3:'',
            answer4:'',
            correct:'',
            id:""
        }
        if(allQuestions[0]!=undefined){
            tempQuestion = {
                idQuestion: allQuestions[allQuestions.length - 1].idQuestion+1,
                masterclassQuizzID:allQuestions[allQuestions.length - 1].masterclassQuizzID,
                question: '',
                answer1:'',
                answer2:'',
                answer3:'',
                answer4:'',
                correct:'',
                id:allQuestions[allQuestions.length - 1].id+1
            }
        }else{
            tempQuestion = {
                idQuestion: 1,
                masterclassQuizzID: createQuizzInfo.quizzId,
                question: '',
                answer1:'',
                answer2:'',
                answer3:'',
                answer4:'',
                correct:'',
                id: 1
            }
        }
        setAllQuestions([...allQuestions, tempQuestion])

    }
    


    return (
        <>
            <div className="create-topic-container-all">
            <div className="create-topic-title-container">
                <span className="create-topic-title">Création du quizz</span>
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
                        onChange={handleChangeQuizz}
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
                        onChange={handleChangeQuizz}
                        className="create-topic-input"
                    >
                        <option value="">--A quelle page correspond ce quizz--</option>
                        {allMasterclassQuizz.map(item => (
                            <option key={item.page} value={item.page}>{item.page}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChangeQuizz} 
                        placeholder="Sujet du quizz"
                        required
                        minLength={1}
                        className="create-topic-input"
                        value={titleValue}
                    />
                    <input
                        type="number"
                        name="idQuizz"
                        onChange={handleChangeQuizz} 
                        placeholder="Numéro du quizz"
                        required
                        minLength={1}
                        className="create-topic-input"
                        value={idQuizzValue}
                    />
                    
                </div>
                {allQuestions.map(item => (
                    <CreateQuizzGenerator key={item.id} initialData={item} setAllQuestions={setAllQuestions} allQuestions={allQuestions}/>
                ))}
                <span className="create-topic-add-question-container" onClick={addQuestions}>
                    <img className="create-topic-add-question-picture" src="/Add.svg" alt="Ajouter une nouvelle question" />
                    <div className="create-topic-add-question-text-container">
                        <span className="create-topic-add-question-text">Ajouter une nouvelle question</span>
                    </div>
                </span>
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
