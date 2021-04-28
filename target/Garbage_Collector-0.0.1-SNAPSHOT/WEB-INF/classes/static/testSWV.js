$(document).ready(function() {
	let recognition = null;
	var fulltext=null;

    function checkCompatibility() {
      recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = "ko-KR";
      recognition.maxAlternatives = 5;

      if (!recognition) {
        alert("You cannot use speech api.");
      }
    }

    function startSpeechRecognition() {
      console.log('Start');

      recognition.addEventListener("speechstart", () => {
        console.log('Speech Start');
      });

      recognition.addEventListener("speechend", () => {
        console.log('Speech End');
      });

      recognition.addEventListener("result", (event) => {
        console.log('Speech Result', event.results);
        fulltext = event.results[0][0].transcript;
        document.getElementById("speech_result").value = fulltext;
        alert("음성인식:"+fulltext);
        
      });
      
      recognition.start();
    }

    function endSpeechRecognition() {
      recognition.stop();
    }

    window.addEventListener('load', checkCompatibility);
    
    $("#speakBtn").click(function() {
    	startSpeechRecognition();

    });
	
	
	$("#SWVbtn").click(function() {
		//var fulltext=null;
		
		
		//startSpeechRecognition();
		alert("이 데이터를 전송:"+fulltext);
		//fulltext=$("#speech_result").val();
		
		$.post("selectGarbageList.do",
				{
					fulltext:fulltext
			
				}, 
				function(data, status){
					//alert(status);
					alert(data);

									
				}); //end post
	});
	
	
});