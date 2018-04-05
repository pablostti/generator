export const RECEIVE_MEMES = 'RECEIVE_MEMES';


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