import pool from '../config/db.js';
import path from 'path';
import * as fs from 'fs';


const backAppURL = "./app"
/* const backAppURL = "/app"
 */
const profilImageDirectory = backAppURL + '/uploadImage/profil';
const masterclassImageDirectory = backAppURL + '/uploadImage/masterclass'
const certificatesImageDirectory = backAppURL + '/uploadImage/certificates'



export function getImageByUserID(req, res){
    const {userID} = req.body;
    if (userID) {
        const imageName = userID + "-profilPicture.png";
        const imagePath = path.join(profilImageDirectory, imageName);
        if (fs.existsSync(imagePath)) {
            const imageStream = fs.createReadStream(imagePath);
            imageStream.pipe(res);
          } else {
            res.status(404).json({ message: 'Image non trouvée' });
        }
    }
}
 

export function getImageByMasterclassID(req, res){
    const {masterclassID} = req.body;
    if (masterclassID) {
        const imageName = masterclassID + "-masterclassPicture.png";
        const imagePath = path.join(masterclassImageDirectory, imageName);
        if (fs.existsSync(imagePath)) {
            const imageStream = fs.createReadStream(imagePath);
            imageStream.pipe(res);
          } else {
            res.status(404).json({ message: 'Image non trouvée' });
        }
    }
}
 

export function getImageByCertificatesID(req, res){
    const {certificatesID} = req.body;
    if (certificatesID) {
        const imageName = certificatesID + "-certificates.png";
        const imagePath = path.join(certificatesImageDirectory, imageName);
        if (fs.existsSync(imagePath)) {
            const imageStream = fs.createReadStream(imagePath);
            imageStream.pipe(res);
          } else {
            res.status(404).json({ message: 'Image non trouvée' });
        }
    }
}
 