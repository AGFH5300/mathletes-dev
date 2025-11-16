"use client"

import { useEffect, useRef } from "react"

interface FloatingFormula {
  text: string
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  opacity: number
  fadeDirection: number
  size: number
}

export function MathBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Math formulas to display - similar to the green screen examples
    const formulas = [
      "x²",
      "y³",
      "(x+y)",
      "π",
      "∫",
      "∑",
      "√x",
      "∞",
      "α",
      "β",
      "θ",
      "Δ",
      "∂f/∂x",
      "dy/dx",
      "lim",
      "sin(x)",
      "cos(θ)",
      "e^x",
      "log(n)",
      "a²+b²=c²",
      "f(x)",
      "A=πr²",
      "n!",
      "x⁴",
      "∇",
      "≈",
      "≠",
      "≤",
      "≥",
      "±",
      "×",
      "÷",
      "∠",
      "⊥",
      "||",
      "∈",
      "∉",
      "⊂",
      "∪",
      "∩",
    ]

    // Create floating formulas
    const floatingFormulas: FloatingFormula[] = []
    const numFormulas = 35

    for (let i = 0; i < numFormulas; i++) {
      floatingFormulas.push({
        text: formulas[Math.floor(Math.random() * formulas.length)],
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        opacity: Math.random() * 0.4 + 0.25,
        fadeDirection: Math.random() > 0.5 ? 0.003 : -0.003,
        size: Math.random() * 16 + 18,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      floatingFormulas.forEach((formula) => {
        // Update position
        formula.x += formula.vx
        formula.y += formula.vy

        // Wrap around edges
        if (formula.x < -100) formula.x = canvas.width + 100
        if (formula.x > canvas.width + 100) formula.x = -100
        if (formula.y < -100) formula.y = canvas.height + 100
        if (formula.y > canvas.height + 100) formula.y = -100

        // Update rotation
        formula.rotation += formula.rotationSpeed

        // Update opacity (fade in/out)
        formula.opacity += formula.fadeDirection
        if (formula.opacity <= 0.15) {
          formula.opacity = 0.15
          formula.fadeDirection = 0.003
        }
        if (formula.opacity >= 0.65) {
          formula.opacity = 0.65
          formula.fadeDirection = -0.003
        }

        // Draw formula
        ctx.save()
        ctx.translate(formula.x, formula.y)
        ctx.rotate(formula.rotation)
        ctx.font = `${formula.size}px "Geist Mono", monospace`
        ctx.fillStyle = `rgba(59, 130, 246, ${formula.opacity})`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(formula.text, 0, 0)
        ctx.restore()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none select-none z-0" />
}
