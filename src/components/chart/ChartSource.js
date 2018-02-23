import Api from '../../sources/api';

class ChartSource {
    static get = books => {

        let data = books.map(book => {
            return { 
                name: book.name, 
                totalPages: book.numberOfPages,
                characters: book.characters.length,
                povCharacters: book.povCharacters.length
            }
        })
        return data;
    }
}


module.exports = ChartSource;
