autowatch = 1;
outlets = 2;
var idDict = new Dict("replyStripped");
var revs = idDict.get("revisions");

function test(){

	post(size);

}

	function iter (){
		var revsize = idDict.getsize("revisions")
			for (var i = 0; i < revsize; i++) {
				var key = idDict.get("revisions["+i+"]::revid")
				outlet (0, i, key);
			}
			outlet (0, "goto", 0);
			outlet (1, "bang");
	}
