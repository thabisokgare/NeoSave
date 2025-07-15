import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva("rounded-lg border bg-card text-card-foreground shadow-sm", {
  variants: {
    variant: ["default", "destructive"],
  },
  defaultVariants: {
    variant: "default",
  },
})

const cardHeaderVariants = cva("flex flex-col space-y-1.5 p-6")

const cardTitleVariants = cva("text-2xl font-semibold leading-none tracking-tight")

const cardDescriptionVariants = cva("text-sm text-muted-foreground")

const cardContentVariants = cva("p-6 pt-0")

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, variant, ...props }, ref) => (
  <div className={cn(cardVariants({ variant, className }))} ref={ref} {...props} />
))
Card.displayName = "Card"

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
  <div className={cn(cardHeaderVariants({ className }))} ref={ref} {...props} />
))
CardHeader.displayName = "CardHeader"

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, ...props }, ref) => (
  <h3 className={cn(cardTitleVariants({ className }))} ref={ref} {...props} />
))
CardTitle.displayName = "CardTitle"

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(({ className, ...props }, ref) => (
  <p className={cn(cardDescriptionVariants({ className }))} ref={ref} {...props} />
))
CardDescription.displayName = "CardDescription"

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
  <div className={cn(cardContentVariants({ className }))} ref={ref} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardDescription, CardContent }
