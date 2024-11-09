function padNumber(num: number, size: number) {
    let s = String(num);
    while (s.length < size) s = '0' + s;
    return s;
}

export default padNumber;