const sum_to_n_a = function (n) {
  let i = 1;
  let res = 0;
  while (i <= n) {
    res += i;
    i++;
  }
  return res;
};

const sum_to_n_b = function (n) {
  return Array.from({ length: n }, (_, i) => i + 1).reduce(
    (a, v) => a + v,
    0
  );
};

const sum_to_n_c = function (n) {
  if (n === 1) return 1;
  return n + sum_to_n_c(n - 1);
};

console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5));

console.log(sum_to_n_a(1));
console.log(sum_to_n_b(1));
console.log(sum_to_n_c(1));

console.log(sum_to_n_a(10));
console.log(sum_to_n_b(10));
console.log(sum_to_n_c(10));
