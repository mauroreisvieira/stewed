import { useEffect, useLayoutEffect } from 'react';
import { isBrowser } from '@stewed/utils';

export const useIsomorphicLayoutEffect = isBrowser() ? useLayoutEffect : useEffect;
