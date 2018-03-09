const https = require("https");
const cheerio = require('cheerio');



console.log("Stream starting");


let req = https.get("https://en.wikipedia.org/wiki/Special:RecentChanges?goodfaith=likelygood&hidecategorization=1&hideWikibase=1&limit=500&days=0.04166&urlversion=2",
    (res) => {
        console.log('statusCode:', res.statusCode);
        //console.log('headers:', res.headers);
        let page = "";
        res.on('data', (d) => {
            //console.log(d.toString());
            page += d.toString();

        })

        res.on('end', () => {

            getList(page).then((x) => {
                console.log(x);
            }).catch((x) => {
                console.error("getList ERR then:" + x);
            });


        });

    })

function getList(page) {

    return new Promise((resolve, reject) => {
        const $ = cheerio.load(page);

       
        

        //console.log($('.special').text());
        
        let pos = $(".mw-plusminus-pos");
        let neg = $(".mw-plusminus-neg");
        let changes = {};
        changes["pos"] = {} ;
        changes["neg"] = {} ;
        for (x in pos) {
            if(x > 0){
    
            let temp =  pos[x].parent.children.filter((x) => {return !(x.attribs == null)});
            let tempTitle = temp[0].attribs.title;
            let tempHref = temp[0].attribs.href;
            
            changes["pos"][tempTitle] = tempHref;

            }


        }

        for (x in neg) {
            if( !(neg[x].parent == undefined || neg[x].parent.children == undefined)){
            let temp =  neg[x].parent.children.filter((x) => {return !(x.attribs == null)});
            let tempTitle = temp[0].attribs.title;
            let tempHref = temp[0].attribs.href;
            
            changes["neg"][tempTitle] = tempHref;
            }
        }



        resolve(changes);

       
        

    })
}