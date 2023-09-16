import React, { useEffect, useState } from 'react';

export default function CreateQuizzGenerator({ initialData, setAllQuestions, allQuestions }) {

    const [formData, setFormData] = useState(initialData);



    const handleChangeQuestion = (e) => {
        const { name, value } = e.target;
        
        setFormData({ ...formData, [name]: value });
        
        const updatedAllQuestions = allQuestions.map((question) => {
          if (question.id === formData.id) {
            return {
              ...question,
              [name]: value
            };
          }
          return question;
        });
        
        setAllQuestions(updatedAllQuestions);
      };
      

    return (
        <div className="create-topic-input-container-all">
            <input
                type="text"
                name="idQuestion"
                value={formData.idQuestion}
                onChange={handleChangeQuestion}
                placeholder="Numéro de la question"
                required
                minLength={1}
                className="create-topic-input"
            />
            <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleChangeQuestion}
                placeholder="Question"
                required
                minLength={1}
                className="create-topic-input"
            />
            <input
                type="text"
                name="answer1"
                value={formData.answer1}
                onChange={handleChangeQuestion}
                placeholder="Réponse 1"
                required
                minLength={1}
                className="create-topic-input"
            />
            <input
                type="text"
                name="answer2"
                value={formData.answer2}
                onChange={handleChangeQuestion}
                placeholder="Réponse 2"
                required
                minLength={1}
                className="create-topic-input"
            />
            <input
                type="text"
                name="answer3"
                value={formData.answer3}
                onChange={handleChangeQuestion}
                placeholder="Réponse 3"
                required
                minLength={1}
                className="create-topic-input"
            />
            <input
                type="text"
                name="answer4"
                value={formData.answer4}
                onChange={handleChangeQuestion}
                placeholder="Réponse 4"
                required
                minLength={1}
                className="create-topic-input"
            />
            <select 
                list="create-topic-category-datalist"
                name="correct"
                onChange={handleChangeQuestion}
                className="create-topic-input"
                value={formData.correct}
            >
                <option value="">--Choisissez la bonne réponse--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
        </div>
    );
}
