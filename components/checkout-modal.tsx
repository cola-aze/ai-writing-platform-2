"use client"

import { useCallback } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { startCheckoutSession } from "@/app/actions/stripe"

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null

interface CheckoutModalProps {
  productId: string | null
  onClose: () => void
}

export function CheckoutModal({ productId, onClose }: CheckoutModalProps) {
  const fetchClientSecret = useCallback(() => {
    if (!productId) return Promise.resolve("")
    return startCheckoutSession(productId)
  }, [productId])

  if (!productId) return null

  if (!stripePromise) {
    return (
      <Dialog open={!!productId} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>支付配置中</DialogTitle>
          </DialogHeader>
          <div className="py-8 text-center text-muted-foreground">
            <p>Stripe 支付正在配置中，请稍后再试。</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={!!productId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>完成订阅</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </DialogContent>
    </Dialog>
  )
}
