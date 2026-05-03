import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "~/shared/hooks/useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("deve executar a função imediatamente na primeira chamada (notDelayInFirstTime=true)", () => {
    const { result } = renderHook(() => useDebounce(300, true));
    const fn = vi.fn();

    act(() => {
      result.current.debounce(fn);
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("não deve executar a função imediatamente na primeira chamada quando notDelayInFirstTime=false", () => {
    const { result } = renderHook(() => useDebounce(300, false));
    const fn = vi.fn();

    act(() => {
      result.current.debounce(fn);
    });

    expect(fn).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("deve aguardar o delay antes de executar após a primeira chamada", () => {
    const { result } = renderHook(() => useDebounce(300, true));
    const fn = vi.fn();

    act(() => {
      result.current.debounce(fn);
    });

    fn.mockClear();

    act(() => {
      result.current.debounce(fn);
    });

    expect(fn).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("deve cancelar o timeout anterior ao receber nova chamada durante o delay", () => {
    const { result } = renderHook(() => useDebounce(300, true));
    const fn = vi.fn();

    act(() => {
      result.current.debounce(fn);
    });

    fn.mockClear();

    act(() => {
      result.current.debounce(fn);
      vi.advanceTimersByTime(100);
      result.current.debounce(fn);
    });

    expect(fn).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("deve usar delay padrão de 300ms quando não especificado", () => {
    const { result } = renderHook(() => useDebounce());
    const fn = vi.fn();

    act(() => {
      result.current.debounce(fn);
    });

    fn.mockClear();

    act(() => {
      result.current.debounce(fn);
    });

    act(() => {
      vi.advanceTimersByTime(299);
    });

    expect(fn).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
