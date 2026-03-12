import PocketBase from 'pocketbase' ;
const pb = new PocketBase('https://sae203tapdance.merlinhenry.fr') ;
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
        return await pb.collection(collection).create(data);
    } catch (error) {
        console.error(`Erreur création ${collection}:`, error);
        throw error;
    }
}


export async function updateRecord(collection, id, data) {
    try {
        return await pb.collection(collection).update(id, data);
    } catch (error) {
        console.error("Erreur lors de la modification :", error);
        throw error;
    }
}
