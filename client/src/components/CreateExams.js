import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import useMasterclassesCoursAll from "../hooks/useMasterclassesCoursAll";
import useMasterclassAll from "../hooks/useMasterclassAll";
import useMasterclassExamsAllByID from "../hooks/useMasterclassExamsAllByMasterclassID";
import useCreateMasterclassExams from "../hooks/useCreateMasterclassExams";
import useCreateMasterclassExamsQuestions from "../hooks/useCreateMasterclassExamsQuestions";
import useUpdateMasterclassExams from "../hooks/useUpdateMasterclassExams";
import useUpdateMasterclassExamsQuestions from "../hooks/useUpdateMasterclassExamsQuestions";
import useMasterclassExams from "../hooks/useMasterclassExams";
import useMasterclassExamsQuestion from "../hooks/useMasterclassExamsQuestion";
import useCreateCertificates from "../hooks/useCreateCertificates";
import useCertificatesFindOneByMasterclassID from "../hooks/useCertificatesFindOneByMasterclassID";
import useGetMasterclassExamsAll from "../hooks/useGetMasterclassExamsAll";

import CreateExamsGenerator from "./CreateExamsGenerator";
import useCreateMasterclassCours from "../hooks/useCreateMasterclassCours";
import useUploadCertificates from "../hooks/useUploadCertificates";

