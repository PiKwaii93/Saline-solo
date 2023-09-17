import express from 'express';
import pool from '../config/db.js';
import { testDatabase } from '../controllers/testDatabaseController.js';
import { login, register, updateUsersInformation, updateUsersPassword, findUserByID } from '../controllers/userController.js';
import multer from 'multer'
import * as fs from 'fs';
import path from 'path';
import { masterclassAll, masterclassByID, masterclassCheckConfirmModule, masterclassCheckConfirmModuleFindOne, masterclassCheckConfirmModuleByUserID, masterclassConfirmModule, masterclassFindOne, masterclasscours, masterclasscoursAll, masterclassQuizzAllByMasterclassID, masterclassExamsAllByMasterclassID, masterclassQuizz, masterclassQuizzQuestion, masterclassExamsAll, masterclassExams, masterclassExamsQuestion, createMasterclass, getLastMasterclass, updateMasterclass, createMasterclassCours, updateMasterclassCours, createMasterclassQuizz, updateMasterclassQuizz, createMasterclassQuizzQuestions, updateMasterclassQuizzQuestions, createMasterclassExams, updateMasterclassExams, createMasterclassExamsQuestions, updateMasterclassExamsQuestions } from '../controllers/masterclassController.js';
import { certificatesAll, certificatesFindOneByMasterclassID, usersCertificates, newUsersCertificates, checkUsersCertificates, certificatesFindOneByCertificatesID, createCertificates } from '../controllers/certificatesController.js';
import { topicAll, topicFindOneByID, topicFindOneByCategory, topicFindOneByAuthor, createTopic, messageAll, messageFindOneByID, messageFindOneByTopic, messageFindOneByAuthor, createMessage,  categoryAll, categoryFindOneByID } from '../controllers/forumController.js';
import { getImageByUserID, getImageByMasterclassID, getImageByCertificatesID } from '../controllers/mediaController.js';

const router = express.Router();

router.get('/meow', function(req, res){
    res.send('meow');
});

router.get('/test', function(req, res){
    res.send('test');
});

router.get('/database', testDatabase);

router.post('/user/login', login)

router.post('/user/register', register)

router.post('/user/updateUsersInformation', updateUsersInformation) 

router.post('/user/updateUsersPassword', updateUsersPassword) 
 
router.post('/user/findUserByID', findUserByID) 

router.get("/masterclassAll", masterclassAll)

router.post('/masterclassByID', masterclassByID)

router.post('/masterclassFindOne', masterclassFindOne)

router.post('/masterclasscours', masterclasscours)

router.post('/masterclasscoursAll', masterclasscoursAll)

router.post('/masterclassQuizzAllByMasterclassID', masterclassQuizzAllByMasterclassID)

router.post('/masterclassExamsAllByMasterclassID', masterclassExamsAllByMasterclassID)

router.post('/masterclassQuizz', masterclassQuizz)

router.post('/masterclassQuizzQuestion', masterclassQuizzQuestion)

router.post('/masterclassExamsAll', masterclassExamsAll)

router.post('/masterclassExams', masterclassExams)

router.post('/masterclassExamsQuestion', masterclassExamsQuestion)
 
router.post('/masterclassConfirmModule', masterclassConfirmModule)

router.post('/masterclassCheckConfirmModule', masterclassCheckConfirmModule)

router.post('/masterclassCheckConfirmModuleFindOne', masterclassCheckConfirmModuleFindOne)

router.post('/masterclassCheckConfirmModuleByUserID', masterclassCheckConfirmModuleByUserID)

router.post('/createMasterclass', createMasterclass);

router.get('/getLastMasterclass', getLastMasterclass);

router.post('/updateMasterclass', updateMasterclass);

router.post('/createMasterclassCours', createMasterclassCours);

router.post('/updateMasterclassCours', updateMasterclassCours);

router.post('/createMasterclassQuizz', createMasterclassQuizz);

router.post('/updateMasterclassQuizz', updateMasterclassQuizz);

