$(document).ready(function(){
	var $bingo_1 = $('.grid-container').eq(0)
	var $bingo_2 = $('.grid-container').eq(1)
	var $bingo_3 = $('.grid-container').eq(2)
	var $bingo_4 = $('.grid-container').eq(3)
	var $box = $('.box')
	var randArr = []
	var userSelectArr=[]
	var col1 = []
	var col2 = []
	var col3 = []
	var col4 = []
	var col5 = []
	generateBingoCards()
	generateRandomNumBalls()


	function generateBingoCards(){

		generateCardColumn($bingo_1)
		// generateCardColumn($bingo_2)
		// generateCardColumn($bingo_3)
		// generateCardColumn($bingo_4)

	}

	function generateCardColumn(bingo){
		
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
		setInterval(function(){
			if(arr.length){
			//console.log(arr)
				num = Math.floor(Math.random() * arr.length)
				$box.append('<h2> '+ arr[num]+'</h2>')
				$box.children().css('left', function(){ return $(this).offset().left; })
             		.animate({"left":"0px"}, "slow")
				randArr.push(arr[num])
				arr.splice(num,1)

				}
		},2000)
		
	}
	
	function makeUniqueRandom(min,max) {
    // refill the array if needed
    var arr=[]
    if (!arr.length) {
        for (var i = min; i < max; i++) {
            arr.push(i);
        }
    }
  		return arr;

	}

	function checkBingo(col){
		console
		for(var h in userSelectArr){
			console.log('inside for')
			console.log(userSelectArr[h])
			console.log(jQuery.inArray(userSelectArr[h]["1"],col))
		}
		
	}

	$('.grid-item').on('click',function(e){
		//console.log($(this).style)
		var hash={}
		var parent = $(this).parent().attr("id").toString()
		var userSelect = $(this).text()
		if(!(/[A-Z]/.test(userSelect)) )
		$(this).css({
			"border" : "1px solid black",
			"border-radius" : "100%"
		}) 
		console.log(parent)
		//var x = { parent: userSelect}
		//debugger
		hash[parent]=userSelect
		userSelectArr.push(hash)
		//console.log(userSelectArr)
		console.log(col1)
	checkBingo(col1)
	})
	
	// checkBingo(col2)
	// checkBingo(col3)
	// checkBingo(col4)
	// checkBingo(col5)

})