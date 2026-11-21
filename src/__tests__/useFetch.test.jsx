import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from 'vitest';
import useFetch from '../hooks/useFetch';

describe('useFetch Hook', () => {
    // Test 1: Initial loading state
    it(`starts with loading state`, () => {
        vi.stubGlobal(`fetch`, vi.fn(() => new Promise(() => {})));

        const { result } = renderHook(() => useFetch(`/products`));
        expect(result.current.loading).toBe(true);
        expect(result.current.data).toBe(null);
        expect(result.current.error).toBe(null);

        vi.unstubAllGlobals();
    
    });
});