router.post('/createMasterclassQuizzQuestions', createMasterclassQuizzQuestions);

router.post('/updateMasterclassQuizzQuestions', updateMasterclassQuizzQuestions);

router.post('/createMasterclassExams', createMasterclassExams);

router.post('/updateMasterclassExams', updateMasterclassExams);

router.post('/createMasterclassExamsQuestions', createMasterclassExamsQuestions);

router.post('/updateMasterclassExamsQuestions', updateMasterclassExamsQuestions);

router.get('/certificatesAll', certificatesAll)

router.post('/certificatesFindOneByMasterclassID', certificatesFindOneByMasterclassID)

router.post('/certificatesFindOneByCertificatesID', certificatesFindOneByCertificatesID)

router.post('/usersCertificates', usersCertificates)

router.post('/newUsersCertificates', newUsersCertificates)
 
router.post('/checkUsersCertificates', checkUsersCertificates)

router.post('/createCertificates', createCertificates)

router.get('/forum/topicAll', topicAll)

router.post('/forum/topicFindOneByID', topicFindOneByID)

router.post('/forum/topicFindOneByCategory', topicFindOneByCategory)

router.post('/forum/topicFindOneByAuthor',topicFindOneByAuthor)

router.post('/forum/createTopic', createTopic)

router.get('/forum/messageAll',messageAll)

router.post('/forum/messageFindOneByID',messageFindOneByID)

router.post('/forum/messageFindOneByTopic',messageFindOneByTopic)

router.post('/forum/messageFindOneByAuthor',messageFindOneByAuthor)

router.post('/forum/createMessage', createMessage)

router.get('/forum/categoryAll', categoryAll) 

router.post('/forum/categoryFindOneByID', categoryFindOneByID) 

router.post('/media/getImageByUserID', getImageByUserID)

router.post('/media/getImageByMasterclassID', getImageByMasterclassID)

router.post('/media/getImageByCertificatesID', getImageByCertificatesID)

const backAppURL = "./app"
/* const backAppURL = "/app" */

const videoDirectory = backAppURL + '/uploadVideo/cours';


router.get('/get-video/:videoName', (req, res) => {
  const videoName = req.params.videoName;
  const videoPath = path.join(videoDirectory, videoName);

  if (fs.existsSync(videoPath)) {
    const videoStream = fs.createReadStream(videoPath);
    videoStream.pipe(res);
  } else {
    res.status(404).json({ message: 'Vidéo non trouvée' });
  }
});




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("LE MULTER DESTINATION")
    cb(null, backAppURL+'/uploadVideo/cours');
  },
  filename: function (req, file, cb) {
    console.log("LE MULTER FILENAME")
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/uploadVideo/cours', upload.single('video'), async (req, res) => {
  
  console.log('Début du traitement de la requête POST /uploadVideo/cours');

  try {
    const { description } = req.body;
    console.log('Description de la vidéo :', description);

    if (!req.file) {
      console.error('Aucun fichier vidéo n\'a été téléchargé.');
      throw new Error('Aucun fichier vidéo n\'a été téléchargé.');
    }

    console.log('Fichier vidéo téléchargé :', req.file.originalname);
    const filename = req.file.originalname;
    const videoURL = `/uploadVideo/cours/${filename}`;
    console.log('URL de la vidéo :', videoURL);

    await insertVideoMetadata(filename, description, videoURL);

    console.log('Métadonnées de la vidéo insérées avec succès');
    res.json({ message: 'Video uploaded and metadata stored successfully' });
  } catch (err) {
    console.error('Erreur lors de l\'upload ou de l\'insertion des métadonnées de la vidéo :', err.message);
    res.status(500).json({ error: err.message });
  }

  console.log('Fin du traitement de la requête POST /uploadVideo');
  
});

