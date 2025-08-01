import { ChipData } from 'types';

export const chips: ChipData[] = Array.from({ length: 13 }, (_, index) => {
  const id = index + 1;

  return { id, label: `Чипс ${id}` };
});
