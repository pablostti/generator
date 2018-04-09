import { username, password } from './secrets';

export const RECEIVE_MEMES = 'RECEIVE_MEMES';
export const NEW_MEME = 'NEW_MEME';

/*
* action creator receiveMemes: recibe datos json y retorna un 
* 							   objeto accion con su tipo de accion ('RECEIVE_MEMES')
*							   y su informacion 'memes'.
*/
function receiveMemes(json){
	const { memes } = json.data;

	return {
		type: RECEIVE_MEMES,
		memes
	}
}

/*
* action creator fetchMemesJson: esta funcion trae los datos json. 
*/
function fetchMemesJson(){
	return fetch('https://api.imgflip.com/get_memes')
			.then(response => response.json())
}


/*
* action creator fetchMemes: retorna una funcion que permite 
*							 disparar los datos json recibidos en cualquier momento
*							 manejando el API de forma asincrona. 
*
*/
export function fetchMemes(){ 
	return function(dispatch){  
		return fetchMemesJson()
			.then(json => dispatch(receiveMemes(json)))
	}
}


export function newMeme(meme) {
	return {
		type: NEW_MEME,
		meme
	}
}

function postMemeJson(params){
	params["username"] = username;
	params["password"] = password;

	const bodyParams = Object.keys(params).map(key =>{
		return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
	}).join('&');

	console.log('bodyParams', bodyParams);

	return fetch('https://api.imgflip.com/caption_image', {
		method: "POST",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: bodyParams
	}).then(response => response.json());
}

export function createMeme(new_meme_object){
	return function(dispatch){
		return postMemeJson(new_meme_object)
		.then(new_meme => dispatch(newMeme(new_meme)));
	}
}