function pow(n) {
  if (n == 1) {
    return 2
  } else if ( n == 0 ) {
    return 1
  } else {
    var half = pow(Math.floor(n/2))
    return half * half * pow(n - Math.floor(n/2) * 2)
  }
}

console.log(pow(11));
