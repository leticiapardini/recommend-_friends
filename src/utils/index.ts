export function isCPFValid(cpf: string): Boolean {
  return cpf.length === 11 && !isNaN(parseInt(cpf));
}

export function groupByAndCount(objetoArray: any, propriedade: any) {
  return objetoArray.reduce(function (acc: any, obj: any) {
    let key = obj[propriedade];
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key]++;
    return acc;
  }, {});
}
