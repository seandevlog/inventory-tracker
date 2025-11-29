export function get(state) {
    let data = JSON.parse(localStorage.getItem(state)); 
    return data ? data : [[], {}]; // [[[index], {id, username ...}], {id1: index}] 
}

export function persist(state, data) {
    localStorage.setItem(state, JSON.stringify(data));
}