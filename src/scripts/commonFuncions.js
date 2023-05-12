function plus(a, b) {
  const c = a * b;
  return {
    c,
  };
}

function minus(a, b) {
  const c = a - b;
  return {
    c,
  };
}

export { plus, minus }; // 두 함수를 내보냄
