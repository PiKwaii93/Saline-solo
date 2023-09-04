import express from 'express';
import pool from '../config/db.js';
import { testDatabase } from '../controllers/testDatabaseController.js';
import { login, register, updateUsersInformation, updateUsersPassword } from '../controllers/userController.js';
import multer from 'multer'
import * as fs from 'fs';
import path from 'path';
import { masterclass, masterclassFindOne, masterclasscours, masterclasscoursAll, masterclassQuizzAll, masterclassQuizz, masterclassQuizzQuestion, masterclassExamsAll, masterclassExams, masterclassExamsQuestion } from '../controllers/masterclassController.js';
import { certificatesAll, certificatesFindOneByMasterclassID, usersCertificates, newUsersCertificates, checkUsersCertificates, certificatesFindOneByCertificatesID } from '../controllers/certificatesController.js';

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

router.get("/masterclass", masterclass)

router.post('/masterclassFindOne', masterclassFindOne)

router.post('/masterclasscours', masterclasscours)

router.post('/masterclasscoursAll', masterclasscoursAll)

router.post('/masterclassQuizzAll', masterclassQuizzAll)

router.post('/masterclassQuizz', masterclassQuizz)

router.post('/masterclassQuizzQuestion', masterclassQuizzQuestion)

router.post('/masterclassExamsAll', masterclassExamsAll)

router.post('/masterclassExams', masterclassExams)

router.post('/masterclassExamsQuestion', masterclassExamsQuestion)

router.get('/certificatesAll', certificatesAll)

router.post('/certificatesFindOneByMasterclassID', certificatesFindOneByMasterclassID)

router.post('/certificatesFindOneByCertificatesID', certificatesFindOneByCertificatesID)

router.post('/usersCertificates', usersCertificates)

router.post('/newUsersCertificates', newUsersCertificates)

router.post('/checkUsersCertificates', checkUsersCertificates)


const backAppURL = "./app"
/* const backAppURL = "/app" */

const videoDirectory = backAppURL + '/uploadVideo/cours';


router.get('/get-video/:videoName', (req, res) => {
  const videoName = req.params.videoName;
  const videoPath = path.join(videoDirectory, videoName);

  // Vérifier si le fichier vidéo existe
  if (fs.existsSync(videoPath)) {
    // Lire le fichier vidéo et le renvoyer en tant que réponse
    const videoStream = fs.createReadStream(videoPath);
    videoStream.pipe(res);
  } else {
    res.status(404).json({ message: 'Vidéo non trouvée' });
  }
});

router.get('/get-image/profil/:userID', (req, res) => {
  const imageName = req.params.userID + "-profilPicture.png";
  const imagePath = path.join('./app/uploadImage/profil', imageName);

  // Vérifier si le fichier image existe
  if (fs.existsSync(imagePath)) {
    // Lire le fichier image et le renvoyer en tant que réponse
    const imageStream = fs.createReadStream(imagePath);
    imageStream.pipe(res);
  } else {
    res.status(404).json({ message: 'Image non trouvée' });
  }
  
});






// Configuration du stockage des vidéos avec Multer
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

// Middleware pour gérer les requêtes POST multipart/form-data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Route pour gérer l'upload de la vidéo et le stockage des métadonnées
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

// Fonction pour insérer les métadonnées de la vidéo dans la base de données
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















const storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("LE MULTER DESTINATION")
    cb(null, backAppURL + '/uploadImage/profil');
  },
  filename: function (req, file, cb) {
    console.log("LE MULTER FILENAME")
    cb(null, file.originalname);
  },
});

const uploadImage = multer({ storage: storageImage }); // Utilisez directement la configuration dans multer

// Middleware pour gérer les requêtes POST multipart/form-data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Route pour gérer l'upload de l'image et le stockage des métadonnées
router.post('/uploadImage/profil', uploadImage.single('image'), async (req, res) => {
  
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
    
    const cheminAncienFichier = backAppURL + `/uploadImage/profil/${filename}`; // Chemin complet de l'ancien fichier
    const cheminNouveauFichier = backAppURL + `/uploadImage/profil/${id}-profilPicture.png`; // Chemin complet du nouveau fichier

    fs.rename(cheminAncienFichier, cheminNouveauFichier, (err) => {
      if (err) {
        console.error('Erreur lors du renommage du fichier :', err);
      } else {
        console.log('Fichier renommé avec succès.');
      }
    });

    console.log('URL de l\'image :', imageURL);

    await insertImageMetadata(id, imageURL);

    console.log('Image stockée avec succès');
    res.json({ message: 'Image uploaded and metadata stored successfully' });
  } catch (err) {
    console.error('Erreur lors de l\'upload ou de l\'insertion des métadonnées de l\'image :', err.message);
    res.status(500).json({ error: err.message });
  }

  console.log('Fin du traitement de la requête POST /uploadImage/profil');
  
});

// Fonction pour insérer les métadonnées de la vidéo dans la base de données
async function insertImageMetadata(id, imageURL) {
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