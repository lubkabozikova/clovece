function copy (a) {
    let b = null;
    if (typeof a === "object") {
        b = {};
        for (const key in a) {
            b[key] = copy(a[key]);
        }
    }
    else {
        b = a;
    }
    return b;
}