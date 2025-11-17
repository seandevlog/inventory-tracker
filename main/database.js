function get(state) {
    let data = JSON.parse(localStorage.getItem(state)); 
    return data ? data : [[], {}]; // [[[index], {id, email ...}], {id1: index}] 
}

function update() {

}

function persist(state, data) {
    localStorage.setItem(state, JSON.stringify(data));
}