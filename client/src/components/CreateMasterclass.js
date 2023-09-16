import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import useUploadMasterclassPicture from "../hooks/useUploadMasterclassPicture";
import useCreateMasterclass from "../hooks/useCreateMasterclass";
import useGetLastMasterclass from "../hooks/useGetLastMasterclass";

export default function CreateMasterclass(){

    const user = useSelector((state) => state.user);
  
    const [createMasterclassInfo, setCreateMasterclassInfo] = useState({
        title:"",
        time:"",
        difficulty:"",
        role: user.role
    });

    const [checkCreateMasterclass, setCheckCreateMasterclass] = useState(false)

    const [dataLastMasterclass, setDataLastMasterclass] = useState({
        difficulty:"",
        id:"",
        image:"",
        slug:"",
        time:"",
        title:""
    })

    const [errorMessage, setErrorMessage] = useState('')
    
    const [successMessage, setSuccessMessage] = useState('')


    const uploadMasterclassPicture = useUploadMasterclassPicture()

    const createMasterclass = useCreateMasterclass()

    const getLastMasterclass = useGetLastMasterclass()

    useEffect(()=>{
        setCheckCreateMasterclass(false)
    }, [])

    
    const handleChange = ({ target }) => {
        setCreateMasterclassInfo((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setCheckCreateMasterclass(false)

        if (fileImage) {

            createMasterclass(createMasterclassInfo).then(data => {
                if(data.status == "Success"){
                    setCheckCreateMasterclass(true)
                }else {
                    setSuccessMessage('')
                    // Le traitement de l'erreur ici
                    setErrorMessage(data.message);
                }
            })
        }else{
            setSuccessMessage('')
            setErrorMessage('Aucune image téléversée')
        }
    };


    useEffect(() => {
        console.log(checkCreateMasterclass)
        if(checkCreateMasterclass==true){
            console.log(checkCreateMasterclass)
            getLastMasterclass().then(data => setDataLastMasterclass(data.result[0]))
        }
    }, [checkCreateMasterclass])

    useEffect(()=>{
        if(dataLastMasterclass.id!=""){
            console.log(dataLastMasterclass)
            const formData = new FormData();
            formData.append('image', fileImage);
            formData.append('id', dataLastMasterclass.id);
            uploadMasterclassPicture(formData).then(data => {console.log(data.status); setErrorMessage(''); setSuccessMessage(data.message)})
        }
    },[dataLastMasterclass])


    const [fileImage, setFileImage] = useState(null);
    
    const handleFileChangeImage = (e) => {
      setFileImage(e.target.files[0]);
    };
    


    return (
        <>
            <div className="create-topic-container-all">
            <div className="create-topic-title-container">
                <span className="create-topic-title">Création d'une masterclass'</span>
            </div>
            {errorMessage != "" &&
                <div className="login-error-container">
                    <span className="login-error-message">{errorMessage}</span>
                </div>
            }
            {successMessage != "" &&
                <div className="login-success-container">
                    <span className="login-success-message">{successMessage}</span>
                </div>
            }

            <form
                noValidate
                onSubmit={handleSubmit}
                className="create-topic-form-container"
            >
                <div className="create-topic-input-container-all">
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="Sujet de la masterclass"
                    required
                    minLength={1}
                    className="create-topic-input"
                />
                <select 
                    list="create-topic-category-datalist"
                    name="difficulty"
                    onChange={handleChange}
                    placeholder="Difficulty"
                    className="create-topic-input"
                >
                    <option value="">--Please choose an option--</option>
                    <option value="facile">Facile</option>
                    <option value="moyenne">Moyenne</option>
                    <option value="difficile">Difficile</option>
                    
                </select>
                <input
                    type="number"
                    name="time"
                    onChange={handleChange}
                    placeholder="Temps de complétion (en heure)"
                    required
                    minLength={1}
                    className="create-topic-input"
                />
                <input
                    type="file"
                    accept="image/*" 
                    name="image"
                    onChange={handleFileChangeImage}
                    required
                    className="create-topic-input"
                />
                </div>
                <button className="login-button" type="submit">
                    Confirmer
                </button>
            </form>
            </div>
            <div className="back-container">
                <Link to="/" className="menu-burger-link-prevent-style">
                    <span className="back-text">Back</span>
                </Link>
            </div>
        </>
    );
}
