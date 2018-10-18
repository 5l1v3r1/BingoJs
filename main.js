$(document).ready(function(){
	var $bingo_1 = $('.grid-container').eq(0)
	var $bingo_2 = $('.grid-container').eq(1)
	var $bingo_3 = $('.grid-container').eq(2)
	var $bingo_4 = $('.grid-container').eq(3)
	var $box = $('.box')
	var randArr = []
	var userSelectArr=[]

	var count =0
	var arr=[]

	var newUserArr = []
	var newUserArr1 = []
	
	var n =0;
	var n1 =0;
	var newRowArr =[]
	var newColArr =[]
	var newRowArr1 =[]
	var newColArr1 =[]
	var newCrossArr =[]
	var newCrossArr1=[]
	var interval

	function pretty_time_string(num) {
	    return ( num < 10 ? "0" : "" ) + num;
  	}
	function get_elapsed_time_string(total_seconds) {
  

	  var hours = Math.floor(total_seconds / 3600);
	  total_seconds = total_seconds % 3600;

	  var minutes = Math.floor(total_seconds / 60);
	  total_seconds = total_seconds % 60;

	  var seconds = Math.floor(total_seconds);

	  // Pad the minutes and seconds with leading zeros, if required
	  hours = pretty_time_string(hours);
	  minutes = pretty_time_string(minutes);
	  seconds = pretty_time_string(seconds);

	  // Compose the string for display
	  var currentTimeString = hours + ":" + minutes + ":" + seconds;

	  return currentTimeString;
	}

	var elapsed_seconds = 0;
	var clock = setInterval(function() {
	  elapsed_seconds = elapsed_seconds + 1;
	  $('.timer').text(get_elapsed_time_string(elapsed_seconds));
	}, 1000);

	function randomColorPicker(){
		var r = Math.floor(Math.random() * 256)
		var g = Math.floor(Math.random() * 256)
		var b = Math.floor(Math.random() * 256)
		var color =  "rgb("+r+", "+g+", "+b+")"
		return color
	}

	function generateCardColumn(bingo){
		var arrCol1=[]
		var arrCol2=[]
		var arrCol3=[]
		var arrCol4=[]
		var arrCol5=[]
		
		var col1 = []
		var col2 = []
		var col3 = []
		var col4 = []
		var col5 = []
		
		var colFinal=[]
		
		col1 = [bingo.children().slice(5,6),bingo.children().slice(10,11),bingo.children().slice(15,16),bingo.children().slice(20,21),bingo.children().slice(25,26)]
		col2 = [bingo.children().slice(6,7),bingo.children().slice(11,12),bingo.children().slice(16,17),bingo.children().slice(21,22),bingo.children().slice(26,27)]
		col3 = [bingo.children().slice(7,8),bingo.children().slice(12,13),bingo.children().slice(17,18),bingo.children().slice(22,23),bingo.children().slice(27,28)]
		col4 = [bingo.children().slice(8,9),bingo.children().slice(13,14),bingo.children().slice(18,19),bingo.children().slice(23,24),bingo.children().slice(28,29)]
		col5 = [bingo.children().slice(9,10),bingo.children().slice(14,15),bingo.children().slice(19,20),bingo.children().slice(24,25),bingo.children().slice(29,30)]
		
		col1 = makeUniqueColumn(col1,1,15)
		col2 = makeUniqueColumn(col2,16,30)
		col3 = makeUniqueColumn(col3,31,45)
		col4 = makeUniqueColumn(col4,46,60)
		col5 = makeUniqueColumn(col5,61,75)

		arrCol1 = getColumnTextValue(col1)	
		arrCol2 = getColumnTextValue(col2)
		arrCol3 = getColumnTextValue(col3)
		arrCol4 = getColumnTextValue(col4)
		arrCol5 = getColumnTextValue(col5)
		
		 colFinal = [arrCol1,arrCol2,arrCol3,arrCol4,arrCol5]
		 return colFinal

	}

	function generateRowValues(bingo){
		
		var crossFinal=[]
		
		cross1 = [bingo.children().slice(5,6).text(),bingo.children().slice(11,12).text(),bingo.children().slice(17,18).text(),bingo.children().slice(23,24).text(),bingo.children().slice(29,30).text()]
		cross2 = [bingo.children().slice(9,10).text(),bingo.children().slice(13,14).text(),bingo.children().slice(17,18).text(),bingo.children().slice(21,22).text(),bingo.children().slice(25,26).text()]
			
		crossFinal = [cross1,cross2]
		return crossFinal

	}

	function generateCrossValues(bingo){
		
		var rowFinal=[]
		
		row1 = [bingo.children().slice(5,6).text(),bingo.children().slice(6,7).text(),bingo.children().slice(7,8).text(),bingo.children().slice(8,9).text(),bingo.children().slice(9,10).text()]
		row2 = [bingo.children().slice(10,11).text(),bingo.children().slice(11,12).text(),bingo.children().slice(12,13).text(),bingo.children().slice(13,14).text(),bingo.children().slice(14,15).text()]
		row3 = [bingo.children().slice(15,16).text(),bingo.children().slice(16,17).text(),bingo.children().slice(17,18).text(),bingo.children().slice(18,19).text(),bingo.children().slice(19,20).text()]
		row4 = [bingo.children().slice(20,21).text(),bingo.children().slice(21,22).text(),bingo.children().slice(22,23).text(),bingo.children().slice(23,24).text(),bingo.children().slice(24,25).text()]
		row5 = [bingo.children().slice(25,26).text(),bingo.children().slice(26,27).text(),bingo.children().slice(27,28).text(),bingo.children().slice(28,29).text(),bingo.children().slice(29,30).text()]
		
		rowFinal = [row1,row2,row3,row4,row5]
		return rowFinal

	}


	function makeUniqueColumn(col,min,max){
		var arr=makeUniqueRandom(min,max)
		    for (var j = 0; j < col.length; j++) {
		    	var index = Math.floor(Math.random() * arr.length)
		    	col[j].text(arr[index].toString());
		    	arr.splice(index, 1)
		    	
		    }

		    arr.splice(0,arr.length)
		    return col
	}

	function generateRandomNumBalls(){
		var arr=makeUniqueRandom(1,76)
		var num = arr[Math.floor(Math.random() * arr.length)]
		interval =setInterval(function(){
			if(arr.length){
			//console.log(arr)
				num = Math.floor(Math.random() * arr.length)
				$box.append('<h2 aria-label="'+arr[num]+'"> '+ arr[num]+'</h2>')
				if ('speechSynthesis' in window) {
				    var msg = new SpeechSynthesisUtterance(arr[num]);
				    window.speechSynthesis.speak(msg);
				}

				$box.children().last().css('left', function(){ return $(this).offset().left; })
             		.animate({"left":"0px"}, "slow")
				randArr.push(arr[num])
				arr.splice(num,1)

				}
		},4000)
		
	}
	
	function makeUniqueRandom(min,max) {

    var arr=[]
    if (!arr.length) {
        for (var i = min; i < max; i++) {
            arr.push(i);
        }
    }
  		return arr;

	}
	function arrayContainsArray (superset, subset) {
	  if (0 === subset.length) {
	    return false;
	  }
	  return subset.every(function (value) {
	    return (superset.includes(value));
	  });
	}

	function checkBingoRow(rowArr,userArr){
				

		var rowBool = false
		console.log("inside check row" + rowBool)
		console.log("card 1: "+rowArr)	
		for(var i in rowArr){
			
			if(checkBingo(rowArr[i],userArr)){
				console.log("its row true "+i)
				rowBool =  true
				rowArr.splice(i,1)

			}
		}
			return rowBool
	}
	function checkBingoColumn(colArr, userArr){
		var colBool = false
		console.log("inside check column" + colBool)
		console.log("card 1 Col: "+colArr)
		for(var i in colArr){
			console.log(colArr.length)
			if(checkBingo(colArr[i],userArr)){
				console.log("its column true "+i)
				colBool = true	
				colArr.splice(i,1)	
				
			}
		}

			return colBool

	}

	function checkBingoCross(crossArr, userArr){
			var crossBool = false
			console.log("inside check cross" + crossBool)
			console.log("card 1 Col: "+crossArr)
			for(var i in crossArr){
				console.log(crossArr.length)
				if(checkBingo(crossArr[i],userArr)){
					console.log("its column true "+i)
					crossBool = true	
					crossArr.splice(i,1)	
					
				}
			}

				return crossBool

		}

	
	function checkBingo(col,useArr){
		if(!jQuery.isEmptyObject(useArr)){
			console.log(col)
			console.log(useArr)
			return arrayContainsArray(useArr,col)
		}else{
			console.log('array is empty')
		}
		
	}

	function getColumnTextValue(colArr){
		var arr1 = []
		for(var c in colArr){
				arr1.push(colArr[c].text())	
			}
			return arr1;
	}

	function userClicks(count){
		var resCol =false
		var resRow =false
		var resCol1 =false
		var resRow1 =false
		var resCross1 =false
		var resCross =false
		var card1 = []
		console.log()

		if(count >10){
			console.log("inside userClicks")
			console.log(newColArr)
			console.log(newColArr1)
			resCol= checkBingoColumn(newColArr,newUserArr)
			resCol1 = checkBingoColumn(newColArr1,newUserArr1)
			resRow= checkBingoRow(newRowArr,newUserArr)
			resRow1= checkBingoRow(newRowArr1,newUserArr1)
			resCross= checkBingoCross(newCrossArr,newUserArr)
			resCross1= checkBingoCross(newCrossArr1,newUserArr1)
				

			console.log(resCol)
			console.log(resRow)
			console.log(resCol1)
			console.log(resCol1)
			console.log(resCross)
			console.log(resCross1)

			if(resCol || resRow || resCross){

				n++
				console.log(n)
			}else if(resCol1 || resRow1 || resCross1){
				n1++
			}
				 if(n === 1){
					$('#1 .bingo .line1').addClass('xline')
					$('#1  .bingo .line01').addClass('yline')

				}else if(n === 2){
					$('#1 .bingo .line2').addClass('xline')
					$('#1  .bingo .line02').addClass('yline')
					
				}else if(n === 3){
					$('#1 .bingo .line3').addClass('xline')
					$('#1  .bingo .line03').addClass('yline')
				}else if(n === 4){
					$('#1 .bingo .line4').addClass('xline')
					$('#1  .bingo .line04').addClass('yline')
				}else if(n === 5){
					$('#1 .bingo .line5').addClass('xline')
					$('#1  .bingo .line05').addClass('yline')

					$('#1  .bingo').css({"color" : "red"})

					if($('#card2').is(":hidden")){
						$('#newGame').on('click',function(){
							location. reload(true);
						})
						$('#newGame').show()
						clearInterval(interval)
						clearInterval(clock)
					}
				}else{
					
				}
				if(n1 === 1){
					$('#2 .bingo .line1').addClass('xline')
					$('#2  .bingo .line01').addClass('yline')
				}else if(n1 === 2){
					$('#2 .bingo .line2').addClass('xline')
					$('#2  .bingo .line02').addClass('yline')
				}else if(n1 === 3){
					$('#2 .bingo .line3').addClass('xline')
					$('#2  .bingo .line03').addClass('yline')
				}else if(n1 === 4){
					$('#2 .bingo .line4').addClass('xline')
					$('#2  .bingo .line04').addClass('yline')
				}else if(n1 === 5){
					$('#2 .bingo .line5').addClass('xline')
					$('#2  .bingo .line05').addClass('yline')
					$('#2  .bingo').css({"color" : "red"})
					$('#newGame').on('click',function(){
						location. reload(true);
					})
					$('#newGame').show()
					window.clearInterval(interval)
					clearInterval(clock)
				}else{
					
				}
			
		}

	}

	$('.grid-item').on('click',function(e){
		var hash={}
			var parent = $(this).parent().attr("id").toString()
			var userSelect = $(this).text()
			if(!(/[A-Z]/.test(userSelect)) ){}
		if($(this).attr('data-click-state') == 1) {
			$(this).attr('data-click-state', 0)
			

			$(this).addClass( "userClick")
			hash[parent]=userSelect
			userSelectArr.push(hash)
			//userSelectArr.sort((a, b) => a - b)
			for(var k in userSelectArr){
				newUserArr.push(userSelectArr[k][1])
				newUserArr.sort((a, b) => a - b)
				newUserArr = $.unique(newUserArr);

		}
		for(var k in userSelectArr){
				newUserArr1.push(userSelectArr[k][2])
				newUserArr1.sort((a, b) => a - b)
				newUserArr1 = $.unique(newUserArr1);

		}
			userClicks(count++)
		} else {
			$(this).attr('data-click-state', 1)
			$(this).removeClass( "userClick")
			
		}

	
	})
	$('#card1').on('click',function(e){
		
		$('.wrapper').show()
		$('#2').hide()
		$('.home').hide()
		newColArr = generateCardColumn($bingo_1)
		newRowArr = generateRowValues($bingo_1)
		newCrossArr = generateCrossValues($bingo_1)
		generateRandomNumBalls()
		$('#newGame').hide()
	
	})
	$('#card2').on('click',function(e){
		$('.wrapper').show()
		$('.home').hide()
		newColArr = generateCardColumn($bingo_1)
		newRowArr = generateRowValues($bingo_1)
		newCrossArr = generateCrossValues($bingo_1)
		newColArr1 =generateCardColumn($bingo_2)
		 newRowArr1 = generateRowValues($bingo_2)
		 newCrossArr1 = generateCrossValues($bingo_2)
		generateRandomNumBalls()
		$('#newGame').hide()
	})


})