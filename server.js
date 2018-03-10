const http = require("http");
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

                processNegList(x.neg)






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
        changes["pos"] = {};
        changes["neg"] = {};
        for (x in pos) {
            if (x > 0) {

                let temp = pos[x].parent.children.filter((x) => { return !(x.attribs == null) });
                let tempTitle = temp[0].attribs.title;
                let tempHref = temp[0].attribs.href;

                changes["pos"][tempTitle] = tempHref;

            }


        }

        for (x in neg) {
            if (!(neg[x].parent == undefined || neg[x].parent.children == undefined)) {
                let temp = neg[x].parent.children.filter((x) => { return !(x.attribs == null) });
                let tempTitle = temp[0].attribs.title;
                let tempHref = temp[0].attribs.href;

                changes["neg"][tempTitle] = tempHref;
            }
        }



        resolve(changes);




    })
}

function getKnowledgeLost(page) {


    const $ = cheerio.load(page);

    let tds = $("td.diff-deletedline");
    let dels = "";

    for (let x = 0; x < tds.length; x++) {
        //console.log(x);
        if (tds[x].firstChild != null && tds[x].firstChild.children.length > 1) {
            cellCont = tds[x].firstChild.children;

            for (y in cellCont) {
                if (cellCont[y].type == "tag" && cellCont[y].name == "del") {
                    
                    //console.log("INLINE: " + cellCont[y].firstChild.data);

                    dels += "\t..." + cellCont[y].firstChild.data + "...";
                    
                }
            }
        } else if (tds[x].firstChild != null && tds[x].firstChild.children.length == 1) {
            
            //console.log("WHOLE: " + tds[x].firstChild.firstChild.data);

            dels += "\n" + tds[x].firstChild.firstChild.data;

        } else {

            //console.log("NULL")
            
            dels += "\n_______________\n";

        }

    }

    console.log(dels);

    const options = {
        hostname: 'localhost',
        port: 3666,
        path: '',
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
            'Content-Length': Buffer.byteLength(dels)
        }
    };

    const req = http.request(options, (res) => {

        res.on('end', () => {
            

        })

        res.on('error', (e) => {
            console.log(e.name);
        })
    })
    req.write(new Buffer(dels));
    req.end;

}

function processNegList(list) {
    return new Promise((resolve, reject) => {
        for (x in list) {
            let req = https.get("https://en.wikipedia.org" + list[x], (res) => {
                //console.log('statusCode:' + res.statusCode + " " + x);

                let page = "";
                res.on('data', (d) => {

                    page += d.toString();

                })

                res.on('end', () => {
                    console.log(res.req._header);
                    resolve(getKnowledgeLost(page));

                })

                res.on('error', (e) => {
                    reject(e);
                })

            })
            //console.log("listing!");

        }
    })

}