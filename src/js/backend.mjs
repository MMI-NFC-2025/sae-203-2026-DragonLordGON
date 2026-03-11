import PocketBase from 'pocketbase' ;
const pb = new PocketBase('http://127.0.0.1:8090/_/') ;
const db = pb;

export async function getAllArtistesByDate() {
    return await pb.collection('ARTISTES').getFullList({
        sort: 'Date_Rep',
    });
}

export async function getAllScenes() {
    return await pb.collection('SCENES').getFullList({
        sort: 'Nom',
    });
}

export async function getAllArtistesByNom() {
    return await pb.collection('ARTISTES').getFullList({
        sort: 'Nom',
    });
}

export async function getArtisteById(id) {
    return await pb.collection('ARTISTES').getOne(id);
}

export async function getSceneById(id) {
    return await pb.collection('SCENES').getOne(id);
}

export async function getArtistesBySceneId(sceneId) {
    return await pb.collection('ARTISTES').getFullList({
        filter: `Scene = "${sceneId}"`,
        sort: 'Date_Rep',
    });
}

export async function getArtistesBySceneNom(sceneNom) {
    return await pb.collection('ARTISTES').getFullList({
        filter: `Scene.Nom = "${sceneNom}"`,
        sort: 'Date_Rep',
    });
}

//ARTISTES : 
// - Nom : string
// - Genre : select (Electro, Classique, Rythmique, Contemporain)
// - Desc : string (with formatting)
// - Scene : relation (SCENES)
// - IMG_Main : file
// - IMG_Sub : file (can be multiple)
// - Date_Rep : date

//SCENES :
// - Nom : string
// - Desc : string (with formatting)
// - Localisation : geopoint
// - IMG_Main : file
// - Capa : number

export async function createRecord(collection, data) {
    try {
        // Message d'alerte si empty
        const emptyFields = Object.keys(data).filter(key => !data[key]);
        if (emptyFields.length > 0) {
            console.warn(`⚠️ Création dans ${collection} : Les champs suivants sont vides :`, emptyFields);
        }

        return await pb.collection(collection).create(data);
    } catch (error) {
        console.error(`Erreur création ${collection}:`, error);
        throw error;
    }
}


export async function updateRecord(collection, id, data) {
    try {
        // On evite d'effacer les données existants
        const cleanData = new FormData();
        
        for (const [key, value] of Object.entries(data)) {
            // ajout des champs non vides
            if (value !== "" && value !== null && value !== undefined) {
                cleanData.append(key, value);
            }
        }

        return await pb.collection(collection).update(id, cleanData);
    } catch (error) {
        console.error("Erreur lors de la modification :", error);
        throw error;
    }
}
