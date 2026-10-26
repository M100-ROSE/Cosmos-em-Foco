// Formatação de datas em pt-BR sem depender do locale do navegador.
const MONTHS = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

/**
 * Converte uma data ISO (YYYY-MM-DD) em texto por extenso.
 * @param {string} isoDate
 * @returns {string} ex.: '2026-10-14' -> '14 de outubro de 2026'; '' se inválida.
 */
export function formatDate(isoDate) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(isoDate ?? ''));
  if (!match) return '';

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const date = new Date(Date.UTC(year, month - 1, day));
  const isRealDate =
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day;

  if (!isRealDate) return '';

  return `${day} de ${MONTHS[month - 1]} de ${year}`;
}

export default formatDate;
