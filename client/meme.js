//Made by the meme factory

$(function(){
	//Variables
	let memeimg = document.getElementById("meme");
	let memetext = document.getElementById("memetext");
	let button = document.getElementById("generate");
	let deepfriedinput = document.getElementById("deepfried");

	//Functions
	function getMeme(deepfried){
		return new Promise((resolve,reject) => {
			$.post("http://localhost:8081/getmeme",{deepfried: deepfried},data => {
				resolve(JSON.parse(data));
			});
		});
	}

	//Events
	button.addEventListener("click",() => {
		getMeme(deepfriedinput.checked)
			.then(meme => {
				memeimg.src = meme.image;
				memetext.innerHTML = meme.text;
			})
			.catch(console.log);
	});
});