export default function CreateExams(){

    const user = useSelector((state) => state.user);

    const [allQuestionsGenerator, setAllQuestionsGenerator] = useState([])
  
    const [createExamsInfo, setCreateExamsInfo] = useState({
        masterclassID: '',
        examsId: '',
        idExams: '',
        title: '',
        page: '',
        role: user.role
    });


    const [titleValue, setTitleValue] = useState('')

    const [idExamsValue, setIdExamsValue] = useState('')

    const [createExamsQuestionInfoAll, setCreateExamsQuestionInfoAll] = useState([])

    const [allMasterclassTemp, setAllMasterclassTemp] = useState([])

    const [allMasterclassExamsTemp, setAllMasterclassExamsTemp] = useState([])

    const [allMasterclassExams, setAllMasterclassExams] = useState([])

    const [allMasterclassCours, setAllMasterclassCours] = useState([])

    const [allQuestions, setAllQuestions] = useState([])

    const [allQuestionsCheck, setAllQuestionsCheck] = useState([])

    const [checkSuccess, setCheckSuccess] = useState(false)

    const [allQuestionsToSend, setAllQuestionsToSend] = useState([])

    const [checkQuestionsSend,setCheckQuestionsSend] = useState(false)

    const [certificatesInfo, setCertificatesInfo] = useState({
        id : "", 
        masterclassID : "",
        title : ""
    })

    const [dataAllMasterclassExams, setDataAllMasterclassExams] = useState([])
    

    const masterclassesCoursAll = useMasterclassesCoursAll()
    
    const masterclassAll = useMasterclassAll()

    const masterclassExamsAllByID = useMasterclassExamsAllByID()

    const masterclassExams = useMasterclassExams()

    const createMasterclassExams = useCreateMasterclassExams()

    const masterclassExamsQuestion = useMasterclassExamsQuestion()
  
    const createMasterclassExamsQuestions = useCreateMasterclassExamsQuestions()

    const updateMasterclassExams = useUpdateMasterclassExams()

    const updateMasterclassExamsQuestions = useUpdateMasterclassExamsQuestions()
    
    const createMasterclassCours = useCreateMasterclassCours();

    const getMasterclassExamsAll = useGetMasterclassExamsAll()

    

    const createCertificates = useCreateCertificates()

    const certificatesFindOneByMasterclassID = useCertificatesFindOneByMasterclassID()

    useEffect(()=>{
        setCheckSuccess(false)
        setCheckQuestionsSend(false)
        setAllMasterclassExams([])
        masterclassAll().then(data => {setAllMasterclassTemp(data.result)})
        getMasterclassExamsAll().then(data=>{setDataAllMasterclassExams(data.result)})
    },[checkSuccess])

    useEffect(()=>{
        if(createExamsInfo.masterclassID!=""){
            setAllQuestions([])
            setAllQuestionsCheck([])
            setCreateExamsInfo({ ...createExamsInfo, page: '' })
            setFileImage(null)
            document.getElementById('fileInput').value = "";
            document.getElementById('fileInput').value = "";
            certificatesFindOneByMasterclassID(createExamsInfo.masterclassID).then(data=>{if(data.result[0]!=undefined){setCertificatesInfo(data.result[0])}else{setCertificatesInfo({id : "",masterclassID : createExamsInfo.masterclassID,title : "Certificat masterclass " + createExamsInfo.masterclassID})}})
            masterclassesCoursAll(createExamsInfo.masterclassID).then(data=>{
                let newArrayExamsTemp = []
                let newArrayTemp = []
                let checkNoExams=false
                for(let x=0; x<data.result.length; x++){
                    newArrayTemp.push(data.result[x])
                    if(data.result[x].text == "EXAMS"){
                        newArrayExamsTemp.push(data.result[x])
                        checkNoExams=true
                    }
                    if(x==data.result.length - 1 && checkNoExams==false){
                        newArrayExamsTemp.push({id:"",masterclassID:newArrayTemp[newArrayTemp.length - 1].masterclassID ,page:parseInt(newArrayTemp[newArrayTemp.length - 1].page) + 1,text:"EXAMS"})
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
                setAllMasterclassExamsTemp(newArrayExamsTemp)
                setAllMasterclassCours(newArray)
            })
        }
    },[createExamsInfo.masterclassID, checkSuccess])


    useEffect(()=>{
        setFileImage(null)
        document.getElementById('fileInput').value = "";
        if(allMasterclassExamsTemp.length!=0){
            masterclassExamsAllByID(createExamsInfo.masterclassID).then(data=>{
                let newArrayTemp = []
                if(data.result.length>0){
                    for(let x=0; x<data.result.length; x++){
                        newArrayTemp.push(data.result[x])
                    }
                }else{
                    newArrayTemp.push({id : "", idExams : "", masterclassID : allMasterclassExamsTemp[0].masterclassID, page : allMasterclassExamsTemp[0].page, slug : "", title : ""})
                }
                
                setAllMasterclassExams(newArrayTemp)
            })
        }
    },[allMasterclassExamsTemp, checkSuccess])


    useEffect(()=>{
        if(createExamsInfo.page!=""){
            setAllQuestions([])
            setAllQuestionsCheck([])
            for(let x=0; x<allMasterclassExams.length; x++){
                if(allMasterclassExams[x].page == createExamsInfo.page){
                    setTitleValue(allMasterclassExams[x].title)
                    setIdExamsValue(allMasterclassExams[x].idExams)
                    setCreateExamsInfo((prev)=>({...prev, title: allMasterclassExams[x].title}))
                    setCreateExamsInfo((prev)=>({...prev, idExams: allMasterclassExams[x].idExams}))
                    setCreateExamsInfo((prev)=>({...prev, examsId: allMasterclassExams[x].id}))
                    masterclassExamsQuestion(allMasterclassExams[x].id).then(data=>{
                        if(data.status!="Failed"){
                            setAllQuestions(data.result); 
                            setAllQuestionsCheck(data.result)
                        }
                    })
                }
            }
        }
    },[createExamsInfo.page, checkSuccess])


    
    const handleChangeExams = ({ target }) => {
        if(target.name==="title"){
            setTitleValue(target.value)
        }
        if(target.name==="idExams"){
            setIdExamsValue(target.value)
        }
        setCreateExamsInfo((prev) => ({
            ...prev,
            [target.name]: target.value,
        }));
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(createExamsInfo.examsId!=""){
            
            if (fileImage) {
                const formData = new FormData();
                formData.append('image', fileImage);
                formData.append('id', createExamsInfo.examsId) 
    
                uploadCertificates(formData).then(data => console.log(data))
            }
            updateMasterclassExams(createExamsInfo).then(data=>{console.log(data)})
            for(let x=0;x<allQuestions.length; x++){
                if(allQuestionsCheck[x]!=undefined){
                    if(allQuestions[x].id == allQuestionsCheck[x].id){
                        //UPDATE
                        updateMasterclassExamsQuestions(allQuestions[x], user.role).then(data=>{console.log(data)})
                    }
                }else{
                    createMasterclassExamsQuestions(allQuestions[x], user.role).then(data=>{console.log(data)})
                    //CREATE
                }
                setCheckSuccess(true)
            }
        }else{
            //CREATE
            let createCoursInfo={
                text:"EXAMS", 
                page:createExamsInfo.page, 
                masterclassID:createExamsInfo.masterclassID,
                role:user.role
            }
            createMasterclassCours(createCoursInfo).then(data=>{console.log(data)})
            createMasterclassExams(createExamsInfo, user.role).then(data=>{
                let newAllQuestionsArray = []
                for(let x=0; x<allQuestions.length; x++){
                    let tempObject = allQuestions[x]
                    tempObject.masterclassExamsID = data.insertedId
                    newAllQuestionsArray.push(tempObject)
                }
                setAllQuestionsToSend(newAllQuestionsArray)
                setCheckQuestionsSend(true)
            })
            createCertificates(certificatesInfo, user.role).then(data=>{
                console.log(data); 
                if (fileImage) {
                    const formData = new FormData();
                    formData.append('image', fileImage);
                    formData.append('id', data.insertedId) 
        
                    uploadCertificates(formData).then(data => console.log(data))
                }
            })
            setCheckSuccess(true)
        }
        
    };

    useEffect(()=>{
        if(allQuestionsToSend.length!=0 && checkQuestionsSend==true){
            for(let x=0;x<allQuestionsToSend.length; x++){
                createMasterclassExamsQuestions(allQuestionsToSend[x], user.role).then(data=>{console.log(data)})
            }
        }
    }, [allQuestionsToSend])

    const addQuestions = (e) => {
        e.preventDefault();
        let tempQuestion = {
            idExamsQuestions: "",
            masterclassExamsID:"",
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
                idExamsQuestions: allQuestions[allQuestions.length - 1].idExamsQuestions+1,
                masterclassExamsID:allQuestions[allQuestions.length - 1].masterclassExamsID,
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
                idExamsQuestions: 1,
                masterclassExamsID: createExamsInfo.examsId,
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

    const [fileImage, setFileImage] = useState(null);

    const uploadCertificates = useUploadCertificates()
    
    const handleFileChangeImage = (e) => {
      setFileImage(e.target.files[0]);
    };
    


    return (
        <>
            <div className="create-topic-container-all">
            <div className="create-topic-title-container">
                <span className="create-topic-title">Création du exams</span>
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
                        onChange={handleChangeExams}
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
                        onChange={handleChangeExams}
                        className="create-topic-input"
                    >
                        <option value="">--A quelle page correspond ce exams--</option>
                        {allMasterclassExams.map(item => (
                            <option key={item.page} value={item.page}>{item.page}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChangeExams} 
                        placeholder="Sujet du exams"
                        required
                        minLength={1}
                        className="create-topic-input"
                        value={titleValue}
                    />
                    <input
                        type="number"
                        name="idExams"
                        onChange={handleChangeExams} 
                        placeholder="Numéro du exams"
                        required
                        minLength={1}
                        className="create-topic-input"
                        value={idExamsValue}
                    />
                    <input
                        type="file"
                        accept="image/*" 
                        name="image" 
                        onChange={handleFileChangeImage} 
                        id="fileInput"
                        required
                        className="create-topic-input"
                    />
                    
                </div>
                {allQuestions.map(item => (
                    <CreateExamsGenerator key={item.id} initialData={item} setAllQuestions={setAllQuestions} allQuestions={allQuestions}/>
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
