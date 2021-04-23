const tables = document.querySelector('#customers > tbody');
const loader = document.querySelector('.loader');
const API_URL = 'https://randomuser.me/api';
const paginationButtons = document.querySelectorAll('.pagination > button');
const pagesResult = document.getElementById('pages-res');



const handleRenderTableData = (data) => {
    pagesResult.innerHTML = `Page: ${page}`
    const rows = data.map(item => {
        return `
            <tr>
                <td>
                    <img src="${item.picture.large}" />
                </td>
                <td>${item.gender}</td>
                <td>${item.cell}</td>
                <td>${item.email}</td>
                <td>${item.name.first}</td>
                <td>${item.name.last}</td>
            </tr>
        `
    });
    
    tables.innerHTML = rows.join('')
}

let result = 8;
let page = 1;

const handleFetch = () => {
    fetch(`${API_URL}/?page=${page}&results=${result}`)
    .then(resp => {
        return resp.json()
    })
    .then(data => {
        console.log(data)
        handleRenderTableData(data.results)
    })
};




(() => {
    handleFetch()
})();



const handleChangePagination = (direction) => {
    page = direction === 'next' ? page + 1 : page - 1;
    handleFetch();
};

paginationButtons[0].addEventListener('click', () => handleChangePagination('prev'));
paginationButtons[1].addEventListener('click', () => handleChangePagination('next'));