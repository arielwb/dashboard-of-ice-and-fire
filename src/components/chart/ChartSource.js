import Api from '../../sources/api';

class ChartSource {
    static get = books => {
        console.log(books)

        let data = books.map(book => {
            return { 
                name: book.name, 
                totalPages: book.numberOfPages,
                characters: book.characters.length,
                povCharacters: book.povCharacters.length
            }
        })
        console.log(data)
        return data;
    }
}


module.exports = ChartSource;
