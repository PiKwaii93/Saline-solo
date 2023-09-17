import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGetImageByUserID from "../hooks/useGetImageByUserID";
import useTopicFindOneByID from "../hooks/useTopicFindOneByID";
import useCategoryFindOneByID from "../hooks/useCategoryFindOneByID";
import useMessageAllByTopic from "../hooks/useMessageAllByTopic";
import useFindUserByID from '../hooks/useFindUserByID';
import { useSelector } from "react-redux";
import useCreateMessage from "../hooks/useCreateMessage";
import "easymde/dist/easymde.min.css";
import { SimpleMdeReact } from "react-simplemde-editor";
import {marked} from 'marked'
import ReactMarkdown from "react-markdown";
import HideIfNotLogged from "./HideIfNotLogged";

export default function Topic(){

    const handle = useParams()

    const user = useSelector((state) => state.user);

    const [triggerEffect, setTriggerEffect] = useState(false);

    const [dataTopic, setDataTopic] = useState({
        categoryID : "",
        id : "",
        text : "",
        title : "",
        userID : ""
    })

    const [dataCategory, setDataCategory] = useState({
        id:"",
        title: ""
    })

    const [dataAllMessages, setDataAllMessages] = useState([])

    const [allUsersTemp, setAllUsersTemp] = useState([])

    const [allUsers, setAllUsers] = useState([])

    
    const getImageByUserID = useGetImageByUserID()

    const topicFindOneByID = useTopicFindOneByID()

    const categoryFindOneByID = useCategoryFindOneByID()

    const messageAllByTopic = useMessageAllByTopic()

    const findUserByID = useFindUserByID()

    const createMessage = useCreateMessage()
    

    

    useEffect(() => {
        setTriggerEffect(false)
        topicFindOneByID(handle.idTopic).then(data =>{setDataTopic(data.result[0])})
        messageAllByTopic(handle.idTopic).then(data =>{setDataAllMessages(data.result)})
    },[triggerEffect])

    useEffect(()=>{
        if(dataTopic.id!=""){
            categoryFindOneByID(dataTopic.categoryID).then(data=>{if(data.result.length!=0)setDataCategory(data.result[0])})
        }
    },[dataTopic])

    useEffect(() => {
        if (dataAllMessages.length !== 0) {
          const updatedDataAllMessages = dataAllMessages.map((message) => {
            // Mettez ici votre logique pour modifier la propriété datetime
            // Par exemple, vous pouvez utiliser Date pour effectuer des conversions
            // Pour cet exemple, je suppose que la propriété datetime est au format ISO 8601
            const dateObj = new Date(message.datetime);
            
            // Vous pouvez extraire la date et l'heure séparément ici
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, "0");
            const day = String(dateObj.getDate()).padStart(2, "0");
            const hours = String(dateObj.getHours()).padStart(2, "0");
            const minutes = String(dateObj.getMinutes()).padStart(2, "0");
            const seconds = String(dateObj.getSeconds()).padStart(2, "0");
            
            // Vous pouvez maintenant mettre à jour la propriété datetime avec le nouveau format
            // Ici, je la mets au format "YYYY-MM-DD HH:MM:SS"
            message.datetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            
            return message;
          });
      
          let tempArray = [];
          let remainingCalls = updatedDataAllMessages.length;
      
          updatedDataAllMessages.forEach((message, index) => {
            findUserByID(message.userID)
              .then((data) => {
                tempArray[index] = data.result[0];
                remainingCalls--;
      
                if (remainingCalls === 0) {
                  setAllUsersTemp(tempArray);
                }
              });
          });
        }
      }, [dataAllMessages]);
      

    useEffect(() => {
        if (allUsersTemp.length !== 0) {
          const fetchData = async () => {
            const newArray = [];
      
            await Promise.all(
              allUsersTemp.map(async (user) => {
                const data = await getImageByUserID(user.id);
                const imageBlob = data;
                const imageUrl = URL.createObjectURL(imageBlob);
                user.image = imageUrl;
                newArray.push(user);
              })
            );
            setAllUsers(newArray);
          };
      
          fetchData();
        }
    }, [allUsersTemp]);




    
    const [createMessageInfo, setCreateMessageInfo] = useState({
        idTopic: handle.idTopic,
        text: '',
        userID: user.id
    });
    
      
      const handleSubmit = (e) => {
        e.preventDefault();
        createMessage(createMessageInfo).then(data=>{if(data.status == "Success")setTriggerEffect(true)})
      };


    const handleEditorChange = (name, value) => {
        setCreateMessageInfo((prev) => ({
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

    return (
        <div className="topic-container">
            <div className="back-container">
                <Link to="/forum" className="menu-burger-link-prevent-style">
                    <span className="back-text">Back</span>
                </Link>
            </div>
            <div className="topic-title-container">
                <span className="topic-title-sujet-text">Sujet : </span>
                <span className="topic-title-text">[{dataCategory.title}] {dataTopic.title}</span>
            </div>
            <div className="topic-page-container">
                <div className="topic-container-all">
                    {dataAllMessages.map((item, index) => (
                        <div key={item.id} style={{ width: "100%" }}>
                            {index % 2 === 0 ? (
                            <div className="topic-container-one">
                                <div className="topic-user-info-container">
                                <div className="topic-user-info-profil-picture-container">
                                    <img className="topic-user-info-profil-picture" src={allUsers[index] && allUsers[index].image ? allUsers[index].image : "/random.png"} alt="photo de profil" />
                                </div>
                                <div className="topic-user-info-text-container">
                                    <div className="topic-user-info-username-container">
                                        {allUsers[index] && (
                                            <span className="topic-user-info-title">{allUsers[index].firstname} {allUsers[index].lastname}</span>
                                        )}
                                    </div>
                                    <div className="topic-user-info-title-container">
                                        {allUsers[index] && (
                                            <span className="topic-user-info-title">{allUsers[index].role}</span>
                                        )}
                                    </div>
                                    <div className="topic-user-info-datetime-container">
                                        <span className="topic-user-info-datetime">{item.datetime}</span>
                                    </div>
                                </div>
                                </div>
                                <div className="topic-text-container">
                                    <ReactMarkdown className="topic-text" children={item.text} />
                                </div>
                            </div>
                            ) : (
                            <div className="topic-container-second">
                                <div className="topic-user-info-container">
                                <div className="topic-user-info-profil-picture-container">
                                    <img className="topic-user-info-profil-picture" src={allUsers[index] && allUsers[index].image ? allUsers[index].image : "/random.png"} alt="photo de profil" />
                                </div>
                                <div className="topic-user-info-text-container">
                                    <div className="topic-user-info-username-container">
                                        {allUsers[index] && (
                                            <span className="topic-user-info-title">{allUsers[index].firstname} {allUsers[index].lastname}</span>
                                        )}
                                    </div>
                                    <div className="topic-user-info-title-container">
                                        {allUsers[index] && (
                                            <span className="topic-user-info-title">{allUsers[index].role}</span>
                                        )}
                                    </div>
                                    <div className="topic-user-info-datetime-container">
                                        <span className="topic-user-info-datetime">{item.datetime}</span>
                                    </div>
                                </div>
                                </div>
                                <div className="topic-text-container">
                                    <ReactMarkdown className="topic-text" children={item.text} />
                                </div>
                            </div>
                            )}
                        </div>
                    ))}

                </div>
            </div>
            <HideIfNotLogged>
                <form
                    noValidate
                    onSubmit={handleSubmit}
                    className="create-topic-form-container"
                >
                    <h5>Vous souahitez répondre ? Ecrivez votre avis ici :</h5>
                    <div className="create-topic-input-container-all">
                        <SimpleMdeReact
                            type="text"
                            name="text"
                            onChange={(value) => handleEditorChange("text", value)}
                            placeholder="Text"
                            required
                            minLength={1}
                            className="create-topic-input-textarea"
                            options={options} // Utilisez les options ici
                        />
                    </div>
                    <button className="login-button" type="submit">
                        Confirmer
                    </button>
                </form>
            </HideIfNotLogged>
        </div>
    );
}
