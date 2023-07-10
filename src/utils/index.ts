export function isCPFValid(cpf: string): Boolean {
  return cpf.length === 11 && !isNaN(parseInt(cpf));
}

export function groupByAndCount(objetcArray: any, property: any) {
  return objetcArray.reduce(function (cpf: any, obj: any) {
    let key = obj[property];
    if (!cpf[key]) {
      cpf[key] = 0;
    }
    cpf[key]++;
    return cpf;
  }, {});
}
