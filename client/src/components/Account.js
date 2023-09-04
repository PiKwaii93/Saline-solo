import React, { useEffect, useState } from "react";
import { profilPictureUser, updateUsersInformation, updateUsersPassword } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import useUsersCertificates from "../hooks/useCertificatesFindOne";
import useCertificatesFindOneByMasterclassID from "../hooks/useCertificatesFindOneByMasterclassID";
import useCertificatesFindOneByCertificatesID from "../hooks/useCertificatesFindOneByCertificatesID";
import axios from "axios";
import { urlUsed } from "../constantes";


export default function Account() {

      const dispatch = useDispatch();

      const [allUsersCertificates, setAllUsersCertificates] = useState([])
  
      const user = useSelector((state) => state.user);

      const [dataUsersCertificates, setDataUsersCertificates] = useState([])

      const usersCertificates = useUsersCertificates()

      const certificatesFindOneByMasterclassID = useCertificatesFindOneByMasterclassID()

      const certificatesFindOneByCertificatesID = useCertificatesFindOneByCertificatesID()

      useEffect(() => {
        usersCertificates(user.id).then(data => {if(data.result.length!=0)setDataUsersCertificates(data.result)})
      },[])

      useEffect(() => {
        if(dataUsersCertificates.length!=0){
          setAllUsersCertificates([])
          for(let x=0; x<dataUsersCertificates.length; x++){
            certificatesFindOneByCertificatesID(dataUsersCertificates[x].certificatesID).then(data => {
              if(allUsersCertificates.length!=0){
                for(let x=0; x<allUsersCertificates.length; x++){
                  if(allUsersCertificates[x].hasOwnProperty("id") && allUsersCertificates[x]["id"] === data.result[0].id){
                    
                  }
                }
              }else{
                setAllUsersCertificates((prev) => [...prev, data.result[0]])
              }
            })
          }
        }
      }, [dataUsersCertificates])

      const [imageURL, setImageURL] = useState("/noOne.png");

      function getImage(){
        axios.get(urlUsed + `/foo/get-image/profil/${user.id}`, {
          responseType: 'blob', // Pour indiquer que la réponse est un fichier binaire (image)
        })
        .then(response => {
          // Créer un objet URL à partir de la réponse Blob
          const imageBlob = response.data;
          const imageUrl = URL.createObjectURL(imageBlob);
          console.log(imageBlob)
          setImageURL(imageUrl); // Mettre à jour l'URL de l'image
        })
        .catch(error => {
          setImageURL('/random.png')
          console.error('Erreur lors de la récupération de l\'image :', error);
        });
      }

      useEffect(() => {
        getImage()
      }, [])
       

      const [fileImage, setFileImage] = useState(null);
    
      const handleFileChangeImage = (e) => {
        setFileImage(e.target.files[0]);
      };
    
    
      const handleUploadImage = () => {
        if (fileImage) {
          const formData = new FormData();
          formData.append('image', fileImage);
          formData.append('id', user.id) // Supposons que vous avez un champ de description dans votre formulaire

          console.log(formData)
    
          axios.post(urlUsed+'/foo/uploadImage/profil', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
            .then((response) => {
              console.log('Image uploaded successfully:', response.data);
              getImage()
              // Réinitialisez le formulaire ou effectuez d'autres actions après l'upload
            })
            .catch((error) => {
              console.error('Error uploading image:', error);
            });
        }
      };
/* CHECK */
      const [fileVideo, setFileVideo] = useState(null);
      const [description, setDescription] = useState('');
    
      const handleFileChangeVideo = (e) => {
        setFileVideo(e.target.files[0]);
      };
    
      const handleDescriptionChangeVideo = (e) => {
        setDescription(e.target.value);
      };
    
      const handleUploadVideo = () => {
        if (fileVideo) {
          const formData = new FormData();
          formData.append('video', fileVideo);
          formData.append('description', description); // Supposons que vous avez un champ de description dans votre formulaire

          console.log(formData)
    
          axios.post(urlUsed+'/foo/uploadVideo/cours', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
            .then((response) => {
              console.log('Video uploaded successfully:', response.data);
              // Réinitialisez le formulaire ou effectuez d'autres actions après l'upload
            })
            .catch((error) => {
              console.error('Error uploading video:', error);
            });
        }
      };

      const [isActiveCertificates, setIsActiveCertificates] = useState(false);
      
      const [isActiveAccount, setIsActiveAccount] = useState(false);

      

      const [infosUpdate, setInfosUpdate] = useState({
        newFirstName: '',
        newLastName: '',
        newEmail: '',
        id: user.id
      });

      const [infosUpdatePassword, setInfosUpdatePassword] = useState({
        email: user.email,
        newPassword: '',
        newPasswordConfirm: '',
        id: user.id
      });

      const [checkRequest, setCheckRequest] =useState(false)

      const handleChange = ({ target }) => {
        setInfosUpdate((prev) => ({
          ...prev,
          [target.name]: target.value,
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(infosUpdate)
        setCheckRequest(true)
        dispatch(updateUsersInformation(infosUpdate));
      };

      const handleChangePassword = ({ target }) => {
        setInfosUpdatePassword((prev) => ({
          ...prev,
          [target.name]: target.value,
        }));
      };

      const handleSubmitPassword = (e) => {
        e.preventDefault();
        console.log(infosUpdatePassword)
        setCheckRequest(true)
        dispatch(updateUsersPassword(infosUpdatePassword));
      };

      return (
        <div className="profil-container-page">
          <div className="profil-title-container">
            <span className="profil-title">Profile</span>
          </div>
          <div className="profil-container-all">
            <div className="profil-container-tab">
              <div className="profil-container-information-all">
                {imageURL && (
                        <img className="profil-picture" src={imageURL} alt="Profil Picture" />
                )}
                <div className="profil-container-information-text-all">
                  <div className="profil-container-information-text">
                    <span className="profil-micro-information-text">{user.email}</span>
                    <span className="profil-information-text">{user.firstName} {user.lastName}</span>
                  </div>
                  <div>
                    <h2>Upload a Image</h2>
                    <input type="file" accept="image/*" onChange={handleFileChangeImage} />
                    <button onClick={handleUploadImage}>Upload</button>
                  </div>
                </div>
              </div>
              <div>
                <h2>Upload a Video</h2>
                <input type="file" accept="video/*" onChange={handleFileChangeVideo} />
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={handleDescriptionChangeVideo}
                />
                <button onClick={handleUploadVideo}>Upload</button>
              </div>
              <div className="profil-container-menu-all">
                <div className="profil-container-menu-title">
                  <span className="profil-menu-title">Personal details</span>
                </div>
                <div className="profil-container-menu-tab">

                  <div className="profil-container-menu"  onClick={() => setIsActiveAccount(!isActiveAccount)}>
                      <div className="profil-menu-text-container">
                        <span className="profil-menu-text">Account</span>
                        <span className="profil-menu-micro-text">Manage your name, email, password and subscription.</span>
                      </div>
                      {isActiveAccount ? <img className="profil-menu-picture" src="/Arrow_down3.svg" alt="Account" /> : <img className="profil-menu-picture" src="/Arrow_right2.svg" alt="Account" />}
                    </div>
                    {isActiveAccount && 
                      <div className="profil-menu-accordion-container">
                        
                        {user.errorMessage.length > 0 && checkRequest==true &&
                          <div className="login-error-container">
                            <span className="login-error-message">{user.errorMessage}</span>
                          </div>
                        }
                        {user.errorMessage.length == 0 && checkRequest==true && 
                          <div className="login-success-container">
                            <span className="login-success-message">Success</span>
                          </div> 
                        }
                        
                        <form
                          noValidate
                          onSubmit={handleSubmit}
                          className="form-container"
                        >
                          <div className="register-input-container-all">
                            <input
                              type="text"
                              name="newEmail"
                              onChange={handleChange}
                              placeholder="Email address"
                              required
                              minLength={1}
                              className="register-input"
                            />
                            <input
                              type="text"
                              name="newFirstName"
                              onChange={handleChange}
                              placeholder="First Name"
                              required
                              minLength={1}
                              className="register-input"
                            />
                            <input
                              type="text"
                              name="newLastName"
                              onChange={handleChange}
                              placeholder="Last Name"
                              required
                              minLength={1}
                              className="register-input"
                            />
                          </div>
                          <button className="register-button" type="submit">
                            Mettre à jour
                          </button>
                        </form>

                        <form
                          noValidate
                          onSubmit={handleSubmitPassword}
                          className="form-container"
                        >
                          <div className="register-input-container-all">
                            <input
                              type="text"
                              name="newPassword"
                              onChange={handleChangePassword}
                              placeholder="Password"
                              required
                              minLength={1}
                              className="register-input"
                            />
                            <input
                              type="text"
                              name="newPasswordConfirm"
                              onChange={handleChangePassword}
                              placeholder="Confirm Password"
                              required
                              minLength={1}
                              className="register-input"
                            />
                          </div>
                          <button className="register-button" type="submit">
                            Mettre à jour
                          </button>
                        </form>
                      </div>
                    }
                  <span className="profil-divider"></span>

                  <div className="profil-container-menu"  onClick={() => setIsActiveCertificates(!isActiveCertificates)}>
                      <div className="profil-menu-text-container">
                        <span className="profil-menu-text">Certificate</span>
                      </div>
                      {isActiveCertificates ? <img className="profil-menu-picture" src="/Arrow_down3.svg" alt="Account" /> : <img className="profil-menu-picture" src="/Arrow_right2.svg" alt="Account" />}
                    </div>
                    {isActiveCertificates && <div className="profil-menu-accordion-container">
                      {allUsersCertificates.map(item => (
                        <div key={item.id} className="profil-menu-accordion-text-container">
                          <img className="profil-menu-certificate-picture" src={"/certificate"+item.id+".png"} alt={"certificate"+item.id} />
                          <span className="profil-menu-accordion-text">{item.title}</span>
                        </div>
                      ))}
                    </div>}
                  <span className="profil-divider"></span>
                  
                  <div className="profil-container-menu">
                    <div className="profil-menu-text-container">
                      <span className="profil-menu-text">My progress</span>
                    </div>
                    <img className="profil-menu-picture" src="/Arrow_right2.svg" alt="My progress" />
                  </div>
                  <span className="profil-divider"></span>
                  <div className="profil-container-menu">
                    <div className="profil-menu-text-container">
                      <span className="profil-menu-text">Planning</span>
                    </div>
                    <img className="profil-menu-picture" src="/Arrow_right2.svg" alt="Planning" />
                  </div>
                  <span className="profil-divider"></span>
                  <div className="profil-container-menu">
                    <div className="profil-menu-text-container">
                      <span className="profil-menu-text">Upcoming test</span>
                    </div>
                    <img className="profil-menu-picture" src="/Arrow_right2.svg" alt="Upcoming test" />
                  </div>
                  <span className="profil-divider"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
}