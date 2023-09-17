import React, { useEffect, useState } from "react";
import { profilPictureUser, updateUsersInformation, updateUsersPassword } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import useUsersCertificates from "../hooks/useCertificatesFindOne";
import useCertificatesFindOneByMasterclassID from "../hooks/useCertificatesFindOneByMasterclassID";
import useCertificatesFindOneByCertificatesID from "../hooks/useCertificatesFindOneByCertificatesID";
import useGetImageByUserID from "../hooks/useGetImageByUserID";
import useUploadProfilPicture from "../hooks/useUploadProfilPicture";
import axios from "axios";
import { urlUsed } from "../constantes";
import useGetImageByCertificatesID from "../hooks/useGetImageByCertificatesID";
import useMasterclassCheckConfirmModuleByUserID from "../hooks/useMasterclassCheckConfirmModuleByUserID";
import useMasterclassesCoursAll from "../hooks/useMasterclassesCoursAll";
import useMasterclassByID from "../hooks/useMasterclassByID";
import { Link } from "react-router-dom";


export default function Account() {

      const dispatch = useDispatch();

      const [allUsersCertificates, setAllUsersCertificates] = useState([])

      const [allUsersImageCertificates, setAllUsersImageCertificates] = useState([])
  
      const user = useSelector((state) => state.user);

      const [dataUsersCertificates, setDataUsersCertificates] = useState([])

      const [dataConfirmModule, setDataConfirmModule] = useState([])

      const [dataAllMasterclassCours, setDataAllMasterclassCours] = useState([])

      const [allMasterclassIDCompleted, setAllMasterclassIDCompleted] = useState([])

      const [pourcentageCompletions, setPourcentageCompletions] = useState({});





      const usersCertificates = useUsersCertificates()

      const certificatesFindOneByMasterclassID = useCertificatesFindOneByMasterclassID()

      const certificatesFindOneByCertificatesID = useCertificatesFindOneByCertificatesID()

      const getImageByCertificatesID = useGetImageByCertificatesID()

      const uploadProfilPicture = useUploadProfilPicture()

      const getImageByUserID = useGetImageByUserID()

      const masterclassCheckConfirmModuleByUserID = useMasterclassCheckConfirmModuleByUserID()

      const masterclassesCoursAll = useMasterclassesCoursAll();
      
      const masterclassByID = useMasterclassByID()
      

      useEffect(() => {
        usersCertificates(user.id).then(data => {if(data.result.length!=0)setDataUsersCertificates(data.result)})
        masterclassCheckConfirmModuleByUserID(user.id).then(data=>{setDataConfirmModule(data.result)})
      },[])

      useEffect(()=>{
        if(dataConfirmModule.length!=0){
          let allMasterclassID = []
          for(let x=0; x<dataConfirmModule.length; x++){
            if(!allMasterclassID.includes(dataConfirmModule[x].masterclassID)){
              allMasterclassID.push(dataConfirmModule[x].masterclassID)
            }
          }
          setAllMasterclassIDCompleted(allMasterclassID)
          const fetchData = () => {
            const promises = allMasterclassID.map((id) => masterclassesCoursAll(id));
            Promise.all(promises)
              .then((results) => {
                const flattenedData = results.map((data) => data.result)
                setDataAllMasterclassCours(flattenedData);
              })
          };
      
          fetchData();
        }
      },[dataConfirmModule])


      useEffect(() => {
        if (dataAllMasterclassCours.length !== 0) {
      
          let nbrCompletedArray = [];
          for (let x = 0; x < allMasterclassIDCompleted.length; x++) {
            let nbrCompleted = 0;
            for (let y = 0; y < dataConfirmModule.length; y++) {
              if (dataConfirmModule[y].masterclassID == allMasterclassIDCompleted[x]) {
                nbrCompleted++;
              }
            }
            nbrCompletedArray.push(nbrCompleted);
          }
      
          let pourcentageArray = [];
      
          const fetchAndSetPourcentage = (masterclassID, percentage) => {
            masterclassByID(masterclassID)
              .then((data) => {
                const title = data.result[0].title; 
                const slug = data.result[0].slug; 
                pourcentageArray.push({ masterclassID, percentage, title, slug });
                if (pourcentageArray.length === allMasterclassIDCompleted.length) {
                  setPourcentageCompletions(pourcentageArray);
                }
              })
          };
      
          for (let x = 0; x < nbrCompletedArray.length; x++) {
            const masterclassID = allMasterclassIDCompleted[x];
            const percentage = ((nbrCompletedArray[x] / dataAllMasterclassCours[x].length) * 100).toFixed(0);
            fetchAndSetPourcentage(masterclassID, percentage);
          }
        }
      }, [dataAllMasterclassCours]);

      useEffect(() => {
        if(dataUsersCertificates.length!=0){
          let tempAllCertificates = []
          let tempAllImageCertificates = []
          for(let x=0; x<dataUsersCertificates.length; x++){
            certificatesFindOneByCertificatesID(dataUsersCertificates[x].certificatesID).then(data => {tempAllCertificates.push(data.result[0])})
            getImageByCertificatesID(dataUsersCertificates[x].certificatesID).then(data => {
              const imageBlob = data;
              const imageUrl = URL.createObjectURL(imageBlob);
              tempAllImageCertificates.push(imageUrl); 
            }).catch(error => {
              tempAllImageCertificates.push('/random.png')
              console.error('Erreur lors de la récupération de l\'image :', error);
            });
          }
          setAllUsersCertificates(tempAllCertificates)
          setAllUsersImageCertificates(tempAllImageCertificates)
        }
      }, [dataUsersCertificates])

      const [imageURL, setImageURL] = useState("/noOne.png");

      function getImage(){

        getImageByUserID(user.id).then(data => {
          const imageBlob = data;
          const imageUrl = URL.createObjectURL(imageBlob);
          setImageURL(imageUrl); 
        }).catch(error => {
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
          formData.append('id', user.id) 

          uploadProfilPicture(formData).then(data => getImage())
        }
      };
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
          formData.append('description', description); 
    
          axios.post(urlUsed+'/foo/uploadVideo/cours', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
            .then((response) => {
              console.log('Video uploaded successfully:', response.data);
            })
            .catch((error) => {
              console.error('Error uploading video:', error);
            });
        }
      };

      const [isActiveCertificates, setIsActiveCertificates] = useState(false);
      
      const [isActiveAccount, setIsActiveAccount] = useState(false);

      const [isActiveProgression, setIsActiveProgression] = useState(false);

      

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
                    <input type="file" accept="image/*" onChange={handleFileChangeImage} className="profil-change-image-input"/>
                    <button onClick={handleUploadImage}>Upload</button>
                  </div>
                </div>
              </div>
              {/* <div>
                <h2>Upload a Video</h2>
                <input type="file" accept="video/*" onChange={handleFileChangeVideo} />
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={handleDescriptionChangeVideo}
                />
                <button onClick={handleUploadVideo}>Upload</button>
              </div> */}
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
                      {isActiveCertificates ? <img className="profil-menu-picture" src="/Arrow_down3.svg" alt="Certificates" /> : <img className="profil-menu-picture" src="/Arrow_right2.svg" alt="Certificates" />}
                    </div>
                    {isActiveCertificates && <div className="profil-menu-accordion-container">
                    {allUsersCertificates.map((item, index) => (
                      <div key={item.id} className="profil-menu-accordion-text-container">
                        <img
                          className="profil-menu-certificate-picture"
                          src={allUsersImageCertificates[index]}
                          alt={"certificate" + item.id}
                        />
                        <span className="profil-menu-accordion-text">
                          {`Certificate ${index + 1}: ${item.title}`}
                        </span>
                      </div>
                    ))}

                    </div>}
                  <span className="profil-divider"></span>

                  <div className="profil-container-menu"  onClick={() => setIsActiveProgression(!isActiveProgression)}>
                      <div className="profil-menu-text-container">
                        <span className="profil-menu-text">Progression</span>
                      </div>
                      {isActiveProgression ? <img className="profil-menu-picture" src="/Arrow_down3.svg" alt="Progression" /> : <img className="profil-menu-picture" src="/Arrow_right2.svg" alt="Progression" />}
                    </div>
                    {isActiveProgression && <div className="profil-menu-accordion-container">
                    {pourcentageCompletions.map((item, index) => (
                      <Link key={index} to={"/masterclassroom/" + item.slug + "/1"}>
                        <div className="profil-menu-accordion-text-container">
                          {item.title} : {item.percentage} %
                        </div>
                      </Link>
                      
                    ))}

                    </div>}
                  
                  
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