async function insertVideoMetadata(filename, description, videoURL) {
  console.log('Insertion des métadonnées de la vidéo dans la base de données');
  let conn;
  try {
    conn = await pool.getConnection();
    const query = 'INSERT INTO videos (filename, description, video_url) VALUES (?, ?, ?)';
    const params = [filename, description, videoURL];
    console.log('Paramètres de la requête SQL :', params);
    await conn.query(query, params);
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      conn.release();
    }
  }
}















const storageImageProfil = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("LE MULTER DESTINATION")
    cb(null, backAppURL + '/uploadImage/profil');
  },
  filename: function (req, file, cb) {
    console.log("LE MULTER FILENAME")
    cb(null, file.originalname);
  },
});

const uploadImageProfil = multer({ storage: storageImageProfil }); 

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/uploadImage/profil', uploadImageProfil.single('image'), async (req, res) => {
  
  console.log('Début du traitement de la requête POST /uploadImage/profil');

  try {
    const { id } = req.body;
    console.log('ID de l\'utilisateur :', id);

    if (!req.file) {
      console.error('Aucune image n\'a été téléchargée.');
      throw new Error('Aucune image n\'a été téléchargée.');
    }

    console.log('Fichier image téléchargé :', req.file.originalname);
    const filename = req.file.originalname;
    const extentionTab = filename.split('.')
    const extension = extentionTab[extentionTab.length-1]
    console.log(extension)
    const imageURL = `/uploadImage/profil/${filename}`;
    
    const cheminAncienFichier = backAppURL + `/uploadImage/profil/${filename}`; 
    const cheminNouveauFichier = backAppURL + `/uploadImage/profil/${id}-profilPicture.png`; 

    fs.rename(cheminAncienFichier, cheminNouveauFichier, (err) => {
      if (err) {
        console.error('Erreur lors du renommage du fichier :', err);
      } else {
        console.log('Fichier renommé avec succès.');
      }
    });

    console.log('URL de l\'image :', imageURL);

    await insertImageProfilMetadata(id, imageURL);

    console.log('Image stockée avec succès');
    res.json({ message: 'Image uploaded and metadata stored successfully' });
  } catch (err) {
    console.error('Erreur lors de l\'upload ou de l\'insertion des métadonnées de l\'image :', err.message);
    res.status(500).json({ error: err.message });
  }

  console.log('Fin du traitement de la requête POST /uploadImage/profil');
  
});

async function insertImageProfilMetadata(id, imageURL) {
  console.log('Mise à jour des métadonnées de l\'image dans la base de données');
  let conn;
  try {
    conn = await pool.getConnection();
    const query = 'UPDATE users SET profilepicture = ? WHERE id = ?';
    const params = [imageURL, id];
    console.log('Paramètres de la requête SQL :', params);
    await conn.query(query, params);
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      conn.release();
    }
  }
}









const storageImageMasterclass = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("LE MULTER DESTINATION")
    cb(null, backAppURL + '/uploadImage/masterclass');
  },
  filename: function (req, file, cb) {
    console.log("LE MULTER FILENAME")
    cb(null, file.originalname);
  },
});

const uploadImageMasterclass = multer({ storage: storageImageMasterclass }); 

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/uploadImage/masterclass', uploadImageMasterclass.single('image'), async (req, res) => {
  
  console.log('Début du traitement de la requête POST /uploadImage/masterclass');

  try {
    const { id } = req.body;
    console.log('ID de l\'utilisateur :', id);

    if (!req.file) {
      console.error('Aucune image n\'a été téléchargée.');
      throw new Error('Aucune image n\'a été téléchargée.');
    }

    console.log('Fichier image téléchargé :', req.file.originalname);
    const filename = req.file.originalname;
    const extentionTab = filename.split('.')
    const extension = extentionTab[extentionTab.length-1]
    console.log(extension)
    const imageURL = `/uploadImage/masterclass/${filename}`;
    const newImageURL = `/uploadImage/masterclass/${id}-masterclassPicture.png`
    
    const cheminAncienFichier = backAppURL + `/uploadImage/masterclass/${filename}`; 
    const cheminNouveauFichier = backAppURL + `/uploadImage/masterclass/${id}-masterclassPicture.png`; 

    fs.rename(cheminAncienFichier, cheminNouveauFichier, (err) => {
      if (err) {
        console.error('Erreur lors du renommage du fichier :', err);
      } else {
        console.log('Fichier renommé avec succès.');
      }
    });

    console.log('URL de l\'image :', newImageURL);

    await insertImageMasterclassMetadata(id, newImageURL);

    console.log('Image stockée avec succès');
    res.json({ status: "Success", message: 'Image uploaded and metadata stored successfully' });
  } catch (err) {
    console.error('Erreur lors de l\'upload ou de l\'insertion des métadonnées de l\'image :', err.message);
    res.status(500).json({ error: err.message });
  }

  console.log('Fin du traitement de la requête POST /uploadImage/masterclass');
  
});

