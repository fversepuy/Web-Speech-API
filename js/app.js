(function($){

	var $btn = $("#btn");
	var $myFinalText = $("#myFinalText");
	var $myIntermediaryText = $("#myIntermediaryText");
	var textTotal = "";
	var words = null;
	var isRecording = false;

	if("webkitSpeechRecognition" in window){
		var recognition = new webkitSpeechRecognition();
		recognition.lang = "fr-FR";
		recognition.continuous = true;
		recognition.interimResults = true;

		$btn.click(function(e){
			e.preventDefault();
			if(!isRecording){
				$btn.removeClass('btn-demarrer').addClass('btn-stop');
				$btn.text('Stop');
				recognition.start();
				isRecording = true;
			}
			else{
				$btn.removeClass('btn-stop').addClass('btn-demarrer');
				$btn.text('Démarrer');
				recognition.stop();
				isRecording = false;	
			}
		});

		recognition.onresult = function(e){
			var intermediary = "";
	
			for(var i = e.resultIndex; i < e.results.length; i++){
				var transcript = e.results[i][0].transcript;
				transcript = transcript.replace(" point d'interrogation","? ");
				transcript = transcript.replace(" point d'exclamation","! ");
				transcript = transcript.replace(" deux points"," : ");
				transcript = transcript.replace(" point virgule"," ; ");
				transcript = transcript.replace(" point",". ");
				transcript = transcript.replace(" virgule",", ");
				transcript = transcript.replace(" à la ligne","<br>");
	
				if(e.results[i].isFinal){
					textTotal += capitalize(transcript);
				}
				else{
					intermediary += transcript;
				}
			}
			
			$myFinalText.html(textTotal);
			$myIntermediaryText.html(intermediary);
			
			//petite fonction pour lancer une recherche google si le premier mot est "Rechercher"
			words = transcript.split(' ');
			if(words[0] == "rechercher"){
				window.location.replace("https://www.google.fr/search?q=" + transcript.replace("rechercher",""));
			}
		};
		$myIntermediaryText.html("");
	}
	else{
		$btn.hide();
		document.write("La reconnaissance vocale est disponible uniquement sur Chrome!");
	}

	function capitalize(text) {
		return text.charAt(0).toUpperCase() + text.substring(1);
	}

})(jQuery);

