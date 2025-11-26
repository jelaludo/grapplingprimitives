"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, RotateCcw, Play, Pause } from "lucide-react";

type HMS = { m: number; s: number };

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function toSeconds(t: HMS) {
  return t.m * 60 + t.s;
}

function fmt(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

function beep(freq = 880, dur = 120) {
  try {
    const Ctx =
      (window as any).AudioContext || (window as any).webkitAudioContext;
    const ctx = new Ctx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.value = freq;
    o.type = "square";
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    setTimeout(() => {
      o.stop();
      ctx.close();
    }, dur);
  } catch {
    // ignore audio errors (e.g. unsupported environment)
  }
}

export const TimerTool: React.FC = () => {
  const [roundLen, setRoundLen] = useState<HMS>({ m: 5, s: 0 });
  const [restLen, setRestLen] = useState<HMS>({ m: 0, s: 20 });
  const [totalRounds, setTotalRounds] = useState<number>(5);
  const [phase, setPhase] = useState<
    "countdown" | "round" | "rest" | "paused" | "finished"
  >("paused");
  const [currentRound, setCurrentRound] = useState(1);
  const [remaining, setRemaining] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // Load persisted settings on mount
  useEffect(() => {
    try {
      const roundRaw = window.localStorage.getItem("coach_timer_round");
      const restRaw = window.localStorage.getItem("coach_timer_rest");
      const roundsRaw = window.localStorage.getItem("coach_timer_rounds");
      if (roundRaw) setRoundLen(JSON.parse(roundRaw));
      if (restRaw) setRestLen(JSON.parse(restRaw));
      if (roundsRaw) setTotalRounds(Number(roundsRaw) || 5);
    } catch {
      // ignore
    }
  }, []);

  // Persist settings
  useEffect(() => {
    try {
      window.localStorage.setItem("coach_timer_round", JSON.stringify(roundLen));
    } catch {
      //
    }
  }, [roundLen]);

  useEffect(() => {
    try {
      window.localStorage.setItem("coach_timer_rest", JSON.stringify(restLen));
    } catch {
      //
    }
  }, [restLen]);

  useEffect(() => {
    try {
      window.localStorage.setItem("coach_timer_rounds", String(totalRounds));
    } catch {
      //
    }
  }, [totalRounds]);

  const roundSeconds = useMemo(() => toSeconds(roundLen), [roundLen]);
  const restSeconds = useMemo(() => toSeconds(restLen), [restLen]);

  const clearTick = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearTick();
  }, []);

  const runRound = () => {
    clearTick();
    setPhase("round");
    setRemaining(roundSeconds);
    beep(1200, 400); // start beep
    intervalRef.current = window.setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          clearTick();
          beep(500, 800); // end of round
          if (currentRound >= totalRounds) {
            setPhase("finished");
            return 0;
          }
          runRest();
          return 0;
        }
        return next;
      });
    }, 1000);
  };

  const startCountdown = (onDone: () => void) => {
    clearTick();
    setPhase("countdown");
    let count = 3;
    setRemaining(count);
    beep(900, 120); // "3"
    intervalRef.current = window.setInterval(() => {
      count -= 1;
      setRemaining(count);
      if (count > 0) {
        const dur = count === 2 ? 240 : 360;
        beep(900, dur);
      } else {
        beep(1200, 500);
        clearTick();
        onDone();
      }
    }, 1000);
  };

  const runRest = () => {
    clearTick();
    setPhase("rest");
    setRemaining(restSeconds);
    intervalRef.current = window.setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          clearTick();
          setCurrentRound((r) => r + 1);
          startCountdown(runRound);
          return 0;
        }
        return next;
      });
    }, 1000);
  };

  const start = () => {
    setCurrentRound(1);
    startCountdown(runRound);
  };

  const pause = () => {
    setPhase("paused");
    clearTick();
  };

  const reset = () => {
    clearTick();
    setPhase("paused");
    setCurrentRound(1);
    setRemaining(0);
  };

  const bigText = useMemo(() => fmt(Math.max(remaining, 0)), [remaining]);

  const title =
    phase === "round"
      ? `Round ${currentRound}/${totalRounds}`
      : phase === "rest"
      ? "Rest"
      : phase === "countdown"
      ? "Get Ready"
      : phase === "finished"
      ? "Finished"
      : "Paused";

  const color =
    phase === "round"
      ? "text-green-400"
      : phase === "rest" || phase === "countdown"
      ? "text-amber-400"
      : "text-white";

  const adjust = (
    setter: React.Dispatch<React.SetStateAction<HMS>>,
    key: "m" | "s",
    delta: number
  ) =>
    setter((v) => ({
      ...v,
      [key]: clamp(v[key] + delta, 0, key === "m" ? 99 : 59),
    }));

  return (
    <div className="w-full space-y-4 font-mono tracking-wider">
      <div className="text-center text-text-muted text-sm">{title}</div>

      <div className="flex justify-center my-2">
        <div
          className={`font-mono tabular-nums tracking-[0.25em] text-[18vw] sm:text-[12vw] leading-none font-bold ${color}`}
        >
          {bigText}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-2 text-xs sm:text-sm">
        <div className="flex items-center gap-1 rounded-md bg-bg-raised px-2 py-1 text-text-muted">
          <span>Duration</span>
          <button
            type="button"
            className="p-1 rounded hover:bg-white/10"
            onClick={() => adjust(setRoundLen, "m", -1)}
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="font-semibold">
            {roundLen.m.toString().padStart(2, "0")}:
            {roundLen.s.toString().padStart(2, "0")}
          </span>
          <button
            type="button"
            className="p-1 rounded hover:bg-white/10"
            onClick={() => adjust(setRoundLen, "m", +1)}
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center gap-1 rounded-md bg-bg-raised px-2 py-1 text-text-muted">
          <span>Rest</span>
          <button
            type="button"
            className="p-1 rounded hover:bg-white/10"
            onClick={() => adjust(setRestLen, "s", -5)}
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="font-semibold">
            {restLen.m.toString().padStart(2, "0")}:
            {restLen.s.toString().padStart(2, "0")}
          </span>
          <button
            type="button"
            className="p-1 rounded hover:bg-white/10"
            onClick={() => adjust(setRestLen, "s", +5)}
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center gap-1 rounded-md bg-bg-raised px-2 py-1 text-text-muted">
          <span>Rounds</span>
          <button
            type="button"
            className="p-1 rounded hover:bg-white/10"
            onClick={() =>
              setTotalRounds((r) => Math.max(1, Math.min(99, r - 1)))
            }
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="font-semibold">{totalRounds}</span>
          <button
            type="button"
            className="p-1 rounded hover:bg-white/10"
            onClick={() =>
              setTotalRounds((r) => Math.max(1, Math.min(99, r + 1)))
            }
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        {phase === "paused" || phase === "countdown" || phase === "finished" ? (
          <Button
            size="lg"
            onClick={start}
            className="font-mono tracking-wider min-w-[120px]"
          >
            <Play className="w-4 h-4 mr-1" />
            Start
          </Button>
        ) : (
          <Button
            size="lg"
            variant="outline"
            onClick={pause}
            className="font-mono tracking-wider min-w-[120px]"
          >
            <Pause className="w-4 h-4 mr-1" />
            Pause
          </Button>
        )}
        <Button
          size="lg"
          variant="ghost"
          onClick={reset}
          className="font-mono tracking-wider"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default TimerTool;


