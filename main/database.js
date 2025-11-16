function get(state) {
    let data = JSON.parse(localStorage.getItem(state)); 
    return data ? data : []; 
}

function persist(state, data) {
    localStorage.setItem(state, JSON.stringify(data));
}