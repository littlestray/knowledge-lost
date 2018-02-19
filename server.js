const https = require("https");
const cheerio = require('cheerio')


let req = https.get("https://en.wikipedia.org/wiki/Special:RecentChanges?goodfaith=likelygood&hidecategorization=1&hideWikibase=1&limit=50&days=0.04166&urlversion=2",
(res) => {
    console.log('statusCode:', res.statusCode);
    //console.log('headers:', res.headers);
    let page = "";
    res.on('data', (d) => {
        //console.log(d.toString());
        page += d.toString();

    })

    res.on('end', () => {
        
        // console.log(page);
        // console.log("all data recieved");
        // console.log(x);

        parse1(page)
        

    });

})

function parse1 (page) {
    const $ = cheerio.load(page);
    //console.log(page);

    console.log($('.special').text());

    let list = $('.mw-changeslist-diff');
    let maxList = [];

    for( x in list ) {
        
        if(!isNaN(x)){
        maxList[x] = {}
        console.log(list[x] + " | " +  " | "  + x)
        maxList[x]['title'] = list[x].attribs.title;
        maxList[x]['diffLink'] = list[x].attribs.href;

        // console.log(list[x])
        }
    }

    console.log(maxList);

    // $('mw-changeslist-diff').each((i, x) => {
    //     console.log("i: " + i + " elem: " + x);
    // })

    

}