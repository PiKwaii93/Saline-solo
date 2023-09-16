import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import useCategoryAll from "../hooks/useCategoryAll";
import useCreateTopic from "../hooks/useCreateTopic";


export default function CreateTopic(){
  

  const user = useSelector((state) => state.user);

  const [createTopicInfo, setCreateTopicInfo] = useState({
    title: '',
    categoryID: '',
    text: '',
    userID: user.id
  });

  const [allCategory, setAllCategory] = useState([])

  const categoryAll = useCategoryAll()

  const createTopic = useCreateTopic()

  useEffect(()=>{
    categoryAll().then(data => {setAllCategory(data.result)})
  },[])

  
  const handleChange = ({ target }) => {
    setCreateTopicInfo((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(createTopicInfo)
    createTopic(createTopicInfo)
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
              <input
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Title"
                required
                minLength={1}
                className="create-topic-input"
              />
              <select 
                list="create-topic-category-datalist"
                name="categoryID"
                onChange={handleChange}
                placeholder="Category"
                className="create-topic-input"
              >
                <option value="">--Please choose an option--</option>
                {allCategory.map(item => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
              <textarea 
                type="text"
                name="text"
                onChange={handleChange}
                placeholder="Text"
                required
                minLength={1}
                className="create-topic-input-textarea"
              >
              </textarea>
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
