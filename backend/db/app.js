
DatabaseProvider = require('./DatabaseProvider').DatabaseProvider;
const https = require('https');
const axios = require('axios');


const apiOfFire = "https://www.anapioficeandfire.com/api/"
const maxPage = "pageSize=50"

let db = new DatabaseProvider(() => {
    getFromApi('houses');
    getFromApi('books');
    getFromApi('characters');
});

const getFromApi = (path) => {

    axios.get(apiOfFire + path + '?' + maxPage)
        .then(function (response) {

            let links = buildLinksObj(response.headers.link);
            let result = response.data;
            if (hasNextPage(links)) {
                axios.all(getFullContent(path, links))
                    .then((data) => {
                        data.forEach((d, i) => {
                            d.data.forEach((el) => {
                                result.push(el);
                            })
                        })

                        db.insertMany(path, result)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });


            } else {
                db.insertMany(path, result)
            }
        })
        .catch(function (error) {
            console.log(error);
        });

}

const getFullContent = (path, links) => {
    let lastPage = links.find(link => link.position === 'rel="last"');
    let promisseArray = [];
    if (lastPage) {
        lastPage = lastPage.url.split('?')[1];
        lastPage = lastPage.replace('page=', '').replace('&pageSize=50', '')
    }
    try {
        lastPage = parseInt(lastPage);
        for (let i = 2; i <= lastPage; i++) {
            let url = 'https://www.anapioficeandfire.com/api/' + path + '?' + maxPage + '&page=' + i;
            promisseArray.push(axios.get(url))
        }
        return promisseArray;
    } catch (error) {
        console.log(error)
    }


}

const hasNextPage = (links) => {
    return links.some(link => link.position === 'rel="next"')

}

const buildLinksObj = link => {
    let urls = link.split(',');
    let obj = [];
    urls.forEach(url => {
        url = url.replace('<', '').replace('>', '').trim();
        url = url.split(';');
        obj.push({
            url: url[0].trim(),
            position: url[1].trim()
        })
    })
    return obj;
}

