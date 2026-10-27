"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { SiteImage } from "@/config/images";
import { cn } from "@/lib/cn";

type Props = {
  images: SiteImage[];
  label: string;
  compact?: boolean;
  fit?: "contain" | "cover";
};

/** Shared, manually controlled gallery; no autoplay or unsolicited motion. */
export function PhotoSlideshow({ images, label, compact = false, fit = "contain" }: Props) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const count = images.length;
  const photo = images[index] ?? images[0];
  const multiple = count > 1;

  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [expanded]);

  if (!photo) return null;

  function move(step: number) {
    setIndex(current => (current + step + count) % count);
  }

  function handleKey(event: KeyboardEvent<HTMLElement>) {
    if (!multiple) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowLeft" ? -1 : 1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setIndex(event.key === "Home" ? 0 : count - 1);
    }
  }

  function touchStart(event: TouchEvent<HTMLElement>) {
    const touch = event.touches[0];
    touchRef.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  }

  function touchEnd(event: TouchEvent<HTMLElement>) {
    const start = touchRef.current;
    const end = event.changedTouches[0];
    touchRef.current = null;
    if (!start || !end || !multiple) return;
    const dx = end.clientX - start.x;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(end.clientY - start.y)) move(dx < 0 ? 1 : -1);
  }

  function open() {
    dialogRef.current?.showModal();
    setExpanded(true);
  }

  function close() {
    dialogRef.current?.close();
    setExpanded(false);
  }

  const controls = (large = false) => multiple && (
    <>
      <button type="button" onClick={() => move(-1)} aria-label="Previous photo" className={cn("absolute left-2 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-900/90 text-white shadow-sm hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf-300", large && "sm:left-4")}>
        <ChevronLeft aria-hidden="true" className="size-6" />
      </button>
      <button type="button" onClick={() => move(1)} aria-label="Next photo" className={cn("absolute right-2 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-900/90 text-white shadow-sm hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf-300", large && "sm:right-4")}>
        <ChevronRight aria-hidden="true" className="size-6" />
      </button>
    </>
  );

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} onKeyDown={handleKey} className="relative z-10 min-w-0">
      <div onTouchStart={touchStart} onTouchEnd={touchEnd} className={cn("relative overflow-hidden bg-white", compact ? "aspect-[3/2]" : "aspect-[4/3] rounded-card border border-mist-200 sm:aspect-[16/10]")}>
        <button type="button" onClick={open} aria-label={`Enlarge photo ${index + 1} of ${count}`} className="absolute inset-0 cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand-700">
          <Image src={photo.src} alt={photo.alt} fill sizes={compact ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 1280px) 1152px, 100vw"} className={cn(fit === "cover" ? "object-cover" : "object-contain", compact && fit === "contain" && "p-3")} />
          <span aria-hidden="true" className="absolute bottom-2 left-2 flex size-9 items-center justify-center rounded-full bg-brand-900/90 text-white"><Maximize2 className="size-4" /></span>
        </button>
        {controls()}
        <p aria-live="polite" aria-atomic="true" className="pointer-events-none absolute bottom-2 right-2 rounded-sm bg-brand-900/90 px-2 py-1 text-xs text-white">{index + 1} / {count}</p>
      </div>

      {!compact && (
        <>
          <p className="mt-3 text-sm text-ink-muted">{photo.alt}{photo.credit && <span className="ml-2 text-ink-subtle">· {photo.credit}</span>}</p>
          {multiple && (
            <div aria-label="Choose a photo" className="mt-4 flex gap-3 overflow-x-auto p-1">
              {images.map((image, position) => (
                <button key={`${image.src}-${position}`} type="button" onClick={() => setIndex(position)} aria-label={`Show photo ${position + 1}`} aria-pressed={position === index} className={cn("relative h-16 w-24 shrink-0 overflow-hidden rounded-sm border-2 bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700", position === index ? "border-brand-700" : "border-mist-200 hover:border-mist-500")}>
                  <Image src={image.src} alt="" fill sizes="96px" className="object-contain" />
                </button>
              ))}
            </div>
          )}
        </>
      )}

      <dialog ref={dialogRef} aria-label={`${label} — enlarged photos`} onClose={() => setExpanded(false)} onKeyDown={event => event.stopPropagation()} className="fixed inset-0 m-auto max-h-[96dvh] w-[96vw] max-w-7xl overflow-y-auto rounded-card bg-brand-900 p-3 text-white shadow-xl backdrop:bg-black/80 sm:p-5">
        <div onKeyDown={handleKey}>
          <div className="mb-3 flex items-center justify-between gap-3">
            <p aria-live="polite" aria-atomic="true" className="min-w-0 text-sm">{label} · {index + 1} / {count}</p>
            <button type="button" onClick={close} aria-label="Close slideshow" className="flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-leaf-300"><X aria-hidden="true" className="size-6" /></button>
          </div>
          <div onTouchStart={touchStart} onTouchEnd={touchEnd} className="relative h-[68dvh] sm:h-[76dvh]">
            {expanded && <Image src={photo.src} alt={photo.alt} fill sizes="96vw" className="object-contain" />}
            {controls(true)}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
            <p className="min-w-0 flex-1">{photo.alt}</p>
            <a href={photo.src} target="_blank" rel="noreferrer" className="underline underline-offset-4">Open full-size image</a>
          </div>
        </div>
      </dialog>
    </div>
  );
}
