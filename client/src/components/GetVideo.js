import React, { useState } from "react";
import axios from 'axios';
import { urlUsed } from "../constantes";
import { useSelector } from "react-redux";

export default function GetVideo() {
    const [videoUrl, setVideoUrl] = useState(null);
    const user = useSelector((state) => state.user);

    // Fonction pour récupérer une vidéo par son nom
    function getVideo(videoName) {
        axios.get(urlUsed + `/foo/get-video/${videoName}`, {
            responseType: 'blob', // Pour indiquer que la réponse est un fichier binaire (vidéo)
        })
        .then(response => {
            // Créer un objet URL à partir de la réponse Blob
            const videoBlob = response.data;
            const videoUrl = URL.createObjectURL(videoBlob);
            setVideoUrl(videoUrl); // Mettre à jour l'URL de la vidéo
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de la vidéo :', error);
        });
    }

    const [imageURL, setImageURL] = useState(null);
  
    // Fonction pour récupérer une image par son nom
    function getImage(userID) {
      axios.get(urlUsed + `/foo/get-image/profil/${userID}`, {
        responseType: 'blob', // Pour indiquer que la réponse est un fichier binaire (image)
      })
      .then(response => {
        // Créer un objet URL à partir de la réponse Blob
        const imageBlob = response.data;
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageURL(imageUrl); // Mettre à jour l'URL de l'image
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de l\'image :', error);
      });
    }

    return (
        <div>
            {/* Utilisez une fonction de rappel pour onClick */}
            <button onClick={() => getVideo('LivraisonSpciale.mp4')}>VIDEO</button>
            <button onClick={() => getImage(user.id)}>IMAGE</button>
            {imageURL && (
                <div>
                    <img src={imageURL}/>
                </div>
            )}

            {/* Afficher la vidéo si l'URL est définie */}
            {videoUrl && (
                <video controls autoPlay>
                    <source src={videoUrl} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
            )}
        </div>
    );
}
