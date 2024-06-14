import { useSignal } from 'use-signals';
import * as signals from './signals';

export function useLangs() {
  const langs = useSignal(signals.langs);

  return langs;
}
