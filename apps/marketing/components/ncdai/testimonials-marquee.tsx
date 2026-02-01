"use client"
import React from 'react';
import { cn } from "@delistme/ui"

export const Testimonial = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex flex-col justify-between overflow-hidden rounded-xl border bg-background p-6 shadow-sm",
      className
    )}
    {...props}
  />
))
Testimonial.displayName = "Testimonial"

export const TestimonialQuote = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-base leading-relaxed text-muted-foreground", className)}
    {...props}
  />
))
TestimonialQuote.displayName = "TestimonialQuote"

export const TestimonialAuthor = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-6 flex items-center gap-3", className)}
    {...props}
  />
))
TestimonialAuthor.displayName = "TestimonialAuthor"

export const TestimonialAvatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative h-10 w-10 overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  />
))
TestimonialAvatar.displayName = "TestimonialAvatar"

export const TestimonialAvatarImg = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, alt, ...props }, ref) => (
  <img
    ref={ref}
    alt={alt}
    className={cn("h-10 w-10 rounded-full object-cover", className)}
    {...props}
  />
))
TestimonialAvatarImg.displayName = "TestimonialAvatarImg"

export const TestimonialAuthorInfo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col", className)}
    {...props}
  />
))
TestimonialAuthorInfo.displayName = "TestimonialAuthorInfo"

export const TestimonialAuthorName = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm font-semibold text-foreground", className)}
    {...props}
  />
))
TestimonialAuthorName.displayName = "TestimonialAuthorName"

export const TestimonialAuthorTagline = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-muted-foreground", className)}
    {...props}
  />
))
TestimonialAuthorTagline.displayName = "TestimonialAuthorTagline"
