class WidgetsSource {
    static get = (books, data) => {

        let countInArrays = (key) => {

            //get only the "key" arrays
            let items = books.map(book => book[key]);
            //flaten the arrays
            items = Array.prototype.concat.apply([], items);
            //remove duplicates
            items = [...new Set(items)]
            return items.length
        }

        let pagesCount = () => {
            let pages = 0;
            books.forEach(book => pages += book.numberOfPages);
            return pages;
        }


        data.books.count = books.length;
        data.characters.count = countInArrays('characters');
        data.totalPages.count = pagesCount();
        data.povCharacters.count = countInArrays('povCharacters');

        return data;
    }
}

module.exports = WidgetsSource;