async function insertImageMasterclassMetadata(id, imageURL) {
  console.log('Mise à jour des métadonnées de l\'image dans la base de données');
  let conn;
  try {
    conn = await pool.getConnection();
    const query = 'UPDATE masterclass SET image = ? WHERE id = ?';
    const params = [imageURL, id];
    console.log('Paramètres de la requête SQL :', params);
    await conn.query(query, params);
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      conn.release();
    }
  }
}









const storageImageCertificates = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("LE MULTER DESTINATION")
    cb(null, backAppURL + '/uploadImage/certificates');
  },
  filename: function (req, file, cb) {
    console.log("LE MULTER FILENAME")
    cb(null, file.originalname);
  },
});

const uploadImageCertificates = multer({ storage: storageImageCertificates }); // Utilisez directement la configuration dans multer

// Middleware pour gérer les requêtes POST multipart/form-data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Route pour gérer l'upload de l'image et le stockage des métadonnées
router.post('/uploadImage/certificates', uploadImageCertificates.single('image'), async (req, res) => {
  
  console.log('Début du traitement de la requête POST /uploadImage/certificates');

  try {
    const { id } = req.body;
    console.log('ID de l\'utilisateur :', id);

    if (!req.file) {
      console.error('Aucune image n\'a été téléchargée.');
      throw new Error('Aucune image n\'a été téléchargée.');
    }

    console.log('Fichier image téléchargé :', req.file.originalname);
    const filename = req.file.originalname;
    const extentionTab = filename.split('.')
    const extension = extentionTab[extentionTab.length-1]
    console.log(extension)
    const imageURL = `/uploadImage/certificates/${filename}`;
    
    const cheminAncienFichier = backAppURL + `/uploadImage/certificates/${filename}`; // Chemin complet de l'ancien fichier
    const cheminNouveauFichier = backAppURL + `/uploadImage/certificates/${id}-certificates.png`; // Chemin complet du nouveau fichier

    fs.rename(cheminAncienFichier, cheminNouveauFichier, (err) => {
      if (err) {
        console.error('Erreur lors du renommage du fichier :', err);
      } else {
        console.log('Fichier renommé avec succès.');
      }
    });

    console.log('URL de l\'image :', imageURL);

    await insertImageCertificatesMetadata(id, imageURL);

    console.log('Image stockée avec succès');
    res.json({ message: 'Image uploaded and metadata stored successfully' });
  } catch (err) {
    console.error('Erreur lors de l\'upload ou de l\'insertion des métadonnées de l\'image :', err.message);
    res.status(500).json({ error: err.message });
  }

  console.log('Fin du traitement de la requête POST /uploadImage/certificates');
  
});

// Fonction pour insérer les métadonnées de la vidéo dans la base de données
async function insertImageCertificatesMetadata(id, imageURL) {
  console.log('Mise à jour des métadonnées de l\'image dans la base de données');
  let conn;
  try {
    conn = await pool.getConnection();
    const query = 'UPDATE users SET profilepicture = ? WHERE id = ?';
    const params = [imageURL, id];
    console.log('Paramètres de la requête SQL :', params);
    await conn.query(query, params);
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      conn.release();
    }
  }
}


//export this router to use in our index.js
export default router